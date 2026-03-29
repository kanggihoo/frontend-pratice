---
trigger: manual
---

# Next.js TypeScript 학습 커리큘럼

> Next.js (App Router) + Tailwind CSS v4 + **TypeScript** 기반
>
> ⚠️ **전제 조건**: Next.js App Router의 핵심 개념(RSC/RCC, 서버 액션, 라우트 핸들러 등)은 이미 JavaScript로 학습 완료된 상태입니다.
> 본 커리큘럼은 **"어떻게 TypeScript로 작성하는가"** 에 집중합니다. Next.js 자체 이론은 최소화하고, 각 회차에서 다루는 코드를 TypeScript로 어떻게 표현하는지를 중점적으로 학습합니다.

---

## TypeScript 전환 핵심 원칙

| JavaScript 패턴                          | TypeScript 전환 방법                                                    | 설명                                |
| ---------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------- |
| `function Foo({ bar })`                  | `function Foo({ bar }: FooProps)`                                       | Props는 항상 `interface`로 분리     |
| `const [x, setX] = useState(null)`       | `const [x, setX] = useState<User \| null>(null)`                        | 제네릭으로 상태 타입 명시           |
| `async function Page({ params })`        | `async function Page({ params }: { params: Promise<{ id: string }> })`  | Next.js 15+ params는 `Promise` 타입 |
| `export async function GET(req)`         | `export async function GET(req: NextRequest): Promise<NextResponse<T>>` | Route Handler 타입                  |
| `export async function action(formData)` | `export async function action(formData: FormData): Promise<void>`       | Server Action 타입                  |
| `const data = await res.json()`          | `const data = await res.json() as User[]` 또는 제네릭 fetch 함수        | API 응답 타입 단언 또는 제네릭      |

---

## 커리큘럼 개요

| 구간                | 회차 | **TypeScript 핵심 학습 내용**                                                    | 적용 예시 주제     |
| ------------------- | ---- | -------------------------------------------------------------------------------- | ------------------ |
| **기초**            | 1    | `interface` 기초, `tsconfig` 이해, `React.ReactNode`                             | 회사 소개 페이지   |
|                     | 2    | Props 타입 분리, `React.FC<T>` vs 함수 컴포넌트, `ReactNode` vs `ReactElement`   | 상품 목록 카드     |
| **데이터 & 라우팅** | 3    | API 응답 `interface`, 제네릭 `fetchData<T>`, `Promise<T>`                        | 유저 대시보드      |
|                     | 4    | 동적 params 타입 (`Promise<{ id: string }>`), `generateStaticParams` 반환 타입   | 블로그 상세 페이지 |
|                     | 5    | `error.tsx` ErrorBoundary props 타입, 교차 타입(`Error & { digest?: string }`)   | 로딩/에러 피드     |
| **API & 뮤테이션**  | 6    | `NextRequest`, `NextResponse<T>` 제네릭, `import type`                           | 프록시 API 서버    |
|                     | 7    | Server Action 함수 시그니처, `FormData.get()` 반환 타입 처리(`string \| null`)   | 방명록 폼          |
|                     | 8    | `revalidatePath` / `revalidateTag` 반환 타입, `Promise<void>`                    | 실시간 댓글 갱신   |
| **최적화 & 실무**   | 9    | `Metadata` / `generateMetadata` 반환 타입, `next/image` props                    | 반응형 갤러리      |
|                     | 10   | Middleware 함수 시그니처, 쿠키 반환 타입, 옵셔널 체이닝                          | 어드민 라우트 가드 |
|                     | 11   | `useActionState<State, Payload>` 제네릭, `useFormStatus` 반환 타입, 폼 상태 타입 | 회원가입 폼        |
| **종합**            | 12   | 유틸리티 타입 (`Pick`, `Omit`, `Partial`), 도메인 타입 체계 구축                 | 미니 이커머스      |

---

## 회차별 상세

### 회차 1 — TypeScript 기초: `interface`, `tsconfig`, `ReactNode`

- **TS 학습 목표**: TypeScript 프로젝트 구조를 이해하고, 컴포넌트 Props를 `interface`로 정의하는 기초 패턴을 익힌다.

- **TypeScript 핵심 포인트**:
  - `tsconfig.json`의 `"strict": true` — 엄격한 타입 검사 활성화 (기본값 유지)
  - `"paths": { "@/*": ["./*"] }` — 절대 경로 import 설정
  - `children: React.ReactNode` — layout의 children 타입
  - 선택적 속성 `?`: `subtitle?: string` — 없어도 되는 Props
- **적용 예시**: 회사 소개 사이트 (정적 데이터)

---

### 회차 2 — Props 타입 심화: `React.FC<T>`, `ReactNode` vs `ReactElement`

- **TS 학습 목표**: 컴포넌트 타입 표현 방식의 차이를 이해하고, 서버/클라이언트 컴포넌트의 Props를 올바르게 분리한다.
- **JS → TS 전환 포인트**:

✅ TypeScript — 방법 1: 함수 컴포넌트 (권장)
✅ TypeScript — 방법 2: React.FC (제한적 사용)

- **TypeScript 핵심 포인트**:
  - `React.FC<Props>` vs 일반 함수 — `React.FC`는 `children`이 자동 포함되지 않음 (React 18+), 일반 함수 권장
  - `React.ReactNode` — JSX, string, number, null, undefined 모두 허용 (범용)
  - `React.ReactElement` — JSX 요소만 허용 (엄격)
  - 이벤트 핸들러 타입: `() => void`, `(e: React.MouseEvent<HTMLButtonElement>) => void`
- **적용 예시**: 상품 목록 (서버 컴포넌트 껍데기 + 클라이언트 수량 조절)

---

### 회차 3 — API 응답 타입: `interface`, 제네릭 `fetchData<T>`

- **TS 학습 목표**: 외부 API 응답 데이터의 타입을 정의하고, 재사용 가능한 제네릭 fetch 유틸 함수를 작성한다.
- **JS → TS 전환 포인트**:
  ✅ TypeScript — 방법 1: 직접 타입 단언
  ✅ TypeScript — 방법 2: 제네릭 fetch 유틸 (lib/utils.ts)

- **TypeScript 핵심 포인트**:
  - `interface` vs `type` — 객체 구조에는 `interface`, 유니언/교차 타입에는 `type`
  - 제네릭 `<T>` — 함수가 다양한 타입을 처리할 수 있도록 매개변수화
  - `async` 서버 컴포넌트는 `Promise<JSX.Element>`를 반환 (명시하지 않아도 추론됨)
- **적용 예시**: 유저 대시보드 (JSONPlaceholder API)

---

### 회차 4 — 동적 라우팅 params 타입 (Next.js 15+ `Promise`)

- **TS 학습 목표**: Next.js 15+에서 변경된 `params` 타입을 올바르게 작성하고, `generateStaticParams`의 반환 타입을 이해한다.

- **TypeScript 핵심 포인트**:
  - `params`는 `Promise<{ [key: string]: string }>` 형태 — Next.js 15+
  - URL params는 항상 `string` — 숫자가 필요하면 `Number(id)` 또는 `parseInt(id, 10)`으로 변환
  - `searchParams?: Promise<{ [key: string]: string | string[] | undefined }>` — 쿼리 파라미터 타입
- **적용 예시**: 블로그 포스트 상세 페이지

---

### 회차 5 — 특수 파일 타입: ErrorBoundary props, 교차 타입(`&`)

- **TS 학습 목표**: Next.js 특수 파일(`error.tsx`, `loading.tsx`)에서 요구하는 정확한 타입을 이해하고, 교차 타입(`&`) 표현을 익힌다.

- **TypeScript 핵심 포인트**:
  - 교차 타입 `A & B` — A의 속성과 B의 속성을 모두 가지는 타입
  - `digest?: string` — Next.js가 서버 에러에 추가하는 선택적 식별자
  - `loading.tsx`는 Props 없음 — `export default function Loading() { ... }`
  - `not-found.tsx`도 Props 없음 — `export default function NotFound() { ... }`
- **적용 예시**: 지연 렌더링 피드 (의도적 딜레이 + 에러 케이스)

---

### 회차 6 — Route Handler 타입: `NextRequest`, `NextResponse<T>`

- **TS 학습 목표**: Route Handler에서 `NextRequest`와 제네릭 `NextResponse<T>`를 올바르게 타이핑한다.

- **TypeScript 핵심 포인트**:
  - `import type { NextRequest }` — 타입만 import (런타임 번들 미포함, 권장)
  - `NextResponse<T>` — 응답 body 타입을 제네릭으로 명시
  - `searchParams.get()` 반환 타입은 `string | null` — `??` 또는 `if (!value)` 처리 필요
  - `request.nextUrl` — `URL` 타입으로 확장된 Next.js URL 객체
- **적용 예시**: 외부 API 프록시 서버

---

### 회차 7 — Server Action 타입: `FormData`, 함수 시그니처

- **TS 학습 목표**: Server Action 함수의 매개변수와 반환 타입을 명확히 정의하고, `FormData.get()`의 `string | null` 반환값을 안전하게 처리한다.

- **TypeScript 핵심 포인트**:
  - `FormData.get()` 반환 타입: `string | File | null`
  - 타입 좁히기(Type Narrowing): `typeof value === 'string'`으로 안전하게 처리
  - `as string` 타입 단언 — 확실한 경우에만, 과용 금지
  - `Promise<void>` vs `Promise<ActionResult>` — 반환값 필요 여부에 따라 선택
- **적용 예시**: 방명록 폼

---

### 회차 8 — 재검증 함수 타입, `Promise<void>` 명시

- **TS 학습 목표**: `revalidatePath`, `revalidateTag`의 시그니처를 이해하고, Server Action 반환 타입을 명확히 작성한다.
- **JS → TS 전환 포인트**:

- **TypeScript 핵심 포인트**:
  - `revalidatePath(path: string, type?: 'page' | 'layout'): void` — void이므로 await 불필요
  - `revalidateTag(tag: string): void`
  - Server Action에서 `redirect()`는 `never`를 반환 (함수 실행 중단) — `try/catch` 밖에서 호출
  - 공용 응답 타입 `ActionResult`를 `lib/types.ts`에 정의해 재사용
- **적용 예시**: 실시간 댓글 갱신

---

### 회차 9 — Next.js 내장 타입: `Metadata`, `generateMetadata`

- **TS 학습 목표**: `next` 패키지에서 제공하는 내장 타입들을 `import type`으로 활용한다.
- **JS → TS 전환 포인트**:

- **TypeScript 핵심 포인트**:
  - `import type { Metadata } from 'next'` — Next.js 제공 내장 타입
  - `generateMetadata` 반환 타입: `Metadata` 또는 `Promise<Metadata>`
  - `next/image`의 `width`, `height`는 `number` 타입 — 정적 import 시 자동 추론
  - `dynamic()` import: `import dynamic from 'next/dynamic'` — 타입 추론 자동
- **적용 예시**: 반응형 갤러리

---

### 회차 10 — Middleware 타입: `NextRequest`, 옵셔널 체이닝

- **TS 학습 목표**: Middleware 함수의 정확한 시그니처를 작성하고, 쿠키 접근 시 옵셔널 체이닝을 활용한다.

- **TypeScript 핵심 포인트**:
  - `request.cookies.get(name)` 반환 타입: `RequestCookie | undefined`
  - 옵셔널 체이닝 `?.` — `undefined`일 때 에러 대신 `undefined` 반환
  - `NextResponse.redirect()` / `NextResponse.next()` 모두 `NextResponse` 반환
  - Middleware 함수 반환 타입: `NextResponse | Response` (유니언)
- **적용 예시**: 어드민 라우트 가드

---

### 회차 11 — 제네릭 훅 타입: `useActionState<S, P>`, `useFormStatus`

- **TS 학습 목표**: 제네릭 타입 파라미터가 있는 훅의 타입을 올바르게 작성하고, 폼 상태 타입을 직접 정의한다.
- **JS → TS 전환 포인트**:

- **TypeScript 핵심 포인트**:
  - `useActionState<State, Payload>` — State: 상태 타입, Payload: 액션에 전달되는 데이터 타입
  - `type` vs `interface` — 유니언/교차 타입, 선택적 중첩 구조엔 `type`이 적합할 때가 많음
  - `useFormStatus()`는 타입 파라미터 없음 — 반환 타입 자동 추론
  - Server Action 시그니처 변경: `(prevState: FormState, formData: FormData) => Promise<FormState>`
- **적용 예시**: 완성형 회원가입/비밀번호 변경 폼

---

### 회차 12 — 유틸리티 타입: `Pick`, `Omit`, `Partial`, 도메인 타입 체계

- **TS 학습 목표**: 기존 타입에서 파생 타입을 만드는 유틸리티 타입을 활용하고, 앱 전체 타입을 `lib/types.ts`에 체계적으로 구성한다.

- **TypeScript 핵심 포인트**:
  - `Pick<T, K>` — T에서 K 속성만 선택
  - `Omit<T, K>` — T에서 K 속성 제외
  - `Partial<T>` — T의 모든 속성을 선택적(`?`)으로
  - `Required<T>` — T의 모든 속성을 필수로
  - `Readonly<T>` — T의 모든 속성을 읽기 전용으로
  - 타입 재사용 원칙: 같은 데이터 구조는 새로 정의하지 말고 기존 타입에서 파생
- **적용 예시**: 미니 이커머스 또는 풀스택 블로그

---

## 기반 기술 및 활용 환경

- **Next.js App Router**: 최신버전 (`npx create-next-app@latest`)
- **Tailwind CSS v4.xx**: `@import 'tailwindcss';` 기반
- **TypeScript**: 파일 확장자는 `.tsx`(JSX 포함), `.ts`(순수 로직)
- **tsconfig**: `"strict": true` 유지 (create-next-app 기본값)

---

## 진행 상태

- [x] 회차 1 — `interface` 기초, `tsconfig`, `React.ReactNode`
- [x] 회차 2 — Props 타입 심화, `React.FC<T>`, `ReactNode` vs `ReactElement`
- [x] 회차 3 — API 응답 `interface`, 제네릭 `fetchData<T>`
- [x] 회차 4 — 동적 params 타입 (`Promise<{ id: string }>`), `generateStaticParams`
- [x] 회차 5 — ErrorBoundary props 타입, 교차 타입(`&`)
- [x] 회차 6 — `NextRequest`, `NextResponse<T>`, `import type`
- [ ] 회차 7 — Server Action 타입, `FormData.get()` 타입 처리
- [ ] 회차 8 — `revalidatePath`/`revalidateTag` 반환 타입, `Promise<void>`
- [ ] 회차 9 — `Metadata`, `generateMetadata` 반환 타입
- [ ] 회차 10 — Middleware 타입, 옵셔널 체이닝(`?.`)
- [ ] 회차 11 — `useActionState<S, P>`, `useFormStatus` 제네릭 훅 타입
- [ ] 회차 12 — 유틸리티 타입 (`Pick`, `Omit`, `Partial`), 도메인 타입 체계
