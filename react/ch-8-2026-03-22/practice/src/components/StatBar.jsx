const STAT_NAMES = {
  hp: "HP",
  attack: "공격",
  defense: "방어",
  "special-attack": "특수공격",
  "special-defense": "특수방어",
  speed: "스피드",
};

const STAT_COLORS = {
  hp: "bg-red-500",
  attack: "bg-orange-500",
  defense: "bg-yellow-500",
  "special-attack": "bg-blue-500",
  "special-defense": "bg-green-500",
  speed: "bg-pink-500",
};

export default function StatBar({ name, value }) {
  const maxStat = 255;
  const percentage = Math.min((value / maxStat) * 100, 100);
  const displayName = STAT_NAMES[name] || name;
  const barColor = STAT_COLORS[name] || "bg-purple-500";

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400 text-sm w-20 text-right shrink-0">
        {displayName}
      </span>
      <span className="text-white text-sm w-8 text-right font-mono shrink-0">
        {value}
      </span>
      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
