# TypeScript 7회차 — Server Action 타입 & FormData 처리

## 회차 정보

- **주제**: Server Action 함수 시그니처, `FormData.get()` 반환 타입 처리
- **예제**: 방명록 폼 (추가 / 삭제)

---

## 학습 목표

이 예제를 통해 익히는 TypeScript 패턴:

1. **Server Action 함수 시그니처** — 매개변수와 반환 타입 명시
2. **`FormData.get()` 반환 타입** — `string | File | null` 처리
3. **타입 좁히기 (Type Narrowing)** — `typeof` 체크로 string 타입 확정
4. **`as` 타입 단언** — 확실한 경우에만 사용
5. **유니언 타입 (Discriminated Union)** — `ActionResult` 성공/실패 타입
6. **`useActionState<State, Payload>`** — 제네릭 훅 타입 파라미터

---

## JS → TS 변환 가이드

### 1. Server Action 함수 시그니처

```ts
// JavaScript
export async function addEntry(prevState, formData) {
  const name = formData.get("name");
  // ...
}

// TypeScript — useActionState와 함께 사용할 때
// 첫 번째 인자: 이전 상태, 두 번째 인자: FormData
export async function addEntry(
  _prevState: ActionResult | null,  // _ 접두사: 사용하지 않는 매개변수 관례
  formData: FormData
): Promise<ActionResult> {
  const name = formData.get("name"); // string | File | null
  // ...
}
```

**`useActionState` 액션 시그니처 규칙**
- `useActionState`에 전달되는 액션 함수는 반드시 `(prevState, payload)` 형태여야 합니다.
- 첫 번째 인자는 이전 상태, 두 번째 인자가 폼 데이터입니다.
- `prevState`를 사용하지 않을 때는 `_prevState`로 작성하는 것이 TypeScript 관례입니다.
- 반환값이 없을 때는 `Promise<void>`, 결과를 UI에 전달할 때는 `Promise<ActionResult>`를 사용합니다.

---

### 2. `FormData.get()` — 타입 좁히기

```ts
// FormData.get()의 반환 타입: string | File | null
const name = formData.get("name"); // TypeScript: string | File | null

// ❌ 잘못된 방법 — 타입 단언 남용
const name = formData.get("name") as string; // null이면 런타임 에러 위험

// ✅ 올바른 방법 — typeof 타입 좁히기
const name = formData.get("name");
if (typeof name !== "string" || name.trim() === "") {
  return { success: false, error: "이름을 입력해주세요." };
}
// 이 아래부터 name은 string 타입이 보장됩니다.
console.log(name.toUpperCase()); // 안전!
```

---

### 3. `as` 타입 단언 — 확실한 경우에만

```ts
// hidden input은 항상 string을 전달하므로 as string 허용
const id = formData.get("id") as string;

// ❌ 이런 경우엔 as 사용 금지 — null일 수 있음
const name = formData.get("name") as string; // 위험!
```

---

### 4. Discriminated Union (판별 유니언)

```ts
// ActionResult: success 값으로 타입을 구분하는 유니언
type ActionResult =
  | { success: true; message: string }
  | { success: false; error: string };

// 사용 시 TypeScript가 자동으로 타입을 좁혀줍니다
const result: ActionResult = await addEntry(formData);

if (result.success) {
  console.log(result.message); // ← success: true 케이스에서만 message 접근 가능
} else {
  console.log(result.error);   // ← success: false 케이스에서만 error 접근 가능
}
```

---

### 5. `useActionState` 제네릭 타입

```ts
// JavaScript
const [result, formAction, isPending] = useActionState(addEntry, null);

// TypeScript
const [result, formAction, isPending] = useActionState<
  ActionResult | null,  // State 타입 — 상태의 타입
  FormData              // Payload 타입 — 액션에 전달되는 데이터
>(addEntry, null);

// result는 ActionResult | null 타입으로 추론됩니다.
// null 초기값은 State 타입(ActionResult | null)과 일치해야 합니다.
```

---

## 주요 타입 설명

### `FormData` (Web API 내장)

| 메서드 | 반환 타입 | 설명 |
|--------|-----------|------|
| `formData.get(name)` | `string \| File \| null` | 단일 값 |
| `formData.getAll(name)` | `(string \| File)[]` | 다중 값 (체크박스 등) |
| `formData.has(name)` | `boolean` | 존재 여부 |

### `Promise<void>` vs `Promise<ActionResult>`

```ts
// 반환값이 필요 없을 때 — void
export async function deleteEntry(formData: FormData): Promise<void> {
  // ... 삭제 로직
}

// 결과를 UI에 전달할 때 — ActionResult
export async function addEntry(formData: FormData): Promise<ActionResult> {
  // ... 성공/실패 결과 반환
  return { success: true, message: "등록되었습니다!" };
}
```

---

## 자주 하는 실수

### 1. `as` 타입 단언 남용

```ts
// ❌ 이렇게 하면 null인 경우 런타임 에러 발생
const name = formData.get("name") as string;
name.trim(); // name이 null이면 TypeError!

// ✅ typeof 체크로 타입 좁히기
const name = formData.get("name");
if (typeof name !== "string") throw new Error("이름이 없습니다.");
name.trim(); // 안전
```

### 2. `ActionResult`에서 잘못된 속성 접근

```ts
// ActionResult = { success: true; message: string } | { success: false; error: string }

// ❌ TypeScript 에러 — success 확인 전에 접근
console.log(result.message); // 에러: Property 'message' does not exist on type 'ActionResult'

// ✅ success 체크 후 접근
if (result.success) {
  console.log(result.message); // OK
}
```

### 3. `useActionState` 초기값 타입 불일치

```ts
// ❌ 초기값 null이 State 타입과 일치하지 않으면 에러
const [result] = useActionState<ActionResult, FormData>(addEntry, null);
// 에러: Argument of type 'null' is not assignable to parameter of type 'ActionResult'

// ✅ State 타입을 null 허용으로 변경
const [result] = useActionState<ActionResult | null, FormData>(addEntry, null);
```

---

## 실습 순서

1. **`lib/types.ts`** — `GuestbookEntry` 인터페이스와 `ActionResult` 유니언 타입 정의
2. **`data/guestbook.ts`** — import 주석 해제 후 타입 어노테이션 추가
3. **`lib/actions.ts`** — Server Action 함수 시그니처 완성 (매개변수 + 반환 타입)
4. **`app/components/GuestbookList.tsx`** — Props 인터페이스 정의 및 적용
5. **`app/components/GuestbookForm.tsx`** — `useActionState` 제네릭 타입 파라미터 추가

---

## 사전 준비

```bash
# completed 실행
cd completed && npm install && npm run dev

# practice 실행
cd practice && npm install && npm run dev
```

---

## 심화 도전

1. **`addEntry`의 반환 타입을 `Promise<void>`로 변경** — `useActionState`를 쓰지 않고 `alert()`으로 결과 표시
2. **폼 유효성 검사 타입 강화** — 이름 최소 2자, 메시지 최소 10자 조건 추가
3. **`formData.getAll()`** — 체크박스 여러 개를 `string[]` 타입으로 받기
