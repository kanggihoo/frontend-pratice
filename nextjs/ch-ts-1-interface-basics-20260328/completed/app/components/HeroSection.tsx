import type { CompanyInfo } from "@/lib/types";

// ─── HeroSection Props 타입 ──────────────────────────────────────────────────
// interface로 Props 타입을 분리하여 정의합니다.
// 컴포넌트 함수 시그니처에서 { company }: HeroSectionProps 형태로 사용합니다.
interface HeroSectionProps {
  company: CompanyInfo;
}

export default function HeroSection({ company }: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-24 px-4 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight">{company.name}</h1>
      <p className="mt-4 text-2xl font-light text-blue-100">{company.tagline}</p>
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

// ─── Stat 서브 컴포넌트 ──────────────────────────────────────────────────────
// 작은 컴포넌트도 interface로 Props를 명확히 정의합니다.
interface StatProps {
  label: string;
  value: string;
}

function Stat({ label, value }: StatProps) {
  return (
    <div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-blue-200 mt-1">{label}</div>
    </div>
  );
}
