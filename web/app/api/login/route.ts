import { NextResponse } from "next/server";
import { checkPassword, configured, endSession, loggedIn, startSession } from "@/lib/admin";

export async function GET() {
  const ok = await loggedIn();
  return NextResponse.json({
    loggedIn: ok,
    configured: configured(),
    // What's connected, shown to her as a setup checklist once logged in.
    setup: ok
      ? {
          github: Boolean(process.env.GITHUB_TOKEN),
          blob: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
          drive: Boolean(process.env.GOOGLE_API_KEY),
        }
      : undefined,
  });
}

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  if (!checkPassword(String(password ?? ""))) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }
  await startSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await endSession();
  return NextResponse.json({ ok: true });
}
