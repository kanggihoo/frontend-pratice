import useDashboardStore from "../store/dashboardStore";
import useToastStore from "../store/toastStore";
import useFilteredData from "../hooks/useFilteredData";

export default function DataTable() {
  const { items, totalItems, totalPages, isLoading, currentPage } =
    useFilteredData();
  const { setCurrentPage } = useDashboardStore();
  const { toggleFavorite, favorites } = useDashboardStore();
  const { addToast } = useToastStore();

  const handleFavorite = (item) => {
    if (item.type !== "users") return;
    toggleFavorite(item.originalId);

    const isFav = favorites.includes(item.originalId);
    addToast(
      isFav
        ? `${item.name}을(를) 즐겨찾기에서 제거했습니다.`
        : `${item.name}을(를) 즐겨찾기에 추가했습니다.`,
      isFav ? "info" : "success"
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-10 h-10 bg-gray-200 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* 테이블 헤더 */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">
          검색 결과{" "}
          <span className="text-gray-400 font-normal">
            ({totalItems}건)
          </span>
        </h2>
      </div>

      {/* 데이터 리스트 */}
      {items.length === 0 ? (
        <div className="p-12 text-center text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-50">
          {items.map((item) => (
            <li
              key={item.id}
              className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center gap-4"
            >
              <span className="text-2xl w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg shrink-0">
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{item.detail}</p>
                <p className="text-xs text-gray-400">{item.subDetail}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    item.type === "users"
                      ? "bg-blue-50 text-blue-600"
                      : item.type === "posts"
                        ? "bg-emerald-50 text-emerald-600"
                        : item.type === "todos"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-purple-50 text-purple-600"
                  }`}
                >
                  {item.type === "users"
                    ? "사용자"
                    : item.type === "posts"
                      ? "게시물"
                      : item.type === "todos"
                        ? "할 일"
                        : "앨범"}
                </span>
                {item.type === "users" && (
                  <button
                    onClick={() => handleFavorite(item)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="즐겨찾기 토글"
                  >
                    {favorites.includes(item.originalId) ? "⭐" : "☆"}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            이전
          </button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 text-sm rounded-lg transition-colors ${
                  currentPage === pageNum
                    ? "bg-blue-500 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
