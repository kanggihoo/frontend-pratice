"use client";

// ─── [클라이언트 컴포넌트 선언] ──────────────────────
// ✅ 위의 "use client" 지시어는 이미 추가되어 있습니다.
// error.js는 반드시 클라이언트 컴포넌트여야 합니다.
// 참고: "use client"가 없으면 빌드 자체가 실패합니다.

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-10 text-center max-w-md">
        <div className="text-5xl mb-4">🔥</div>
        <h2 className="text-2xl font-bold text-red-800 mb-2">
          게시글 로딩 실패
        </h2>
<<<<<<< HEAD
        {/* ─── [에러 메시지] ───────────────────────────
         * error.message를 표시하세요.
         * ─────────────────────────────────────────── */}
        <p className="text-red-600 mb-6 text-sm">에러 메시지를 표시하세요.</p>
        <div className="flex gap-3 justify-center">
          {/* ─── [다시 시도 버튼] ──────────────────────
           * onClick에 reset() 함수를 연결하세요.
           * ─────────────────────────────────────── */}
          <button className="bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors cursor-pointer">
=======
        <p className="text-red-600 mb-6 text-sm">
          {error.message || "게시글을 불러오는 중 오류가 발생했습니다."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors cursor-pointer"
          >
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f
            🔄 다시 시도
          </button>
          <Link
            href="/posts"
            className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            ← 목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
