// ─── [타입 정의 파일] ──────────────────────────────────────────────────────────
// 이 파일에 앱에서 사용하는 모든 공용 타입을 정의하세요.
// completed/lib/types.ts 를 참고하지 말고, 아래 힌트를 보며 직접 작성해보세요.
//
// ─── 실습 순서 ─────────────────────────────────────────────────────────────────
// 1. Post 인터페이스 정의 (id, title, body, userId)
// 2. Comment 인터페이스 정의 (id, postId, name, email, body)
// 3. PostDetailPageProps 인터페이스 정의 (params, searchParams)
// 4. PostsPageProps 인터페이스 정의 (searchParams)
// ──────────────────────────────────────────────────────────────────────────────

// TODO 1: Post 인터페이스를 정의하세요.
// JSONPlaceholder /posts 응답의 각 항목 구조입니다.
// 힌트:
//   interface Post {
//     id: number;
//     title: string;
//     body: string;
//     userId: number;
//   }

// TODO 2: Comment 인터페이스를 정의하세요.
// JSONPlaceholder /posts/:id/comments 응답의 각 항목 구조입니다.
// 힌트:
//   interface Comment {
//     id: number;
//     postId: number;
//     name: string;
//     email: string;
//     body: string;
//   }

// ─── Next.js 15+ 페이지 Props 타입 ────────────────────────────────────────────
// ⚠️ 핵심 변경사항: Next.js 15+에서 params와 searchParams는 Promise입니다.
//
// JavaScript (구 버전):
//   function Page({ params }) {
//     const { id } = params;   // 직접 접근 가능
//   }
//
// TypeScript + Next.js 15+ (현재):
//   interface PageProps {
//     params: Promise<{ id: string }>;    // ← Promise로 감싸야 함
//   }
//   async function Page({ params }: PageProps) {
//     const { id } = await params;        // ← await 필수
//   }
//
// 왜 Promise가 됐나요?
//   Next.js 15는 params를 비동기적으로 제공하여 스트리밍 렌더링 성능을 높입니다.
//   이 때문에 타입도 Promise<{...}>로 바뀌었습니다.

// TODO 3: PostDetailPageProps 인터페이스를 정의하세요.
// /posts/[id] 페이지에서 사용합니다.
// - params: { id: string } 를 담은 Promise
// - searchParams: { tab?: string; highlight?: string } 를 담은 Promise (선택적)
//
// 힌트:
//   interface PostDetailPageProps {
//     params: Promise<{ id: string }>;
//     searchParams?: Promise<{ tab?: string; highlight?: string }>;
//   }

// TODO 4: PostsPageProps 인터페이스를 정의하세요.
// /posts 목록 페이지에서 사용합니다.
// - searchParams: { page?: string; userId?: string } 를 담은 Promise (선택적)
//
// 힌트:
//   interface PostsPageProps {
//     searchParams?: Promise<{ page?: string; userId?: string }>;
//   }
