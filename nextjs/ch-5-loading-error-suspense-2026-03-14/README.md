# 회차 5 — 로딩, 에러 UI 및 Suspense

> Next.js App Router의 파일 기반 로딩/에러 처리와 React Suspense 스트리밍 렌더링 학습

---

## 📌 회차 정보

- **회차**: 5회차 (중급 — 데이터 & 라우팅)
- **핵심 개념**: `loading.js`, `error.js`, `not-found.js`, React `<Suspense>` 스트리밍 렌더링
- **주제**: 뉴스 피드 — 서버에서 게시글/댓글을 불러오며 로딩 스켈레톤, 에러 처리, 404 페이지를 체험

---

## 🎯 학습 목표

이 예제를 완료하면 다음을 할 수 있게 됩니다:

1. **`loading.js`** 파일 하나로 라우트 전환 시 자동 로딩 UI를 표시할 수 있다
2. **`error.js`** 파일로 런타임 에러를 우아하게 처리하고, `reset()` 함수로 복구할 수 있다
3. **`not-found.js`** 파일과 `notFound()` 함수로 404 페이지를 커스텀할 수 있다
4. **React `<Suspense>`** 를 사용하여 페이지의 일부분을 독립적으로 스트리밍 렌더링할 수 있다
5. **스켈레톤 UI** 패턴을 이해하고 직접 구현할 수 있다

---

## 🔄 React와의 차이점

| React (기존 방식) | Next.js App Router |
|---|---|
| `useState`로 `isLoading` 상태 수동 관리 | `loading.js` 파일 하나로 자동 처리 |
| `try/catch`와 `useState`로 에러 수동 처리 | `error.js`가 Error Boundary를 자동 생성 |
| React Router의 별도 404 라우트 설정 | `not-found.js` + `notFound()` 함수 |
| 모든 데이터가 준비될 때까지 빈 화면 | `<Suspense>`로 준비된 부분부터 점진적 렌더링 |

**핵심 차이**: React에서는 로딩/에러 상태를 **직접 코드로 관리**했지만, Next.js에서는 **특수 파일을 만들기만 하면 프레임워크가 자동으로 처리**합니다.

---

## 🚀 사전 준비

```bash
# completed(완성본) 실행
cd completed
npm install
npm run dev
# → http://localhost:3000

# practice(실습용) 실행 (별도 터미널)
cd practice
npm install
npm run dev -- -p 3001
# → http://localhost:3001
```

먼저 **completed를 실행**하여 최종 결과물을 확인한 뒤, practice에서 직접 코드를 채워보세요.

---

## 📚 핵심 학습 개념

### 1. `loading.js` — 자동 로딩 UI

**왜 필요한가?**
서버 컴포넌트에서 데이터를 가져오는 동안 사용자는 빈 화면을 보게 됩니다. `loading.js`는 이 시간 동안 자동으로 표시되는 로딩 UI입니다.

**원리**: Next.js가 내부적으로 `page.js`를 React `<Suspense>`로 감싸고, `loading.js`를 fallback으로 사용합니다.

```
실제로 Next.js가 하는 일:
<Suspense fallback={<Loading />}>    ← loading.js
  <Page />                            ← page.js
</Suspense>
```

- 각 라우트 세그먼트(`/posts`, `/posts/[id]`)마다 별도의 `loading.js`를 만들 수 있습니다
- 상위 `loading.js`는 하위 라우트에도 적용됩니다 (가장 가까운 것이 우선)

### 2. `error.js` — 에러 경계 (Error Boundary)

**왜 필요한가?**
서버에서 데이터 페칭 실패, 런타임 에러 등이 발생했을 때 전체 앱이 멈추지 않도록 해당 세그먼트만 에러 UI로 대체합니다.

**필수 조건**:
- 반드시 `"use client"` 지시어가 있어야 합니다 (빌드 자체가 실패)
- `error` prop: 발생한 에러 객체
- `reset` prop: 에러 경계를 초기화하고 다시 렌더링하는 함수

```jsx
"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>오류 발생: {error.message}</h2>
      <button onClick={() => reset()}>다시 시도</button>
    </div>
  );
}
```

### 3. `not-found.js` — 404 페이지

**왜 필요한가?**
존재하지 않는 리소스(게시글 등)에 접근했을 때 사용자에게 친절한 404 페이지를 보여줍니다.

**사용법**: 서버 컴포넌트에서 `notFound()` 함수를 호출하면 가장 가까운 `not-found.js`가 렌더링됩니다.

```jsx
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const post = await getPost(params.id);
  if (!post) notFound();  // ← not-found.js가 렌더링됨
  // ...
}
```

### 4. React `<Suspense>` — 스트리밍 렌더링

**왜 필요한가?**
하나의 페이지에서 여러 데이터를 가져올 때, 모든 데이터가 준비될 때까지 기다리지 않고 **준비된 부분부터 점진적으로 보여줄 수 있습니다**.

이 예제에서:
- 게시글 본문 (1.5초) → 먼저 표시
- 댓글 목록 (3초) → 나중에 스트리밍

```jsx
<article>{/* 게시글 본문 — 바로 표시 */}</article>

<Suspense fallback={<CommentSkeleton />}>
  <CommentList />  {/* 3초 후 스트리밍 */}
</Suspense>
```

---

## 📁 프로젝트 구조 안내

```
app/
├── layout.js              # 루트 레이아웃 (GNB 포함)
├── page.js                # 홈페이지 (개념 설명)
├── globals.css            # Tailwind CSS 임포트
└── posts/
    ├── page.js            # 게시글 목록 (★ Suspense로 PostList 감싸기)
    ├── loading.js         # 게시글 목록 로딩 UI (★)
    ├── error.js           # 게시글 목록 에러 UI (★ "use client" 필수)
    ├── not-found.js       # 게시글 404 페이지 (★)
    ├── components/
    │   ├── PostList.js         # 서버 컴포넌트 — API 호출 + 목록 렌더링 (★)
    │   ├── PostListSkeleton.js # 스켈레톤 UI — 목록 (★)
    │   ├── PostDetailSkeleton.js # 스켈레톤 UI — 상세 (★)
    │   ├── CommentList.js      # 서버 컴포넌트 — 댓글 API 호출 (★)
    │   ├── CommentSkeleton.js  # 스켈레톤 UI — 댓글 (★)
    │   └── ErrorSimulator.js   # 클라이언트 컴포넌트 — 에러 테스트 (★ "use client")
    └── [id]/
        ├── page.js        # 상세 페이지 (★ Suspense + notFound)
        ├── loading.js     # 상세 로딩 UI (★)
        ├── error.js       # 상세 에러 UI (★)
        └── not-found.js   # 상세 404 (★)
```

★ 표시 = practice에서 직접 채워야 할 파일

---

## 📝 추천 실습 순서

### Step 1: 스켈레톤 UI 먼저 만들기
1. `PostListSkeleton.js` — `animate-pulse`와 회색 블록으로 카드 12개의 스켈레톤 구현
2. `PostDetailSkeleton.js` — 본문 + 댓글 영역 스켈레톤 구현
3. `CommentSkeleton.js` — 댓글 카드 5개의 스켈레톤 구현

### Step 2: loading.js로 자동 로딩 UI 적용
4. `posts/loading.js` — PostListSkeleton을 임포트하여 로딩 UI 완성
5. `posts/[id]/loading.js` — PostDetailSkeleton을 임포트하여 로딩 UI 완성

### Step 3: 데이터 페칭 서버 컴포넌트 구현
6. `PostList.js` — `async function`으로 만들고, delay + fetch로 데이터 가져오기
7. `CommentList.js` — 동일 패턴으로 댓글 가져오기 (더 긴 딜레이)

### Step 4: Suspense 스트리밍 적용
8. `posts/page.js` — `<Suspense>`로 PostList 감싸기
9. `posts/[id]/page.js` — `<Suspense>`로 CommentList 감싸기 (본문과 독립 스트리밍)

### Step 5: 에러/404 처리
10. `posts/[id]/page.js` — `notFound()` 호출 로직 추가
11. `not-found.js` 파일들 — 404 UI 스타일링
12. `ErrorSimulator.js` — "use client" + useState로 에러 발생 로직
13. `error.js` 파일들 — error.message 표시 + reset() 연결

---

## 💡 교육자의 팁

### 흔히 하는 실수들

1. **`error.js`에 `"use client"` 누락**
   - error.js는 반드시 클라이언트 컴포넌트여야 합니다. 없으면 빌드 자체가 실패합니다!

2. **`notFound()`를 try/catch 안에서 호출**
   - `notFound()`는 내부적으로 에러를 throw하므로, try/catch로 감싸면 정상 동작하지 않습니다.

3. **Suspense를 너무 크게 감싸기**
   - 페이지 전체를 하나의 Suspense로 감싸면 스트리밍 효과를 체감할 수 없습니다.
   - 독립적으로 로딩할 수 있는 영역별로 나눠서 감싸세요.

4. **서버 컴포넌트에서 useState 사용 시도**
   - 데이터 페칭 컴포넌트(PostList, CommentList)는 서버 컴포넌트입니다.
   - 서버 컴포넌트에서는 `useState`, `useEffect` 등 훅을 사용할 수 없습니다.

5. **Next.js 15+에서 params 접근**
   - `const { id } = await params;` — params는 비동기 객체이므로 반드시 `await`가 필요합니다.

### 꼭 기억할 포인트

- `loading.js` = Next.js가 자동으로 `<Suspense fallback>`으로 감싸줌
- `error.js` = Next.js가 자동으로 `<ErrorBoundary>`로 감싸줌
- `<Suspense>`를 직접 사용하면 **페이지 내 개별 영역**을 독립적으로 스트리밍 가능
- 스켈레톤 UI는 실제 콘텐츠와 **같은 형태**로 만들어야 UX가 좋음

---

## 🎓 최종 기대 효과

이 회차를 마치면:
- Next.js의 **파일 기반 로딩/에러 처리 시스템**을 자유롭게 활용할 수 있습니다
- React `<Suspense>`를 활용한 **스트리밍 렌더링**의 원리와 활용법을 이해합니다
- 사용자 경험(UX)을 극적으로 향상시키는 **스켈레톤 UI 패턴**을 직접 구현할 수 있습니다
- 서버 컴포넌트의 에러를 **우아하게 처리**하는 방법을 알게 됩니다

---

## 🚀 심화 도전 과제

1. **중첩 에러 경계**: `posts/error.js`와 `posts/[id]/error.js`에 서로 다른 에러 UI를 적용하고, 각각이 독립적으로 동작하는지 확인해보세요.

2. **병렬 데이터 페칭 + Suspense**: 게시글 상세 페이지에서 "관련 게시글" 섹션을 추가하고, 본문/댓글/관련 게시글이 각각 독립적으로 스트리밍되도록 3개의 `<Suspense>`를 사용해보세요.
