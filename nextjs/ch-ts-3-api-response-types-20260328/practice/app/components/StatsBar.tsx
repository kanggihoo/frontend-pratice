// ─── [Props 타입 정의] ─────────────────────────────────────────────────────────
// 이 컴포넌트는 두 가지 Props 인터페이스가 필요합니다.
//
// StatsBarProps: 외부에서 받는 숫자 3개
//   interface StatsBarProps {
//     userCount: number;
//     postCount: number;
//     todoCount: number;
//   }
//
// StatItemProps: 내부 StatItem 컴포넌트가 받는 Props
//   interface StatItemProps {
//     label: string;
//     value: number;
//     color: string;
//   }
//
// JavaScript의 모든 숫자는 TypeScript에서 number 타입입니다.

// TODO: StatsBarProps 인터페이스를 정의하세요.

// TODO: StatItemProps 인터페이스를 정의하세요.

// TODO: Props에 타입 어노테이션을 추가하세요.
function StatItem({ label, value, color }) {  // ← 타입 없음 (에러 발생)
  return (
    <div className={`flex flex-col items-center px-8 py-4 rounded-xl ${color}`}>
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-sm mt-1 opacity-80">{label}</span>
    </div>
  );
}

// TODO: Props에 타입 어노테이션을 추가하세요.
export default function StatsBar({ userCount, postCount, todoCount }) {  // ← 타입 없음 (에러 발생)
  return (
    <div className="flex gap-4 flex-wrap">
      <StatItem label="유저" value={userCount} color="bg-indigo-50 text-indigo-700" />
      <StatItem label="게시글" value={postCount} color="bg-emerald-50 text-emerald-700" />
      <StatItem label="할 일" value={todoCount} color="bg-amber-50 text-amber-700" />
    </div>
  );
}
