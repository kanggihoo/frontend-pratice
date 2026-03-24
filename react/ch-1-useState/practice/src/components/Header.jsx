// ─── [Props 받기] ────────────────────────────────
// 이 컴포넌트는 부모(App)로부터 두 개의 props를 받습니다:
//   - searchQuery: 현재 검색어 (문자열)
//   - onSearchChange: 검색어가 변경될 때 호출하는 함수

export default function Header({ searchQuery, onSearchChange }) {
  return (
    // ─── [헤더 스타일링] ─────────────────────────────
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl flex items-center justify-between p-4 gpa-4">
        <h1 className="text-2xl font-bold text-indigo-600">🛍️ 상품 마켓</h1>
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="상품명을 검색하세요..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:outline-none transition  "
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </div>
    </header>
  );
}
