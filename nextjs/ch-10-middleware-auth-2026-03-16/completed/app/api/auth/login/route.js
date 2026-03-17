import { NextResponse } from "next/server";
import { authenticate } from "@/lib/auth";

/**
 * POST /api/auth/login
 * 사용자 로그인을 처리하는 Route Handler
 */
export async function POST(request) {
  const { username, password } = await request.json();

  // 인증 시도
  const result = authenticate(username, password);

  if (!result) {
    return NextResponse.json(
      { error: "아이디 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  const { token, user } = result;

  // 응답 생성
  const response = NextResponse.json({
    message: "로그인 성공",
    user,
  });

  // 쿠키에 세션 토큰 저장
  // httpOnly: JS에서 접근 불가 (XSS 방어)
  // secure: HTTPS에서만 전송 (개발 환경에서는 false)
  // sameSite: CSRF 방어
  // path: 모든 경로에서 쿠키 전송
  response.cookies.set("session-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24시간
  });

  // 역할 정보도 쿠키에 저장 (Middleware에서 역할 확인용)
  response.cookies.set("user-role", user.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
