// ─── [로그아웃 API Route Handler] ──────────────────────
// POST /api/auth/logout
// 세션을 삭제하고 쿠키를 제거합니다.

import { NextResponse } from "next/server";
import { removeSession } from "@/lib/auth";

export async function POST(request) {
  // ─── [세션 토큰 확인 및 삭제] ──────────────────────
  // 힌트:
  // 1. request.cookies.get("session-token")?.value 로 토큰을 가져오세요.
  // 2. removeSession(token) 으로 서버 메모리에서 세션을 삭제하세요.

  // TODO: 세션 토큰을 읽고 removeSession으로 삭제하세요

  const response = NextResponse.json({ message: "로그아웃 성공" });

  // ─── [쿠키 삭제] ──────────────────────────────
  // 쿠키를 삭제하려면 maxAge를 0으로 설정합니다.
  //
  // 힌트:
  // response.cookies.set("session-token", "", {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "lax",
  //   path: "/",
  //   maxAge: 0,   // ← 0으로 설정하면 쿠키가 즉시 만료됩니다
  // });
  // "user-role" 쿠키도 동일하게 삭제하세요.

  // TODO: "session-token"과 "user-role" 쿠키를 삭제하세요 (maxAge: 0)

  return response;
}
