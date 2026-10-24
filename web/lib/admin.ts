import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Server-only. Secrets come from Vercel env vars, never from the page.
//   ADMIN_USERNAME         her login name
//   ADMIN_PASSWORD_HASH    scrypt hash of her password (scrypt$N$r$p$salt$hash), never the password itself
//   ADMIN_SECRET           long random string (32+ chars), signs the session cookie
//   GITHUB_TOKEN           fine-grained token, this repo only, Contents: read & write
//   BLOB_READ_WRITE_TOKEN  set automatically when a Vercel Blob store is connected
export const REPO = "samteck01/social-media-manager-portfolio";
export const BRANCH = "claude/magical-brahmagupta-lop2y7"; // Vercel's Production branch
export const FILES = {
  videos: "web/content/videos.json",
  voice: "web/content/voice.json",
  contact: "web/content/contact.json",
} as const;
export type FileKey = keyof typeof FILES;

const COOKIE = "admin_session";
const DAY = 60 * 60 * 24;

// The username is part of the signature, so changing it ends existing sessions.
const sign = (v: string) =>
  createHmac("sha256", process.env.ADMIN_SECRET ?? "").update(`${process.env.ADMIN_USERNAME}:${v}`).digest("hex");

const same = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export const configured = () =>
  Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD_HASH && (process.env.ADMIN_SECRET?.length ?? 0) >= 32);

// Constant-time check of username and password against the stored scrypt hash.
export function checkLogin(user: string, pw: string) {
  if (!configured() || user.length > 200 || pw.length > 200) return false;
  const [algo, N, r, p, salt, hash] = process.env.ADMIN_PASSWORD_HASH!.split("$");
  if (algo !== "scrypt" || !hash) return false;
  const want = Buffer.from(hash, "base64");
  const got = scryptSync(pw, Buffer.from(salt, "base64"), want.length, { N: +N, r: +r, p: +p, maxmem: 256 * 1024 * 1024 });
  const okPw = timingSafeEqual(got, want);
  const okUser = same(user.trim().toLowerCase(), process.env.ADMIN_USERNAME!.trim().toLowerCase());
  return okPw && okUser;
}

// Brute-force brake: 5 failed tries per IP per 15 minutes (per server instance).
const fails = new Map<string, { n: number; until: number }>();
export function lockedOut(ip: string) {
  const f = fails.get(ip);
  return !!f && f.n >= 5 && f.until > Date.now();
}
export function recordFail(ip: string) {
  const f = fails.get(ip);
  const fresh = !f || f.until < Date.now();
  fails.set(ip, { n: fresh ? 1 : f!.n + 1, until: Date.now() + 15 * 60 * 1000 });
}
export const clearFails = (ip: string) => fails.delete(ip);

// Rejects state-changing requests that come from another website.
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return req.method === "GET";
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

export async function startSession() {
  const exp = String(Math.floor(Date.now() / 1000) + DAY);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: DAY,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function loggedIn() {
  if (!configured()) return false;
  const [exp, sig] = ((await cookies()).get(COOKIE)?.value ?? "").split(".");
  return Boolean(exp && sig && same(sig, sign(exp)) && Number(exp) > Date.now() / 1000);
}

const gh = (path: string, init?: RequestInit) =>
  fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

export async function readFile(key: FileKey) {
  const r = await gh(`${FILES[key]}?ref=${encodeURIComponent(BRANCH)}`);
  if (!r.ok) throw new Error(`GitHub read failed (${r.status})`);
  const j = (await r.json()) as { content: string; sha: string };
  return { data: JSON.parse(Buffer.from(j.content, "base64").toString("utf8")), sha: j.sha };
}

export async function writeFile(key: FileKey, data: unknown, sha: string) {
  const r = await gh(FILES[key], {
    method: "PUT",
    body: JSON.stringify({
      message: `Admin: update ${key}`,
      content: Buffer.from(JSON.stringify(data, null, 2) + "\n").toString("base64"),
      sha,
      branch: BRANCH,
    }),
  });
  if (r.status === 409) throw new Error("Someone else saved first. Reload and try again.");
  if (!r.ok) throw new Error(`GitHub save failed (${r.status})`);
}

// To make ADMIN_PASSWORD_HASH for a new password:
// node -e 'const c=require("crypto"),s=c.randomBytes(16);console.log(`scrypt$32768$8$1$${s.toString("base64")}$${c.scryptSync(process.argv[1],s,32,{N:32768,r:8,p:1,maxmem:268435456}).toString("base64")}`)' 'new-password'
