# 회차 4 — 동적 라우팅 및 네비게이션

> Next.js App Router + Tailwind CSS v4 기반 학습 예제

---

## 주제 및 기획 의도

**블로그 포스트 상세 페이지**를 만들며, URL 파라미터에 따라 내용이 달라지는 **동적 라우팅**과 페이지 간 부드러운 이동을 제공하는 **네비게이션**을 학습합니다.

블로그는 동적 라우팅의 가장 대표적인 사용 사례입니다. 하나의 템플릿(`/posts/[id]`)으로 수백 개의 포스트 페이지를 처리하는 패턴을 직접 체험할 수 있습니다.

---

## 학습 목표

이 예제를 통해 다음을 배웁니다:

1. **동적 라우팅** (`[id]` 폴더)으로 URL 파라미터를 캡처하는 방법
2. **`next/link`** 컴포넌트로 클라이언트 사이드 네비게이션 구현
3. **`params` 비동기 객체** — Next.js 15+에서 `await params`로 파라미터 추출
4. **`generateStaticParams`** — 빌드 시 자주 방문되는 페이지를 미리 생성(SSG)
5. **`generateMetadata`** — 각 페이지마다 고유한 SEO 메타데이터 동적 생성
6. **`Promise.all`** — 여러 API를 병렬로 호출하여 성능 최적화

---

## React와의 차이점

| React (React Router) | Next.js App Router |
|---|---|
| `<Route path="/posts/:id" element={<Post />} />` | `app/posts/[id]/page.js` 파일 생성만으로 라우팅 완성 |
| `const { id } = useParams()` (클라이언트) | `const { id } = await params` (서버, 비동기) |
| `<Link to="/posts/1">` (react-router-dom) | `<Link href="/posts/1">` (next/link) |
| SEO 메타태그 직접 관리 또는 react-helmet 사용 | `generateMetadata()` 함수로 자동 관리 |
| 모든 페이지가 클라이언트에서 렌더링 | `generateStaticParams`로 빌드 시 정적 생성 가능 |
| `<a>` 클릭 → 전체 페이지 새로고침 | `<Link>` 클릭 → 클라이언트 사이드 네비게이션 (새로고침 없음) |

---

## 사전 준비

```bash
# 1. completed (완성본) 실행
cd completed
npm install
npm run dev
# → http://localhost:3000 에서 완성된 화면 확인

# 2. practice (실습용) 실행
cd ../practice
npm install
npm run dev
# → http://localhost:3001 (포트 충돌 시 자동 변경)
```

---

## 핵심 학습 개념

### 1. 동적 라우팅 (`[id]`)

Next.js에서 폴더 이름을 대괄호로 감싸면 **동적 세그먼트**가 됩니다.

```
app/posts/[id]/page.js
```

- `/posts/1` → `id = "1"`
- `/posts/42` → `id = "42"`
- `/posts/hello` → `id = "hello"`

어떤 값이든 URL로 들어오면 `[id]`가 캡처합니다.

### 2. params 비동기 객체 (Next.js 15+)

```jsx
// ❌ 이전 방식 (Next.js 14 이하)
export default function Page({ params }) {
  const { id } = params;
}

// ✅ 현재 방식 (Next.js 15+)
export default async function Page({ params }) {
  const { id } = await params;  // await 필수!
}
```

### 3. `next/link` — 클라이언트 사이드 네비게이션

```jsx
import Link from "next/link";

// HTML <a> 태그 → 전체 페이지 새로고침
<a href="/posts/1">포스트 1</a>

// Next.js <Link> → 클라이언트 사이드 이동 (빠르고 부드러움)
<Link href="/posts/1">포스트 1</Link>

// 동적 경로와 함께 사용
<Link href={`/posts/${post.id}`}>자세히 보기</Link>
```

### 4. `generateStaticParams` — 정적 페이지 사전 생성 (SSG)

빌드 시점에 미리 HTML을 만들어두어, 사용자 요청 시 즉시 응답합니다.

```jsx
export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  const posts = await res.json();

  return posts.map((post) => ({
    id: String(post.id),  // ⚠️ 반드시 문자열!
  }));
}
```

### 5. `generateMetadata` — 동적 SEO 메타데이터

```jsx
export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await fetch(`/api/posts/${id}`).then(r => r.json());

  return {
    title: post.title,
    description: post.body.slice(0, 100),
  };
}
```

---

## 프로젝트 구조 안내

```
ch-4-dynamic-routing-2026-03-14/
├── completed/                         # 완성본
│   └── app/
│       ├── layout.js                  # 루트 레이아웃 (Navbar 포함)
│       ├── page.js                    # 홈 — 최신 포스트 6개 표시
│       ├── not-found.js               # 404 페이지
│       ├── components/
│       │   ├── Navbar.js              # 공통 네비게이션 바 (Link 활용)
│       │   ├── PostCard.js            # 포스트 카드 (동적 Link)
│       │   └── CommentList.js         # 댓글 목록
│       └── posts/
│           ├── page.js                # 전체 포스트 목록 (/posts)
│           └── [id]/
│               └── page.js            # ★ 포스트 상세 (/posts/[id])
│                                      #   generateStaticParams
│                                      #   generateMetadata
│                                      #   await params
├── practice/                          # 실습용 (동일 구조, 코드 비워짐)
└── README.md                          # 이 파일
```

---

## 추천 실습 순서

### Step 1: `app/components/Navbar.js`
- `<a>` 태그를 `<Link>`로 교체하는 가장 기본적인 연습
- `import Link from "next/link"` 추가
- 브라우저에서 네비게이션 시 **새로고침 없이** 이동하는지 확인

### Step 2: `app/page.js` (홈 페이지)
- `async` 함수로 변경하고 `fetch`로 데이터 가져오기 (3회차 복습)
- `<a>` → `<Link>` 교체, 동적 경로 `href={/posts/${post.id}}` 적용
- Tailwind CSS 클래스 채우기

### Step 3: `app/components/PostCard.js`
- `<Link>` 임포트 및 카드를 Link로 감싸기
- 동적 경로 href 설정
- Tailwind CSS 스타일링 완성

### Step 4: `app/posts/page.js` (포스트 목록)
- `async` + `fetch`로 전체 포스트 가져오기
- `metadata` 정적 메타데이터 추가

### Step 5: `app/posts/[id]/page.js` (핵심!)
- `const { id } = await params` — params 비동기 처리
- `Promise.all`로 포스트 + 댓글 병렬 페칭
- `generateStaticParams` — 1~10번 포스트 사전 생성
- `generateMetadata` — 동적 SEO 메타데이터
- 이전/다음 포스트 `<Link>` 네비게이션

### Step 6: `app/components/CommentList.js`
- Tailwind CSS 스타일링 완성

---

## 교육자의 팁

### 흔히 하는 실수들

1. **`params`에 `await`를 빼먹는 경우**
   ```
   Error: Cannot destructure property 'id' of 'params' as it is not iterable.
   ```
   Next.js 15+에서 params는 Promise입니다. **반드시 `await`**를 붙이세요.

2. **`generateStaticParams`에서 id를 숫자로 반환**
   ```jsx
   // ❌ 잘못된 예
   return posts.map((post) => ({ id: post.id }));     // 숫자
   // ✅ 올바른 예
   return posts.map((post) => ({ id: String(post.id) })); // 문자열
   ```
   동적 세그먼트의 값은 **항상 문자열**이어야 합니다.

3. **`<a>` 태그와 `<Link>`의 혼용**
   - `<a>` → 전체 페이지 새로고침 (느림, 상태 초기화)
   - `<Link>` → 클라이언트 사이드 네비게이션 (빠름, 상태 유지)
   - 외부 URL은 `<a>`, 내부 이동은 반드시 `<Link>`를 사용하세요.

4. **`generateMetadata`에서 params를 await하지 않는 경우**
   `generateStaticParams`와 마찬가지로 `{ params }`를 인자로 받고, `await params`를 해야 합니다.

### 꼭 기억할 포인트

- **`[id]` 폴더 = 동적 세그먼트**: 대괄호가 핵심입니다
- **`generateStaticParams` = 빌드 타임 최적화**: 인기 페이지를 미리 만들어두는 전략
- **`Link` = SPA 경험**: 새로고침 없는 부드러운 네비게이션
- 빌드 결과에서 `●(SSG)` 마크가 붙은 페이지는 미리 생성된 것입니다

---

## 최종 기대 효과

이 회차를 마치면:
- URL 파라미터를 활용한 **동적 페이지**를 자유롭게 만들 수 있습니다
- `next/link`로 **SPA 수준의 부드러운 네비게이션**을 구현할 수 있습니다
- `generateStaticParams`로 **빌드 타임 최적화(SSG)**를 적용할 수 있습니다
- `generateMetadata`로 **페이지별 동적 SEO**를 설정할 수 있습니다

---

## 심화 도전 과제

1. **Catch-all 세그먼트**: `app/posts/[...slug]/page.js`를 만들어 `/posts/2024/03/my-post` 같은 중첩 경로를 처리해보세요.

2. **사용자 프로필 페이지 추가**: `app/users/[userId]/page.js`를 만들고, 포스트의 `userId`를 클릭하면 해당 사용자의 다른 포스트 목록을 보여주는 페이지를 만들어보세요. (`https://jsonplaceholder.typicode.com/users/{userId}/posts` API 활용)
