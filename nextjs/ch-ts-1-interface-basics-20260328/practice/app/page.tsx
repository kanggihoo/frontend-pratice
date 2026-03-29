// practice/app/page.tsx
// 이 파일은 completed와 동일한 로직입니다. 타입만 없어서 에러가 발생합니다.
// lib/types.ts → 컴포넌트 Props 순으로 타입을 채워나가세요.

import { companyInfo, teamMembers, services, historyItems } from "@/data/mockData";
import HeroSection from "@/app/components/HeroSection";
import TeamCard from "@/app/components/TeamCard";
import ServiceCard from "@/app/components/ServiceCard";
import SectionWrapper from "@/app/components/SectionWrapper";
import HistoryTimeline from "@/app/components/HistoryTimeline";

export default function Page() {
  return (
    <main>
      <HeroSection company={companyInfo} />

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
