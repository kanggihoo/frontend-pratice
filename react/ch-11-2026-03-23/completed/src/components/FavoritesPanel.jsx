import useDashboardStore from "../store/dashboardStore";
import { useUsersQuery } from "../hooks/useDashboardQueries";

export default function FavoritesPanel() {
  const { favorites, toggleFavorite } = useDashboardStore();
  const { data: users } = useUsersQuery();

  const favoriteUsers =
    users?.filter((user) => favorites.includes(user.id)) ?? [];

  if (favoriteUsers.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">
        ⭐ 즐겨찾기 사용자 ({favoriteUsers.length}명)
      </h2>
      <div className="flex flex-wrap gap-2">
        {favoriteUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200"
          >
            <span className="text-sm font-medium text-amber-800">
              {user.name}
            </span>
            <button
              onClick={() => toggleFavorite(user.id)}
              className="text-amber-400 hover:text-amber-600 text-xs transition-colors"
              aria-label="즐겨찾기 제거"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
