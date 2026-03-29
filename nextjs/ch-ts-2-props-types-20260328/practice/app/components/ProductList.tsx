// ─── [Props 타입 정의] ─────────────────────────────────────────────
// TODO: ProductListProps를 import하세요.
// import type { ProductListProps } from "@/lib/types";

// ─── [children: React.ReactNode] ──────────────────────────────────
// JavaScript: function ProductList({ title, children }) { ... }
// TypeScript: children의 타입을 명시해야 합니다.
//
// React.ReactNode — JSX, string, number, null, undefined, boolean, 배열 등
// React가 렌더링할 수 있는 모든 값을 허용합니다. (가장 넓은 타입)

// ─── [headerAction: React.ReactElement] ───────────────────────────
// React.ReactElement는 React.ReactNode보다 더 엄격합니다.
// JSX 요소(<div>, <Button /> 등)만 허용하고,
// string, number, null 등은 허용하지 않습니다.
//
// 언제 ReactElement를 쓰나?
//   → "이 자리에는 반드시 JSX 요소가 와야 한다"는 의도를 명확히 표현할 때

// TODO: Props에 타입 어노테이션을 추가하세요. (에러 발생 지점)
// 힌트: { title, headerAction, children }: ProductListProps
export default function ProductList({ title, headerAction, children }) {
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
