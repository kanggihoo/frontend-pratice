import useDashboardStore from "../store/dashboardStore";
import useToastStore from "../store/toastStore";
import useFilteredData from "../hooks/useFilteredData";

export default function DataTable() {
  // ─── [필터링된 데이터 가져오기] ───────────────────────
  // useFilteredData() 훅을 호출하여 데이터를 가져오세요.
  // 힌트: const { items, totalItems, totalPages, isLoading, currentPage } = useFilteredData();

  const { items, totalItems, totalPages, isLoading, currentPage } = useFilteredData();

  // ─── [스토어 액션 가져오기] ───────────────────────────
  // dashboardStore: setCurrentPage, toggleFavorite, favorites
  // toastStore: addToast
  //
  // 힌트:
  //   const { setCurrentPage, toggleFavorite, favorites } = useDashboardStore();
  //   const { addToast } = useToastStore();


  // ─── [즐겨찾기 토글 핸들러] ──────────────────────────
  // item을 받아서:
  // 1. item.type이 "users"가 아니면 return (사용자만 즐겨찾기 가능)
  // 2. toggleFavorite(item.originalId) 호출
  // 3. addToast()로 추가/제거 알림 표시
  //
  // 힌트:
  //   const handleFavorite = (item) => {
  //     if (item.type !== "users") return;
  //     toggleFavorite(item.originalId);
  //     const isFav = favorites.includes(item.originalId);
  //     addToast(
  //       isFav ? `${item.name}을(를) 즐겨찾기에서 제거했습니다.` : `${item.name}을(를) 즐겨찾기에 추가했습니다.`,
  //       isFav ? "info" : "success"
  //     );
  //   };


  // ─── [로딩 상태 UI] ──────────────────────────────────
  // isLoading이 true면 스켈레톤 UI를 반환하세요.
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

      {/* ─── [데이터 리스트 렌더링] ─────────────────────── */}
      {/* items 배열이 비어있으면 "검색 결과가 없습니다" 표시 */}
      {/* items.map()으로 각 아이템을 렌더링하세요:
          - key: item.id
          - 아이콘(item.icon), 이름(item.name), 세부정보(item.detail, item.subDetail)
          - 카테고리 배지 (item.type에 따라 색상 다르게)
          - users 타입인 경우 즐겨찾기 버튼 표시 */}
      {items.length === 0 ? (
        <div className="p-12 text-center text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-50">
          {/* ─── [아이템 리스트 렌더링] ─────────────────── */}
          {/* items.map()으로 각 아이템을 <li>로 렌더링하세요.
              각 <li>에 포함할 내용:
              1. 아이콘: <span>{item.icon}</span>
              2. 정보: item.name, item.detail, item.subDetail
              3. 카테고리 배지: item.type에 따른 한글 레이블과 색상
              4. 즐겨찾기 버튼: item.type === "users"일 때만 표시

              힌트:
              {items.map((item) => (
                <li key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                  <span className="text-2xl w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg shrink-0">
                    {item.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 truncate">{item.detail}</p>
                    <p className="text-xs text-gray-400">{item.subDetail}</p>
                  </div>
                  ...배지와 즐겨찾기 버튼...
                </li>
              ))} */}

        </ul>
      )}

      {/* ─── [페이지네이션] ─────────────────────────────── */}
      {/* totalPages > 1일 때만 페이지네이션 UI를 표시하세요.
          - "이전" 버튼: currentPage === 1이면 disabled
          - 페이지 번호 버튼들: 최대 5개 표시
          - "다음" 버튼: currentPage === totalPages이면 disabled
          - onClick에 setCurrentPage 연결

          힌트:
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-center gap-2">
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ...>이전</button>
              ...페이지 번호 버튼들...
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} ...>다음</button>
            </div>
          )} */}

    </div>
  );
}
