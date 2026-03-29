// practice/data/mockData.ts
// 데이터는 그대로 제공합니다. 타입 어노테이션은 lib/types.ts를 완성한 뒤 직접 추가해보세요.
//
// 완성 후 아래처럼 타입을 명시해볼 수 있습니다:
//   import type { CompanyInfo } from '@/lib/types';
//   export const companyInfo: CompanyInfo = { ... };

export const companyInfo = {
  name: "Acme Corp",
  tagline: "더 나은 내일을 만드는 기술",
  description:
    "저희는 혁신적인 소프트웨어 솔루션으로 고객의 비즈니스 성장을 돕는 회사입니다. 2010년 설립 이래 수백 개의 기업과 함께 디지털 전환을 이끌어왔습니다.",
  founded: 2010,
  employeeCount: 250,
};

export const teamMembers = [
  {
    id: 1,
    name: "김지수",
    role: "CEO & 공동 창업자",
    bio: "15년 경력의 소프트웨어 아키텍트. 스탠퍼드 CS 졸업 후 실리콘밸리에서 경력을 쌓았습니다.",
  },
  {
    id: 2,
    name: "박민준",
    role: "CTO",
    bio: "오픈소스 커뮤니티의 열정적인 기여자. 클라우드 인프라 전문가로 다수의 대규모 시스템을 설계했습니다.",
  },
  {
    id: 3,
    name: "이서연",
    role: "디자인 총괄",
    bio: "사용자 경험 중심 디자인 철학으로 제품의 가치를 높이는 UX 전문가입니다.",
  },
  {
    id: 4,
    name: "최현우",
    role: "개발 팀장",
    bio: "풀스택 개발 10년 경력. React와 Node.js 생태계의 깊은 이해를 바탕으로 팀을 이끌고 있습니다.",
  },
];

export const services = [
  {
    id: 1,
    title: "웹 애플리케이션 개발",
    description:
      "최신 기술 스택을 활용한 고성능 웹 애플리케이션을 설계하고 개발합니다.",
    icon: "🌐",
  },
  {
    id: 2,
    title: "클라우드 인프라",
    description:
      "AWS, GCP, Azure를 활용한 확장 가능한 클라우드 인프라를 구축합니다.",
    icon: "☁️",
  },
  {
    id: 3,
    title: "UI/UX 디자인",
    description:
      "사용자 중심의 직관적인 인터페이스를 디자인하여 최고의 경험을 제공합니다.",
    icon: "🎨",
  },
  {
    id: 4,
    title: "기술 컨설팅",
    description:
      "비즈니스 목표에 맞는 최적의 기술 전략을 수립하고 실행을 지원합니다.",
    icon: "💡",
  },
];

export const historyItems = [
  {
    year: 2010,
    title: "회사 설립",
    description: "서울 강남구 소재 작은 사무실에서 3인으로 시작했습니다.",
  },
  {
    year: 2014,
    title: "시리즈 A 투자 유치",
    description: "50억 원 규모의 시리즈 A 투자를 유치하며 본격 성장을 시작했습니다.",
  },
  {
    year: 2018,
    title: "글로벌 진출",
    description: "일본, 싱가포르에 해외 법인을 설립하며 글로벌 시장에 진출했습니다.",
  },
  {
    year: 2023,
    title: "직원 250명 돌파",
    description: "지속적인 성장으로 임직원 250명의 중견기업으로 발전했습니다.",
  },
];
