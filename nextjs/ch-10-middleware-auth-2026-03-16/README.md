# 회차 10 — Proxy (Middleware) 및 인증 연계

## [회차 정보]

- **회차**: 10회차
- **핵심 개념**: Middleware를 활용한 라우트 가드, 쿠키 기반 인증, 역할(Role) 기반 접근 제어
- **Next.js 버전**: 16.x (Middleware → Proxy 전환 과도기)

---

## [주제 및 기획 의도]

**보호된 어드민(Admin) 대시보드**를 구축합니다.

로그인하지 않은 사용자가 `/admin` 페이지에 접근하면 Middleware가 요청을 가로채 `/login`으로 리다이렉트하고, 일반 사용자(user 역할)는 `/unauthorized` 페이지로 안내합니다. 관리자(admin 역할)만 대시보드에 접근할 수 있습니다.

이 주제를 선택한 이유:
- **Middleware**는 실무에서 인증/인가, 다국어 처리, A/B 테스트 등에 광범위하게 사용됩니다.
- 쿠키 기반 세션 관리와 역할 기반 접근 제어는 거의 모든 웹 애플리케이션에서 필수적입니다.
- 로그인 → 리다이렉트 → 보호된 페이지 접근이라는 흐름을 직접 체험하며 Middleware의 실전 활용법을 익힐 수 있습니다.

---

## [학습 목표]

이 예제를 통해 구체적으로 배우는 것:

1. **Middleware의 개념과 동작 원리** — 요청이 페이지에 도달하기 전에 가로채는 메커니즘
2. **`middleware.js` 파일의 위치와 구조** — 프로젝트 루트에 위치, `matcher`로 실행 경로 제한
3. **쿠키를 활용한 인증 상태 확인** — `request.cookies.get()`으로 세션 토큰 읽기
4. **조건부 리다이렉트** — `NextResponse.redirect()`로 인증/인가 실패 시 적절한 페이지로 이동
5. **callbackUrl 패턴** — 로그인 후 원래 가려던 페이지로 돌아가는 UX 구현
6. **역할 기반 접근 제어(RBAC)** — admin/user 역할에 따른 페이지 접근 권한 분리
7. **쿠키 보안 옵션** — `httpOnly`, `secure`, `sameSite` 등 보안 설정의 의미

---

## [React와의 차이점]

| React (SPA)                          | Next.js (App Router)                         |
| ------------------------------------ | -------------------------------------------- |
| 클라이언트에서 `useEffect`로 인증 체크 | **Middleware**가 서버에서 요청 전에 인증 체크    |
| React Router의 `PrivateRoute` 컴포넌트 | `middleware.js`에서 경로 기반 가드               |
| `localStorage`에 토큰 저장 (XSS 취약) | **httpOnly 쿠키**에 저장 (XSS 방어)             |
| 인증 실패 시 컴포넌트 내에서 리다이렉트 | Middleware에서 **페이지 렌더링 전에** 리다이렉트 |
| 클라이언트에서 역할 확인 (조작 가능)   | 서버(Middleware)에서 역할 확인 (안전)            |

**핵심 차이**: React SPA에서는 보호된 페이지의 HTML/JS가 일단 클라이언트에 전달된 후 리다이렉트되지만, Next.js Middleware는 **페이지 자체가 전달되기 전에** 차단합니다.

---

## [사전 준비]

### 프로젝트 실행 방법

```bash
# 1. 완성본 확인
cd completed
npm install
npm run dev
# → http://localhost:3000 접속

# 2. 실습 프로젝트
cd practice
npm install
npm run dev
# → http://localhost:3001 접속 (포트 충돌 시 자동 변경)
```

### 테스트 계정

| 역할     | 아이디 | 비밀번호    | /admin 접근 |
| -------- | ------ | ----------- | ----------- |
| 관리자   | admin  | admin1234   | ✅ 가능      |
| 일반사용자 | user   | user1234    | ❌ 불가 → /unauthorized |

---

## [핵심 학습 개념]

### 1. Middleware란 무엇인가?

Middleware는 **클라이언트의 요청이 실제 페이지나 API에 도달하기 전에 실행되는 함수**입니다.

```
클라이언트 요청 → [Middleware] → 페이지/API 렌더링
                     ↓
              인증 확인, 리다이렉트,
              헤더 수정 등 수행
```

**왜 필요한가?**
- 인증되지 않은 사용자가 보호된 페이지의 내용을 아예 받지 못하도록 차단
- 매 페이지마다 인증 로직을 반복하지 않고 **한 곳에서 중앙 관리**
- 서버 렌더링 전에 실행되므로 불필요한 서버 자원 소비 방지

### 2. Middleware 파일 위치와 실행 범위

```
프로젝트 루트/
├── middleware.js    ← 여기! (app/ 폴더와 같은 레벨)
├── app/
│   ├── page.js
│   └── admin/
│       └── page.js
```

- `middleware.js`는 **프로젝트 루트**에 위치해야 합니다 (`app/` 안이 아님!)
- `config.matcher`로 실행할 경로를 제한할 수 있습니다

```js
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
```

### 3. Middleware의 핵심 API

```js
import { NextResponse } from "next/server";

export function middleware(request) {
  // 요청 URL 읽기
  const { pathname } = request.nextUrl;

  // 쿠키 읽기
  const token = request.cookies.get("session-token")?.value;

  // 리다이렉트
  return NextResponse.redirect(new URL("/login", request.url));

  // 요청 통과 (+ 커스텀 헤더 추가 가능)
  const response = NextResponse.next();
  response.headers.set("x-custom", "value");
  return response;
}
```

### 4. 쿠키 기반 인증 흐름

```
1. 로그인 폼 제출
   → POST /api/auth/login
   → 서버에서 인증 확인
   → 쿠키에 session-token, user-role 저장 (httpOnly)

2. 보호된 페이지 접근
   → Middleware가 쿠키의 session-token 확인
   → user-role이 "admin"인지 확인
   → 통과하면 페이지 렌더링, 실패하면 리다이렉트

3. 로그아웃
   → POST /api/auth/logout
   → 서버에서 세션 삭제
   → 쿠키 삭제 (maxAge: 0)
```

### 5. callbackUrl 패턴

로그인 후 원래 가려던 페이지로 돌아가는 UX:

```
/admin/users 접근 시도
  → Middleware: 토큰 없음!
  → /login?callbackUrl=/admin/users 로 리다이렉트
  → 로그인 성공 후 /admin/users 로 이동
```

### 6. Edge Runtime 제약사항

Middleware는 **Edge Runtime**에서 실행됩니다:
- ✅ 쿠키/헤더 읽기, 쓰기
- ✅ URL 리다이렉트/리라이트
- ❌ Node.js API (fs, path 등) 사용 불가
- ❌ 서버 메모리의 변수 직접 접근 불가 → 쿠키에 필요한 정보 저장

### 7. Next.js 16+ proxy.js (참고)

Next.js 16부터 `middleware.js`는 `proxy.js`로 전환이 진행 중입니다:
- 현재 `middleware.js`도 정상 작동하지만 deprecation 경고가 표시됩니다
- 사용법은 동일하며, 파일명만 다릅니다
- 실무에서는 설치된 Next.js 버전에 맞춰 사용하면 됩니다

---

## [프로젝트 구조 안내]

```
ch-10-middleware-auth-2026-03-16/
├── completed/                         # 완성본
│   ├── middleware.js                  # ⭐ Middleware (라우트 가드) — 프로젝트 루트!
│   ├── lib/
│   │   └── auth.js                    # 인증 유틸 (사용자 DB, 세션 관리)
│   ├── app/
│   │   ├── layout.js                  # Root 레이아웃 + Navigation
│   │   ├── page.js                    # 홈 페이지
│   │   ├── components/
│   │   │   ├── Navigation.js          # 🔶 네비게이션 바 (로그인 상태 표시)
│   │   │   ├── LoginForm.js           # 🔶 로그인 폼 (callbackUrl 처리)
│   │   │   └── AdminSidebar.js        # 🔶 관리자 사이드바 메뉴
│   │   ├── login/
│   │   │   └── page.js                # 로그인 페이지
│   │   ├── unauthorized/
│   │   │   └── page.js                # 접근 권한 없음 페이지
│   │   ├── admin/
│   │   │   ├── layout.js              # 관리자 중첩 레이아웃 (사이드바)
│   │   │   ├── page.js                # ⭐ 관리자 대시보드 (쿠키 읽기)
│   │   │   ├── users/
│   │   │   │   └── page.js            # 사용자 관리 페이지
│   │   │   └── settings/
│   │   │       └── page.js            # 설정 페이지 (세션 정보 표시)
│   │   └── api/auth/
│   │       ├── login/route.js         # ⭐ 로그인 API (쿠키 설정)
│   │       ├── logout/route.js        # 로그아웃 API (쿠키 삭제)
│   │       └── me/route.js            # 현재 사용자 조회 API
├── practice/                          # 실습용 (동일 구조, 로직 비워짐)
└── README.md                          # 이 파일
```

> 🔶 = 클라이언트 컴포넌트 (`"use client"`) | ⭐ = 핵심 학습 파일

---

## [추천 실습 순서]

### Step 1: 인증 기반 구축 (`lib/auth.js`)
1. 모의 사용자 데이터(USERS 배열) 정의
2. `authenticate()` 함수 구현 — 사용자 인증 + 세션 토큰 발급
3. `getSession()` / `removeSession()` 구현

### Step 2: 로그인 API (`app/api/auth/login/route.js`)
1. 요청 본문에서 username/password 파싱
2. `authenticate()` 호출 후 결과에 따라 응답
3. **쿠키 설정** — `response.cookies.set()` (httpOnly, sameSite 등 보안 옵션)

### Step 3: 로그아웃/사용자 조회 API
1. `app/api/auth/logout/route.js` — 세션 삭제 + 쿠키 제거 (maxAge: 0)
2. `app/api/auth/me/route.js` — 세션 토큰으로 사용자 정보 조회

### Step 4: Middleware 구현 (`middleware.js`) ⭐ 핵심!
1. `/admin` 경로 접근 시 쿠키의 `session-token` 확인
2. 토큰 없으면 `/login?callbackUrl=...`로 리다이렉트
3. `user-role` 쿠키 확인 → admin이 아니면 `/unauthorized`로 리다이렉트
4. `config.matcher` 설정
5. 이미 로그인한 사용자의 `/login` 접근 처리

### Step 5: 클라이언트 컴포넌트 로직
1. `LoginForm.js` — 폼 제출 핸들러, 로그인 API 호출, callbackUrl 처리
2. `Navigation.js` — 로그인 상태 확인 (useEffect + /api/auth/me), 로그아웃 핸들러

### Step 6: UI 스타일링 (Tailwind CSS)
1. 각 컴포넌트의 빈 className에 Tailwind 클래스 적용
2. 통계 카드, 테이블, 사이드바 등 관리자 UI 완성

---

## [교육자의 팁]

### 흔히 하는 실수

1. **`middleware.js` 파일 위치 오류**
   - ❌ `app/middleware.js` — 동작하지 않음!
   - ✅ 프로젝트 루트의 `middleware.js` (package.json과 같은 레벨)

2. **Middleware에서 서버 변수 접근 시도**
   - Middleware는 Edge Runtime이므로 `lib/auth.js`의 `sessions` Map에 직접 접근할 수 없습니다
   - → 해결: 쿠키에 `user-role` 등 필요한 정보를 함께 저장

3. **쿠키 삭제 시 `delete` 대신 `maxAge: 0`**
   - `response.cookies.delete()`도 가능하지만, `set(name, "", { maxAge: 0 })`이 더 명확합니다

4. **`router.refresh()` 누락**
   - 로그인/로그아웃 후 `router.push()`만 호출하면 서버 컴포넌트가 이전 쿠키 기준으로 렌더링됩니다
   - `router.refresh()`를 함께 호출해야 서버 컴포넌트가 최신 쿠키를 반영합니다

5. **Next.js 15+에서 `cookies()`는 비동기**
   - `const cookieStore = await cookies()` — `await` 필수!

### 꼭 기억할 포인트

- Middleware는 **모든 요청에 실행**되므로, `matcher`로 범위를 제한하세요
- `httpOnly` 쿠키는 JavaScript에서 접근 불가 → XSS 공격 방어의 기본
- 실무에서는 JWT + Refresh Token 또는 NextAuth(Auth.js) / Clerk 같은 라이브러리를 사용합니다

---

## [최종 기대 효과]

이 회차를 마치면:
- Middleware의 개념과 실행 흐름을 이해하고, 직접 라우트 가드를 구현할 수 있습니다
- 쿠키 기반 인증의 전체 흐름(로그인 → 세션 저장 → 인증 확인 → 로그아웃)을 설계할 수 있습니다
- `httpOnly`, `sameSite` 등 쿠키 보안 옵션의 역할을 설명할 수 있습니다
- callbackUrl 패턴으로 사용자 경험을 개선하는 방법을 알게 됩니다
- 역할 기반 접근 제어(RBAC)의 기본 개념을 실전에 적용할 수 있습니다

---

## [심화 도전 과제]

### 도전 1: JWT(JSON Web Token) 방식으로 전환
현재는 서버 메모리(Map)에 세션을 저장하지만, JWT를 사용하면 서버 상태 없이 토큰 자체에 정보를 담을 수 있습니다. `jsonwebtoken` 라이브러리를 설치하고 JWT 기반 인증으로 변경해보세요.

### 도전 2: 로그인 시도 횟수 제한
같은 IP에서 5회 이상 로그인 실패 시 5분간 로그인을 차단하는 Rate Limiting을 Middleware에 구현해보세요.
