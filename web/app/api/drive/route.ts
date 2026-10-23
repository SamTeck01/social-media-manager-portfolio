import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { loggedIn } from "@/lib/admin";
import { DRIVE_FOLDER, driveConfigured, getMeta, listMedia, openMedia } from "@/lib/drive";

export const runtime = "nodejs";
export const maxDuration = 300; // big videos take a while to copy

const deny = () => NextResponse.json({ error: "Not logged in" }, { status: 401 });

export async function GET() {
  if (!(await loggedIn())) return deny();
  if (!driveConfigured()) return NextResponse.json({ configured: false, files: [] });
  try {
    return NextResponse.json({
      configured: true,
      folderUrl: `https://drive.google.com/drive/folders/${DRIVE_FOLDER}`,
      files: await listMedia(),
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}

// Copies one Drive file into Vercel Blob (fast, cacheable) and returns its URL.
// The site never plays from Drive itself: Drive is slow and rate-limits viewers.
export async function POST(req: Request) {
  if (!(await loggedIn())) return deny();
  if (!driveConfigured()) return NextResponse.json({ error: "Google Drive isn't connected yet" }, { status: 400 });
  const { id } = (await req.json().catch(() => ({}))) as { id?: string };
  if (!id || !/^[\w-]{10,}$/.test(id)) return NextResponse.json({ error: "Bad file id" }, { status: 400 });
  try {
    // Only files that are actually inside her folder.
    if (!(await listMedia()).some((f) => f.id === id)) return NextResponse.json({ error: "That file isn't in the portfolio folder" }, { status: 403 });
    const meta = await getMeta(id);
    const safe = meta.name.replace(/[^\w.-]+/g, "-").slice(-80);
    const blob = await put(`drive/${id}-${safe}`, await openMedia(id), {
      access: "public",
      contentType: meta.mimeType,
      multipart: true,
      allowOverwrite: true,
    });
    return NextResponse.json({ url: blob.url, name: meta.name, mimeType: meta.mimeType });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}
