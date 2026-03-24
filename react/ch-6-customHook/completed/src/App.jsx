import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import FavoritesList from "./components/FavoritesList";
import useDebounce from "./hooks/useDebounce";
import useFetch from "./hooks/useFetch";
import useLocalStorage from "./hooks/useLocalStorage";

const API_BASE = "https://jsonplaceholder.typicode.com";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites, resetFavorites] = useLocalStorage(
    "favorite-users",
    []
  );

  // 검색어를 디바운스하여 타이핑이 끝난 후에만 API 호출
  const debouncedSearch = useDebounce(searchTerm, 400);

  // 유저 목록을 API에서 가져오기
  const { data: users, loading, error, refetch } = useFetch(
    `${API_BASE}/users`
  );

  // 디바운스된 검색어로 유저 필터링
  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          user.company.name
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())
      )
    : [];

  const toggleFavorite = (userId) => {
    setFavorites((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const isFavorite = (userId) => favorites.includes(userId);

  // 즐겨찾기한 유저 목록
  const favoriteUsers = users
    ? users.filter((user) => favorites.includes(user.id))
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            유저 검색 대시보드
          </h1>
          <p className="mt-1 text-gray-500">
            커스텀 훅으로 만든 검색 · 즐겨찾기 · API 호출
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽: 검색 & 유저 목록 */}
          <div className="lg:col-span-2 space-y-6">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              resultCount={filteredUsers.length}
              isSearching={searchTerm !== debouncedSearch}
            />

            <UserList
              users={filteredUsers}
              loading={loading}
              error={error}
              onRetry={refetch}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          </div>

          {/* 오른쪽: 즐겨찾기 */}
          <div>
            <FavoritesList
              favoriteUsers={favoriteUsers}
              onRemoveFavorite={toggleFavorite}
              onResetFavorites={resetFavorites}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
