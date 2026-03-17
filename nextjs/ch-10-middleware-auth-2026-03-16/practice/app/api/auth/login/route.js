// ─── [로그인 API Route Handler] ──────────────────────────
// POST /api/auth/login
// 사용자의 아이디/비밀번호를 받아 인증하고, 세션 쿠키를 설정합니다.

import { NextResponse } from "next/server";
import { authenticate } from "@/lib/auth";

export async function POST(request) {
  // ─── [요청 본문에서 username, password 추출] ──────────
  // 힌트: const { username, password } = await request.json();

  // TODO: 요청 본문을 파싱하세요
  const { username, password } = await request.json();

  // ─── [인증 시도] ──────────────────────────────
  // lib/auth.js의 authenticate 함수를 호출하세요.
  // 결과가 null이면 401 에러를 반환합니다.
  //
  // 힌트:
  // const result = authenticate(username, password);
  // if (!result) {
  //   return NextResponse.json({ error: "아이디 또는 비밀번호가 올바르지 않습니다." }, { status: 401 });
  // }

  // TODO: authenticate 함수를 호출하고 실패 시 에러를 반환하세요
  const result = authenticate(username, password);

  if (!result) {
    return NextResponse.json(
      { error: "아이디 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  const { token, user } = result;

  // ─── [응답 생성 및 쿠키 설정] ──────────────────────
  // 로그인 성공 시 응답을 만들고, 쿠키에 세션 토큰과 역할을 저장합니다.
  //
  // ✅ 쿠키 옵션 설명:
  // - httpOnly: true → JavaScript에서 쿠키 접근 불가 (XSS 방어)
  // - secure: true (프로덕션) → HTTPS에서만 쿠키 전송
  // - sameSite: "lax" → CSRF 공격 방어
  // - path: "/" → 모든 경로에서 쿠키 전송
  // - maxAge: 60 * 60 * 24 → 24시간 유효
  //
  // 힌트:
  // const response = NextResponse.json({ message: "로그인 성공", user });
  //
  // response.cookies.set("session-token", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "lax",
  //   path: "/",
  //   maxAge: 60 * 60 * 24,
  // });
  //
  // response.cookies.set("user-role", user.role, { ... 동일한 옵션 ... });

  // TODO: 응답을 생성하고 세션 토큰과 역할을 쿠키에 설정하세요
  const response = NextResponse.json({ message: "로그인 성공", user });

  // TODO: response.cookies.set()으로 "session-token"과 "user-role" 쿠키를 설정하세요

  return response;
}
