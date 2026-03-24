// ─── [StatsCard.jsx] ─────────────────────────────────────────────
// 통계 카드 컴포넌트입니다.
// useTheme() Context를 사용하여 테마에 맞는 색상을 적용합니다.

import { useTheme } from "./ThemeContext.jsx";

const colorMap = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600",
};

export default function StatsCard({ stat }) {
  // ─── [Context 사용하기] ──────────────────────────────────────
  // useTheme()에서 colors를 가져오세요.

  // TODO: useTheme()에서 colors 가져오기
  const { colors } = useTheme();

  return (
    <div
      className={`${colors.bgCard} ${colors.border} border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-3">
        {/* ─── [아이콘 표시] ──────────────────────────────────── */}
        {/* stat.icon과 stat.color를 사용하여 그라데이션 아이콘을 표시하세요. */}
        {/* colorMap[stat.color]로 그라데이션 클래스를 가져올 수 있습니다. */}
        <span
          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap[stat.color]} flex items-center justify-center text-lg`}
        >
          {/* TODO: stat.icon 표시 */}
        </span>
      </div>
      {/* ─── [통계 값 & 라벨] ─────────────────────────────────── */}
      {/* stat.value와 stat.label을 표시하세요. */}
      {/* colors.text와 colors.textSecondary로 색상을 적용하세요. */}
      <p className={`text-2xl font-bold ${colors.text}`}>
        {/* TODO: stat.value 표시 */}
      </p>
      <p className={`text-sm mt-1 ${colors.textSecondary}`}>
        {/* TODO: stat.label 표시 */}
      </p>
    </div>
  );
}
