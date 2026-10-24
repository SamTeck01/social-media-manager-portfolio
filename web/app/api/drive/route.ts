import { NextResponse } from "next/server";
import { loggedIn, sameOrigin } from "@/lib/admin";
import { DRIVE_FOLDER, driveConfigured, listMedia } from "@/lib/drive";

export const runtime = "nodejs";

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

// Checks a file is in her folder and returns its Drive link. Nothing is copied:
// the site plays it from Google Drive.
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!(await loggedIn())) return deny();
  if (!driveConfigured()) return NextResponse.json({ error: "Google Drive isn't connected yet" }, { status: 400 });
  const { id } = (await req.json().catch(() => ({}))) as { id?: string };
  if (!id || !/^[\w-]{10,}$/.test(id)) return NextResponse.json({ error: "Bad file id" }, { status: 400 });
  try {
    const f = (await listMedia()).find((x) => x.id === id);
    if (!f) return NextResponse.json({ error: "That file isn't in the portfolio folder" }, { status: 403 });
    return NextResponse.json({ url: `https://drive.google.com/file/d/${id}/view`, name: f.name, mimeType: f.mimeType });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}
