// ─── [상세 페이지 not-found.js] ──────────────────────
// 존재하지 않는 게시글 ID에 접근했을 때 표시되는 404 페이지입니다.
// page.js에서 notFound() 함수를 호출하면 이 컴포넌트가 렌더링됩니다.
// ─────────────────────────────────────────────────────

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* ─── [404 UI] ────────────────────────────────
       * 사용자 친화적인 404 UI를 만들어보세요.
       * - 이모지: 📭
       * - 제목: "존재하지 않는 게시글"
       * - 설명 텍스트
       * - 목록으로 돌아가는 Link
       *
       * Tailwind 힌트:
       * bg-amber-50 border border-amber-200 rounded-2xl p-10
       * ─────────────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold mb-2">존재하지 않는 게시글</h2>
        <p className="mb-6">
          해당 ID의 게시글이 존재하지 않습니다. URL을 다시 확인해주세요.
        </p>
        <Link href="/posts">← 게시글 목록으로 돌아가기</Link>
      </div>
    </div>
  );
}
