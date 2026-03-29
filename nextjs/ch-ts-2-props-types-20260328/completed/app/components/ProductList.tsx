import type { ProductListProps } from "@/lib/types";

// ─── children: React.ReactNode ─────────────────────────────────────
//
// JavaScript:  function ProductList({ title, children }) { ... }
// TypeScript:  function ProductList({ title, children }: ProductListProps) { ... }
//
// children 타입에는 React.ReactNode를 사용합니다.
// React.ReactNode는 JSX, string, number, null, undefined, boolean, 배열 등
// React가 렌더링할 수 있는 모든 값을 허용합니다.
//
// ─── headerAction: React.ReactElement ─────────────────────────────
//
// React.ReactElement는 React.ReactNode보다 더 엄격합니다.
// JSX 요소(컴포넌트, HTML 태그)만 허용하고,
// string, number, null 등은 허용하지 않습니다.
//
// 언제 ReactElement를 쓰나?
//   → "이 자리에는 반드시 JSX 요소가 와야 한다"는 의도를 표현할 때

export default function ProductList({
  title,
  headerAction,
  children,
}: ProductListProps) {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {/* headerAction: React.ReactElement — JSX 요소만 허용 */}
        {headerAction}
      </div>
      {/* children: React.ReactNode — 어떤 값이든 허용 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {children}
      </div>
    </section>
  );
}
