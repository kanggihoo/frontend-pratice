import { useTheme } from "./ThemeContext.jsx";
import { useAuth } from "./AuthContext.jsx";
import StatsCard from "./StatsCard.jsx";
import NotificationList from "./NotificationList.jsx";
import ProfileCard from "./ProfileCard.jsx";
import { statsData } from "../data/mockData.js";

export default function Dashboard() {
  const { colors } = useTheme();
  const { currentUser } = useAuth();

  return (
    <main className={`flex-1 p-6 overflow-y-auto transition-colors duration-300`}>
      {/* 환영 메시지 */}
      <div className="mb-8">
        <h2 className={`text-2xl font-bold ${colors.text}`}>
          안녕하세요, {currentUser.name}님! 👋
        </h2>
        <p className={`mt-1 ${colors.textSecondary}`}>
          오늘도 좋은 하루 되세요. 현재 대시보드 현황입니다.
        </p>
      </div>

      {/* 통계 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat) => (
          <StatsCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* 프로필 + 알림 섹션 */}
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
