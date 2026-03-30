# 8회차 — 재검증 함수 타입 & `Promise<void>` 명시

> **TypeScript 학습 주제**: `revalidatePath` / `revalidateTag` 반환 타입 이해, Server Action 반환 타입 선택 (`Promise<void>` vs `Promise<ActionResult>`), 공용 `ActionResult` 인터페이스 설계

---

## 학습 목표

이번 회차에서 익히는 TypeScript 패턴:

1. `revalidatePath` / `revalidateTag` 는 **`void`를 반환** → `await` 없이 호출
2. Server Action 반환 타입을 **목적에 따라 선택**
   - 결과를 클라이언트에 전달할 필요 없을 때 → `Promise<void>`
   - 성공/실패를 클라이언트에 알려야 할 때 → `Promise<ActionResult>`
3. **`ActionResult` 인터페이스**를 `lib/types.ts`에 정의해 재사용
4. `FormData.get()` 반환 타입 `string | File | null` → **typeof 타입 좁히기**
5. `useState<T>` 제네릭으로 **상태 타입 명시**

---

## JS → TS 변환 가이드 ⭐️

### 1. `revalidatePath` / `revalidateTag` — `void` 반환

```ts
// ❌ JavaScript — 반환 타입 모름
revalidatePath('/posts/1');
await revalidatePath('/posts/1'); // 불필요한 await

// ✅ TypeScript — void 반환이므로 await 불필요
// revalidatePath(path: string, type?: 'page' | 'layout'): void
// revalidateTag(tag: string): void

revalidatePath('/posts/1');           // OK
revalidatePath('/', 'layout');        // type 옵션 사용
revalidateTag('posts');               // 태그 기반 무효화
```

### 2. Server Action 반환 타입 선택

```ts
// ❌ JavaScript — 반환 타입이 무엇인지 알 수 없음
export async function refreshPosts() {
  revalidateTag('posts');
}

// ✅ TypeScript — 반환값이 없으면 Promise<void>
export async function refreshPosts(): Promise<void> {
  revalidateTag('posts');
}

// ✅ TypeScript — 결과를 클라이언트에 전달해야 하면 Promise<ActionResult>
export async function addComment(formData: FormData): Promise<ActionResult> {
  // ...
  return { success: true, message: '댓글이 등록되었습니다.' };
}
```

### 3. `ActionResult` — 공용 응답 인터페이스

```ts
// ❌ JavaScript — 반환 객체 구조가 제각각
return { ok: true };
return { status: 'error', msg: '실패' };

// ✅ TypeScript — lib/types.ts에 공용 인터페이스 정의
interface ActionResult {
  success: boolean;
  message?: string;   // ? = 선택적 (없어도 OK)
}

// 모든 Server Action이 동일한 구조로 반환 → 클라이언트에서 일관 처리 가능
```

### 4. `FormData.get()` — 타입 좁히기 (Type Narrowing)

```ts
// ❌ JavaScript — 타입이 뭔지 모른 채 사용
const name = formData.get('name');
name.trim(); // 런타임에 null이면 에러!

// ✅ TypeScript — typeof로 타입을 좁혀야 string 보장
// FormData.get() 반환 타입: string | File | null
const name = formData.get('name');

if (typeof name !== 'string') {
  return { success: false, message: '이름을 입력하세요.' };
}
// 이 아래부터 name은 string 타입이 보장됨
name.trim(); // 안전!
```

### 5. `useState<T>` 제네릭

```ts
// ❌ JavaScript
const [result, setResult] = useState(null); // 타입 추론 불가

// ✅ TypeScript — 제네릭으로 타입 명시
const [result, setResult] = useState<ActionResult | null>(null);
// result의 타입: ActionResult | null
// setResult에 잘못된 타입 전달 시 컴파일 에러 발생
```

### 6. 이벤트 핸들러 타입

```ts
// ❌ JavaScript
const handleSubmit = (e) => { e.preventDefault(); }

// ✅ TypeScript — 이벤트 타입을 명시
const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  // e.currentTarget은 HTMLFormElement 타입으로 추론됨
};
```

---

## 주요 타입 설명

### `ActionResult` (lib/types.ts에 직접 정의)

```ts
interface ActionResult {
  success: boolean;   // 성공 여부 (필수)
  message?: string;   // 사용자 메시지 (선택)
}
```

- Server Action의 반환값을 **일관된 구조**로 통일
- `?` (옵셔널) — 값이 없어도 OK, 있으면 반드시 `string`
- 클라이언트에서 `result.success`로 분기 처리 가능

### `Promise<void>` vs `Promise<ActionResult>`

| 상황 | 반환 타입 |
|------|-----------|
| 캐시 갱신만 하고 끝 | `Promise<void>` |
| 성공/실패를 UI에 표시 | `Promise<ActionResult>` |
| 폼 제출 결과 피드백 | `Promise<ActionResult>` |

### `revalidatePath` / `revalidateTag` 시그니처

```ts
// Next.js 내장 함수 (import { revalidatePath, revalidateTag } from 'next/cache')
revalidatePath(path: string, type?: 'page' | 'layout'): void
revalidateTag(tag: string): void
```

- **`void` 반환** → `await`을 붙이면 `await void`가 되어 의미 없음 (붙이지 않아도 됨)
- `type` 두 번째 인자: `'page'`(기본) 또는 `'layout'` — 무효화 범위 결정

---

## 자주 하는 실수

### ❌ `await revalidatePath()` — 불필요한 await

```ts
// ❌ void 반환 함수에 await 붙이기 — 동작은 하지만 의미 없음
await revalidatePath('/posts/1');

// ✅ void 반환이므로 그냥 호출
revalidatePath('/posts/1');
```

### ❌ `ActionResult` 없이 `any` 사용

```ts
// ❌ any 사용 — 타입 안전성 없음
const [result, setResult] = useState<any>(null);

// ✅ 정확한 타입 사용
const [result, setResult] = useState<ActionResult | null>(null);
```

### ❌ `FormData.get()` 결과를 타입 좁히기 없이 사용

```ts
// ❌ string | File | null 상태에서 바로 string 메서드 사용
const name = formData.get('name');
name.trim(); // 타입 에러: name이 null일 수 있음

// ✅ typeof 타입 좁히기 후 사용
const name = formData.get('name');
if (typeof name !== 'string') throw new Error('입력값 오류');
name.trim(); // OK
```

### ❌ `as string` 남용

```ts
// ❌ 타입 단언으로 강제 변환 — null 체크 우회
const name = formData.get('name') as string; // null일 때 런타임 에러 위험

// ✅ typeof 타입 좁히기로 안전하게
const name = formData.get('name');
if (typeof name !== 'string') return { success: false };
```

---

## 실습 순서

1. **`practice/lib/types.ts`** — `Post`, `Comment`, `ActionResult` 인터페이스 정의
2. **`practice/lib/actions.ts`** — `addComment`, `refreshPosts`, `refreshPost` 함수에 타입 추가
3. **`practice/app/components/PostCard.tsx`** — `PostCardProps` 정의 및 적용
4. **`practice/app/components/CommentList.tsx`** — `CommentListProps` 정의 및 적용
5. **`practice/app/components/CommentForm.tsx`** — `useState` 제네릭, 이벤트 타입 추가
6. **`practice/app/components/RefreshButton.tsx`** — `RefreshButtonProps` 정의 및 적용
7. **`practice/app/posts/[id]/page.tsx`** — `PageProps` 정의, `await params` 패턴 적용

---

## 사전 준비

```bash
# completed 실행
cd completed && npm install && npm run dev

# practice 실행 (타입 에러가 있어도 런타임은 동작)
cd practice && npm install && npm run dev
```

> `practice`는 타입 어노테이션이 없어 TypeScript 컴파일 에러가 발생합니다.
> 타입을 채워가면서 에러를 하나씩 해결하는 것이 목표입니다.

---

## 심화 도전

- `refreshPost` Server Action에 `postId: number` 타입을 추가하고, `postId`가 `NaN`일 때를 처리하는 타입 가드를 작성해보세요.
- `ActionResult`에 `data?: unknown` 필드를 추가해 응답 데이터도 함께 반환하는 패턴을 구현해보세요.
- `CommentForm`의 `handleSubmit`을 Server Action (`<form action={...}>`)으로 변경하고, `useActionState<ActionResult, FormData>`를 사용해보세요.
