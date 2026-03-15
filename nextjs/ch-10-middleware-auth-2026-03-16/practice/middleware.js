// ─── [Next.js Middleware 파일] ──────────────────────────
// 이 파일은 프로젝트 루트(app/ 폴더와 같은 레벨)에 위치해야 합니다.
//
// ✅ Middleware란?
// - 모든 요청이 라우트 핸들러나 페이지에 도달하기 "전에" 실행되는 함수입니다.
// - Edge Runtime에서 실행되므로 Node.js API(fs, path 등)를 사용할 수 없습니다.
// - 대신 쿠키 읽기/쓰기, 헤더 수정, 리다이렉트, 리라이트가 가능합니다.
//
// ✅ Next.js 16+에서는 "proxy"라는 이름으로 전환이 진행 중이며,
//    현재 middleware.js도 정상 작동합니다.

import { NextResponse } from "next/server";

// ─── [middleware 함수] ──────────────────────────────
// 이 함수는 아래 config.matcher에 정의된 경로에 대한 요청마다 실행됩니다.
// request 객체를 통해 URL, 쿠키, 헤더 등에 접근할 수 있습니다.
//
// 핵심 API:
// - request.nextUrl.pathname: 현재 요청 경로
// - request.cookies.get("쿠키이름")?.value: 쿠키 값 읽기
// - NextResponse.redirect(new URL("/경로", request.url)): 리다이렉트
// - NextResponse.next(): 요청을 그대로 통과
// - response.headers.set("키", "값"): 커스텀 헤더 추가

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // ─── [쿠키에서 세션 토큰 확인] ──────────────────────
  // 힌트: request.cookies.get("session-token")?.value 로 세션 토큰을 가져오세요.

  // TODO: 세션 토큰을 쿠키에서 읽어오세요
  const sessionToken = null;

  // ─── [/admin 경로 보호] ──────────────────────────
  // /admin으로 시작하는 모든 경로에 대해 인증 및 권한을 확인합니다.
  //
  // 힌트: pathname.startsWith("/admin")으로 경로를 체크하세요.
  if (pathname.startsWith("/admin")) {
    // ─── [1단계: 로그인 여부 확인] ──────────────────
    // 세션 토큰이 없으면 → /login 페이지로 리다이렉트
    //
    // 힌트:
    // 1. sessionToken이 없는 경우를 확인하세요 (!sessionToken)
    // 2. const loginUrl = new URL("/login", request.url) 로 URL 객체를 생성
    // 3. loginUrl.searchParams.set("callbackUrl", pathname) 로 원래 가려던 경로를 파라미터로 전달
    //    → 로그인 후 원래 페이지로 돌아갈 수 있도록!
    // 4. return NextResponse.redirect(loginUrl) 로 리다이렉트

    // TODO: 세션 토큰이 없으면 로그인 페이지로 리다이렉트하세요

    // ─── [2단계: 역할(role) 확인] ──────────────────
    // 세션 토큰이 있더라도 admin 역할인지 확인해야 합니다.
    //
    // ⚠️ 왜 쿠키에 role을 별도 저장할까?
    //    Middleware는 Edge Runtime에서 실행되므로, 서버 메모리의 sessions Map에
    //    직접 접근할 수 없습니다. 따라서 로그인 시 role 정보를 쿠키에 함께 저장합니다.
    //
    // 힌트:
    // 1. request.cookies.get("user-role")?.value 로 역할을 가져오세요.
    // 2. 역할이 "admin"이 아니면 → /unauthorized 페이지로 리다이렉트
    //    return NextResponse.redirect(new URL("/unauthorized", request.url))

    // TODO: 역할을 확인하고 admin이 아니면 /unauthorized로 리다이렉트하세요

    // ─── [3단계: 인증 + 권한 통과] ──────────────────
    // 모든 검증을 통과하면 요청을 그대로 전달합니다.
    // 선택적으로 커스텀 헤더를 추가할 수 있습니다.
    //
    // 힌트:
    // const response = NextResponse.next();
    // response.headers.set("x-user-role", userRole);
    // return response;

    // TODO: 인증 통과 시 NextResponse.next()를 반환하세요
  }

  // ─── [이미 로그인한 사용자의 /login 접근 차단] ──────────
  // 이미 로그인한 사용자가 /login 페이지에 접근하면,
  // admin이면 /admin으로, 아니면 / 로 리다이렉트합니다.
  //
  // 힌트:
  // if (pathname === "/login" && sessionToken) {
  //   const userRole = request.cookies.get("user-role")?.value;
  //   if (userRole === "admin") return NextResponse.redirect(new URL("/admin", request.url));
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // TODO: 이미 로그인한 사용자가 /login에 접근하면 적절히 리다이렉트하세요

  return NextResponse.next();
}

// ─── [Middleware 실행 경로 설정 (matcher)] ──────────────
// matcher를 설정하지 않으면 모든 경로에서 Middleware가 실행됩니다.
// 성능을 위해 필요한 경로만 지정하는 것이 좋습니다.
//
// 힌트:
// matcher 배열에 Middleware를 실행할 경로 패턴을 지정하세요.
// - "/admin/:path*" → /admin과 그 하위 경로 모두
// - "/login" → /login 경로
export const config = {
  matcher: [
    // TODO: Middleware가 실행될 경로 패턴을 지정하세요
    // 힌트: "/admin/:path*", "/login"
  ],
};
