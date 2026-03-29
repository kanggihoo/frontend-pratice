# 4회차 — 동적 라우팅 params 타입: `Promise<{ id: string }>`, `generateStaticParams`

> Next.js 15+에서 변경된 `params` / `searchParams` 타입을 올바르게 작성하는 방법을 학습합니다.

---

## 학습 목표

- `params`가 왜 `Promise`로 바뀌었는지 이해한다
- `params: Promise<{ id: string }>` 타입을 직접 정의한다
- `searchParams: Promise<{...}>` 타입을 정의하고 안전하게 사용한다
- `generateStaticParams`의 반환 타입 `Promise<{ id: string }[]>`를 작성한다
- URL params는 항상 `string`임을 이해하고 숫자 변환 패턴을 익힌다

---

## JS → TS 변환 가이드 ⭐

### 1. 동적 라우트 params 타입

가장 중요한 변경사항입니다. Next.js 14까지는 `params`가 동기 객체였지만, **Next.js 15+부터 `Promise`가 됩니다.**

```tsx
// ❌ JavaScript / Next.js 14 방식
async function PostDetailPage({ params }) {
  const { id } = params;       // 동기 접근
  const postId = Number(id);
}

// ✅ TypeScript + Next.js 15+ 방식
interface PostDetailPageProps {
  params: Promise<{ id: string }>;   // Promise로 감싸야 함
}

async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;       // await 필수
  const postId = Number(id);
}
```

### 2. searchParams 타입

`searchParams`도 동일하게 `Promise`로 바뀌었습니다.

```tsx
// ❌ JavaScript / Next.js 14 방식
async function PostsPage({ searchParams }) {
  const userId = searchParams?.userId;  // 직접 접근
}

// ✅ TypeScript + Next.js 15+ 방식
interface PostsPageProps {
  searchParams?: Promise<{ userId?: string; page?: string }>;
}

async function PostsPage({ searchParams }: PostsPageProps) {
  const resolved = await searchParams;  // await 필수
  const userId = resolved?.userId ? Number(resolved.userId) : undefined;
}
```

> **왜 `string | undefined`인가요?**
> URL 쿼리 파라미터는 모두 문자열입니다. `?userId=1`이라도 `"1"`(string)으로 전달됩니다.
> 숫자가 필요하면 `Number()` 또는 `parseInt()`로 변환해야 합니다.

### 3. generateStaticParams 반환 타입

```tsx
// ❌ JavaScript 방식 — id가 number로 들어가면 런타임 버그 가능
export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map(post => ({ id: post.id }));  // post.id는 number!
}

// ✅ TypeScript 방식 — 반환 타입 명시 + string 변환 강제
export async function generateStaticParams(): Promise<{ id: string }[]> {
  const posts: Post[] = await fetch('...').then(res => res.json() as Promise<Post[]>);
  return posts.map(post => ({
    id: String(post.id),   // number → string 변환 필수
  }));
}
```

> **왜 string으로 변환해야 하나요?**
> URL의 경로 파라미터(`/posts/1`)는 항상 문자열입니다.
> `generateStaticParams`의 반환 타입이 `{ id: string }[]`이므로 number를 그대로 넣으면 타입 에러가 납니다.

### 4. API 응답 타입 단언

```tsx
// ❌ TypeScript 에러 — res.json()은 Promise<any>를 반환
const post = await fetch('/api/posts/1').then(res => res.json());

// ✅ 방법 1: 타입 단언 (as)
const post = await fetch('/api/posts/1').then(res => res.json() as Promise<Post>);

// ✅ 방법 2: 제네릭 fetch 유틸 (3회차에서 학습)
const post = await fetchData<Post>('/api/posts/1');
```

---

## 주요 타입 설명

### `lib/types.ts`에 정의하는 타입들

| 타입 | 역할 |
|------|------|
| `Post` | JSONPlaceholder `/posts` 응답 구조 |
| `Comment` | `/posts/:id/comments` 응답 구조 |
| `PostDetailPageProps` | `/posts/[id]` 페이지의 Props |
| `PostsPageProps` | `/posts` 목록 페이지의 Props |

```ts
// 완성 예시
export interface PostDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ tab?: string; highlight?: string }>;
}
```

`searchParams`에서 `?`(옵셔널)을 붙이는 이유:
- 페이지가 searchParams 없이도 렌더링될 수 있기 때문입니다
- `/posts/1`은 searchParams가 없고, `/posts/1?tab=info`는 있습니다

---

## 자주 하는 실수

### 1. `await` 누락

```tsx
// ❌ Next.js 15+에서 에러 발생
const { id } = params;         // params는 Promise — await 없이 접근 불가

// ✅ 올바른 방법
const { id } = await params;
```

### 2. number params를 그대로 사용

```tsx
// ❌ postId가 string인데 number처럼 사용하는 실수
const { id } = await params;
const post = await fetchPost(id);     // fetchPost(id: number)라면 타입 에러!

// ✅ 명시적 변환
const postId = Number(id);            // 또는 parseInt(id, 10)
const post = await fetchPost(postId); // 타입 안전
```

### 3. `generateStaticParams`에서 number 반환

```tsx
// ❌ TypeScript 에러: number는 string에 할당 불가
return posts.map(post => ({ id: post.id }));      // post.id는 number

// ✅ String()으로 명시적 변환
return posts.map(post => ({ id: String(post.id) }));
```

### 4. 타입 인터페이스 없이 inline 작성

```tsx
// ⚠️ 가능하지만 비권장 — 재사용이 안 됨
async function Page({ params }: { params: Promise<{ id: string }> }) { ... }

// ✅ 권장 — lib/types.ts에서 분리 정의
interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}
async function Page({ params }: PostDetailPageProps) { ... }
```

---

## 실습 순서

```
1. practice/lib/types.ts
   → Post, Comment, PostDetailPageProps, PostsPageProps 인터페이스 작성

2. practice/app/posts/page.tsx
   → PostsPageProps import + 함수 매개변수 타입 추가
   → searchParams await 처리

3. practice/app/posts/[id]/page.tsx
   → PostDetailPageProps import + 함수 매개변수 타입 추가
   → params await 처리
   → generateStaticParams 반환 타입 추가
   → fetch 응답 타입 단언 추가
```

---

## 사전 준비

```bash
# completed 실행
cd completed && npm install && npm run dev

# practice 실행 (별도 터미널)
cd practice && npm install && npm run dev
```

- completed: http://localhost:3000
- practice: http://localhost:3001 (포트 자동 변경됨)

---

## 심화 도전

1. **제네릭 페이지 Props 타입** 만들기
   ```ts
   // 제네릭을 이용해 params 타입을 유연하게 만들어보세요
   interface DynamicPageProps<T extends Record<string, string>> {
     params: Promise<T>;
     searchParams?: Promise<Record<string, string | string[] | undefined>>;
   }
   type PostDetailPageProps = DynamicPageProps<{ id: string }>;
   ```

2. **`notFound()` 연동하기**
   ```ts
   import { notFound } from 'next/navigation';

   const post = await fetch(`.../${postId}`).then(res => {
     if (!res.ok) notFound();   // notFound()는 never 반환 — 이후 코드 실행 안 됨
     return res.json() as Promise<Post>;
   });
   ```

3. **searchParams 유효성 검사**
   `tab` 값이 `"info"` 또는 `"comments"`만 허용되도록 타입을 좁혀보세요.
   ```ts
   type TabValue = "info" | "comments";
   // tab이 TabValue인지 확인하는 타입 가드를 작성해보세요
   ```
