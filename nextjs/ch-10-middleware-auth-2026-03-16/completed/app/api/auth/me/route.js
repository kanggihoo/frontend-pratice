import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

/**
 * GET /api/auth/me
 * 현재 로그인한 사용자 정보를 반환합니다.
 */
export async function GET(request) {
  const sessionToken = request.cookies.get("session-token")?.value;

  if (!sessionToken) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const session = getSession(sessionToken);

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      username: session.username,
      name: session.name,
      email: session.email,
      role: session.role,
    },
  });
}
