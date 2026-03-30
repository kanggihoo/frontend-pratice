// ─── [Props 타입 정의] ─────────────────────────────────────────────────────
// JavaScript: function HeroSection({ company }) { ... }
// TypeScript: company prop의 타입을 lib/types.ts에서 가져와야 합니다.
//
// 1단계: lib/types.ts에서 CompanyInfo를 import합니다.
//   import type { CompanyInfo } from '@/lib/types';
//   (import type은 타입만 가져오는 방식 — 런타임 번들에 포함되지 않음)
//
// 2단계: Props interface를 정의합니다.
//   interface HeroSectionProps {
//     company: CompanyInfo;
//   }
//
// 3단계: 함수 매개변수에 타입을 적용합니다.
//   export default function HeroSection({ company }: HeroSectionProps) { ... }

// TODO: 1. import type { CompanyInfo } from '@/lib/types'; 를 추가하세요.
// TODO: 2. HeroSectionProps interface를 정의하세요.

import { CompanyInfo } from "@/lib/types";
interface HeroSectionProps {
  company: CompanyInfo;
}

export default function HeroSection({ company }: HeroSectionProps) {
  // ← 타입 없음 (에러 발생)
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-24 px-4 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight">{company.name}</h1>
      <p className="mt-4 text-2xl font-light text-blue-100">
        {company.tagline}
      </p>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-blue-200 leading-relaxed">
        {company.description}
      </p>
      <div className="mt-10 flex justify-center gap-12">
        <Stat label="설립 연도" value={`${company.founded}년`} />
        <Stat label="임직원" value={`${company.employeeCount}명`} />
      </div>
    </div>
  );
}

// ─── [Stat 서브 컴포넌트 Props 타입] ──────────────────────────────────────
// 작은 컴포넌트도 interface로 Props를 명확히 정의합니다.
interface StatProps {
  label: string;
  value: string;
}
// TODO: StatProps interface를 정의하세요.

function Stat({ label, value }: StatProps) {
  // ← 타입 없음 (에러 발생)
  return (
    <div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-blue-200 mt-1">{label}</div>
    </div>
  );
}
