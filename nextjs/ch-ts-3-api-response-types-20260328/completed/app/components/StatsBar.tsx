// ─── Props 타입 정의 ────────────────────────────────────────────────────────────
// 단순한 숫자 3개를 받는 Props입니다.
// number 타입: JavaScript의 모든 숫자(정수, 소수 모두)에 해당합니다.

interface StatsBarProps {
  userCount: number;
  postCount: number;
  todoCount: number;
}

interface StatItemProps {
  label: string;
  value: number;
  color: string;
}

function StatItem({ label, value, color }: StatItemProps) {
  return (
    <div className={`flex flex-col items-center px-8 py-4 rounded-xl ${color}`}>
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-sm mt-1 opacity-80">{label}</span>
    </div>
  );
}

export default function StatsBar({ userCount, postCount, todoCount }: StatsBarProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      <StatItem label="유저" value={userCount} color="bg-indigo-50 text-indigo-700" />
      <StatItem label="게시글" value={postCount} color="bg-emerald-50 text-emerald-700" />
      <StatItem label="할 일" value={todoCount} color="bg-amber-50 text-amber-700" />
    </div>
  );
}
