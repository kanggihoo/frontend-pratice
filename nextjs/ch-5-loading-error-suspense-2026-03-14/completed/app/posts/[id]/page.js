import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommentList from "../components/CommentList";
import CommentSkeleton from "../components/CommentSkeleton";
import ErrorSimulator from "../components/ErrorSimulator";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getPost(id) {
  await delay(1500); // 1.5초 딜레이
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }

  return res.json();
}

export default async function PostDetailPage({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post || !post.id) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/posts"
        className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6"
      >
        ← 목록으로 돌아가기
      </Link>

      {/* 게시글 본문 — 이 부분은 page가 로드되면 바로 보입니다 */}
      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
            #{post.id}
          </span>
          <ErrorSimulator />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-gray-600 leading-relaxed">{post.body}</p>
        <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400">
          작성자 ID: {post.userId}
        </div>
      </article>

      {/* 댓글 섹션 — Suspense로 감싸서 게시글 본문과 독립적으로 스트리밍 */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">💬 댓글</h2>
        <Suspense fallback={<CommentSkeleton />}>
          <CommentList postId={id} />
        </Suspense>
      </section>
    </div>
  );
}
