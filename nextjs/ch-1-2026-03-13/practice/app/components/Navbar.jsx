// ─── [next/link 임포트] ──────────────────────────────────
// Next.js에서는 페이지 간 이동 시 HTML <a> 태그 대신 next/link의 Link 컴포넌트를 사용합니다.

import Link from "next/link";

// ─── [네비게이션 링크 데이터] ──────────────────────────────
// 네비게이션에 표시할 링크 목록을 배열로 정의합니다.
// 각 항목은 href(경로)와 label(표시 텍스트)을 가집니다.
// Next.js App Router에서 경로는 app/ 폴더 구조와 일치합니다:
//   "/" → app/page.jsx
//   "/about" → app/about/page.jsx
//   "/contact" → app/contact/page.jsx
//

const navLinks = [
  { href: "/", label: "홈" },
  { href: "/about", label: "회사 소개" },
  { href: "/contact", label: "문의하기" },
];

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* ─── [로고] ──────────────────────────────────────────
            Link 컴포넌트를 사용하여 홈으로 이동하는 로고를 만드세요.
            힌트: <Link href="/" className="text-xl font-bold text-blue-700">NovaTech</Link> */}
        <div className="text-xl font-bold">
          <Link href="/" className="text-xl font-bold text-blue-700">
            NovaTech
          </Link>
        </div>

        {/* ─── [네비게이션 메뉴] ────────────────────────────────── */}
        <ul className="flex gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-600 hover:text-blue-700 font-medium transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
