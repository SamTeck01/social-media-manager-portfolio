import { NextResponse } from "next/server";
import { checkLogin, clearFails, configured, endSession, loggedIn, lockedOut, recordFail, sameOrigin, startSession } from "@/lib/admin";

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

const ipOf = (req: Request) => req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const ip = ipOf(req);
  if (lockedOut(ip)) return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  const { username, password } = (await req.json().catch(() => ({}))) as { username?: string; password?: string };
  if (!checkLogin(String(username ?? ""), String(password ?? ""))) {
    recordFail(ip);
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return NextResponse.json({ error: "Wrong username or password" }, { status: 401 });
  }
  clearFails(ip);
  await startSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await endSession();
  return NextResponse.json({ ok: true });
}
