import type { BadgeProps } from "@/lib/types";

// ─── React.FC<T> vs 일반 함수 컴포넌트 ─────────────────────────────
//
// 방법 1: 일반 함수 (권장)
//   function Badge({ label, variant = "default" }: BadgeProps) { ... }
//
// 방법 2: React.FC<T>
//   const Badge: React.FC<BadgeProps> = ({ label, variant = "default" }) => { ... }
//
// React 18+에서 React.FC는 children을 자동으로 포함하지 않습니다.
// 일반 함수 방식이 더 명시적이고 유연하므로 권장됩니다.

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
};

// 일반 함수 컴포넌트 방식 (권장)
export default function Badge({ label, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
