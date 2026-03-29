// ─── 도메인 모델 타입 ─────────────────────────────────────────────

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// ─── Next.js 페이지 Props 타입 ────────────────────────────────────
// Next.js 15+: params와 searchParams는 모두 Promise로 감싸야 합니다.

export interface PostDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ tab?: string; highlight?: string }>;
}

export interface PostsPageProps {
  searchParams?: Promise<{ page?: string; userId?: string }>;
}
