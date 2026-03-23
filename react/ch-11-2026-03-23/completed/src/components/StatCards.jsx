import { useDashboardStats } from "../hooks/useDashboardQueries";
import { STAT_CARDS_CONFIG } from "../data/mockData";

export default function StatCards() {
  const { stats, isLoading } = useDashboardStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {STAT_CARDS_CONFIG.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{card.icon}</span>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${card.bgLight} ${card.textColor}`}
            >
              {card.label}
            </span>
          </div>
          {isLoading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
          ) : (
            <p className="text-3xl font-bold text-gray-800">
              {stats[card.id]?.toLocaleString() ?? 0}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
