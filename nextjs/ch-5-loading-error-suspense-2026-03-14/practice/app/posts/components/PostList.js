// ─── [서버 컴포넌트 — 게시글 목록] ──────────────────
// 이 컴포넌트는 서버 컴포넌트입니다. (기본값이므로 "use client" 불필요)
// 서버에서 직접 API를 호출하여 데이터를 가져옵니다.

import Link from "next/link";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// ─── [딜레이 유틸리티 함수] ──────────────────────────
// 의도적으로 딜레이를 추가하여 로딩 UI를 체감할 수 있도록 합니다.
// 힌트: Promise와 setTimeout을 조합하세요.
// async function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// ─── [데이터 페칭 함수] ──────────────────────────────
// API에서 게시글 목록을 가져오는 비동기 함수를 작성하세요.
// 1. delay 함수로 2초 딜레이 추가 (로딩 UI 체감용)
// 2. fetch로 API 호출 (12개만: ?_limit=12)
// 3. 응답이 ok가 아니면 throw new Error(...)
// 4. res.json() 반환
//
// async function getPosts() {
//   await delay(2000);
//   const res = await fetch(`${API_URL}?_limit=12`);
//   if (!res.ok) {
//     throw new Error("게시글 목록을 불러오는데 실패했습니다.");
//   }
//   return res.json();
// }

// ─── [async 서버 컴포넌트] ───────────────────────────
// 서버 컴포넌트는 async 함수로 만들 수 있습니다!
// React의 일반 컴포넌트에서는 불가능하지만,
// Next.js의 서버 컴포넌트에서는 await를 직접 사용할 수 있습니다.
//
// 힌트: export default async function PostList() {
//   const posts = await getPosts();
//   ...
// }
export default function PostList() {
  // ─── [데이터 페칭] ──────────────────────────────────
  // 위에서 만든 getPosts() 함수를 await로 호출하세요.
  // 힌트: const posts = await getPosts();
  const posts = []; // ← 이 부분을 실제 데이터 페칭으로 교체하세요

  if (posts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        게시글이 없습니다. 데이터 페칭 로직을 구현해보세요!
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="block bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all group"
        >
          <div className="flex items-center gap-2 mb-3">
            {/* ─── [게시글 번호 배지] ──────────────────
             * Tailwind로 작은 뱃지를 만들어보세요.
             * 힌트: bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full
             * ─────────────────────────────────────── */}
            <span>#{post.id}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {post.title}
          </h3>
          {/* ─── [게시글 미리보기] ──────────────────────
           * post.body를 3줄까지만 표시하세요.
           * 힌트: className="text-gray-500 text-sm line-clamp-3"
           * ─────────────────────────────────────────── */}
          <p>{post.body}</p>
          <span className="inline-block mt-3 text-indigo-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
            자세히 보기 →
          </span>
        </Link>
      ))}
    </div>
  );
}
