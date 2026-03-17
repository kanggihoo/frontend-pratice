// 서버 컴포넌트 (기본값) — "use client" 선언이 없으므로 서버에서 렌더링됩니다.
// 정적인 UI만 담당하므로 클라이언트 번들에 포함되지 않아 성능상 이점이 있습니다.

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">ShopNow</h1>
            <p className="text-sm text-gray-500 mt-1">스마트한 쇼핑의 시작</p>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">
              홈
            </span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">
              카테고리
            </span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">
              장바구니
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
}
