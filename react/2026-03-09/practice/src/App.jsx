import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export default function App() {
  // ─── [상태 선언] ───────────────────────────────────────
  // 아래 6개의 상태를 useState로 선언하세요.
  //
  // 1. users: API에서 가져온 전체 유저 목록 (초기값: 빈 배열 [])
  // 2. filteredUsers: 검색 필터링된 유저 목록 (초기값: 빈 배열 [])
  // 3. selectedUserId: 현재 선택된 유저의 id (초기값: null)
  // 4. searchTerm: 검색어 문자열 (초기값: "")
  // 5. loading: 로딩 중 여부 (초기값: true)
  // 6. error: 에러 메시지 (초기값: null)
  //
  // 힌트: const [변수명, set변수명] = useState(초기값);


  // ─── [useEffect #1: 유저 목록 가져오기] ──────────────────
  // 컴포넌트가 처음 마운트될 때 한 번만 API를 호출합니다.
  //
  // 1. useEffect 안에 async 함수를 정의하세요 (useEffect 자체는 async가 될 수 없습니다!)
  // 2. try-catch-finally 패턴을 사용하세요:
  //    - try: setLoading(true), setError(null), fetch 호출, 응답 확인, JSON 파싱, 상태 업데이트
  //    - catch: setError(err.message)
  //    - finally: setLoading(false) — 성공이든 실패든 로딩은 끝나야 합니다
  // 3. fetch URL: `${API_BASE_URL}/users`
  // 4. response.ok가 false이면 throw new Error로 에러를 던지세요
  // 5. 받아온 데이터를 users와 filteredUsers 둘 다에 저장하세요
  // 6. 의존성 배열: [] (빈 배열 = 마운트 시 1회만 실행)
  //
  // 힌트:
  //   useEffect(() => {
  //     const fetchUsers = async () => { ... };
  //     fetchUsers();
  //   }, []);


  // ─── [useEffect #2: 검색어 필터링] ─────────────────────
  // searchTerm 또는 users가 변경될 때마다 filteredUsers를 업데이트합니다.
  //
  // 1. searchTerm이 비어있으면 → filteredUsers = users (전체 표시)
  // 2. searchTerm이 있으면 → users.filter()로 필터링:
  //    - user.name, user.email, user.company.name 중 하나라도
  //      검색어를 포함하면 결과에 포함
  //    - 대소문자 무시: toLowerCase() 사용
  // 3. 의존성 배열: [searchTerm, users]
  //
  // 힌트: const filtered = users.filter((user) =>
  //   user.name.toLowerCase().includes(lowerSearch) || ...
  // );


  // ─── [useEffect #3: 페이지 타이틀 변경] ──────────────────
  // selectedUserId와 filteredUsers.length가 변경될 때 document.title을 업데이트합니다.
  //
  // 1. selectedUserId가 있으면 → "유저 상세 - 대시보드"
  // 2. selectedUserId가 없으면 → `유저 대시보드 (${filteredUsers.length}명)`
  // 3. cleanup 함수에서 원래 타이틀로 복원하세요 (컴포넌트 언마운트 시)
  //    - return () => { document.title = "유저 대시보드 - React 회차 3"; };
  // 4. 의존성 배열: [selectedUserId, filteredUsers.length]
  //
  // ★ 이 useEffect는 cleanup 함수의 역할을 이해하는 데 중요합니다!


  // ─── [이벤트 핸들러] ────────────────────────────────────
  // 1. handleSelectUser: userId를 받아 selectedUserId 상태를 업데이트
  // 2. handleBack: selectedUserId를 null로 초기화 (목록으로 돌아가기)


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* ─── [Header 렌더링] ──────────────────────────────── */}
      {/* Header 컴포넌트에 userCount prop으로 filteredUsers.length를 전달하세요 */}


      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* ─── [조건부 렌더링] ─────────────────────────────── */}
        {/* selectedUserId 유무에 따라 다른 화면을 보여줘야 합니다.          */}
        {/*                                                               */}
        {/* selectedUserId가 있을 때:                                       */}
        {/*   → <UserDetail userId={selectedUserId}                        */}
        {/*       apiBaseUrl={API_BASE_URL} onBack={handleBack} />         */}
        {/*                                                               */}
        {/* selectedUserId가 없을 때:                                       */}
        {/*   → <SearchBar searchTerm={searchTerm}                         */}
        {/*       onSearchChange={setSearchTerm} />                        */}
        {/*   → loading이면 <LoadingSpinner />                             */}
        {/*   → error이면 <ErrorMessage message={error} />                 */}
        {/*   → 둘 다 아니면 <UserList users={filteredUsers}               */}
        {/*       onSelectUser={handleSelectUser} />                       */}
        {/*                                                               */}
        {/* 힌트: 삼항 연산자 또는 && 연산자를 조합하세요                    */}
        {/* {selectedUserId ? (...) : (<>...</>)}                          */}

      </main>
    </div>
  );
}
