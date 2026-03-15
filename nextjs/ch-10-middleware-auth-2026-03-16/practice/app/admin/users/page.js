// ─── [사용자 관리 페이지] ──────────────────────────
// 등록된 사용자 목록을 테이블로 보여주는 관리자 페이지입니다.
// 서버 컴포넌트로, Middleware를 통과한 admin만 접근 가능합니다.

export const metadata = {
  title: "사용자 관리 - Admin Dashboard",
};

export default function UsersPage() {
  const users = [
    { id: 1, name: "김민수", email: "minsu@example.com", role: "user", status: "active", joinDate: "2026-01-15" },
    { id: 2, name: "이영희", email: "younghee@example.com", role: "user", status: "active", joinDate: "2026-02-03" },
    { id: 3, name: "박철수", email: "chulsoo@example.com", role: "admin", status: "active", joinDate: "2025-12-20" },
    { id: 4, name: "정수진", email: "sujin@example.com", role: "user", status: "inactive", joinDate: "2026-01-28" },
    { id: 5, name: "최동현", email: "donghyun@example.com", role: "user", status: "active", joinDate: "2026-03-01" },
    { id: 6, name: "한지원", email: "jiwon@example.com", role: "user", status: "active", joinDate: "2026-03-10" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="">사용자 관리</h1>
        {/* TODO: 제목 스타일링 */}
        <p className="">등록된 사용자 목록을 관리합니다.</p>
      </div>

      {/* ─── [사용자 테이블] ──────────────────────── */}
      {/* 힌트: bg-white, rounded-xl, shadow-sm, border, overflow-hidden */}
      <div className="">
        <table className="">
          {/* TODO: w-full */}
          <thead className="">
            {/* TODO: bg-gray-50, border-b */}
            <tr>
              <th className="">이름</th>
              <th className="">이메일</th>
              <th className="">역할</th>
              <th className="">상태</th>
              <th className="">가입일</th>
              {/* TODO: 각 th에 text-left, px-6, py-3, text-xs, font-semibold, uppercase 적용 */}
            </tr>
          </thead>
          <tbody className="">
            {/* TODO: divide-y divide-gray-100 */}
            {users.map((user) => (
              <tr key={user.id} className="">
                {/* TODO: hover:bg-gray-50 */}
                <td className="">{user.name}</td>
                <td className="">{user.email}</td>
                <td className="">
                  {/* TODO: role에 따라 다른 배지 색상 (admin: purple, user: gray) */}
                  {user.role}
                </td>
                <td className="">
                  {/* TODO: status에 따라 다른 배지 색상 (active: green, inactive: red) */}
                  {user.status === "active" ? "활성" : "비활성"}
                </td>
                <td className="">{user.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
