# 5회차 — 특수 파일 타입: ErrorBoundary props, 교차 타입(`&`)

## 학습 주제

Next.js 특수 파일(`error.tsx`, `loading.tsx`, `not-found.tsx`)에서 요구하는 정확한 타입을 이해하고, **교차 타입(`&`)** 표현을 익힙니다.

---

## 학습 목표

이 예제를 통해 다음 TypeScript 패턴을 익힙니다:

1. **교차 타입(`&`)** — `Error & { digest?: string }` 처럼 두 타입을 합치는 방법
2. **error.tsx의 Props 타입** — Next.js가 강제하는 특정 props 구조
3. **Props 없는 특수 파일** — `loading.tsx`, `not-found.tsx`는 타입 정의 불필요

---

## JS → TS 변환 가이드 ⭐️

### 1. 교차 타입 (`A & B`)

```js
// JavaScript — 타입 정보 없음
function Error({ error, reset }) {
  console.log(error.message); // Error의 속성
  console.log(error.digest); // Next.js가 추가한 속성 — JS에서는 타입 불명확
}
```

```ts
// TypeScript — 교차 타입으로 두 타입의 속성을 모두 명시
interface ErrorProps {
  error: Error & { digest?: string };
  //     ↑ JS 기본 Error 타입 + Next.js 추가 속성을 & 로 합침
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  console.log(error.message); // ✅ Error 타입의 속성
  console.log(error.digest); // ✅ { digest?: string } 의 속성
}
```

**핵심**: `A & B`는 A의 모든 속성과 B의 모든 속성을 **동시에** 갖는 타입입니다.

---

참고
{ digest?: string }: Next.js가 보안을 위해 서버 측 에러의 상세 내용을 숨기고 대신 제공하는 **에러 고유 해시값(ID)**입니다.

### 2. loading.tsx — Props 없음

```js
// JavaScript
export default function Loading() {
  return <div>로딩 중...</div>;
}
```

```ts
// TypeScript — 동일합니다. Props가 없으므로 타입 정의 불필요.
export default function Loading() {
  return <div>로딩 중...</div>;
}
```

**포인트**: loading.tsx와 not-found.tsx는 Next.js가 자동으로 props 없이 호출합니다. 타입 어노테이션 불필요.

---

### 3. error.tsx — Props 있음 (교차 타입 사용)

```js
// JavaScript
export default function Error({ error, reset }) {
  return <button onClick={reset}>{error.message}</button>;
}
```

```ts
// TypeScript
interface ErrorProps {
  error: Error & { digest?: string };  // 교차 타입
  reset: () => void;                   // 함수 타입
}

export default function Error({ error, reset }: ErrorProps) {
  return <button onClick={reset}>{error.message}</button>;
}
```

---

### 4. searchParams 타입 (Next.js 15+)

```js
// JavaScript
export default async function FeedPage({ searchParams }) {
  const { error } = searchParams;
}
```

```ts
// TypeScript — searchParams도 Next.js 15+에서 Promise 타입
interface FeedPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function FeedPage({ searchParams }: FeedPageProps) {
  const { error } = await searchParams; // ← await 필수
}
```

---

## 주요 타입 설명

### 교차 타입 (`&`)

```ts
type A = { name: string };
type B = { age: number };
type AB = A & B; // { name: string; age: number }

// Error & { digest?: string }
// = Error의 모든 속성 + digest 속성
// = { message: string; name: string; stack?: string; digest?: string }
```

### `digest?: string`

Next.js가 서버 사이드 에러에 자동으로 추가하는 에러 식별자입니다.

- `?` — 선택적 속성, 항상 있는 것은 아님
- 프로덕션 환경에서 에러 추적에 사용

### `reset: () => void`

```ts
reset: () => void
// () → 인자 없음
// void → 반환값 없음 (undefined)
```

---

## 특수 파일별 타입 비교

| 파일            | Props 타입                  | 설명                         |
| --------------- | --------------------------- | ---------------------------- |
| `loading.tsx`   | 없음                        | 자동 호출, props 불필요      |
| `not-found.tsx` | 없음                        | 자동 호출, props 불필요      |
| `error.tsx`     | `ErrorProps` 필요           | `error`와 `reset` props 받음 |
| `page.tsx`      | 있을 수 있음                | `params`, `searchParams`     |
| `layout.tsx`    | `children: React.ReactNode` | children 필수                |

---

## 자주 하는 실수

### 1. error.tsx에서 교차 타입 없이 `Error`만 사용

```ts
// ❌ 잘못된 예 — digest 속성에 접근 불가
interface ErrorProps {
  error: Error; // digest가 없음
}
// error.digest  → TypeScript 에러: Property 'digest' does not exist on type 'Error'

// ✅ 올바른 예 — 교차 타입으로 digest 포함
interface ErrorProps {
  error: Error & { digest?: string };
}
```

### 2. error.tsx에서 'use client' 빠뜨림

```ts
// ❌ error.tsx는 반드시 Client Component여야 합니다
export default function Error({ error, reset }) { ... }

// ✅ 파일 상단에 'use client' 추가
'use client';
export default function Error({ error, reset }: ErrorProps) { ... }
```

### 3. searchParams await 누락

```ts
// ❌ Next.js 15+에서 에러
const { error } = searchParams;

// ✅ await 필수
const { error } = await searchParams;
```

### 4. 선택적 속성(`?`) 없이 접근

```ts
// ❌ digest가 undefined일 수 있는데 바로 사용
<p>{error.digest.toUpperCase()}</p>  // 런타임 에러 가능

// ✅ 조건부 렌더링
{error.digest && <p>{error.digest}</p>}
// 또는 옵셔널 체이닝
<p>{error.digest?.toUpperCase()}</p>
```

---

## 실습 순서

1. **`practice/lib/types.ts`** — `Post` 인터페이스 정의
2. **`practice/app/components/FeedList.tsx`** — `FeedListProps` 타입 + `getPosts` 반환 타입 추가
3. **`practice/app/feed/page.tsx`** — `FeedPageProps` 타입 추가
4. **`practice/app/feed/error.tsx`** — `ErrorProps` 교차 타입 정의 (이번 회차의 핵심!)
5. `loading.tsx`, `not-found.tsx` — 타입 불필요, 그대로 실행

---

## 사전 준비

```bash
# completed 실행
cd completed && npm install && npm run dev

# practice 실행
cd practice && npm install && npm run dev
```

- 일반 피드: http://localhost:3000/feed
- 에러 피드: http://localhost:3000/feed?error=true

---

## 심화 도전 (선택)

1. `error.tsx`에서 에러 종류에 따라 다른 UI를 보여주는 타입 가드 작성

   ```ts
   function isNetworkError(error: Error): error is Error & { code: string } {
     return "code" in error;
   }
   ```

2. `FeedList`를 여러 번 사용할 때 각각 다른 에러가 발생하도록 Suspense + error boundary 중첩 구조 만들기

3. `Post` 타입을 활용해 `PostCard` 컴포넌트에 `Pick<Post, 'id' | 'title'>` 같은 유틸리티 타입 적용해보기 (12회차 미리보기)
