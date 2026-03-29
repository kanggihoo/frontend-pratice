import Link from "next/link";
import type { Post, PostsPageProps } from "@/lib/types";

export default async function PostsPage({ searchParams }: PostsPageProps) {
  // Next.js 15+: searchParams도 Promise — await 필수
  const resolvedParams = await searchParams;
  const userId = resolvedParams?.userId ? Number(resolvedParams.userId) : undefined;

  const posts: Post[] = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((res) => res.json() as Promise<Post[]>);

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

      {/* 유저 필터 */}
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
