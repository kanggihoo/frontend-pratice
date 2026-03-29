import { companyInfo, teamMembers, services, historyItems } from "@/data/mockData";
import HeroSection from "@/app/components/HeroSection";
import TeamCard from "@/app/components/TeamCard";
import ServiceCard from "@/app/components/ServiceCard";
import SectionWrapper from "@/app/components/SectionWrapper";
import HistoryTimeline from "@/app/components/HistoryTimeline";

// ─── Page 컴포넌트 ────────────────────────────────────────────────────────────
// 서버 컴포넌트는 별도의 Props 타입이 필요 없으면 타입 어노테이션 없이도 됩니다.
// async 서버 컴포넌트는 Promise<JSX.Element>를 반환하지만, 명시하지 않아도 TypeScript가 추론합니다.
export default function Page() {
  return (
    <main>
      {/* HeroSection: CompanyInfo 타입의 company prop을 받습니다 */}
      <HeroSection company={companyInfo} />

      {/* SectionWrapper: title(필수) + subtitle(선택) + children(ReactNode) */}
      <SectionWrapper
        title="우리의 서비스"
        subtitle="고객의 성장을 함께하는 다양한 솔루션을 제공합니다"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </SectionWrapper>

      {/* subtitle 없이 사용 — 선택적 속성(subtitle?)이므로 생략 가능 */}
      <div className="bg-gray-50">
        <SectionWrapper title="팀 소개">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </SectionWrapper>
      </div>

      <SectionWrapper
        title="회사 연혁"
        subtitle="Acme Corp의 성장 발자취"
      >
        <HistoryTimeline items={historyItems} />
      </SectionWrapper>

      <footer className="bg-gray-900 text-gray-400 text-center py-8 text-sm">
        © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
      </footer>
    </main>
  );
}
