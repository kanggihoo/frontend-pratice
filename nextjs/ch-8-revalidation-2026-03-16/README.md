# 회차 8 — 데이터 재검증 (Revalidation)

## 주제 및 기획 의도

**실시간 미니 게시판** — 게시글과 댓글을 작성·삭제하며, 데이터가 변경될 때마다 화면이 자동으로 최신 상태를 반영하는 게시판 애플리케이션입니다.

이 주제를 선택한 이유는 게시판이 "데이터 변경 → 캐시 무효화 → 최신 데이터 표시"라는 재검증의 핵심 흐름을 가장 자연스럽게 체험할 수 있는 형태이기 때문입니다. 게시글 작성, 댓글 추가, 삭제 등 다양한 뮤테이션 시나리오를 통해 각 재검증 방법의 차이점을 명확하게 비교할 수 있습니다.

---

## 학습 목표

이 예제를 완료하면 다음을 할 수 있게 됩니다:

1. **`revalidatePath(path)`** — 특정 경로의 Full Route Cache를 무효화하여 최신 데이터로 페이지를 갱신할 수 있다.
2. **`revalidateTag(tag)`** — 태그가 붙은 fetch 캐시만 선택적으로 무효화할 수 있다.
3. **시간 기반 재검증 (ISR)** — `fetch`의 `next.revalidate` 옵션으로 일정 시간 간격의 자동 갱신을 설정할 수 있다.
4. Server Action 내에서 적절한 재검증을 호출하여 "쓰기 후 읽기" 일관성을 보장할 수 있다.

---

## React와의 차이점

| React (SPA)                         | Next.js (App Router)                     |
| ----------------------------------- | ---------------------------------------- |
| API 호출 후 `setState`로 수동 갱신   | Server Action + `revalidatePath`로 자동 갱신 |
| 클라이언트가 캐시 관리 (React Query 등) | 서버 측 캐시를 Next.js가 관리            |
| 전체 목록을 다시 fetch하거나 낙관적 업데이트 | 경로/태그 단위로 세밀하게 캐시 무효화     |
| 시간 기반 자동 갱신은 `setInterval` 사용 | `next: { revalidate: N }`으로 ISR 내장   |

---

## 사전 준비

```bash
# completed(완성본) 실행
cd completed
npm install
npm run dev
# → http://localhost:3000 에서 완성된 화면 확인

# practice(실습용) 실행
cd practice
npm install
npm run dev
# → http://localhost:3001 (포트가 겹치면 다른 포트 자동 할당)
```

---

## 핵심 학습 개념

### 왜 재검증(Revalidation)이 필요한가?

Next.js는 성능 최적화를 위해 페이지와 데이터를 **캐시**합니다. 하지만 데이터가 변경되었을 때(게시글 작성, 삭제 등) 캐시된 오래된 데이터를 계속 보여주면 안 됩니다. **재검증**은 "이 캐시는 더 이상 유효하지 않으니 새로 만들어라"라고 Next.js에 알려주는 메커니즘입니다.

### 1. `revalidatePath(path)` — 경로 기반 재검증

```js
import { revalidatePath } from "next/cache";

// 특정 경로의 전체 캐시를 무효화
revalidatePath("/");           // 메인 페이지 갱신
revalidatePath("/posts/1");    // 게시글 1번 상세 페이지 갱신
```

- **언제 사용?** Server Action에서 데이터를 변경한 직후
- **동작 방식:** 해당 경로의 Full Route Cache를 제거하여 다음 요청 시 서버가 새로 렌더링
- **장점:** 가장 직관적이고 간단한 재검증 방법

### 2. `revalidateTag(tag)` — 태그 기반 재검증

```js
// 1단계: fetch 시 태그 부착
fetch("https://api.example.com/data", {
  next: { tags: ["my-data"] },
});

// 2단계: 태그로 캐시 무효화
import { revalidateTag } from "next/cache";
revalidateTag("my-data"); // 'my-data' 태그가 붙은 모든 fetch 캐시 무효화
```

- **언제 사용?** 특정 데이터 소스만 선택적으로 갱신하고 싶을 때
- **장점:** 경로가 아닌 데이터 단위로 세밀한 캐시 제어 가능

### 3. 시간 기반 재검증 (ISR: Incremental Static Regeneration)

```js
// 30초마다 자동으로 데이터 갱신
fetch("https://api.example.com/quotes", {
  next: { revalidate: 30 },
});
```

- **동작 방식 (Stale-While-Revalidate):**
  1. 30초 내 요청 → 캐시된 데이터 즉시 반환 (빠름!)
  2. 30초 후 첫 요청 → 캐시된 데이터를 반환하면서, 백그라운드에서 새 데이터를 가져옴
  3. 다음 요청부터 → 새 데이터 반환
- **장점:** 정적 페이지의 성능 + 동적 데이터의 신선함

### `redirect`와 `revalidatePath`를 함께 쓸 때 주의

```js
// ✅ 올바른 패턴: redirect는 try/catch 밖에서!
export async function deletePost(formData) {
  try {
    // ... 삭제 로직
    revalidatePath("/");
  } catch (error) {
    return { error: "삭제 실패" };
  }
  // redirect는 내부적으로 에러를 throw하므로
  // try 안에 넣으면 catch에 잡힘!
  redirect("/");
}
```

---

## 프로젝트 구조 안내

```
ch-8-revalidation-2026-03-16/
├── completed/                       # 완성본
│   ├── data/
│   │   └── board.json               # 게시글 + 댓글 데이터 (로컬 DB 역할)
│   ├── lib/
│   │   ├── data.js                  # 데이터 읽기/쓰기 유틸리티
│   │   └── actions.js               # ★ Server Actions + revalidation 핵심!
│   └── app/
│       ├── layout.js                # 루트 레이아웃
│       ├── globals.css              # Tailwind CSS
│       ├── page.js                  # 메인 페이지 (게시글 목록 + 명언)
│       ├── posts/[id]/page.js       # 게시글 상세 + 댓글
│       └── components/
│           ├── QuoteCard.js         # ★ fetch 캐싱 + ISR + revalidateTag 데모
│           ├── PostForm.js          # 게시글 작성 (Client Component)
│           ├── PostCard.js          # 게시글 카드 (Server Component)
│           ├── CommentForm.js       # 댓글 작성 (Client Component)
│           └── DeleteButton.js      # 삭제 확인 버튼 (Client Component)
├── practice/                        # 실습용 (뼈대 + 힌트 주석)
│   └── (동일 구조, 핵심 로직이 비어있음)
└── README.md                        # 이 파일
```

---

## 추천 실습 순서

### 1단계: `lib/actions.js` — 재검증 함수 연결 (가장 중요!)

1. 파일 상단에서 `revalidatePath`와 `revalidateTag`를 import하세요.
2. `createPost` 함수 안에서 `revalidatePath('/')`를 호출하세요.
3. `createComment` 함수 안에서 두 경로(`/posts/${postId}`, `/`)를 재검증하세요.
4. `deletePost`, `deleteComment`에도 적절한 재검증을 추가하세요.
5. `revalidateQuoteAction`에서 `revalidateTag('quote')`를 호출하세요.

### 2단계: `app/components/QuoteCard.js` — fetch 캐싱 옵션 설정

1. `revalidateQuoteAction` Server Action을 import하세요.
2. `fetch` 호출에 `{ next: { revalidate: 30, tags: ['quote'] } }` 옵션을 추가하세요.
3. 명언 새로고침 버튼을 `<form action={revalidateQuoteAction}>`으로 연결하세요.

### 3단계: `app/components/PostForm.js` & `CommentForm.js` — 폼 연결

1. `"use client"` 지시어를 추가하세요.
2. Server Action을 import하고 `form`의 `action`에 연결하세요.
3. 폼 제출 후 결과에 따라 에러 표시 또는 폼 초기화 로직을 구현하세요.

### 4단계: `app/components/DeleteButton.js` — 삭제 확인

1. `"use client"` 지시어를 추가하세요.
2. `onClick`에서 `confirm()` 다이얼로그를 추가하세요.

### 5단계: UI 스타일링 (Tailwind CSS)

1. `PostCard.js`의 카드 스타일링
2. `QuoteCard.js`의 명언 카드 스타일링
3. `page.js`의 안내 패널 스타일링
4. `PostForm.js`의 입력 필드 스타일링

---

## 교육자의 팁

### 자주 하는 실수

1. **`revalidatePath`를 빼먹는 경우** — 데이터는 저장되었는데 화면이 갱신되지 않아 "버그"로 오해합니다. 반드시 뮤테이션 후 재검증을 호출하세요!

2. **`redirect`를 try/catch 안에서 호출** — `redirect()`는 내부적으로 에러를 throw하므로, try 블록 안에서 호출하면 catch에 잡혀 리다이렉트가 실행되지 않습니다.

3. **개발 모드에서 ISR이 안 보이는 것 같다?** — `next dev`에서는 매 요청마다 서버 컴포넌트가 새로 렌더링되므로, 시간 기반 캐싱 효과가 뚜렷하게 보이지 않을 수 있습니다. `npm run build && npm run start`로 프로덕션 모드에서 확인하면 캐싱 동작을 더 명확하게 관찰할 수 있습니다.

4. **`revalidatePath` vs `revalidateTag` 혼동** — `revalidatePath`는 **경로 전체**, `revalidateTag`는 **특정 fetch 요청**의 캐시를 무효화합니다. 로컬 데이터는 `revalidatePath`, 외부 API fetch는 `revalidateTag`가 적합합니다.

### 꼭 기억할 포인트

- Next.js 15부터 `fetch()`는 **기본적으로 캐시하지 않습니다** (`no-store`). 캐싱을 원하면 명시적으로 `next.revalidate` 또는 `cache: 'force-cache'`를 설정해야 합니다.
- `revalidatePath`와 `revalidateTag`는 `"use server"` 파일(Server Actions) 또는 Route Handlers에서만 호출할 수 있습니다.

---

## 최종 기대 효과

이 회차를 마치면:

- Server Action 실행 후 적절한 재검증을 호출하여 **"쓰기 후 읽기" 일관성**을 보장할 수 있습니다.
- `revalidatePath`와 `revalidateTag`의 차이를 이해하고, 상황에 맞게 선택할 수 있습니다.
- `fetch`의 `next.revalidate` 옵션으로 ISR(시간 기반 자동 갱신)을 설정할 수 있습니다.
- 캐시 무효화 타이밍과 전략을 고려한 데이터 흐름 설계가 가능해집니다.

---

## 심화 도전 과제

1. **게시글 수정 기능 추가** — 수정 폼을 만들고, 수정 후 상세 페이지와 목록 페이지 모두 재검증되도록 구현해보세요.
2. **프로덕션 모드에서 ISR 관찰** — `npm run build && npm start`로 실행한 뒤, 명언 카드의 "데이터 페칭 시각"이 30초 간격으로 바뀌는 것을 직접 관찰해보세요. 브라우저를 새로고침해도 30초 이내면 같은 명언이 보이는 것을 확인하세요.
