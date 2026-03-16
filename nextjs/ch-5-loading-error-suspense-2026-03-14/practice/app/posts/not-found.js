// ─── [not-found.js — 404 페이지] ────────────────────
// 이 파일은 Next.js App Router의 특수 파일입니다.
// notFound() 함수가 호출되면 이 컴포넌트가 자동으로 렌더링됩니다.
//
// 참고: not-found.js는 서버 컴포넌트입니다. "use client"가 필요 없습니다.

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-10 text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-amber-800 mb-2">
          게시글을 찾을 수 없습니다
        </h2>
        <p className="text-amber-600 mb-6">
          요청하신 게시글이 존재하지 않거나 삭제되었을 수 있습니다.
        </p>
        <Link
          href="/posts"
          className="inline-block bg-amber-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-amber-700 transition-colors"
        >
          ← 게시글 목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
