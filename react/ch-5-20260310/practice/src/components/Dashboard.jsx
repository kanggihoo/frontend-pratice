// ─── [Dashboard.jsx] ─────────────────────────────────────────────
// 대시보드 메인 화면입니다.
// useTheme과 useAuth Context를 사용하여 테마 색상과 사용자 정보를 가져옵니다.

import { useTheme } from "./ThemeContext.jsx";
import { useAuth } from "./AuthContext.jsx";
import StatsCard from "./StatsCard.jsx";
import NotificationList from "./NotificationList.jsx";
import ProfileCard from "./ProfileCard.jsx";
import { statsData } from "../data/mockData.js";

export default function Dashboard() {
  // ─── [Context 사용하기] ──────────────────────────────────────
  // useTheme()에서 colors를 가져오세요.
  // useAuth()에서 currentUser를 가져오세요.

  // TODO: useTheme()에서 colors 가져오기
  const { colors } = useTheme();

  // TODO: useAuth()에서 currentUser 가져오기
  const { currentUser } = useAuth();

  return (
    <main className={`flex-1 p-6 overflow-y-auto transition-colors duration-300`}>
      {/* ─── [환영 메시지] ──────────────────────────────────────── */}
      {/* currentUser.name을 사용하여 개인화된 환영 메시지를 표시하세요. */}
      <div className="mb-8">
        <h2 className={`text-2xl font-bold ${colors.text}`}>
          {/* TODO: "안녕하세요, {사용자이름}님! 👋" 형태로 표시 */}
          안녕하세요! 👋
        </h2>
        <p className={`mt-1 ${colors.textSecondary}`}>
          오늘도 좋은 하루 되세요. 현재 대시보드 현황입니다.
        </p>
      </div>

      {/* ─── [통계 카드 그리드] ─────────────────────────────────── */}
      {/* statsData 배열을 map()으로 순회하며 StatsCard 컴포넌트를 렌더링하세요. */}
      {/* 각 StatsCard에 key와 stat prop을 전달하세요. */}
      {/* 힌트: {statsData.map((stat) => <StatsCard key={stat.id} stat={stat} />)} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* TODO: statsData를 map()으로 순회하며 StatsCard 렌더링 */}
      </div>

      {/* ─── [프로필 + 알림 섹션] ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProfileCard />
        </div>
        <div className="lg:col-span-2">
          <NotificationList />
        </div>
      </div>
    </main>
  );
}
