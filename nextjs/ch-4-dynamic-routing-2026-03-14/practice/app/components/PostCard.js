// ─── [포스트 카드 컴포넌트] ─────────────────────────────
// 포스트 목록에서 각 포스트를 카드 형태로 보여주는 컴포넌트입니다.
// 카드를 클릭하면 해당 포스트의 상세 페이지(/posts/[id])로 이동해야 합니다.

import Link from "next/link";

// 📌 핵심 개념: 동적 경로와 Link
// - Next.js에서 동적 경로는 대괄호([])를 사용합니다. 예: /posts/[id]
// - <Link> 컴포넌트의 href에 백틱(`)을 사용한 템플릿 리터럴로 동적 경로를 만듭니다.
// - 예: href={`/posts/${post.id}`}

export default function PostCard({ post }) {
  return (
    <Link href={`/posts/${post.id}`}>
      <article className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-200 cursor-pointer group">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
            #{post.id}
          </span>
          <span className="text-xs text-gray-400">User {post.userId}</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2 capitalize">
          {post.title}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-2">{post.body}</p>
        <div className="mt-4 text-indigo-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
          자세히 보기 →
        </div>
      </article>
    </Link>
  );
}
