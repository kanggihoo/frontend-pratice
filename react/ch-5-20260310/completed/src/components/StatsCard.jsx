import { useTheme } from "./ThemeContext.jsx";

const colorMap = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600",
};

export default function StatsCard({ stat }) {
  const { colors } = useTheme();

  return (
    <div
      className={`${colors.bgCard} ${colors.border} border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap[stat.color]} flex items-center justify-center text-lg`}
        >
          {stat.icon}
        </span>
      </div>
      <p className={`text-2xl font-bold ${colors.text}`}>{stat.value}</p>
      <p className={`text-sm mt-1 ${colors.textSecondary}`}>{stat.label}</p>
    </div>
  );
}
