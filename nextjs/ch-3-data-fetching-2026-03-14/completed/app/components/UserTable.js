export default function UserTable({ users }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left text-gray-600">
            <th className="px-4 py-3 font-semibold">이름</th>
            <th className="px-4 py-3 font-semibold">이메일</th>
            <th className="px-4 py-3 font-semibold">회사</th>
            <th className="px-4 py-3 font-semibold">도시</th>
            <th className="px-4 py-3 font-semibold text-center">게시글</th>
            <th className="px-4 py-3 font-semibold text-center">앨범</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-indigo-50/50 transition-colors">
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">@{user.username}</p>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-600">{user.email.toLowerCase()}</td>
              <td className="px-4 py-3 text-gray-600">{user.company.name}</td>
              <td className="px-4 py-3 text-gray-600">{user.address.city}</td>
              <td className="px-4 py-3 text-center">
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                  {user.postCount}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                  {user.albumCount}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
