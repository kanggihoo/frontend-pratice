# 회차 6 — Route Handler 타입: `NextRequest`, `NextResponse<T>`

## 학습 주제
Next.js Route Handler에서 `NextRequest`와 제네릭 `NextResponse<T>`를 올바르게 타이핑합니다.

---

## 학습 목표

이 예제를 통해 다음 TypeScript 패턴을 익힙니다:

- `import type { NextRequest }` — 타입 전용 import 작성법
- `NextResponse<T>` — 제네릭으로 응답 body 타입 명시
- `searchParams.get()` 의 `string | null` 반환값 처리
- `request.nextUrl` — Next.js 확장 URL 객체 타입

---

## JS → TS 변환 가이드 ⭐️

### 1. `import type` — 타입 전용 import

```ts
// ❌ JavaScript / 런타임에 포함되는 일반 import
import { NextRequest } from 'next/server';

// ✅ TypeScript — 타입만 import (런타임 번들 미포함, 권장)
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server'; // 실제 구현체는 일반 import
```

> `import type`은 컴파일 후 완전히 제거됩니다. 타입 정보만 필요한 경우 항상 `import type`을 사용하세요.

---

### 2. Route Handler 함수 시그니처

```ts
// ❌ JavaScript
export async function GET(request) {
  const limit = request.nextUrl.searchParams.get('limit');
  // ...
}

// ✅ TypeScript
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { User, ApiResponse } from '@/lib/types';

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<User[]>>> {
  const limit = request.nextUrl.searchParams.get('limit');
  // ...
}
```

---

### 3. `searchParams.get()` — `string | null` 처리

```ts
// ❌ null 처리 누락 — limit이 null이면 문자열 "null"이 URL에 포함됨
const limit = searchParams.get('limit');
fetch(`...?_limit=${limit}`); // 위험!

// ✅ ?? 연산자로 기본값 설정
const limit = searchParams.get('limit') ?? '10';

// ✅ 또는 조건문으로 처리
const limitParam = searchParams.get('limit');
const limit = limitParam !== null ? limitParam : '10';
```

---

### 4. `NextResponse<T>` 제네릭

```ts
// ❌ 반환 타입 불명확
return NextResponse.json({ success: true, data: users });

// ✅ 제네릭으로 body 타입 명시
return NextResponse.json<ApiResponse<User[]>>({ success: true, data: users });

// ✅ 또는 함수 반환 타입에서 명시 (권장)
async function GET(...): Promise<NextResponse<ApiResponse<User[]>>> {
  return NextResponse.json({ success: true, data: users }); // 타입 추론됨
}
```

---

### 5. 동적 Route Handler — `params` 타입 (Next.js 15+)

```ts
// ❌ JavaScript
export async function GET(request, { params }) {
  const { id } = params; // 즉시 구조분해
}

// ✅ TypeScript (Next.js 15+)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ← Promise!
): Promise<NextResponse<ApiResponse<User>>> {
  const { id } = await params; // ← await 필수
}
```

---

### 6. `res.json()` 타입 단언

```ts
// ❌ JavaScript — 타입을 알 수 없음
const users = await res.json();

// ✅ TypeScript — 타입 단언으로 명시
const users = await res.json() as User[];

// ✅ 또는 변수에 직접 타입 명시
const users: User[] = await res.json();
```

---

## 주요 타입 설명

### `User` interface
JSONPlaceholder `/users` 엔드포인트 응답 구조를 반영합니다.
중첩 객체(`address`, `company`)도 inline interface로 정의됩니다.

### `ApiResponse<T>` generic interface
프록시 API의 통일된 응답 형태입니다. `T`에 실제 데이터 타입을 지정합니다:
- `ApiResponse<User[]>` — 유저 목록 응답
- `ApiResponse<User>` — 단일 유저 응답

---

## 자주 하는 실수

### ❌ `import type` 없이 NextRequest import
```ts
import { NextRequest } from 'next/server'; // 런타임 번들에 포함됨
```
→ 타입만 필요하면 `import type { NextRequest }` 사용

### ❌ `searchParams.get()` null 처리 누락
```ts
const limit = searchParams.get('limit'); // string | null
fetch(`...?_limit=${limit}`); // limit이 null이면 "?_limit=null" 이 됨
```
→ `?? '10'` 또는 null 체크 필수

### ❌ 동적 Route Handler에서 `await params` 누락
```ts
const { id } = params; // ❌ Promise 객체를 구조분해
const { id } = await params; // ✅
```

### ❌ `any` 타입으로 회피
```ts
const users: any = await res.json(); // 타입 안전성 없음
const users = await res.json() as User[]; // ✅ 타입 단언
```

---

## 실습 순서

1. **`practice/lib/types.ts`** — `User`, `ApiResponse<T>` interface 정의
2. **`practice/app/api/users/route.ts`** — GET handler 타입 추가
3. **`practice/app/api/users/[id]/route.ts`** — 동적 route handler 타입 추가
4. **`practice/app/components/UserCard.tsx`** — Props 타입 추가
5. **`practice/app/page.tsx`** — 함수 반환 타입 + API 응답 타입 추가

---

## 사전 준비

```bash
# completed 실행
cd completed && npm install && npm run dev

# practice 실행 (별도 터미널)
cd practice && npm install && npm run dev -- --port 3001
```

> `page.tsx`가 `localhost:3000/api/users`를 호출하므로, completed는 3000 포트, practice는 3001 포트에서 실행하세요.

---

## 심화 도전 (선택)

1. `POST /api/users` handler 추가 — `request.json()` 반환 타입 처리
2. `searchParams`에 `page`, `sort` 파라미터 추가 — 각 타입 처리
3. `ApiResponse<T>`에 `meta: { total: number; page: number }` 필드 추가
