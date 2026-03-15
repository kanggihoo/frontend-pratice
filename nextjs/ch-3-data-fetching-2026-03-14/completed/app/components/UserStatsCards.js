export default function UserStatsCards({ totalUsers, totalPosts, totalAlbums }) {
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
