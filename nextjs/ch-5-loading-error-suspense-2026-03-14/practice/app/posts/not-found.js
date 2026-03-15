// ─── [not-found.js — 404 페이지] ────────────────────
// 이 파일은 Next.js App Router의 특수 파일입니다.
// notFound() 함수가 호출되면 이 컴포넌트가 자동으로 렌더링됩니다.
//
// 참고: not-found.js는 서버 컴포넌트입니다. "use client"가 필요 없습니다.
// ─────────────────────────────────────────────────────

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* ─── [404 UI 구성] ─────────────────────────────
       * 사용자에게 친절한 404 페이지를 디자인하세요.
       * - 큰 아이콘이나 이모지로 시각적 피드백
       * - "게시글을 찾을 수 없습니다" 같은 안내 메시지
       * - 게시글 목록으로 돌아가는 Link 컴포넌트
       *
       * Tailwind 힌트:
       * - 배경: bg-amber-50, 테두리: border border-amber-200
       * - 둥근 모서리: rounded-2xl, 패딩: p-10
       * - 텍스트 색상: text-amber-800 (제목), text-amber-600 (설명)
       * ─────────────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold mb-2">게시글을 찾을 수 없습니다</h2>
        <p className="mb-6">
          요청하신 게시글이 존재하지 않거나 삭제되었을 수 있습니다.
        </p>
        <Link href="/posts">← 게시글 목록으로 돌아가기</Link>
      </div>
    </div>
  );
}
