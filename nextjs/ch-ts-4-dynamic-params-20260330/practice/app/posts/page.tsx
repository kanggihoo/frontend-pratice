import Link from "next/link";

// ─── [Props 타입 어노테이션] ────────────────────────────────────────────────
// 이 컴포넌트는 searchParams를 받습니다.
//
// JavaScript (구 버전):
//   async function PostsPage({ searchParams }) { ... }
//
// TypeScript + Next.js 15+:
//   - lib/types.ts 에 PostsPageProps를 정의하고 import해서 사용하세요.
//   - searchParams는 Promise 타입이므로 함수 안에서 await 해야 합니다.
//
// 힌트: import type { PostsPageProps } from "@/lib/types";
//       import type { Post } from "@/lib/types";

// TODO: PostsPageProps를 import하고 아래 함수에 타입을 추가하세요.
export default async function PostsPage({ searchParams }) { // ← 타입 없음 (에러 발생)
  // ─── [searchParams await] ──────────────────────────────────────────────────
  // TODO: searchParams를 await하여 resolvedParams에 담으세요.
  // Next.js 15+: searchParams는 Promise이므로 반드시 await 해야 합니다.
  // 힌트: const resolvedParams = await searchParams;
  const resolvedParams = searchParams; // ← 수정 필요

  const userId = resolvedParams?.userId ? Number(resolvedParams.userId) : undefined;

  // ─── [API 응답 타입 단언] ──────────────────────────────────────────────────
  // TODO: fetch 응답에 타입을 추가하세요.
  // 힌트: .then((res) => res.json() as Promise<Post[]>)
  const posts = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((res) => res.json()); // ← 타입 없음

  const filtered = userId
    ? posts.filter((post) => post.userId === userId)
    : posts;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">블로그 포스트</h1>
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← 홈으로
        </Link>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <Link
          href="/posts"
          className={`px-3 py-1 rounded-full text-sm border transition-colors ${
            !userId
              ? "bg-blue-600 text-white border-blue-600"
              : "text-gray-600 border-gray-300 hover:border-blue-400"
          }`}
        >
          전체
        </Link>
        {[1, 2, 3].map((uid) => (
          <Link
            key={uid}
            href={`/posts?userId=${uid}`}
            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
              userId === uid
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-600 border-gray-300 hover:border-blue-400"
            }`}
          >
            User {uid}
          </Link>
        ))}
      </div>

      <ul className="space-y-3">
        {filtered.slice(0, 20).map((post) => (
          <li key={post.id}>
            <Link
              href={`/posts/${post.id}`}
              className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-gray-800 leading-snug">
                  {post.title}
                </p>
                <span className="text-xs text-gray-400 shrink-0 mt-1">
                  #{post.id}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                {post.body}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
