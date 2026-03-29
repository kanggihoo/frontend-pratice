// ─── [Props 타입 정의] ─────────────────────────────────────────────
// JavaScript: function Badge({ label, variant }) { ... }
// TypeScript: Props를 interface로 분리한 뒤 타입 어노테이션을 추가합니다.
//
// 1단계: lib/types.ts에서 BadgeProps를 import
// import type { BadgeProps } from "@/lib/types";
//
// 2단계: 함수에 타입 어노테이션 적용
// export default function Badge({ label, variant = "default" }: BadgeProps) { ... }

// ─── [React.FC<T> vs 일반 함수] ───────────────────────────────────
// 방법 1 (권장): 일반 함수 컴포넌트
//   function Badge({ label, variant }: BadgeProps) { ... }
//
// 방법 2: React.FC<T>
//   const Badge: React.FC<BadgeProps> = ({ label, variant }) => { ... }
//
// React 18+에서 React.FC는 children을 자동으로 포함하지 않습니다.
// 일반 함수 방식이 더 명시적이므로 권장됩니다.

// TODO: BadgeProps를 import하세요.
// import type { BadgeProps } from "@/lib/types";

const variantStyles = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
};

// TODO: Props에 타입 어노테이션을 추가하세요. (에러 발생 지점)
// 힌트: { label, variant = "default" }: BadgeProps
export default function Badge({ label, variant = "default" }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
