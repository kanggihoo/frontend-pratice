import useDashboardStore from "../store/dashboardStore";

export default function Header() {
  // ─── [스토어에서 필요한 상태와 액션 가져오기] ──────────
  // dashboardStore에서 아래 항목을 가져오세요:
  // - toggleSidebar: 사이드바 토글 함수
  // - resetFilters: 필터 초기화 함수
  // - searchQuery: 현재 검색어
  // - setSearchQuery: 검색어 변경 함수
  //
  // 힌트: const { toggleSidebar, resetFilters, searchQuery, setSearchQuery } = useDashboardStore();


  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* ─── [사이드바 토글 버튼] ─────────────────────── */}
        {/* onClick에 toggleSidebar를 연결하세요 */}
        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="사이드바 토글"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          데이터 대시보드
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {/* ─── [검색 입력 필드] ───────────────────────── */}
          {/* value에 searchQuery를, onChange에 setSearchQuery를 연결하세요 */}
          {/* 힌트: onChange={(e) => setSearchQuery(e.target.value)} */}
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
        </div>

        {/* ─── [필터 초기화 버튼] ───────────────────────── */}
        {/* onClick에 resetFilters를 연결하세요 */}
        <button
          className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          필터 초기화
        </button>
      </div>
    </header>
  );
}
