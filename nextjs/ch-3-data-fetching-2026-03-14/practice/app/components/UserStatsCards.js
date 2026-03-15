// ─── [서버 컴포넌트 — 통계 카드] ────────────────────────────
// 이 컴포넌트는 "use client" 지시어가 없으므로 기본적으로 서버 컴포넌트입니다.
// 서버 컴포넌트는 상태(state)나 이벤트 핸들러가 없는 순수 UI를 렌더링할 때 사용합니다.
// 서버에서 HTML로 렌더링되어 클라이언트에 전달되므로 JS 번들 크기가 줄어듭니다.
//
// 부모(page.js)로부터 이미 가져온 데이터를 props로 전달받아 표시합니다.

export default function UserStatsCards({
  totalUsers = 0,
  totalPosts = 0,
  totalAlbums = 0,
}) {
  const stats = [
    {
      label: "전체 유저",
      value: totalUsers,
      icon: "👥",
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      label: "전체 게시글",
      value: totalPosts,
      icon: "📝",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      label: "전체 앨범",
      value: totalAlbums,
      icon: "📸",
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      label: "유저당 평균 게시글",
      value: totalUsers > 0 ? (totalPosts / totalUsers).toFixed(1) : 0,
      icon: "📊",
      color: "bg-rose-50 text-rose-700 border-rose-200",
    },
  ];

  return (
    // ─── [UI 스타일링 — 그리드 레이아웃] ────────────────────
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-xl border p-5 shadow-sm ${stat.color}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{stat.icon}</span>
            <span className="text-sm font-medium">{stat.label}</span>
          </div>
          <p className="text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
