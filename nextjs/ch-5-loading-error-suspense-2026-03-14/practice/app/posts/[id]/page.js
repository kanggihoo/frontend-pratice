<<<<<<< HEAD
// ─── [Suspense 임포트] ──────────────────────────────
// 댓글 영역을 Suspense로 감싸서 게시글 본문과 독립적으로 스트리밍합니다.
// 힌트: import { Suspense } from "react";

import Link from "next/link";

// ─── [notFound 함수 임포트] ──────────────────────────
// next/navigation에서 notFound 함수를 임포트하세요.
// 이 함수를 호출하면 가장 가까운 not-found.js가 렌더링됩니다.
// 힌트: import { notFound } from "next/navigation";

// ─── [컴포넌트 임포트] ──────────────────────────────
// 힌트:
// import CommentList from "../components/CommentList";
// import CommentSkeleton from "../components/CommentSkeleton";
// import ErrorSimulator from "../components/ErrorSimulator";
=======
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import CommentList from "../components/CommentList";
import CommentSkeleton from "../components/CommentSkeleton";
import ErrorSimulator from "../components/ErrorSimulator";
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// ─── [딜레이 함수] ───────────────────────────────────
<<<<<<< HEAD
// async function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// ─── [게시글 데이터 페칭 함수] ───────────────────────
// id를 받아서 단일 게시글을 가져오세요.
// - 1.5초 딜레이 추가
// - 404 응답이면 null 반환 (나중에 notFound() 호출에 사용)
// - 기타 에러면 throw new Error(...)
//
// async function getPost(id) {
//   await delay(1500);
//   const res = await fetch(`${API_URL}/${id}`);
//   if (!res.ok) {
//     if (res.status === 404) return null;
//     throw new Error("게시글을 불러오는데 실패했습니다.");
//   }
//   return res.json();
// }

// ─── [async 서버 컴포넌트 + params] ─────────────────
// Next.js 15+에서 params는 비동기 객체입니다.
// const { id } = await params; 로 접근해야 합니다.
//
// 힌트: export default async function PostDetailPage({ params }) {
export default function PostDetailPage({ params }) {
  // ─── [params에서 id 추출] ──────────────────────────
  // 힌트: const { id } = await params;

  // ─── [데이터 페칭] ──────────────────────────────────
  // 힌트: const post = await getPost(id);

  // ─── [not-found 처리] ──────────────────────────────
  // post가 null이거나 post.id가 없으면 notFound() 호출
  // 힌트:
  // if (!post || !post.id) {
  //   notFound();
  // }

  // 임시 데이터 (데이터 페칭 구현 전 빌드 에러 방지용)
  const post = { id: "?", title: "게시글 제목", body: "게시글 본문이 여기에 표시됩니다.", userId: 1 };
  const id = "1";
=======
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── [게시글 데이터 페칭 함수] ───────────────────────
async function getPost(id) {
  // - 1.5초 딜레이 추가
  // - 404 응답이면 null 반환 (나중에 notFound() 호출에 사용)
  // - 기타 에러면 throw new Error(...)
  await delay(1500);
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }
  return res.json();
}

// ─── [async 서버 컴포넌트 + params] ─────────────────
export default async function PostDetailPage({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  // post가 null이거나 post.id가 없으면 notFound() 호출
  if (!post || !post.id) notFound();
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/posts"
        className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6"
      >
        ← 목록으로 돌아가기
      </Link>

      {/* 게시글 본문 */}
      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
            #{post.id}
          </span>
<<<<<<< HEAD
          {/* ─── [ErrorSimulator 컴포넌트] ──────────────
           * 에러 시뮬레이션 버튼을 여기에 배치하세요.
           * 힌트: <ErrorSimulator />
           * ─────────────────────────────────────────── */}
=======
          {/* ─── [ErrorSimulator 컴포넌트] ────────────── */}
          <ErrorSimulator />
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-gray-600 leading-relaxed">{post.body}</p>
        <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400">
          작성자 ID: {post.userId}
        </div>
      </article>

      {/* ─── [댓글 섹션 — Suspense 스트리밍] ────────────
       * 댓글 영역을 <Suspense>로 감싸세요.
       * fallback에는 CommentSkeleton을 넣어줍니다.
       * 이렇게 하면 게시글 본문은 먼저 표시되고,
       * 댓글은 데이터가 준비되면 나중에 스트리밍됩니다.
       *
<<<<<<< HEAD
       * 힌트:
       * <section className="mt-8">
       *   <h2 className="text-xl font-bold text-gray-900 mb-4">💬 댓글</h2>
       *   <Suspense fallback={<CommentSkeleton />}>
       *     <CommentList postId={id} />
       *   </Suspense>
       * </section>
       * ─────────────────────────────────────────────── */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">💬 댓글</h2>
        <div className="text-center py-6 text-gray-400">
          Suspense로 CommentList를 감싸서 스트리밍을 구현하세요!
        </div>
=======
       * ─────────────────────────────────────────────── */}

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">💬 댓글</h2>
        <Suspense fallback={<CommentSkeleton />}>
          <CommentList postId={post.id} />
        </Suspense>
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f
      </section>
    </div>
  );
}
