// ─── [포스트 목록 페이지 — 서버 컴포넌트] ──────────────────
// 전체 포스트 목록을 서버에서 가져와 PostCard 컴포넌트로 렌더링합니다.
// 📌 핵심 개념:
// 1. 파일 기반 라우팅: app/posts/page.js → /posts 경로에 대응
// 2. 정적 메타데이터: export const metadata로 페이지별 SEO 설정
// 3. 서버 컴포넌트에서 API 호출 후 자식 컴포넌트에 데이터 전달

import PostCard from "../components/PostCard";
const API_URL = "https://jsonplaceholder.typicode.com";

// ─── [정적 메타데이터] ──────────────────────────────────
export const metadata = {
  title: "포스트 목록 - DevBlog",
  description: "전체 블로그 포스트 목록을 확인하세요.",
};

// ─── [async 서버 컴포넌트] ────────────────────────────────
export default async function PostsPage() {
  // ─── [전체 포스트 데이터 페칭] ─────────────────────────────

  const res = await fetch(`${API_URL}/posts`);
  const posts = await res.json();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">전체 포스트</h1>
        <p className="text-gray-500">
          총 {posts.length}개의 포스트가 있습니다.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
