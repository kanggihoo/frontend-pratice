// ─── [홈 페이지 — 서버 컴포넌트] ──────────────────────────
// 이 페이지는 서버 컴포넌트로, 최신 포스트 6개를 서버에서 가져와 보여줍니다.

import Link from "next/link";
import PostCard from "./components/PostCard";

const API_URL = "https://jsonplaceholder.typicode.com";

// ─── [async 서버 컴포넌트] ────────────────────────────────
export default async function HomePage() {
  // ─── [서버사이드 데이터 페칭] ──────────────────────────────
  const res = await fetch(`${API_URL}/posts?_limit=6`);
  const posts = await res.json();

  return (
    <div>
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">DevBlog</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Next.js App Router의 동적 라우팅을 활용한 블로그입니다.
          <br />
          포스트를 클릭하여 상세 페이지로 이동해보세요.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">최신 포스트</h2>
          <Link
            href="/posts"
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm "
          >
            전체 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
