import Link from "next/link";
import type { Post, Comment, PostDetailPageProps } from "@/lib/types";

// generateStaticParams 반환 타입: { id: string }[] 배열
// URL params는 항상 string이므로 id는 반드시 string으로
export async function generateStaticParams(): Promise<{ id: string }[]> {
  const posts: Post[] = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((res) => res.json() as Promise<Post[]>);

  // post.id는 number → String()으로 변환해야 함
  return posts.slice(0, 10).map((post) => ({
    id: String(post.id),
  }));
}

export default async function PostDetailPage({
  params,
  searchParams,
}: PostDetailPageProps) {
  // Next.js 15+: params는 Promise — await로 unwrap
  const { id } = await params;

  // URL params는 항상 string → 숫자가 필요하면 Number()로 변환
  const postId = Number(id);

  // searchParams도 Promise — await 필수
  const resolvedSearch = await searchParams;
  const showComments = resolvedSearch?.tab !== "info";

  const [post, comments] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(
      (res) => res.json() as Promise<Post>
    ),
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    ).then((res) => res.json() as Promise<Comment[]>),
  ]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      {/* 네비게이션 */}
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          홈
        </Link>
        <span>/</span>
        <Link href="/posts" className="hover:text-blue-600">
          블로그
        </Link>
        <span>/</span>
        <span className="text-gray-800">#{postId}</span>
      </div>

      {/* 포스트 본문 */}
      <article className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-3 capitalize">
          {post.title}
        </h1>
        <p className="text-gray-600 leading-relaxed">{post.body}</p>
        <p className="text-xs text-gray-400 mt-4">User ID: {post.userId}</p>
      </article>

      {/* 탭 — tab searchParam으로 제어 */}
      <div className="flex gap-2 mb-4">
        <Link
          href={`/posts/${id}`}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            showComments
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          댓글 ({comments.length})
        </Link>
        <Link
          href={`/posts/${id}?tab=info`}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !showComments
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          포스트 정보
        </Link>
      </div>

      {showComments ? (
        <ul className="space-y-3">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <p className="font-medium text-sm text-gray-800">{comment.name}</p>
              <p className="text-xs text-blue-500 mb-2">{comment.email}</p>
              <p className="text-sm text-gray-600">{comment.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Post ID</span>
            <span className="font-mono">{post.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">User ID</span>
            <span className="font-mono">{post.userId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">댓글 수</span>
            <span className="font-mono">{comments.length}</span>
          </div>
        </div>
      )}
    </main>
  );
}
