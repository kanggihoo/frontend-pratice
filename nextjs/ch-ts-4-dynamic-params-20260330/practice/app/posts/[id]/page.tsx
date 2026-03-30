import Link from "next/link";

// ─── [Props 타입 어노테이션] ────────────────────────────────────────────────
// 이 컴포넌트는 동적 라우트 [id] 페이지입니다.
//
// JavaScript (구 버전, Next.js 14):
//   async function Page({ params }) {
//     const { id } = params;           // 동기적으로 접근
//   }
//
// TypeScript + Next.js 15+ (현재):
//   interface PostDetailPageProps {
//     params: Promise<{ id: string }>;  // Promise로 감싸야 함
//   }
//   async function Page({ params }: PostDetailPageProps) {
//     const { id } = await params;      // await 필수
//   }
//
import type { PostDetailPageProps, Post, Comment } from "@/lib/types";

// ─── [generateStaticParams 반환 타입] ─────────────────────────────────────
// generateStaticParams는 빌드 타임에 생성할 동적 경로 목록을 반환합니다.
//
// JavaScript:
//   export async function generateStaticParams() {
//     return posts.map(post => ({ id: post.id }));   // id가 number → 버그!
//   }
//
// TypeScript:
//   export async function generateStaticParams(): Promise<{ id: string }[]> {
//     return posts.map(post => ({ id: String(post.id) })); // string으로 변환
//   }
//
// ⚠️ URL params는 항상 string입니다. number를 그대로 반환하면 타입 에러!

// TODO: generateStaticParams 함수에 반환 타입을 추가하고,
//       post.id를 string으로 변환하는 코드를 작성하세요.
export async function generateStaticParams(): Promise<{ id: string }[]> {
  // ← 반환 타입 없음
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (res) => res.json() as Promise<Post[]>,
  ); // ← 타입 없음

  return posts.slice(0, 10).map((post) => ({
    id: String(post.id), // number → string 변환 (이 부분은 완성본에서 제공)
  }));
}

// TODO: PostDetailPageProps를 import하고 아래 함수 매개변수에 타입을 추가하세요.
export default async function PostDetailPage({
  params,
  searchParams,
}: PostDetailPageProps) {
  // ← 타입 없음 (에러 발생)
  // ─── [params await] ────────────────────────────────────────────────────────
  // TODO: params를 await하여 id를 추출하세요.
  // Next.js 15+: params는 Promise이므로 await 없이 접근하면 에러!
  //

  const { id } = await params; // ← 수정 필요 (await 추가)

  // URL params는 항상 string → number가 필요하면 Number()로 변환
  const postId = Number(id);

  // ─── [searchParams await] ──────────────────────────────────────────────────
  // TODO: searchParams를 await하세요.
  const resolvedSearch = await searchParams; // ← 수정 필요 (await 추가)
  const showComments = resolvedSearch?.tab !== "info";

  // ─── [API 응답 타입 단언] ──────────────────────────────────────────────────
  // TODO: fetch 응답에 Post, Comment[] 타입을 추가하세요.
  // 힌트: .then((res) => res.json() as Promise<Post>)
  //       .then((res) => res.json() as Promise<Comment[]>)
  const [post, comments] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(
      (res) => res.json() as Promise<Post>,
    ),
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then(
      (res) => res.json() as Promise<Comment[]>,
    ), // ← 타입 없음
  ]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
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

      <article className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-3 capitalize">
          {post.title}
        </h1>
        <p className="text-gray-600 leading-relaxed">{post.body}</p>
        <p className="text-xs text-gray-400 mt-4">User ID: {post.userId}</p>
      </article>

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
              <p className="font-medium text-sm text-gray-800">
                {comment.name}
              </p>
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
