export const metadata = {
  title: "회사 소개 - NovaTech Solutions",
  description: "NovaTech Solutions의 비전, 핵심 가치, 그리고 팀을 소개합니다.",
};

export default function AboutPage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold mb-4">회사 소개</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            기술로 세상을 바꾸는 사람들, NovaTech Solutions를 소개합니다.
          </p>
        </div>
      </section>

      {/* 비전 섹션 */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">우리의 비전</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              NovaTech Solutions는 2016년 설립 이래, &ldquo;기술을 통한 비즈니스
              혁신&rdquo;이라는 비전 아래 꾸준히 성장해왔습니다. 급변하는 디지털
              환경에서 고객이 경쟁력을 유지하고, 더 나은 미래를 설계할 수 있도록
              돕는 것이 우리의 사명입니다.
            </p>
            <p className="text-gray-600 leading-relaxed">
              클라우드, AI, 보안 등 핵심 기술 영역에서 축적된 전문성을 바탕으로
              기업 맞춤형 솔루션을 설계하고, 성공적인 디지털 전환을 이끌고
              있습니다.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-10 text-center">
            <p className="text-5xl mb-4">🚀</p>
            <p className="text-2xl font-bold text-blue-700 mb-2">Since 2016</p>
            <p className="text-gray-500">10년 이상의 여정, 끊임없는 혁신</p>
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">핵심 가치</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((item) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 팀 소개 */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">리더십 팀</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                {member.avatar}
              </div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-blue-600 text-sm mb-3">{member.role}</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const values = [
  {
    icon: "💡",
    title: "혁신",
    description: "끊임없는 기술 탐구와 창의적 문제 해결을 추구합니다.",
  },
  {
    icon: "🤝",
    title: "신뢰",
    description: "투명한 커뮤니케이션과 약속 이행으로 신뢰를 쌓습니다.",
  },
  {
    icon: "🎯",
    title: "성과",
    description: "측정 가능한 비즈니스 가치를 만들어내는 데 집중합니다.",
  },
  {
    icon: "🌱",
    title: "성장",
    description: "구성원과 고객이 함께 성장하는 생태계를 만듭니다.",
  },
];

const team = [
  {
    avatar: "👨‍💼",
    name: "김도현",
    role: "CEO / 대표이사",
    bio: "전 삼성SDS 아키텍트 출신. 15년간 대규모 시스템 설계 및 디지털 전환 프로젝트를 이끌었습니다.",
  },
  {
    avatar: "👩‍💻",
    name: "이서연",
    role: "CTO / 기술이사",
    bio: "AI/ML 분야 전문가. 카이스트 컴퓨터공학 박사로 다수의 AI 솔루션을 상용화했습니다.",
  },
  {
    avatar: "👨‍🔬",
    name: "박준호",
    role: "CSO / 보안이사",
    bio: "사이버 보안 전문가로 금융, 공공 분야의 보안 인프라를 설계해왔습니다.",
  },
];
