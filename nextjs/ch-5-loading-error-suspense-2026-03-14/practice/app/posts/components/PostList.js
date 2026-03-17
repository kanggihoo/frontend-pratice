// ─── [서버 컴포넌트 — 게시글 목록] ──────────────────

import Link from "next/link";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// 의도적으로 딜레이를 추가하여 로딩 UI를 체감할 수 있도록 합니다.

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── [데이터 페칭 함수] ──────────────────────────────
async function getPosts() {
  await delay(2000);
  const res = await fetch(`${API_URL}?_limit=12`);
  if (!res.ok) {
    throw new Error("게시글 목록을 불러오는데 실패했습니다.");
  }

  return res.json();
}

export default async function PostList() {
  const posts = await getPosts();
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="block bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all group"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full">
              #{post.id}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {post.title}
          </h3>

          <p className="text-gray-500 text-sm line-clamp-1">{post.body}</p>

          <span className="inline-block mt-3 text-indigo-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
            자세히 보기 →
          </span>
        </Link>
      ))}
    </div>
  );
}
