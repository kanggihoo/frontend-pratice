import { cookies } from "next/headers";

export const metadata = {
  title: "관리자 대시보드 - Admin Dashboard",
};

export default async function AdminDashboardPage() {
  // 서버 컴포넌트에서 쿠키 읽기 (Next.js 15+에서 cookies()는 비동기)
  const cookieStore = await cookies();
  const userRole = cookieStore.get("user-role")?.value;

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
    {
      id: 1,
      action: "새 사용자 가입",
      user: "김민수",
      time: "2분 전",
    },
    {
      id: 2,
      action: "비밀번호 변경",
      user: "이영희",
      time: "15분 전",
    },
    {
      id: 3,
      action: "관리자 권한 부여",
      user: "박철수",
      time: "1시간 전",
    },
    {
      id: 4,
      action: "로그인 시도 실패",
      user: "unknown",
      time: "2시간 전",
    },
    {
      id: 5,
      action: "설정 변경",
      user: "관리자",
      time: "3시간 전",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
        <p className="text-gray-600 mt-1">
          현재 접속 권한:{" "}
          <span className="font-medium text-indigo-600">{userRole}</span>
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.trend === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 최근 활동 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          최근 활동
        </h2>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <span className="text-sm font-medium text-gray-900">
                  {activity.action}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  — {activity.user}
                </span>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
