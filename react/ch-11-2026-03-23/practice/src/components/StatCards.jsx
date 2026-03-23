// ─── [import 추가] ──────────────────────────────────────
// useDashboardStats 훅과 STAT_CARDS_CONFIG를 import하세요.
// 힌트:
//   import { useDashboardStats } from "../hooks/useDashboardQueries";
//   import { STAT_CARDS_CONFIG } from "../data/mockData";

import { STAT_CARDS_CONFIG } from "../data/mockData";

export default function StatCards() {
  // ─── [통계 데이터 가져오기] ───────────────────────────
  // useDashboardStats() 훅을 호출하여 stats, isLoading을 가져오세요.
  // 힌트: const { stats, isLoading } = useDashboardStats();

  const stats = { users: 0, posts: 0, todos: 0, albums: 0 };
  const isLoading = false;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* ─── [통계 카드 렌더링] ──────────────────────────── */}
      {/* STAT_CARDS_CONFIG 배열을 map()으로 순회하며 카드를 렌더링하세요.
          각 카드에는:
          - 아이콘(card.icon)과 라벨(card.label)
          - 로딩 중이면 스켈레톤 UI (animate-pulse)
          - 로딩 완료면 stats[card.id] 값 표시 */}
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
          {/* ─── [조건부 렌더링: 로딩/데이터] ──────────── */}
          {/* isLoading이면 스켈레톤, 아니면 숫자 표시
              스켈레톤: <div className="h-8 bg-gray-200 rounded animate-pulse" />
              숫자: <p className="text-3xl font-bold text-gray-800">{stats[card.id]?.toLocaleString() ?? 0}</p> */}
          <p className="text-3xl font-bold text-gray-800">0</p>
        </div>
      ))}
    </div>
  );
}
