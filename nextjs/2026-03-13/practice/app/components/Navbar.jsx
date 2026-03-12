// ─── [next/link 임포트] ──────────────────────────────────
// Next.js에서는 페이지 간 이동 시 HTML <a> 태그 대신 next/link의 Link 컴포넌트를 사용합니다.
// Link는 클라이언트 사이드 네비게이션을 지원하여 페이지 전환이 빠릅니다.
// React Router의 <Link to="...">와 비슷하지만, href 속성을 사용합니다.
//
// 힌트: import Link from "next/link";


// ─── [네비게이션 링크 데이터] ──────────────────────────────
// 네비게이션에 표시할 링크 목록을 배열로 정의합니다.
// 각 항목은 href(경로)와 label(표시 텍스트)을 가집니다.
// Next.js App Router에서 경로는 app/ 폴더 구조와 일치합니다:
//   "/" → app/page.jsx
//   "/about" → app/about/page.jsx
//   "/contact" → app/contact/page.jsx
//
// 힌트: const navLinks = [{ href: "/", label: "홈" }, ...];
const navLinks = [];

export default function Navbar() {
  return (
    // ─── [헤더 스타일링] ──────────────────────────────────
    // 상단에 고정되는 네비게이션 바를 만드세요.
    // - 흰색 배경 (bg-white)
    // - 하단 테두리 (border-b border-gray-200)
    // - 상단 고정 (sticky top-0)
    // - 다른 요소 위에 표시 (z-50)
    //
    // 힌트: className="bg-white border-b border-gray-200 sticky top-0 z-50"
    <header className="">
      {/* ─── [네비게이션 컨테이너] ──────────────────────────────
          최대 너비를 제한하고 가운데 정렬하세요.
          좌우에 로고와 메뉴를 배치하려면 Flexbox + space-between을 사용합니다.
          힌트: className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between" */}
      <nav className="">
        {/* ─── [로고] ──────────────────────────────────────────
            Link 컴포넌트를 사용하여 홈으로 이동하는 로고를 만드세요.
            힌트: <Link href="/" className="text-xl font-bold text-blue-700">NovaTech</Link> */}
        <div className="text-xl font-bold">NovaTech</div>

        {/* ─── [네비게이션 메뉴] ──────────────────────────────────
            navLinks 배열을 map()으로 순회하여 각 링크를 렌더링하세요.
            - <ul>과 <li>로 시맨틱한 목록 구조를 만듭니다.
            - 각 <li> 안에 <Link> 컴포넌트를 사용합니다.
            - map 사용 시 key 속성을 잊지 마세요!

            힌트:
            <ul className="flex gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-600 hover:text-blue-700 font-medium transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul> */}
        <ul>
          {/* 여기에 네비게이션 링크를 렌더링하세요 */}
        </ul>
      </nav>
    </header>
  );
}
