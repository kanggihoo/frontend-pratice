---
trigger: manual
---

# Next.js 학습 커리큘럼

> Next.js (App Router) + Tailwind CSS v4 기반, 회차별 핵심 개념 집중 학습
> 
> 💡 **참고 (Vite 관련 중요 사항)** 
> Next.js는 자체적인 빌드 시스템(Turbopack 및 Webpack)을 내장하고 있어 기본적으로 **Vite를 프레임워크 자체 구동기로 사용하지 않습니다.** 기존 React SPA 환경에서는 Vite가 표준이지만, Next.js 환경에서는 Next.js 내장 도구를 사용하는 것이 표준입니다. 따라서 본 커리큘럼은 **Next.js의 최신 App Router 아키텍처**와 **Tailwind CSS v4**에 집중되도록, 그리고 **JavaScript**를 중심으로 학습하도록 설계되었습니다.

## 💡 React ➡️ Next.js 전환 포인트 (사전 숙지)

React에서 사용하던 개념이 Next.js에서 어떻게 달라지는지 매핑하여 이질감을 줄입니다.

| React에서 배운 것 | Next.js에서의 대응 | 전환 포인트 요약 |
| --- | --- | --- |
| `useEffect` + `fetch` | `async` Server Component | 클라이언트 페칭 로직을 **서버사이드** 렌더링으로 이동 |
| React Router | 파일시스템 라우팅 | JSX 태그 선언(`Route`) ➡️ **폴더/파일 구조 기반** 자동 설정 |
| `useState` 로딩/에러 | `loading.jsx`, `error.jsx` | 수동 상태 관리 ➡️ **파일 기반 자동 렌더링** (Suspense 내장) |
| `form onSubmit` | Server Actions | 클라이언트 API 호출 ➡️ **서버 함수 직접 실행** (API 엔드포인트 생략) |
| `REACT_APP_` | `NEXT_PUBLIC_` | **환경변수 접두사 변경** (클라이언트 노출 시 필수) |
| 커스텀 훅 `useFetch` | RSC 직접 `fetch` | 데이터 페칭용 커스텀 훅 **불필요** |

---

## 커리큘럼 개요

| 구간 | 회차 | 핵심 개념 | 예시 주제 | 데이터 |
| --- | --- | --- | --- | --- |
| **기초 압축** | 1 | App Router 기초 및 레이아웃 | 회사 소개 페이지 (구조 잡기) | 정적 텍스트 |
| | 2 | 서버/클라이언트 컴포넌트(RSC/RCC) | 상호작용이 있는 상품 목록 카드 | 목업 |
| **중급 (데이터 & 라우팅)** | 3 | 서버사이드 데이터 페칭 (Data Fetching) | 서버에서 불러온 유저 대시보드 | API |
| | 4 | 동적 라우팅 & 네비게이션 | 블로그 포스트 상세 페이지 | API |
| | 5 | 로딩, 에러 UI 및 Suspense | 로딩 스켈레톤 상태가 적용된 피드 | API |
| **심화 (API & 뮤테이션)** | 6 | Route Handlers (자체 API 구축) | 날씨/뉴스 데이터 자체 엔드포인트 생성 | 외부 API |
| | 7 | Server Actions (서버 액션) 기초 | 클라이언트 JS 없이 작동하는 방명록 폼 | 로컬 JSON/DB |
| | 8 | 데이터 재검증 (캐시 무효화) | 게시물 작성 후 최신 목록 즉각 갱신 | API / DB |
| **최적화 및 실무** | 9 | 성능 최적화 (Image, Font, Meta 등) | 반응형 이미지와 동적 SEO가 적용된 갤러리 | 정적 에셋 |
| | 10 | Proxy (Middleware) 및 인증 연계 | 보호된 관리자 라우트 및 자동 리다이렉트 | 쿠키/세션 |
| | 11 | 고급 훅 연동 (`useActionState`, `useFormStatus`) | 상태 피드백이 있는 복합 회원가입 폼 | 서버 액션 연동 |
| **종합 프로젝트** | 12 | 전체 종합 (Next.js 풀스택) | 미니 이커머스 쇼핑몰 또는 풀스택 블로그 | API |

---

## 회차별 상세

### 회차 1 — App Router 기초 및 레이아웃
- **목표**: Next.js 13+ App Router의 디렉토리 구조와 `page.jsx`, `layout.jsx`의 역할을 이해한다. (React Router 방식과의 차이점 비교)
- **핵심 키워드**: 파일 기반 라우팅, 글로벌/중첩 `layout.jsx`, `page.jsx`, 환경변수(`NEXT_PUBLIC_`), Tailwind CSS v4 초기 설정 (`@import "tailwindcss";`)
- **전환 포인트**: "React Router의 JSX 기반 선언"과 "Next.js의 폴더 기반 라우팅"의 차이점 체감하기
- **예시 주제**: 회사 소개 사이트 — 글로벌 네비게이션 바(GNB)가 포함된 Root Layout 및 여러 페이지(Home, About, Contact) 라우팅 구성
- **데이터**: 정적 텍스트

### 회차 2 — 서버 컴포넌트(RSC) vs 클라이언트 컴포넌트(RCC) ⭐️ (가장 중요)
- **목표**: Next.js의 핵심인 서버 컴포넌트의 개념을 익히고, 상호작용이 필요할 때만 트리의 말단에 `'use client'`를 분리 도입하는 패턴을 마스터한다.
- **핵심 키워드**: React Server Components (RSC), Client Components, `'use client'` 남발 방지, 컴포넌트 역할 분리 전략
- **전환 포인트**: React 커리큘럼에서 배운 `useEffect + API` 방식이 RSC에서는 서버단 렌더링으로 어떻게 바뀌는지 비교
- **예시 주제**: 구매 수량 조절이 배포된 상품 목록 — 화면 틀을 그리는 서버 컴포넌트 껍데기에 '+ / -' 수량 조절 State가 필요한 클라이언트 컴포넌트 분리하여 주입하기
- **데이터**: 목업 데이터 배열

### 회차 3 — 서버사이드 데이터 페칭 및 렌더링 전략
- **목표**: 서버에서 데이터를 안전하고 빠르게 가져와 화면에 렌더링하는 방법을 학습하고, 서버 렌더링의 4가지 방식(SSG/SSR/ISR/Streaming)을 비교한다.
- **핵심 키워드**: Server-side Fetching, 컴포넌트 내 `async/await`, Next.js 15+ 기본 캐싱 정책 (기본적으로 반환 데이터가 캐시되지 않음), 렌더링 전략 개요
- **전환 포인트**: `useEffect`에서 해방되어, 컴포넌트 자체가 `async` 함수가 되는 직관적인 경험 체감하기
- **예시 주제**: 서버사이드 유저 대시보드 — `page.jsx` 내부에서 API를 직접 호출하여 유저 목록 테이블 구성
- **데이터**: API (JSONPlaceholder)

### 회차 4 — 동적 라우팅 및 네비게이션
- **목표**: URL 파라미터에 따라 내용이 맞춤형으로 렌더링되는 페이지를 구성하고 앱 내를 부드럽게 오가는 방법을 배운다.
- **핵심 키워드**: Dynamic Routes (`[id]`, `[...slug]`), `next/link`, `redirect`, `generateStaticParams` (빌드 타임 사전 생성)
- **전환 포인트**: React의 `useParams`를 서버에서 매개변수(`props.params`)로 넘겨받는 방식 이해하기 (Next.js 15+부터 `params`는 비동기 객체이므로 `await params` 사용)
- **예시 주제**: 블로그 포스트 상세 페이지 — `app/posts/[id]/page.jsx`를 구축하고 `const { id } = await params`를 받아 개별 게시글 렌더링 (일부 페이지 `generateStaticParams`로 미리 생성해보기)
- **데이터**: API (JSONPlaceholder Posts API)

### 회차 5 — 로딩, 에러 UI 및 Suspense
- **목표**: 데이터를 가져오는 동안과, 서버 에러 발생 시 사용자 경험(UX)을 우아하게 방어하는 내장 파일 시스템 규칙을 알아본다.
- **핵심 키워드**: `loading.jsx`, `error.jsx`, `not-found.jsx`, React Suspense와 스트리밍 렌더링
- **전환 포인트**: React `useState`로 다루던 로딩/에러 상태가 Next.js에서는 파일 단위 생성만으로 자동 처리됨을 체감
- **예시 주제**: 지연 렌더링 피드 — 서버 로직에 의도적인 딜레이(`setTimeout`)를 넣어 스켈레톤 UI를 확인하고 잘못된 데이터 접근 시 에러 페이지 표출
- **데이터**: 딜레이가 포함된 가짜 API

### 회차 6 — Route Handlers (자체 API 엔드포인트 구축)
- **목표**: 외부 서비스 연동(Webhook), 외부 API Key 서버 은닉 등 POST 엔드포인트가 외부 환경 및 클라이언트와 통신해야 할 때 사용하는 라우트 핸들러를 알아본다. (단순한 폼 제출 뮤테이션은 Server Actions 사용 권장)
- **핵심 키워드**: `app/api/route.js`, GET/POST, `NextRequest`, `NextResponse`, **API Key 마스킹**
- **예시 주제**: 독자적 프록시 API 서버 — 타사 API(예: 외부 뉴스, 날씨 등)를 백엔드에서 fetch하여 클라이언트로 안전하게 정제해 전달하는 API 구축 (클라이언트에 외부 API Key 노출 방지)
- **데이터**: 외부 공공 API

### 회차 7 — Server Actions (서버 액션) 기초
- **목표**: 클라이언트 컴포넌트에서 별도 API 엔드포인트 세팅 없이 바로 내부 서버 측 함수를 호출하거나, HTML 폼 제출로 서버 DB에 접근하는 실무 필수 패턴을 마스터한다.
- **핵심 키워드**: Server Actions, `'use server'`, 프로그레시브 인핸스먼트, `<form action={...}>`, `redirect` 주의사항(`try/catch` 밖에서 호출)
- **예시 주제**: 무자바스크립트 지원 방명록 — 브라우저 JS가 꺼져있어도 폼이 제출되어 데이터가 쌓이는 서버 액션 체험
- **데이터**: 로컬 JSON 파일 읽기/쓰기 실습

### 회차 8 — 데이터 재검증(Revalidation)
- **목표**: 서버에서 데이터를 새로 캐싱하여 오래된 정보를 지우고 최신 상태의 데이터를 클라이언트 화면에 갱신하는 테크닉을 익힌다.
- **핵심 키워드**: On-Demand Revalidation (`revalidatePath`, `revalidateTag`), Next.js 15+ `"use cache"` 디렉티브, `cacheLife()`, `cacheTag()`
- **예시 주제**: 실시간 댓글 갱신 — 서버 액션을 통해 작성한 댓글이 즉각적으로 목록에 반영되도록 최신 캐싱 지시어 및 캐시 무효화 컨트롤 적용하기
- **데이터**: API 또는 자체 방명록 모델

### 회차 9 — 성능 최적화 (Image, Font, Meta 등)
- **목표**: 웹사이트 속도 및 검색 엔진 평가 시 최상위 등급을 받기 위한 Next.js의 내장형 최적화 컴포넌트들을 적극 사용한다.
- **핵심 키워드**: `next/image` (Layout Shift 방지), `next/font` (FOUT 방지), `generateMetadata` (동적 SEO), **`dynamic()` 임포트 (`ssr: false`)**
- **예시 주제**: 초고속 반응형 갤러리 — 여러 장 고해상도 이미지를 로딩 딜레이 없이 렌더하고 동적 SEO 적용 및 SSR이 지원되지 않는 서드파티 라이브러리(ex: 지도 등)를 `dynamic`으로 우회 모듈화하기
- **데이터**: 정적 이미지 및 로컬 에셋

### 회차 10 — Proxy (Middleware) 및 인증 연계
- **목표**: 서버에서 페이지 진입 직전에 라우트를 가로채어 권한 확인, 다국어 처리, 리다이렉션을 수행하는 법과 인증 라이브러리와의 패턴을 익힌다.
- **핵심 키워드**: `middleware.js` (Next.js 15 이하) / `proxy.js` (Next.js 16+) — 설치 버전에 따라 사용, 라우트 가드, NextAuth v5 (Auth.js) / Clerk 연계 패턴 소개
- **예시 주제**: 보호된 어드민(Admin) 대시보드 — 가짜 세션 토큰 체킹을 통해 비인가 유저를 로그인 페이지로 튕겨내는 Proxy(Middleware) 기반 라우트 가드 구현
- **데이터**: 로컬 머신 쿠키 (모의 토큰)

### 회차 11 — 고급 훅 연동 (`useActionState`, `useFormStatus`)
- **목표**: 서버 액션의 실행 상태(로딩 중)와 결과를 화면(클라이언트)에서 친절하게 보여주는 고품질 폼 디자인을 설계한다.
- **핵심 키워드**: `useActionState`, `useFormStatus`, `useOptimistic` (설명 및 시연)
- **예시 주제**: 완성형 회원가입/비밀번호 변경 폼 — 제출 버튼의 스피너 로딩 처리와 서버에서 올라온 유효성 검증 실패(에러 메시지) 즉시 표출
- **데이터**: 폼 시뮬레이션 및 API 연동

### 회차 12 — 종합 프로젝트
- **목표**: 프론트엔드 라우팅부터 서버 사이드 렌더링 및 모의 DB 구축(Route Handlers/Server Actions)을 Next.js로 종합한다. 
- **핵심 키워드**: App Router 통합, 컴포넌트 아키텍처, Tailwind v4 심화 컴포넌트화 기법, Vercel 배포 시연
- **예시 주제 후보**:
  - 미니 이커머스 (상품 나열, 필터, 장바구니 추가 과정 구현)
  - 풀스택 블로그 (게시글 리스트업, 디테일, 좋아요/댓글 서버액션 연동)
- **데이터**: 복합 (더미 JSON + 자체 API)

---

## 기반 기술 및 활용 환경
- **Next.js App Router**: 최신버전 (`npx create-next-app@latest`)
- **Tailwind CSS v4.xx**: CSS-in-JS 설정 없이 `@import 'tailwindcss';` 를 기반으로 한 제로 콘피그 스타일링
- **JavaScript**: 본 과정을 우선 완수하기 위해 TypeScript 설정을 끄고 `.jsx`, `.js` 로만 진행
- *참고: 빠른 실험 및 독립 모듈 개발 시에는 Vite 환경을 접목시킬 수 있으나 본 애플리케이션의 뼈대는 Next.js Turbopack 사용*

---

## 진행 상태

- [x] 회차 1 — App Router 기초 및 레이아웃
- [x] 회차 2 — 서버 컴포넌트(RSC) vs 클라이언트 컴포넌트(RCC)
- [ ] 회차 3 — 서버사이드 데이터 페칭 및 렌더링 전략
- [ ] 회차 4 — 동적 라우팅 및 네비게이션
- [ ] 회차 5 — 로딩, 에러 UI 및 Suspense
- [ ] 회차 6 — Route Handlers (자체 API 엔드포인트 구축)
- [ ] 회차 7 — Server Actions (서버 액션) 기초
- [ ] 회차 8 — 데이터 재검증(Revalidation)
- [ ] 회차 9 — 성능 최적화 (Image, Font, Meta 등)
- [ ] 회차 10 — Proxy (Middleware) 및 인증 연계
- [ ] 회차 11 — 고급 훅 연동 (`useActionState`, `useFormStatus`)
- [ ] 회차 12 — 종합 프로젝트
