import UserCard from "./UserCard";

export default function UserList({ users, onSelectUser }) {
  if (users.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 text-lg">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onSelect={onSelectUser} />
      ))}
    </div>
  );
}
