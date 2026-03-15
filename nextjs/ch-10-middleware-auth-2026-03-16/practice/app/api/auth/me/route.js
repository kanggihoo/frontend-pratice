// ─── [현재 사용자 정보 API] ──────────────────────────
// GET /api/auth/me
// 쿠키의 세션 토큰을 확인하여 현재 로그인한 사용자 정보를 반환합니다.

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(request) {
  // ─── [세션 토큰으로 사용자 조회] ──────────────────────
  // 힌트:
  // 1. request.cookies.get("session-token")?.value 로 토큰을 가져오세요.
  // 2. 토큰이 없으면 { user: null }을 401 상태로 반환하세요.
  // 3. getSession(token)으로 세션 정보를 조회하세요.
  // 4. 세션이 없으면 { user: null }을 401 상태로 반환하세요.
  // 5. 세션이 있으면 { user: { username, name, email, role } }을 반환하세요.

  // TODO: 세션 토큰을 읽고 사용자 정보를 반환하세요

  return NextResponse.json({ user: null }, { status: 401 });
}
