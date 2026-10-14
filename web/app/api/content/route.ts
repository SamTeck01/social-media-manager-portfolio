import { NextResponse } from "next/server";
import { FILES, loggedIn, readFile, writeFile, type FileKey } from "@/lib/admin";

const isKey = (k: string | null): k is FileKey => !!k && k in FILES;
const str = (v: unknown) => typeof v === "string";

// Shape checks so a bad save can't break the site build.
const valid: Record<FileKey, (d: unknown) => boolean> = {
  videos: (d) =>
    Array.isArray((d as { items?: unknown }).items) &&
    (d as { items: Record<string, unknown>[] }).items.every(
      (v) => str(v.title) && str(v.client) && str(v.category) && str(v.src) && (v.poster === undefined || str(v.poster)) && (v.aspect === undefined || str(v.aspect)),
    ),
  voice: (d) =>
    Array.isArray((d as { items?: unknown }).items) &&
    (d as { items: Record<string, unknown>[] }).items.every(
      (v) => str(v.title) && str(v.style) && str(v.src) && (v.duration === undefined || str(v.duration)),
    ),
  contact: (d) => {
    const c = d as Record<string, unknown>;
    return str(c.email) && str(c.booking) && Array.isArray(c.socials) && (c.socials as Record<string, unknown>[]).every((s) => str(s.label) && str(s.href));
  },
};

export async function GET(req: Request) {
  if (!(await loggedIn())) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const key = new URL(req.url).searchParams.get("file");
  if (!isKey(key)) return NextResponse.json({ error: "Unknown file" }, { status: 400 });
  try {
    return NextResponse.json(await readFile(key));
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}

export async function PUT(req: Request) {
  if (!(await loggedIn())) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const { file, data, sha } = (await req.json().catch(() => ({}))) as { file?: string; data?: unknown; sha?: string };
  if (!isKey(file ?? null) || !sha) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  if (!valid[file as FileKey](data)) return NextResponse.json({ error: "Some fields are missing" }, { status: 400 });
  try {
    await writeFile(file as FileKey, data, sha);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}
