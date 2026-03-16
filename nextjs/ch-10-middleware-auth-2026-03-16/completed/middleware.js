import { NextResponse } from "next/server";

/**
 * Next.js Middleware
 *
 * 모든 요청이 라우트 핸들러나 페이지에 도달하기 전에 이 함수를 거칩니다.
 * 여기서 인증 확인, 리다이렉션, 헤더 수정 등을 수행할 수 있습니다.
 *
 * ✅ Middleware는 Edge Runtime에서 실행됩니다.
 *    - Node.js API를 직접 사용할 수 없습니다 (fs, path 등).
 *    - 쿠키와 헤더를 읽고 쓸 수 있습니다.
 *    - 리다이렉트와 리라이트가 가능합니다.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 쿠키에서 세션 토큰 확인
  const sessionToken = request.cookies.get("session-token")?.value;

  // /admin 경로에 접근하려는 경우
  if (pathname.startsWith("/admin")) {
    // 세션 토큰이 없으면 → 로그인 페이지로 리다이렉트
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      // 로그인 후 원래 가려던 페이지로 돌아갈 수 있도록 callbackUrl 파라미터 추가
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 세션 토큰이 있으면, 역할(role) 정보를 확인
    // ⚠️ Middleware는 Edge Runtime이므로 서버 메모리의 sessions Map에 직접 접근 불가
    //    → 쿠키에 role 정보를 함께 저장하여 확인하는 전략 사용
    const userRole = request.cookies.get("user-role")?.value;

    if (userRole !== "admin") {
      // admin이 아닌 사용자는 → 권한 없음 페이지로 리다이렉트
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // ✅ 인증 + 권한 모두 통과 → 요청에 커스텀 헤더 추가 (서버 컴포넌트에서 활용 가능)
    const response = NextResponse.next();
    response.headers.set("x-user-role", userRole);
    return response;
  }

  // /login 경로에 이미 로그인한 사용자가 접근하면 → 홈으로 리다이렉트
  if (pathname === "/login" && sessionToken) {
    const userRole = request.cookies.get("user-role")?.value;
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

/**
 * Middleware가 실행될 경로를 지정합니다.
 *
 * matcher를 설정하지 않으면 모든 경로에서 실행됩니다.
 * 정적 파일(_next/static, favicon.ico 등)은 제외하는 것이 성능에 좋습니다.
 */
export const config = {
  matcher: [
    // /admin과 그 하위 경로 모두
    "/admin/:path*",
    // /login 경로
    "/login",
  ],
};
