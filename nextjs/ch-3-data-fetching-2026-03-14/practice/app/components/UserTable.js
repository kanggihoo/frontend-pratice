// ─── [서버 컴포넌트 — 유저 테이블] ──────────────────────────
// 이 컴포넌트도 서버 컴포넌트입니다.
// 테이블에 표시할 유저 데이터는 부모 컴포넌트(page.js)에서 props로 전달받습니다.
//
// 중요한 포인트:
// - 이 컴포넌트 안에서 직접 fetch를 하지 않습니다.
// - 데이터 페칭은 page.js (서버 컴포넌트)에서 하고, 결과를 props로 전달합니다.
// - 이렇게 하면 데이터 페칭 로직과 UI 렌더링 로직을 분리할 수 있습니다.

export default function UserTable({ users = [] }) {
  return (
    // ─── [테이블 컨테이너 스타일링] ─────────────────────────
    // 힌트: overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm
    <div className="">{/* TODO: 컨테이너 스타일 */}
      <table className="">{/* TODO: w-full text-sm */}
        {/* ─── [테이블 헤더] ─────────────────────────────── */}
        {/* 힌트: 배경색과 텍스트 색상으로 헤더를 구분하세요 */}
        {/* bg-gray-50 text-left text-gray-600 */}
        <thead>
          <tr className="">{/* TODO: 헤더 행 스타일 */}
            <th className="">이름</th>{/* TODO: px-4 py-3 font-semibold */}
            <th className="">이메일</th>
            <th className="">회사</th>
            <th className="">도시</th>
            <th className="">게시글</th>{/* TODO: text-center 추가 */}
            <th className="">앨범</th>{/* TODO: text-center 추가 */}
          </tr>
        </thead>
        {/* ─── [테이블 본문] ─────────────────────────────── */}
        {/* 힌트: divide-y divide-gray-100 으로 행 사이에 구분선을 추가하세요 */}
        <tbody className="">{/* TODO: 구분선 스타일 */}
          {users.map((user) => (
            <tr key={user.id} className="">{/* TODO: hover:bg-indigo-50/50 transition-colors */}
              {/* ─── [이름 셀] ────────────────────────────── */}
              {/* 힌트: user.name과 user.username을 표시하세요 */}
              <td className="">{/* TODO: px-4 py-3 */}
                <div>
                  <p className="">{user.name}</p>{/* TODO: font-medium text-gray-900 */}
                  <p className="">@{user.username}</p>{/* TODO: text-xs text-gray-500 */}
                </div>
              </td>
              {/* ─── [이메일 셀] ──────────────────────────── */}
              <td className="">{user.email?.toLowerCase()}</td>
              {/* ─── [회사 셀] ────────────────────────────── */}
              <td className="">{user.company?.name}</td>
              {/* ─── [도시 셀] ────────────────────────────── */}
              <td className="">{user.address?.city}</td>
              {/* ─── [게시글 수 배지] ─────────────────────── */}
              {/* 힌트: 둥근 배지(pill) 스타일로 숫자를 표시하세요 */}
              {/* inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700 */}
              <td className="">{/* TODO: text-center */}
                <span className="">{/* TODO: 배지 스타일 */}
                  {user.postCount}
                </span>
              </td>
              {/* ─── [앨범 수 배지] ───────────────────────── */}
              <td className="">
                <span className="">{/* TODO: 배지 스타일 (amber 색상) */}
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
