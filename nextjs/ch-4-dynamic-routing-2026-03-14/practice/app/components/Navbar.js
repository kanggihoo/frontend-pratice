// ─── [네비게이션 바 컴포넌트] ─────────────────────────────
// 이 컴포넌트는 모든 페이지에서 공통으로 보여지는 상단 내비게이션 바입니다.
// Next.js의 <Link> 컴포넌트를 사용하여 페이지 간 이동을 구현해야 합니다.
//
// 📌 핵심 개념: next/link
// - HTML의 <a> 태그 대신 Next.js의 <Link> 컴포넌트를 사용하면
//   전체 페이지를 새로고침하지 않고 클라이언트 사이드 네비게이션이 이루어집니다.
// - 사용법: import Link from "next/link"; → <Link href="/경로">텍스트</Link>

// ─── [Link 임포트] ─────────────────────────────────────
// 힌트: next/link에서 Link 컴포넌트를 임포트하세요.
// import ??? from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* ─── [로고 링크] ───────────────────────────────
            힌트: <Link> 컴포넌트를 사용하여 홈("/")으로 이동하는 링크를 만드세요.
            className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
        */}
        <a href="/" className="text-xl font-bold text-indigo-600">
          📝 DevBlog
        </a>

        <div className="flex items-center gap-6">
          {/* ─── [네비게이션 링크들] ────────────────────────
              힌트: 아래 <a> 태그들을 <Link> 컴포넌트로 교체하세요.
              - 홈: href="/"
              - 포스트 목록: href="/posts"
              className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          */}
          <a href="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
            홈
          </a>
          <a href="/posts" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
            포스트 목록
          </a>
        </div>
      </div>
    </nav>
  );
}
