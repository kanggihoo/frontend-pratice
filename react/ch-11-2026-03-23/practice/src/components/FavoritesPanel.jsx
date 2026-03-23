import useDashboardStore from "../store/dashboardStore";
// ─── [쿼리 훅 import] ──────────────────────────────────
// useUsersQuery를 import하세요.
// 힌트: import { useUsersQuery } from "../hooks/useDashboardQueries";


export default function FavoritesPanel() {
  // ─── [스토어에서 즐겨찾기 상태 가져오기] ──────────────
  // favorites 배열과 toggleFavorite 함수를 가져오세요.
  // 힌트: const { favorites, toggleFavorite } = useDashboardStore();


  // ─── [서버 데이터에서 즐겨찾기 사용자 필터링] ─────────
  // useUsersQuery()로 전체 사용자 목록을 가져온 뒤,
  // favorites 배열에 포함된 사용자만 필터링합니다.
  //
  // 이것이 Zustand(클라이언트 상태) + TanStack Query(서버 상태) 연계의 예시입니다!
  // → Zustand의 favorites 배열로 TanStack Query의 서버 데이터를 필터링합니다.
  //
  // 힌트:
  //   const { data: users } = useUsersQuery();
  //   const favoriteUsers = users?.filter((user) => favorites.includes(user.id)) ?? [];


  // ─── [즐겨찾기가 없으면 null 반환] ───────────────────
  // favoriteUsers.length === 0이면 아무것도 렌더링하지 않습니다.


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">
        {/* ─── [즐겨찾기 사용자 수 표시] ─────────────── */}
        즐겨찾기 사용자 (0명)
      </h2>
      <div className="flex flex-wrap gap-2">
        {/* ─── [즐겨찾기 사용자 목록 렌더링] ─────────── */}
        {/* favoriteUsers를 map()으로 순회하며 각 사용자를 표시하세요.
            각 사용자: 이름 + 제거(✕) 버튼
            제거 버튼의 onClick: () => toggleFavorite(user.id)

            힌트:
            {favoriteUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
                <span className="text-sm font-medium text-amber-800">{user.name}</span>
                <button onClick={() => toggleFavorite(user.id)} className="text-amber-400 hover:text-amber-600 text-xs">✕</button>
              </div>
            ))} */}

      </div>
    </div>
  );
}
