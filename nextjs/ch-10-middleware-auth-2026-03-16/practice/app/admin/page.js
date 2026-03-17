// ─── [관리자 대시보드 페이지] ──────────────────────────
// 이 페이지는 Middleware를 통과한 admin 사용자만 볼 수 있습니다.
// 서버 컴포넌트에서 쿠키를 읽어 현재 사용자의 역할을 표시합니다.

// ─── [서버 컴포넌트에서 쿠키 읽기] ──────────────────────
// 힌트: import { cookies } from "next/headers";
// Next.js 15+에서 cookies()는 비동기 함수입니다.
// const cookieStore = await cookies();
// const userRole = cookieStore.get("user-role")?.value;

export const metadata = {
  title: "관리자 대시보드 - Admin Dashboard",
};

export default async function AdminDashboardPage() {
  // TODO: cookies()를 import하고 "user-role" 쿠키를 읽어오세요

  // 모의 대시보드 통계 데이터
  const stats = [
    {
      label: "총 사용자",
      value: "1,284",
      change: "+12%",
      trend: "up",
      icon: "👥",
    },
    {
      label: "활성 세션",
      value: "342",
      change: "+5%",
      trend: "up",
      icon: "🟢",
    },
    {
      label: "오늘 방문",
      value: "856",
      change: "-3%",
      trend: "down",
      icon: "📈",
    },
    {
      label: "서버 상태",
      value: "정상",
      change: "99.9%",
      trend: "up",
      icon: "🖥️",
    },
  ];

  const recentActivities = [
    { id: 1, action: "새 사용자 가입", user: "김민수", time: "2분 전" },
    { id: 2, action: "비밀번호 변경", user: "이영희", time: "15분 전" },
    { id: 3, action: "관리자 권한 부여", user: "박철수", time: "1시간 전" },
    { id: 4, action: "로그인 시도 실패", user: "unknown", time: "2시간 전" },
    { id: 5, action: "설정 변경", user: "관리자", time: "3시간 전" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="">관리자 대시보드</h1>
        {/* TODO: 제목 스타일링 (text-2xl, font-bold) */}
        <p className="">
          {/* TODO: 현재 접속 권한 표시 — 위에서 읽은 userRole을 표시하세요 */}
          현재 접속 권한: admin
        </p>
      </div>

      {/* ─── [통계 카드 그리드] ──────────────────────── */}
      {/* 힌트: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 */}
      <div className="mb-8">
        {/* TODO: stats 배열을 map()으로 순회하며 통계 카드를 렌더링하세요 */}
        {/* 각 카드: 아이콘, 변화율(change), 값(value), 라벨(label) 표시 */}
        {/* trend가 "up"이면 초록색, "down"이면 빨간색 배지 */}
        {stats.map((stat) => (
          <div key={stat.label} className="">
            {stat.icon} {stat.label}: {stat.value} ({stat.change})
          </div>
        ))}
      </div>

      {/* ─── [최근 활동 목록] ──────────────────────── */}
      <div className="">
        {/* TODO: bg-white, rounded-xl, shadow-sm, border, p-6 */}
        <h2 className="">최근 활동</h2>
        <div className="">
          {/* TODO: recentActivities를 map()으로 순회하며 활동 목록을 렌더링하세요 */}
          {recentActivities.map((activity) => (
            <div key={activity.id} className="">
              {activity.action} — {activity.user} ({activity.time})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
