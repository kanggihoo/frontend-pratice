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
export interface Post {
  id: number;
  title: string;
  body: string;
  email: string;
  userId: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface PostDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ tab?: string; highlight?: string }>;
}

export interface PostsPageProps {
  searchParams?: Promise<{ page?: string; userId?: string }>;
}
