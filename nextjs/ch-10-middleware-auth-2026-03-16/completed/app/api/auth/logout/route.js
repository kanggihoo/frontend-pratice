import { NextResponse } from "next/server";
import { removeSession } from "@/lib/auth";

/**
 * POST /api/auth/logout
 * 로그아웃 처리 — 세션 삭제 및 쿠키 제거
 */
export async function POST(request) {
  const sessionToken = request.cookies.get("session-token")?.value;

  // 서버 메모리에서 세션 삭제
  if (sessionToken) {
    removeSession(sessionToken);
  }

  const response = NextResponse.json({ message: "로그아웃 성공" });

  // 쿠키 삭제 (maxAge를 0으로 설정)
  response.cookies.set("session-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("user-role", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
