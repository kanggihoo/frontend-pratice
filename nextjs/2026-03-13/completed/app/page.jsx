import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6">
            비즈니스의 미래를
            <br />
            <span className="text-blue-200">기술로 설계합니다</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            NovaTech Solutions는 10년 이상의 경험을 바탕으로 클라우드, AI, 보안
            분야에서 최적의 솔루션을 제공합니다.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/about"
              className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              회사 소개
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* 서비스 섹션 */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">핵심 서비스</h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
          고객의 비즈니스 성장을 위한 맞춤형 IT 솔루션을 제공합니다.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-5">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 실적 섹션 */}
      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-extrabold mb-1">{stat.value}</p>
                <p className="text-blue-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const services = [
  {
    icon: "☁️",
    title: "클라우드 마이그레이션",
    description:
      "온프레미스 인프라를 AWS, Azure, GCP 등 주요 클라우드 플랫폼으로 안전하고 효율적으로 이전합니다.",
  },
  {
    icon: "🤖",
    title: "AI / ML 솔루션",
    description:
      "머신러닝과 딥러닝 기반의 맞춤형 AI 솔루션으로 데이터에서 가치를 창출합니다.",
  },
  {
    icon: "🔒",
    title: "사이버 보안",
    description:
      "제로트러스트 아키텍처 기반의 보안 체계로 기업의 디지털 자산을 안전하게 보호합니다.",
  },
];

const stats = [
  { value: "500+", label: "완료 프로젝트" },
  { value: "120+", label: "기업 고객" },
  { value: "99.9%", label: "서비스 가동률" },
  { value: "10년+", label: "업계 경험" },
];
