import { NextResponse } from "next/server";
import {
  createAdminSessionCookie,
  isCorrectAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    password?: string;
  } | null;

  if (!body?.password || !isCorrectAdminPassword(body.password)) {
    return NextResponse.json(
      { error: "Incorrect password / 密碼不正確" },
      { status: 401 },
    );
  }

  await createAdminSessionCookie();
  return NextResponse.json({ ok: true });
}
