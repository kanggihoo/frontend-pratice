import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import FavoritesList from "./components/FavoritesList";
import useDebounce from "./hooks/useDebounce";
import useFetch from "./hooks/useFetch";
import useLocalStorage from "./hooks/useLocalStorage";

const API_BASE = "https://jsonplaceholder.typicode.com";

export default function App() {
  // ─── [검색어 상태] ───────────────────────────────
  // 검색 입력값을 관리하는 상태를 선언하세요.
  const [searchTerm, setSearchTerm] = useState("");

  // ─── [즐겨찾기 상태 - useLocalStorage 사용] ───────────────────────────
  const [favorites, setFavorites, resetFavorites] = useLocalStorage(
    "favorite-users",
    [],
  );
  // ─── [검색어 디바운스 - useDebounce 사용] ───────────────────────────
  // 이렇게 하면 타이핑할 때마다 필터링이 실행되지 않고,
  // 타이핑을 멈춘 후 400ms 후에만 필터링됩니다.
  const debouncedSearch = useDebounce(searchTerm, 400);

  // ─── [API 호출 - useFetch 사용] ───────────────────────────
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetch(`${API_BASE}/users`);

  // ─── [검색 필터링] ───────────────────────────
  // users 배열에서 debouncedSearch로 필터링하세요.

  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          user.company.name
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase()),
      )
    : [];

  // ─── [즐겨찾기 토글 함수] ───────────────────────────
  // userId를 받아서 즐겨찾기 배열에 추가/제거하는 함수를 작성하세요.
  // - 이미 포함되어 있으면 → filter로 제거
  // - 포함되어 있지 않으면 → spread로 추가
  //
  const toggleFavorite = (userId) => {
    setFavorites((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  // ─── [즐겨찾기 확인 함수] ───────────────────────────
  const isFavorite = (userId) => favorites.includes(userId);

  // ─── [즐겨찾기된 유저 목록] ───────────────────────────
  // users 배열에서 favorites에 포함된 유저만 필터링하세요.
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
        {/* ─── [레이아웃 구성] ───────────────────────────
            grid를 사용하여 왼쪽(검색+유저목록)과 오른쪽(즐겨찾기)을 배치합니다.
            아래 JSX의 props를 위에서 만든 변수/함수로 연결하세요. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽: 검색 & 유저 목록 (2칸) */}
          <div className="lg:col-span-2 space-y-6">
            {/* ─── [SearchBar 컴포넌트] ───────────────────────────
                props:
                - searchTerm: 현재 검색어
                - onSearchChange: 검색어 변경 함수 (setSearchTerm)
                - resultCount: 필터링된 결과 수
                - isSearching: 디바운스 진행 중인지 (searchTerm !== debouncedSearch)
            */}
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              resultCount={filteredUsers.length}
              isSearching={searchTerm !== debouncedSearch}
            />

            {/* ─── [UserList 컴포넌트] ───────────────────────────
                props:
                - users: 필터링된 유저 목록
                - loading, error: useFetch에서 받은 상태
                - onRetry: refetch 함수
                - onToggleFavorite: 즐겨찾기 토글 함수
                - isFavorite: 즐겨찾기 확인 함수
            */}
            <UserList
              users={filteredUsers}
              loading={loading}
              error={error}
              onRetry={refetch}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          </div>

          {/* 오른쪽: 즐겨찾기 (1칸) */}
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
