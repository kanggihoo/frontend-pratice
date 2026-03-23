export default function FavoritesList({
  favoriteUsers,
  onRemoveFavorite,
  onResetFavorites,
}) {
  return (
    // ─── [즐겨찾기 패널] ───────────────────────────
    // sticky 포지션으로 스크롤 시에도 고정되는 패널입니다.
    // 힌트: "bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-8"
    <div className="">
      {/* ─── [헤더] ───────────────────────────
          - 제목: "즐겨찾기" + 별 아이콘 + 개수 표시
          - favoriteUsers.length > 0일 때만 "전체 삭제" 버튼 표시
          - "전체 삭제" 버튼은 onResetFavorites를 호출
      */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          즐겨찾기 ({favoriteUsers.length})
        </h2>
      </div>

      {/* ─── [즐겨찾기 목록 또는 빈 상태] ───────────────────────────
          조건부 렌더링을 사용하세요:

          favoriteUsers.length === 0 일 때:
          - 안내 메시지 표시: "유저 카드의 별 아이콘을 클릭하여 즐겨찾기에 추가해보세요"
          - 부가 설명: "새로고침해도 유지됩니다 (localStorage)"

          favoriteUsers.length > 0 일 때:
          - <ul>로 즐겨찾기된 유저 목록을 표시
          - 각 유저: 아바타(첫 글자) + 이름 + 회사명 + X(삭제) 버튼
          - 삭제 버튼: onRemoveFavorite(user.id) 호출

          힌트:
            {favoriteUsers.length === 0 ? (
              <div className="text-center py-8">빈 상태...</div>
            ) : (
              <ul className="space-y-3">
                {favoriteUsers.map(user => (
                  <li key={user.id}>...</li>
                ))}
              </ul>
            )}
      */}
      <div className="text-center py-8">
        <p className="text-gray-400 text-sm">
          유저 카드의 별 아이콘을 클릭하여
          <br />
          즐겨찾기에 추가해보세요
        </p>
        <p className="text-gray-300 text-xs mt-2">
          새로고침해도 유지됩니다 (localStorage)
        </p>
      </div>

      {/* localStorage 설명 */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          useLocalStorage 훅으로 브라우저에 저장됩니다
        </p>
      </div>
    </div>
  );
}
