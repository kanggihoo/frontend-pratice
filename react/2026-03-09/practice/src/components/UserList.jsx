import UserCard from "./UserCard";

export default function UserList({ users, onSelectUser }) {
  // ─── [빈 목록 처리] ──────────────────────────────────────
  // users.length가 0이면 "검색 결과가 없습니다." 메시지를 표시하세요.
  // 힌트: if (users.length === 0) return (<div>...</div>);


  return (
    // ─── [그리드 레이아웃] ────────────────────────────────────
    // 반응형 그리드 클래스를 적용하세요:
    // grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
    <div className="">
      {/* ─── [리스트 렌더링] ──────────────────────────────── */}
      {/* users 배열을 map()으로 순회하며 UserCard를 렌더링하세요. */}
      {/*                                                     */}
      {/* 각 UserCard에 전달할 props:                           */}
      {/*   - key={user.id}  (React가 리스트를 효율적으로 관리) */}
      {/*   - user={user}    (유저 데이터 전체 객체)            */}
      {/*   - onSelect={onSelectUser}  (클릭 핸들러)           */}
      {/*                                                     */}
      {/* 힌트: {users.map((user) => (                         */}
      {/*   <UserCard key={user.id} user={user}                */}
      {/*     onSelect={onSelectUser} />                       */}
      {/* ))}                                                  */}

    </div>
  );
}
