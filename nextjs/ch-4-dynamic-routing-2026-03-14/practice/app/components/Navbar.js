// ─── [네비게이션 바 컴포넌트] ─────────────────────────────

import Link from "next/link";

// 이 컴포넌트는 모든 페이지에서 공통으로 보여지는 상단 내비게이션 바입니다.
export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          📝 DevBlog
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            홈
          </Link>
          <Link
            href="/posts"
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            포스트 목록
          </Link>
        </div>
      </div>
    </nav>
  );
}
