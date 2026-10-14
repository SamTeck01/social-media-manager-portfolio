import { NextResponse } from "next/server";
import { checkPassword, configured, endSession, loggedIn, startSession } from "@/lib/admin";

export async function GET() {
  return NextResponse.json({ loggedIn: await loggedIn(), configured: configured() });
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
