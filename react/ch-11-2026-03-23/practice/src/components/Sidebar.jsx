import useDashboardStore from "../store/dashboardStore";
import { CATEGORIES, SORT_OPTIONS, PAGE_SIZE_OPTIONS } from "../data/mockData";

export default function Sidebar() {
  // ─── [스토어에서 필요한 상태와 액션 가져오기] ──────────
  // 아래 항목을 가져오세요:
  // - isSidebarOpen: 사이드바 열림 여부
  // - activeCategory, setActiveCategory: 카테고리 상태/변경
  // - sortOption, setSortOption: 정렬 상태/변경
  // - pageSize, setPageSize: 페이지 크기 상태/변경


  // ─── [사이드바 닫힘 처리] ─────────────────────────────
  // isSidebarOpen이 false면 null을 반환하여 사이드바를 숨깁니다.
  // 힌트: if (!isSidebarOpen) return null;


  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col gap-6">
      {/* ─── [카테고리 필터 섹션] ───────────────────────── */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          카테고리
        </h2>
        <nav className="flex flex-col gap-1">
          {/* ─── [카테고리 버튼 리스트 렌더링] ──────────── */}
          {/* CATEGORIES 배열을 map()으로 순회하며 버튼을 렌더링하세요.
              - key: cat.id
              - onClick: () => setActiveCategory(cat.id)
              - 활성 상태에 따라 스타일 변경:
                activeCategory === cat.id일 때:
                  "bg-blue-50 text-blue-700 font-medium"
                아닐 때:
                  "text-gray-600 hover:bg-gray-50"
              - 버튼 내용: cat.icon + cat.label */}

        </nav>
      </div>

      {/* ─── [정렬 옵션 섹션] ──────────────────────────── */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          정렬
        </h2>
        {/* ─── [정렬 select 태그] ──────────────────────── */}
        {/* value에 sortOption, onChange에 setSortOption을 연결하세요.
            SORT_OPTIONS 배열을 map()으로 순회하며 option 태그를 렌더링하세요. */}
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="default">기본 정렬</option>
        </select>
      </div>

      {/* ─── [페이지 크기 섹션] ────────────────────────── */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          페이지당 항목 수
        </h2>
        <div className="flex flex-wrap gap-2">
          {/* ─── [페이지 크기 버튼 렌더링] ────────────── */}
          {/* PAGE_SIZE_OPTIONS 배열을 map()으로 순회하며 버튼을 렌더링하세요.
              - onClick: () => setPageSize(size)
              - 활성 스타일: pageSize === size일 때 "bg-blue-500 text-white"
              - 비활성 스타일: "bg-gray-100 text-gray-600 hover:bg-gray-200" */}

        </div>
      </div>
    </aside>
  );
}
