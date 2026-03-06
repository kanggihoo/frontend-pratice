// ─── [Props 받기] ────────────────────────────────
// 이 컴포넌트는 부모(App)로부터 두 개의 props를 받습니다:
//   - searchQuery: 현재 검색어 (문자열)
//   - onSearchChange: 검색어가 변경될 때 호출하는 함수
// 힌트: function Header({ searchQuery, onSearchChange }) { ... }

export default function Header() {
  return (
    // ─── [헤더 스타일링] ─────────────────────────────
    // <header>에 다음 Tailwind 클래스를 적용하세요:
    //   bg-white shadow-sm sticky top-0 z-10
    <header>
      {/* ─── [헤더 내부 레이아웃] ────────────────────── */}
      {/* div에 다음 클래스를 적용하세요:                  */}
      {/*   max-w-7xl mx-auto px-4 py-4                  */}
      {/*   flex flex-col sm:flex-row                     */}
      {/*   items-center justify-between gap-4            */}
      <div>
        {/* ─── [로고/타이틀] ──────────────────────────── */}
        {/* h1 태그에 텍스트 "🛍️ 상품 마켓"을 넣으세요   */}
        {/* Tailwind: text-2xl font-bold text-indigo-600  */}
        <h1>상품 마켓</h1>

        {/* ─── [검색 입력창] ──────────────────────────── */}
        {/* input 요소를 만들어 검색 기능을 구현하세요:     */}
        {/*   - type="text"                               */}
        {/*   - placeholder="상품명을 검색하세요..."       */}
        {/*   - value에 searchQuery props를 연결           */}
        {/*   - onChange 이벤트에서 onSearchChange 호출    */}
        {/*     힌트: onChange={(e) => onSearchChange(e.target.value)} */}
        {/* Tailwind: w-full pl-10 pr-4 py-2              */}
        {/*   border border-gray-300 rounded-lg           */}
        {/*   focus:outline-none focus:ring-2              */}
        {/*   focus:ring-indigo-400 focus:border-transparent */}
        <div>
          <input type="text" placeholder="검색 기능을 구현하세요" />
        </div>
      </div>
    </header>
  );
}
