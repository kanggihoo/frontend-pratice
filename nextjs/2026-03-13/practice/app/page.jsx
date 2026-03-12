// ─── [next/link 임포트] ──────────────────────────────────
// 다른 페이지로 이동하는 버튼을 만들려면 Link 컴포넌트가 필요합니다.
// 힌트: import Link from "next/link";


export default function HomePage() {
  return (
    <div>
      {/* ══════════════════════════════════════════════════════
          히어로(Hero) 섹션
          - 그라데이션 배경의 대형 배너 영역입니다.
          - 회사의 핵심 메시지와 CTA(Call to Action) 버튼을 배치합니다.
          ══════════════════════════════════════════════════════ */}

      {/* ─── [히어로 배경 스타일링] ──────────────────────────────
          파란색 그라데이션 배경에 흰색 텍스트를 적용하세요.
          힌트: className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white" */}
      <section className="">
        {/* ─── [히어로 컨테이너] ──────────────────────────────────
            내용의 최대 너비를 제한하고 중앙에 배치합니다.
            힌트: className="max-w-6xl mx-auto px-6 py-24 text-center" */}
        <div className="">
          {/* ─── [메인 타이틀] ──────────────────────────────────
              크고 굵은 제목을 작성하세요. <br>로 줄바꿈할 수 있습니다.
              힌트: className="text-5xl font-extrabold tracking-tight mb-6" */}
          <h1 className="">
            비즈니스의 미래를
            <br />
            기술로 설계합니다
          </h1>

          {/* ─── [서브 타이틀] ──────────────────────────────────
              회사 소개 한 줄 요약 문구를 넣으세요.
              힌트: className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed" */}
          <p className="">
            NovaTech Solutions는 10년 이상의 경험을 바탕으로 클라우드, AI, 보안
            분야에서 최적의 솔루션을 제공합니다.
          </p>

          {/* ─── [CTA 버튼 영역] ──────────────────────────────────
              2개의 버튼을 가로로 나란히 배치합니다.
              Link 컴포넌트를 사용하여 /about과 /contact 페이지로 이동합니다.

              힌트:
              <div className="flex gap-4 justify-center">
                <Link href="/about"
                  className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
                  회사 소개
                </Link>
                <Link href="/contact"
                  className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                  문의하기
                </Link>
              </div> */}
          <div>
            {/* 여기에 CTA 버튼을 추가하세요 */}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          핵심 서비스 섹션
          - services 배열을 map()으로 순회하여 서비스 카드를 렌더링합니다.
          ══════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">핵심 서비스</h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
          고객의 비즈니스 성장을 위한 맞춤형 IT 솔루션을 제공합니다.
        </p>

        {/* ─── [서비스 카드 그리드] ──────────────────────────────
            3개의 카드를 반응형 그리드로 배치하세요.
            - 모바일: 1열 / md 이상: 3열
            - 각 카드: 흰색 배경, 둥근 모서리, 그림자, 호버 효과

            힌트:
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.title}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-5">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div> */}
        <div>
          {/* 여기에 서비스 카드를 렌더링하세요 */}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          실적 통계 섹션
          - stats 배열을 map()으로 순회하여 숫자 통계를 표시합니다.
          ══════════════════════════════════════════════════════ */}

      {/* ─── [실적 섹션 스타일링] ──────────────────────────────
          파란색 배경에 4개의 통계 항목을 가로로 나열합니다.
          힌트: className="bg-blue-700 text-white py-16" */}
      <section className="">
        <div className="max-w-6xl mx-auto px-6">
          {/* ─── [통계 그리드] ──────────────────────────────────
              모바일: 2열 / md 이상: 4열 그리드
              힌트: className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"

              각 항목:
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-extrabold mb-1">{stat.value}</p>
                  <p className="text-blue-200 text-sm">{stat.label}</p>
                </div>
              ))} */}
          <div>
            {/* 여기에 통계 항목을 렌더링하세요 */}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── [서비스 데이터] ──────────────────────────────────────
// 아래 배열에 최소 3개의 서비스 데이터를 채워 넣으세요.
// 각 항목은 icon, title, description 속성을 가집니다.
//
// 힌트:
// { icon: "☁️", title: "클라우드 마이그레이션", description: "..." },
// { icon: "🤖", title: "AI / ML 솔루션", description: "..." },
// { icon: "🔒", title: "사이버 보안", description: "..." },
const services = [];

// ─── [실적 통계 데이터] ──────────────────────────────────
// 아래 배열에 4개의 통계 데이터를 채워 넣으세요.
// 각 항목은 value와 label 속성을 가집니다.
//
// 힌트:
// { value: "500+", label: "완료 프로젝트" },
// { value: "120+", label: "기업 고객" },
// { value: "99.9%", label: "서비스 가동률" },
// { value: "10년+", label: "업계 경험" },
const stats = [];
