// ─── SectionWrapper 컴포넌트 ────────────────────────────────────────────────
// 이 컴포넌트는 두 가지 핵심 TypeScript 패턴을 보여줍니다:
// 1. children: React.ReactNode — 어떤 JSX든 children으로 받기
// 2. subtitle?: string — 선택적 속성 (없어도 에러 없음)

interface SectionWrapperProps {
  title: string;
  subtitle?: string; // ? = 선택적 속성, 없으면 undefined
  children: React.ReactNode; // JSX, string, number, null 등 모두 허용
}

export default function SectionWrapper({
  title,
  subtitle,
  children,
}: SectionWrapperProps) {
  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {/* subtitle이 있을 때만 렌더링 — 선택적 속성 활용 */}
        {subtitle && (
          <p className="mt-3 text-lg text-gray-500">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}
