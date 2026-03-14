// ─── [서버 컴포넌트 — 통계 카드] ────────────────────────────
// 이 컴포넌트는 "use client" 지시어가 없으므로 기본적으로 서버 컴포넌트입니다.
// 서버 컴포넌트는 상태(state)나 이벤트 핸들러가 없는 순수 UI를 렌더링할 때 사용합니다.
// 서버에서 HTML로 렌더링되어 클라이언트에 전달되므로 JS 번들 크기가 줄어듭니다.
//
// 부모(page.js)로부터 이미 가져온 데이터를 props로 전달받아 표시합니다.

export default function UserStatsCards({ totalUsers = 0, totalPosts = 0, totalAlbums = 0 }) {
  // ─── [통계 데이터 배열 구성] ──────────────────────────────
  // 힌트: 각 통계 항목의 label, value, icon, color를 배열로 정의하세요.
  // 배열로 만들면 map()을 사용하여 반복 렌더링할 수 있습니다.
  //
  // 예시 구조:
  //   const stats = [
  //     { label: "전체 유저", value: totalUsers, icon: "👥", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  //     { label: "전체 게시글", value: totalPosts, icon: "📝", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  //     { label: "전체 앨범", value: totalAlbums, icon: "📸", color: "bg-amber-50 text-amber-700 border-amber-200" },
  //     { label: "유저당 평균 게시글", value: totalUsers > 0 ? (totalPosts / totalUsers).toFixed(1) : 0, icon: "📊", color: "bg-rose-50 text-rose-700 border-rose-200" },
  //   ];

  const stats = []; // TODO: 위 힌트를 참고하여 stats 배열을 완성하세요

  return (
    // ─── [UI 스타일링 — 그리드 레이아웃] ────────────────────
    // 힌트: Tailwind CSS의 그리드를 사용하여 반응형 카드 레이아웃을 만드세요.
    // "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    <div className="">{/* TODO: 그리드 클래스를 추가하세요 */}
      {stats.map((stat) => (
        <div
          key={stat.label}
          className=""
          // TODO: 카드 스타일을 추가하세요
          // 힌트: `rounded-xl border p-5 shadow-sm ${stat.color}`
        >
          {/* ─── [아이콘 + 라벨] ──────────────────────────── */}
          {/* 힌트: flex items-center gap-3 mb-2 */}
          <div>
            <span className="">{stat.icon}</span>{/* TODO: text-2xl */}
            <span className="">{stat.label}</span>{/* TODO: text-sm font-medium */}
          </div>
          {/* ─── [수치 표시] ──────────────────────────────── */}
          {/* 힌트: text-3xl font-bold */}
          <p className="">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
