# 회차 7 — Server Actions (서버 액션) 기초

## 회차 정보

- **회차**: 7회차
- **핵심 개념**: Server Actions, `"use server"`, 프로그레시브 인핸스먼트, `<form action={...}>`
- **난이도**: 심화 (API & 뮤테이션)

---

## 주제 및 기획 의도

### 무엇을 만드나요?

**방명록(Guestbook)** 애플리케이션을 만듭니다.

- 누구나 이름과 메시지를 남길 수 있는 방명록
- 글 목록 조회, 글 작성, 글 삭제 기능
- 로컬 JSON 파일을 데이터 저장소로 활용

### 왜 이 주제인가요?

방명록은 **CRUD(Create, Read, Delete)의 핵심**을 가장 단순한 형태로 체험할 수 있는 주제입니다.
Server Actions를 사용하면 **별도의 API 라우트(`/api/...`) 없이** 폼 제출만으로 서버 데이터를 직접 변경할 수 있습니다.

---

## 학습 목표

이 예제를 통해 다음을 배웁니다:

1. **`"use server"` 지시어**를 사용하여 서버에서만 실행되는 함수를 선언하는 방법
2. **`<form action={serverAction}>`** 패턴으로 폼 제출 시 서버 함수를 직접 호출하는 방법
3. **`formData.get()`**으로 폼 데이터를 추출하는 방법
4. **서버사이드 유효성 검증**의 중요성 (클라이언트 검증만으로는 불충분)
5. **`revalidatePath()`**로 페이지 캐시를 무효화하여 최신 데이터를 반영하는 방법
6. **프로그레시브 인핸스먼트**: 브라우저 JS가 꺼져 있어도 폼이 동작하는 원리

---

## React와의 차이점

| 기존 React 방식 | Next.js Server Actions 방식 |
|---|---|
| `<form onSubmit={handleSubmit}>` | `<form action={serverAction}>` |
| `e.preventDefault()` 필수 | 불필요 (기본 동작이 서버 전송) |
| `fetch("/api/...", { method: "POST" })` | Server Action 함수 직접 호출 |
| API 라우트 파일 별도 생성 필요 | API 라우트 불필요 |
| 클라이언트에서 JSON 직렬화/역직렬화 | `formData` 객체로 자동 처리 |
| JS 비활성화 시 폼 동작 불가 | JS 없이도 HTML 폼 제출로 동작 |

---

## 사전 준비

```bash
# 1. 완성본 실행
cd completed
npm install
npm run dev
# → http://localhost:3000 에서 완성본 확인

# 2. 실습본 실행 (다른 터미널)
cd practice
npm install
npm run dev -- --port 3001
# → http://localhost:3001 에서 뼈대 확인
```

---

## 핵심 학습 개념

### 1. Server Actions란?

Server Actions는 **서버에서 실행되는 비동기 함수**로, 클라이언트의 폼 제출이나 이벤트에 의해 호출됩니다.

#### 왜 필요한가요?

기존 React에서 폼 데이터를 서버에 전송하려면:
1. API 라우트(`/api/submit`) 파일을 만들고
2. 클라이언트에서 `fetch()`로 POST 요청을 보내고
3. 응답을 처리하는 코드를 작성해야 했습니다.

Server Actions를 사용하면 이 모든 과정을 **함수 하나**로 대체할 수 있습니다.

#### 어떻게 사용하나요?

```js
// lib/actions.js
"use server";  // ← 이 파일의 모든 export 함수가 Server Action이 됨

export async function addEntry(formData) {
  const name = formData.get("name");
  // → 서버에서 직접 DB/파일 접근 가능!
}
```

```jsx
// app/components/Form.js (클라이언트 컴포넌트)
"use client";
import { addEntry } from "@/lib/actions";

export default function Form() {
  return (
    <form action={addEntry}>
      <input name="name" />
      <button type="submit">제출</button>
    </form>
  );
}
```

### 2. `"use server"` 지시어

- **파일 최상단**에 작성하면: 해당 파일의 모든 `export async function`이 Server Action
- **함수 내부**에 작성하면: 해당 함수만 Server Action (인라인 방식)

```js
// 방법 1: 파일 레벨 (권장 — 재사용성 높음)
"use server";
export async function myAction(formData) { ... }

// 방법 2: 인라인 (서버 컴포넌트 내부에서만 가능)
export default async function Page() {
  async function myAction(formData) {
    "use server";
    // ...
  }
  return <form action={myAction}>...</form>;
}
```

### 3. formData 객체

HTML `<form>` 제출 시 자동으로 생성되는 `FormData` 객체가 Server Action의 첫 번째 인자로 전달됩니다.

```js
export async function addEntry(formData) {
  const name = formData.get("name");       // <input name="name" />의 값
  const message = formData.get("message"); // <textarea name="message" />의 값
}
```

> **중요**: `<input>`과 `<textarea>`의 `name` 속성이 `formData.get()`의 키가 됩니다!

### 4. revalidatePath()

Server Action에서 데이터를 변경한 후, **페이지 캐시를 무효화**하여 최신 데이터를 보여줍니다.

```js
import { revalidatePath } from "next/cache";

export async function addEntry(formData) {
  // ... 데이터 저장 ...
  revalidatePath("/");  // "/" 페이지의 캐시를 무효화 → 새로고침 없이 최신 데이터 표시
}
```

### 5. 프로그레시브 인핸스먼트

`<form action={serverAction}>` 패턴은 HTML의 기본 폼 제출 메커니즘을 활용합니다.
- **JS가 활성화된 경우**: React가 폼 제출을 가로채 비동기로 처리 (페이지 새로고침 없음)
- **JS가 비활성화된 경우**: 브라우저 기본 폼 제출로 동작 (페이지 새로고침 발생하지만 동작함!)

---

## 프로젝트 구조 안내

```
ch-7-server-actions-2026-03-16/
├── completed/                          # 완성본
│   ├── app/
│   │   ├── layout.js                   # 루트 레이아웃
│   │   ├── page.js                     # 메인 페이지 (서버 컴포넌트 — 데이터 조회)
│   │   ├── globals.css                 # Tailwind 설정
│   │   └── components/
│   │       ├── GuestbookForm.js        # 방명록 작성 폼 (클라이언트 컴포넌트)
│   │       ├── GuestbookList.js        # 방명록 목록 (서버 컴포넌트)
│   │       └── DeleteButton.js         # 삭제 버튼 (클라이언트 컴포넌트)
│   ├── lib/
│   │   └── actions.js                  # ★ Server Actions 정의 ("use server")
│   └── data/
│       └── guestbook.json              # 방명록 데이터 (JSON 파일 DB)
│
├── practice/                           # 실습본 (동일 구조, 코드 비워짐)
│   └── (위와 동일한 파일 구조)
│
└── README.md                           # 이 파일
```

### 컴포넌트 역할 분리

| 파일 | 타입 | 역할 |
|---|---|---|
| `page.js` | 서버 컴포넌트 | 데이터 조회 (`getGuestbookEntries`) 및 레이아웃 |
| `GuestbookForm.js` | 클라이언트 (`"use client"`) | 폼 입력, `useRef`로 폼 초기화, Server Action 호출 |
| `GuestbookList.js` | 서버 컴포넌트 | 방명록 목록 렌더링 |
| `DeleteButton.js` | 클라이언트 (`"use client"`) | `confirm()` 확인 후 삭제 Server Action 호출 |
| `lib/actions.js` | 서버 (`"use server"`) | 데이터 읽기/쓰기/삭제 로직 |

---

## 추천 실습 순서

### Step 1: `lib/actions.js` — Server Actions 핵심 구현

가장 먼저 서버 로직을 완성하세요. 나머지 컴포넌트가 이 파일에 의존합니다.

1. 파일 최상단에 `"use server";` 지시어 추가
2. `getGuestbookEntries()` — JSON 파일 읽기 + 정렬
3. `addGuestbookEntry(formData)` — 폼 데이터 추출 → 유효성 검증 → 저장 → `revalidatePath`
4. `deleteGuestbookEntry(formData)` — id 추출 → 필터링 → 저장 → `revalidatePath`

### Step 2: `app/page.js` — 서버 컴포넌트 데이터 조회

1. `getGuestbookEntries` import 및 `await` 호출
2. 컴포넌트 import (`GuestbookForm`, `GuestbookList`)
3. Tailwind CSS 스타일 적용

### Step 3: `app/components/GuestbookForm.js` — 폼 구현

1. `"use client"` 지시어 추가
2. `useRef`, `addGuestbookEntry` import
3. `handleSubmit` 함수 작성 (Server Action 래핑)
4. `<form action={handleSubmit}>` 패턴 적용
5. Tailwind CSS 스타일 적용

### Step 4: `app/components/DeleteButton.js` — 삭제 기능

1. `"use client"` 지시어 추가
2. `deleteGuestbookEntry` import
3. `handleDelete` 함수 작성 (`confirm` + Server Action)
4. hidden input으로 id 전달 패턴 적용

### Step 5: `app/components/GuestbookList.js` — 목록 표시

1. `DeleteButton` import
2. 목록 렌더링 및 Tailwind CSS 스타일 적용

---

## 교육자의 팁

### 흔히 하는 실수

1. **`"use server"` 빠뜨리기**
   - `lib/actions.js` 최상단에 `"use server";`가 없으면 일반 함수로 취급되어 클라이언트에서 서버 코드(fs 등)가 실행되려 해서 에러 발생

2. **`formData.get()` 대신 구조분해 사용**
   - ❌ `const { name } = formData;`
   - ✅ `const name = formData.get("name");`

3. **`revalidatePath` 누락**
   - 데이터 저장 후 `revalidatePath`를 호출하지 않으면, 페이지가 이전 캐시된 데이터를 보여줍니다

4. **서버 컴포넌트에서 `"use client"` 남발**
   - `GuestbookList`는 인터랙션이 없으므로 서버 컴포넌트로 유지!
   - 삭제 버튼만 별도 클라이언트 컴포넌트(`DeleteButton`)로 분리

5. **`input`의 `name` 속성 누락**
   - `<input name="name" />`에서 `name` 속성이 없으면 `formData.get("name")`이 `null` 반환

### 꼭 기억할 포인트

- **Server Action ≠ API Route**: Server Actions는 폼 제출/뮤테이션에 최적화, API Routes는 외부 서비스 연동에 최적화
- **`<form action={fn}>`이 핵심**: React의 `onSubmit`이 아닌, `action` 속성을 사용
- **서버사이드 유효성 검증 필수**: 클라이언트 `required` 속성은 쉽게 우회 가능

---

## 최종 기대 효과

이 회차를 마치면:

- `"use server"` 지시어로 Server Action을 선언할 수 있습니다
- `<form action={...}>` 패턴으로 API 없이 서버 함수를 호출할 수 있습니다
- `formData`를 활용한 폼 데이터 처리가 가능합니다
- `revalidatePath`로 데이터 변경 후 화면을 갱신할 수 있습니다
- 서버/클라이언트 컴포넌트를 역할에 맞게 분리하는 판단력을 기를 수 있습니다

---

## 심화 도전 과제

1. **글 수정 기능 추가**: 기존 글의 메시지를 수정하는 `updateGuestbookEntry` Server Action을 만들어보세요
2. **`useActionState` 훅 연동**: `addGuestbookEntry`의 결과(에러 메시지)를 `useActionState`로 받아 화면에 인라인으로 표시해보세요 (11회차 미리보기!)
