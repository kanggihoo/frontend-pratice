// ─── [서버 컴포넌트 — 유저 테이블] ──────────────────────────
// 이 컴포넌트도 서버 컴포넌트입니다.
// 테이블에 표시할 유저 데이터는 부모 컴포넌트(page.js)에서 props로 전달받습니다.
//
// 중요한 포인트:
// - 이 컴포넌트 안에서 직접 fetch를 하지 않습니다.
// - 데이터 페칭은 page.js (서버 컴포넌트)에서 하고, 결과를 props로 전달합니다.
// - 이렇게 하면 데이터 페칭 로직과 UI 렌더링 로직을 분리할 수 있습니다.

export default function UserTable({ users }) {
  return (
    // ─── [테이블 컨테이너 스타일링] ─────────────────────────
    // 힌트: overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* TODO: 컨테이너 스타일 */}
      <table className="w-full text-sm">
        {/* 힌트: 배경색과 텍스트 색상으로 헤더를 구분하세요 */}
        {/* bg-gray-50 text-left text-gray-600 */}
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
            <tr
              key={user.id}
              className="hover:bg-indigo-50/50 transition-colors"
            >
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">@{user.username}</p>
                </div>
              </td>

              {/* ─── [이메일 셀] ──────────────────────────── */}
              <td className="px-4 py-3 text-gray-600">
                {user.email.toLowerCase()}
              </td>
              {/* ─── [회사 셀] ────────────────────────────── */}
              <td className="px-4 py-3 text-gray-600">{user.company.name}</td>
              {/* ─── [도시 셀] ────────────────────────────── */}
              <td className="px-4 py-3 text-gray-600">{user.address.city}</td>

              {/* ─── [게시글 수 배지] ─────────────────────── */}
              <td className="px-4 py-3 text-center">
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                  {/* TODO: 배지 스타일 */}
                  {user.postCount}
                </span>
              </td>

              {/* ─── [앨범 수 배지] ───────────────────────── */}
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
