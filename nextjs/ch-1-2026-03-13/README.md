# 회차 1 — App Router 기초 및 레이아웃

## 회차 정보

- **회차**: 1주차
- **핵심 개념**: Next.js App Router의 파일 기반 라우팅, `layout.jsx`와 `page.jsx`의 역할, `next/link` 네비게이션, 메타데이터 설정
- **난이도**: 입문

---

## 주제 및 기획 의도

**NovaTech Solutions** — 가상의 IT 솔루션 기업 소개 사이트를 만듭니다.

3개의 페이지(홈, 회사 소개, 문의하기)와 공통 레이아웃(Navbar + Footer)을 구성하면서 Next.js App Router의 가장 기본적인 구조를 체험합니다. 정적 텍스트 데이터만 사용하여 라우팅과 레이아웃 시스템에 집중할 수 있도록 설계했습니다.

---

## 학습 목표

1. Next.js App Router의 **폴더 = 경로** 규칙을 이해한다.
2. `layout.jsx`가 하위 페이지에 **공통 UI를 감싸는** 역할을 파악한다.
3. `page.jsx`가 해당 경로의 **실제 화면**을 담당함을 안다.
4. `next/link`의 `Link` 컴포넌트로 **클라이언트 사이드 네비게이션**을 구현한다.
5. `metadata` 객체로 **페이지별 SEO 메타 정보**를 설정한다.
6. Tailwind CSS v4로 **모던한 반응형 UI**를 꾸밀 수 있다.

---

## React와의 차이점

| React (Vite + React Router) | Next.js (App Router) |
|---|---|
| `<Route path="/about" element={<About />} />` JSX 선언 | `app/about/page.jsx` **파일만 만들면** 자동 라우팅 |
| `<BrowserRouter>`, `<Routes>` 등 라우터 설정 필요 | 설정 불필요, **폴더 구조가 곧 라우팅** |
| `react-helmet`으로 `<head>` 관리 | `export const metadata` 내장 기능 |
| 모든 컴포넌트가 클라이언트 렌더링 | 기본이 **서버 컴포넌트** (이번 회차에서는 깊이 다루지 않음) |
| 별도의 레이아웃 컴포넌트를 직접 구성 | `layout.jsx`가 **자동으로 children을 감싸줌** |

---

## 사전 준비

```bash
# 1. completed(완성본) 또는 practice(실습용) 폴더로 이동
cd nextjs/2026-03-13/completed   # 완성본 확인 시
cd nextjs/2026-03-13/practice    # 실습 시

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 확인
# http://localhost:3000
```

---

## 핵심 학습 개념

### 1. 파일 기반 라우팅 (File-based Routing)

Next.js App Router에서는 `app/` 디렉토리 안의 **폴더 구조**가 곧 URL 경로가 됩니다.

```
app/
├── page.jsx          →  "/"        (홈)
├── about/
│   └── page.jsx      →  "/about"   (회사 소개)
└── contact/
    └── page.jsx      →  "/contact" (문의하기)
```

React Router처럼 별도의 라우팅 설정 코드를 작성할 필요가 없습니다!

### 2. layout.jsx — 공통 레이아웃

`layout.jsx`는 해당 경로와 모든 하위 경로에 **공통으로 적용되는 UI 껍데기**입니다.

```jsx
// app/layout.jsx (Root Layout)
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Navbar />          {/* 모든 페이지에 공통 */}
        <main>{children}</main>  {/* 여기에 각 page.jsx가 렌더링됨 */}
        <Footer />          {/* 모든 페이지에 공통 */}
      </body>
    </html>
  );
}
```

- `children` prop은 Next.js가 자동으로 주입합니다.
- Root Layout은 `<html>`과 `<body>` 태그를 반드시 포함해야 합니다.

### 3. page.jsx — 페이지 컴포넌트

각 폴더의 `page.jsx`가 해당 URL의 **실제 화면 내용**을 담당합니다.

```jsx
// app/about/page.jsx → "/about" 페이지
export default function AboutPage() {
  return <h1>회사 소개</h1>;
}
```

### 4. next/link — 클라이언트 사이드 네비게이션

```jsx
import Link from "next/link";

// HTML <a> 태그처럼 사용하되, 페이지 새로고침 없이 이동합니다.
<Link href="/about">회사 소개</Link>
```

일반 `<a>` 태그와 달리 전체 페이지를 새로 불러오지 않고, **변경된 부분만 교체**합니다.

### 5. metadata — SEO 메타 정보

```jsx
// layout.jsx 또는 page.jsx에서 export
export const metadata = {
  title: "페이지 제목",
  description: "페이지 설명",
};
```

- `layout.jsx`의 metadata는 **기본값**이 됩니다.
- `page.jsx`의 metadata는 해당 페이지에서 **기본값을 덮어씁니다**.

### 6. Tailwind CSS v4 설정

```css
/* app/globals.css */
@import "tailwindcss";
```

Tailwind CSS v4에서는 이 한 줄이면 설정 완료! `tailwind.config.js`가 필요 없습니다.

---

## 프로젝트 구조 안내

```
completed/ (또는 practice/)
├── package.json          # 프로젝트 의존성 (next, react, tailwindcss)
├── next.config.mjs       # Next.js 설정 파일
├── jsconfig.json         # 절대 경로 설정 (@/ alias)
├── postcss.config.mjs    # PostCSS 설정 (Tailwind 연동)
├── app/
│   ├── globals.css       # Tailwind CSS 임포트
│   ├── layout.jsx        # Root Layout (Navbar + Footer 포함)
│   ├── page.jsx          # 홈 페이지 (히어로, 서비스, 실적)
│   ├── components/
│   │   ├── Navbar.jsx    # 상단 네비게이션 바
│   │   └── Footer.jsx    # 하단 푸터
│   ├── about/
│   │   └── page.jsx      # 회사 소개 페이지
│   └── contact/
│       └── page.jsx      # 문의하기 페이지
```

---

## 추천 실습 순서

> 완성본(`completed/`)을 먼저 실행하여 최종 결과를 확인한 뒤, `practice/`에서 작업하세요.

### Step 1. `app/layout.jsx` — Root Layout 완성
- `metadata` 객체에 title, description 채우기
- `<body>` 태그에 Tailwind 클래스 적용
- `<main>` 태그에 `flex-1` 추가

### Step 2. `app/components/Navbar.jsx` — 네비게이션 바
- `next/link`의 `Link` import 하기
- `navLinks` 배열에 3개 링크 데이터 채우기
- `<header>`, `<nav>` 태그 스타일링
- `navLinks.map()`으로 링크 목록 렌더링

### Step 3. `app/components/Footer.jsx` — 푸터
- 3열 그리드 레이아웃 스타일링
- 각 컬럼 내용 스타일 적용
- 저작권 영역 구분선 추가

### Step 4. `app/page.jsx` — 홈 페이지
- `Link` import 및 CTA 버튼 추가
- `services` 배열 데이터 채우기 → 카드 렌더링
- `stats` 배열 데이터 채우기 → 통계 렌더링
- 각 섹션 Tailwind 스타일링

### Step 5. `app/about/page.jsx` — 회사 소개 페이지
- 페이지 metadata export
- 비전 섹션 2열 레이아웃
- `values`, `team` 배열 채우기 → 카드 렌더링

### Step 6. `app/contact/page.jsx` — 문의하기 페이지
- 페이지 metadata export
- `contactInfo` 배열 채우기 → 연락처 렌더링
- 문의 폼 입력 필드 스타일링

---

## 교육자의 팁

1. **`layout.jsx`에 `<html>`과 `<body>`를 빼먹지 마세요!**
   Root Layout에는 반드시 이 두 태그가 있어야 합니다. 없으면 빌드 에러가 발생합니다.

2. **`<a>` 대신 `<Link>`를 사용하세요.**
   일반 `<a>` 태그는 페이지 전체를 새로고침합니다. `Link`는 필요한 부분만 교체하여 훨씬 빠릅니다.

3. **`Link`의 `href`에 `/`를 잊지 마세요.**
   `href="about"` (X) → `href="/about"` (O)

4. **모든 파일이 기본적으로 서버 컴포넌트입니다.**
   1회차에서는 `"use client"`가 필요 없습니다. 정적 UI만 다루기 때문입니다. 서버/클라이언트 분리는 2회차에서 본격적으로 다룹니다.

5. **Tailwind 클래스가 적용되지 않는다면?**
   `globals.css`에 `@import "tailwindcss";`가 있는지, `layout.jsx`에서 `import "./globals.css"`를 하고 있는지 확인하세요.

---

## 최종 기대 효과

이 회차를 마치면 다음을 할 수 있습니다:

- Next.js App Router 프로젝트를 **처음부터 생성하고 실행**할 수 있다.
- **폴더 구조만으로 페이지 라우팅**을 구성할 수 있다.
- `layout.jsx`를 활용하여 **공통 UI(네비게이션, 푸터)**를 효율적으로 관리할 수 있다.
- `next/link`로 **빠른 페이지 전환**을 구현할 수 있다.
- Tailwind CSS v4로 **모던한 반응형 레이아웃**을 구성할 수 있다.

---

## 심화 도전 과제

1. **중첩 레이아웃 만들기**: `app/about/layout.jsx`를 추가하여 About 섹션만의 사이드바 레이아웃을 구성해보세요. Root Layout 안에 About Layout이 중첩되는 구조를 체험할 수 있습니다.

2. **404 페이지 커스터마이징**: `app/not-found.jsx` 파일을 만들어 존재하지 않는 경로 접근 시 나만의 404 페이지가 표시되도록 해보세요.
