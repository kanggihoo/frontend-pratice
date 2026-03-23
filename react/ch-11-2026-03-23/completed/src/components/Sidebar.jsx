import useDashboardStore from "../store/dashboardStore";
import { CATEGORIES, SORT_OPTIONS, PAGE_SIZE_OPTIONS } from "../data/mockData";

export default function Sidebar() {
  const {
    isSidebarOpen,
    activeCategory,
    setActiveCategory,
    sortOption,
    setSortOption,
    pageSize,
    setPageSize,
  } = useDashboardStore();

  if (!isSidebarOpen) return null;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col gap-6">
      {/* 카테고리 필터 */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          카테고리
        </h2>
        <nav className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                activeCategory === cat.id
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* 정렬 옵션 */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          정렬
        </h2>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* 페이지 크기 */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          페이지당 항목 수
        </h2>
        <div className="flex flex-wrap gap-2">
          {PAGE_SIZE_OPTIONS.map((size) => (
            <button
              key={size}
              onClick={() => setPageSize(size)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                pageSize === size
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {size}개
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
