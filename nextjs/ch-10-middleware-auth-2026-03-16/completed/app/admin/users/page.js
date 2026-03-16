export const metadata = {
  title: "사용자 관리 - Admin Dashboard",
};

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: "김민수",
      email: "minsu@example.com",
      role: "user",
      status: "active",
      joinDate: "2026-01-15",
    },
    {
      id: 2,
      name: "이영희",
      email: "younghee@example.com",
      role: "user",
      status: "active",
      joinDate: "2026-02-03",
    },
    {
      id: 3,
      name: "박철수",
      email: "chulsoo@example.com",
      role: "admin",
      status: "active",
      joinDate: "2025-12-20",
    },
    {
      id: 4,
      name: "정수진",
      email: "sujin@example.com",
      role: "user",
      status: "inactive",
      joinDate: "2026-01-28",
    },
    {
      id: 5,
      name: "최동현",
      email: "donghyun@example.com",
      role: "user",
      status: "active",
      joinDate: "2026-03-01",
    },
    {
      id: 6,
      name: "한지원",
      email: "jiwon@example.com",
      role: "user",
      status: "active",
      joinDate: "2026-03-10",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
        <p className="text-gray-600 mt-1">
          등록된 사용자 목록을 관리합니다.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                이름
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                이메일
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                역할
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                가입일
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status === "active" ? "활성" : "비활성"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.joinDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
