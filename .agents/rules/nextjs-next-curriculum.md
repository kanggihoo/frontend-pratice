---
trigger: manual
---

## 즉시 추가 권장

### 12회차 — 병렬 라우트 & 인터셉팅 라우트

App Router에서만 존재하는 레이아웃 패턴. 실무 UI 복잡도가 높아질수록 반드시 필요.

- **키워드**: `@slot` 병렬 라우트, `(.)` / `(..)` 인터셉팅 라우트, `default.js`
- **예시**: 피드 목록에서 포스트 클릭 시 URL은 바뀌지만 배경은 유지되는 모달 (Instagram/X 스타일)

### 13회차 — Spring API 연동 패턴 (외부 백엔드 연계)

Spring에서 발급한 JWT를 Next.js에서 안전하게 다루는 패턴. 10회차 Middleware와 연결되는 실전 내용.

- **키워드**: `httpOnly` 쿠키에 JWT 저장, Middleware에서 토큰 검증 후 라우트 가드, `fetch` 인터셉터 레이어 설계, CORS 우회 프록시 Route Handler
- **포인트**: Spring REST API ↔ Next.js 서버 컴포넌트 간 인증 헤더 전달 흐름

### 14회차 — TypeScript 완전 적용

규모가 커질수록 타입 없는 Next.js 코드는 유지보수 불가. Next.js 고유 타입들 집중 학습.

- **키워드**: `PageProps`, `LayoutProps`, typed Server Actions (`ActionState`), `generateMetadata` 반환 타입, `Route` 타입으로 `next/link` href 자동완성

---

## 중급 심화

### 15회차 — URL 기반 상태 관리 (nuqs)

`useState` 대신 URL 쿼리 파라미터를 상태로 사용하는 패턴. 필터, 검색, 페이지네이션에 매우 유용.

- **키워드**: `nuqs`, `useQueryState`, 서버 컴포넌트에서 `searchParams` 읽기, 딥링크 가능한 UI 설계
- **예시**: 필터/정렬/페이지가 URL에 반영되는 상품 목록

### 16회차 — 전역 상태 관리 (App Router 환경)

RSC 세계에서 Redux는 어울리지 않음. 클라이언트 경계를 의식한 상태 설계 필요.

- **키워드**: Zustand, Jotai, `Provider`를 클라이언트 레이어에만 배치하는 법, 서버 상태 vs 클라이언트 상태 경계 설계

### 17회차 — 클라이언트 데이터 페칭 (TanStack Query + RSC)

서버 컴포넌트로 초기 데이터를 채우고, 클라이언트에서 실시간 동기화가 필요할 때의 조합 패턴.

- **키워드**: TanStack Query v5, `initialData` / `prefetchQuery`, Hydration 패턴, RSC와 병행 사용 전략
- **포인트**: "서버 컴포넌트로 pre-fetch → 클라이언트에서 stale-while-revalidate" 흐름

### 18회차 — 폼 유효성 검증 (Zod + React Hook Form)

Server Actions과 클라이언트 폼 라이브러리를 함께 사용하는 실무 표준 패턴.

- **키워드**: `zod`, `react-hook-form`, `zodResolver`, 서버 액션과의 연계, 서버/클라이언트 동일 스키마 공유

---

## 고급 심화

### 19회차 — Partial Prerendering (PPR)

Next.js 15의 핵심 신기능. 정적 쉘과 동적 스트리밍을 한 페이지에서 혼합하는 렌더링 전략.

- **키워드**: `experimental.ppr`, 정적 외곽 + 동적 `<Suspense>` 내부, PPR vs ISR 비교
- **포인트**: 기존 SSG/SSR 이분법을 뛰어넘는 새로운 렌더링 모델 이해

### 20회차 — 국제화 (i18n, next-intl)

다국어 지원. App Router에서 `next-intl`이 사실상 표준.

- **키워드**: `next-intl`, `[locale]` 세그먼트, 서버 컴포넌트에서 번역, Middleware 언어 감지 및 리다이렉트

### 21회차 — 애니메이션 & 페이지 전환

Next.js App Router에서 부드러운 화면 전환과 인터랙션 구현.

- **키워드**: Framer Motion, `layout` 애니메이션, `AnimatePresence`, 뷰 전환 API (`startViewTransition`)

### 22회차 — 테스트 전략

- **단위/통합**: Jest + React Testing Library (서버/클라이언트 컴포넌트 각각 테스트)
- **E2E**: Playwright (실제 브라우저 플로우 검증, Spring API는 MSW로 모킹)
- **키워드**: `msw` (API 모킹), `@testing-library/react`, Playwright `test()`, CI 파이프라인 연동

### 23회차 — 번들 최적화 & 배포

- **키워드**: `@next/bundle-analyzer`, `dynamic()` 심화, Tree-shaking, Vercel 배포 vs Docker 자체 서버, GitHub Actions CI/CD
- **모니터링**: Vercel Analytics, Sentry, Core Web Vitals 실측
