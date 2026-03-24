export default function FavoritesList({
  favoriteUsers,
  onRemoveFavorite,
  onResetFavorites,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          즐겨찾기
          <span className="text-sm font-normal text-gray-400">
            ({favoriteUsers.length})
          </span>
        </h2>
        {favoriteUsers.length > 0 && (
          <button
            onClick={onResetFavorites}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            전체 삭제
          </button>
        )}
      </div>

      {favoriteUsers.length === 0 ? (
        <div className="text-center py-8">
          <svg
            className="w-12 h-12 text-gray-200 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <p className="text-gray-400 text-sm">
            유저 카드의 별 아이콘을 클릭하여
            <br />
            즐겨찾기에 추가해보세요
          </p>
          <p className="text-gray-300 text-xs mt-2">
            새로고침해도 유지됩니다 (localStorage)
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {favoriteUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.company.name}</p>
                </div>
              </div>
              <button
                onClick={() => onRemoveFavorite(user.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                title="즐겨찾기 해제"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* localStorage 설명 */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          useLocalStorage 훅으로 브라우저에 저장됩니다
        </p>
      </div>
    </div>
  );
}
