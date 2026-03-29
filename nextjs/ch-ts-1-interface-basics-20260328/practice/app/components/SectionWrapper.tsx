// practice/app/components/SectionWrapper.tsx
//
// ─── [Props 타입 정의] ─────────────────────────────────────────────────────
// JavaScript: function SectionWrapper({ title, subtitle, children }) { ... }
// TypeScript: 각 props의 타입을 interface로 정의해야 합니다.
//
// 이 컴포넌트에서 익혀야 할 두 가지 패턴:
//
// 1. 선택적 속성 (Optional property)
//    subtitle이 없어도 되는 경우, 속성 이름 뒤에 ?를 붙입니다.
//    subtitle?: string  →  있으면 string, 없으면 undefined
//
// 2. children: React.ReactNode
//    어떤 JSX든 children으로 받으려면 React.ReactNode 타입을 사용합니다.
//    React.ReactNode는 JSX, string, number, null, undefined 등 모두 허용합니다.
//
// interface SectionWrapperProps {
//   title: string;
//   subtitle?: string;         // ? = 선택적 속성
//   children: React.ReactNode; // 어떤 JSX든 허용
// }

// TODO: SectionWrapperProps interface를 정의하세요.

export default function SectionWrapper({ title, subtitle, children }) { // ← 타입 없음 (에러 발생)
  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {subtitle && (
          <p className="mt-3 text-lg text-gray-500">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}
