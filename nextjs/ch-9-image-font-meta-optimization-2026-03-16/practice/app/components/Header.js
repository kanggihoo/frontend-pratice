// ─── [Header 컴포넌트] ──────────────────────────────────
// 이 컴포넌트는 서버 컴포넌트입니다. (상태/이벤트 없음)
// next/link를 사용하여 클라이언트 사이드 네비게이션을 구현하세요.

// ─── [next/link 임포트] ─────────────────────────────────
// 힌트: import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* ─── [로고 링크] ──────────────────────────────────
         * 힌트: <Link href="/">로 감싸고,
         * font-[family-name:var(--font-playfair)]로 제목 폰트를 적용하세요.
         * 폰트가 아직 설정되지 않았다면 layout.js를 먼저 완성하세요.
         */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">Snap</span>
          <span className="text-2xl font-bold text-blue-600">Gallery</span>
        </div>

        {/* ─── [네비게이션 링크] ─────────────────────────────
         * 힌트: <a> 대신 <Link>를 사용하면 페이지 전체 리로드 없이
         * 클라이언트 사이드에서 부드럽게 이동합니다.
         * 각 카테고리 경로: /gallery/nature, /gallery/architecture 등
         */}
        <nav className="flex gap-6 text-sm font-medium text-gray-600">
          {/* TODO: Link 컴포넌트로 교체하세요 */}
          <span className="hover:text-gray-900 transition-colors cursor-pointer">
            홈
          </span>
          <span className="hover:text-gray-900 transition-colors cursor-pointer">
            자연
          </span>
          <span className="hover:text-gray-900 transition-colors cursor-pointer">
            건축
          </span>
          <span className="hover:text-gray-900 transition-colors cursor-pointer">
            음식
          </span>
          <span className="hover:text-gray-900 transition-colors cursor-pointer">
            여행
          </span>
        </nav>
      </div>
    </header>
  );
}
