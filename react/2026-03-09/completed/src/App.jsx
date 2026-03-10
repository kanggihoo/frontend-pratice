import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export default function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 유저 목록 가져오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/users`);

        if (!response.ok) {
          throw new Error(`서버 오류: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 검색어 변경 시 필터링
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerSearch) ||
          user.email.toLowerCase().includes(lowerSearch) ||
          user.company.name.toLowerCase().includes(lowerSearch)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  // 페이지 타이틀 동적 변경
  useEffect(() => {
    document.title = selectedUserId
      ? `유저 상세 - 대시보드`
      : `유저 대시보드 (${filteredUsers.length}명)`;

    return () => {
      document.title = "유저 대시보드 - React 회차 3";
    };
  }, [selectedUserId, filteredUsers.length]);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  const handleBack = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header userCount={filteredUsers.length} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {selectedUserId ? (
          <UserDetail
            userId={selectedUserId}
            apiBaseUrl={API_BASE_URL}
            onBack={handleBack}
          />
        ) : (
          <>
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && (
              <UserList
                users={filteredUsers}
                onSelectUser={handleSelectUser}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
