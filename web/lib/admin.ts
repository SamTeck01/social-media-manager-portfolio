import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Server-only. Secrets come from Vercel env vars, never from the page.
//   ADMIN_PASSWORD         her login password
//   ADMIN_SECRET           any long random string, signs the session cookie
//   GITHUB_TOKEN           fine-grained token, this repo only, Contents: read & write
//   BLOB_READ_WRITE_TOKEN  set automatically when a Vercel Blob store is connected
export const REPO = "samteck01/social-media-manager-portfolio";
export const BRANCH = "claude/admiring-johnson-0qnmbu"; // the branch Vercel deploys
export const FILES = {
  videos: "web/content/videos.json",
  voice: "web/content/voice.json",
  contact: "web/content/contact.json",
} as const;
export type FileKey = keyof typeof FILES;

const COOKIE = "admin_session";
const WEEK = 60 * 60 * 24 * 7;

const sign = (v: string) => createHmac("sha256", process.env.ADMIN_SECRET ?? "").update(v).digest("hex");

const same = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export const configured = () => Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SECRET);

export const checkPassword = (pw: string) => configured() && same(pw, process.env.ADMIN_PASSWORD!);

export async function startSession() {
  const exp = String(Math.floor(Date.now() / 1000) + WEEK);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: WEEK,
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
