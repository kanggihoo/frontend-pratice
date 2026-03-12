// ─── [페이지별 메타데이터] ──────────────────────────────────
// Next.js App Router에서는 각 page.jsx에서 metadata를 별도로 export할 수 있습니다.
// 이렇게 하면 layout.jsx의 전역 metadata를 이 페이지에서만 덮어쓰게 됩니다.
//
// 힌트:
// export const metadata = {
//   title: "회사 소개 - NovaTech Solutions",
//   description: "NovaTech Solutions의 비전, 핵심 가치, 그리고 팀을 소개합니다.",
// };


export default function AboutPage() {
  return (
    <div>
      {/* ══════════════════════════════════════════════════════
          페이지 헤더 섹션
          - 그라데이션 배경의 페이지 타이틀 영역
          ══════════════════════════════════════════════════════ */}

      {/* ─── [헤더 스타일링] ──────────────────────────────────
          인디고~블루 그라데이션 배경에 페이지 제목을 배치하세요.
          힌트: className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16" */}
      <section className="">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="">회사 소개</h1>
          <p className="">
            기술로 세상을 바꾸는 사람들, NovaTech Solutions를 소개합니다.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          비전 섹션
          - 왼쪽: 텍스트, 오른쪽: 비주얼 카드의 2열 레이아웃
          ══════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* ─── [2열 그리드] ──────────────────────────────────
            md 이상에서 2열로 나누고, 수직 중앙 정렬합니다.
            힌트: className="grid md:grid-cols-2 gap-12 items-center" */}
        <div className="">
          <div>
            <h2 className="">우리의 비전</h2>
            {/* ─── 비전 설명 문단 ───
                회사의 설립 이야기와 사명을 작성하세요.
                힌트: className="text-gray-600 leading-relaxed mb-4" */}
            <p className="">
              NovaTech Solutions는 2016년 설립 이래, &ldquo;기술을 통한 비즈니스
              혁신&rdquo;이라는 비전 아래 꾸준히 성장해왔습니다.
            </p>
            <p className="">
              클라우드, AI, 보안 등 핵심 기술 영역에서 축적된 전문성을 바탕으로
              기업 맞춤형 솔루션을 설계하고 있습니다.
            </p>
          </div>
          {/* ─── 비전 비주얼 카드 ───
              그라데이션 배경의 카드 형태로 설립연도 등 포인트 정보를 표시합니다.
              힌트: className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-10 text-center" */}
          <div className="">
            <p className="text-5xl mb-4">🚀</p>
            <p className="">Since 2016</p>
            <p className="">10년 이상의 여정, 끊임없는 혁신</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          핵심 가치 섹션
          - values 배열을 map()으로 순회하여 카드 렌더링
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">핵심 가치</h2>
          {/* ─── [핵심 가치 그리드] ──────────────────────────────
              4열 그리드로 각 가치를 카드 형태로 표시하세요.
              힌트: className="grid md:grid-cols-4 gap-6"

              각 카드:
              {values.map((item) => (
                <div key={item.title}
                  className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))} */}
          <div>
            {/* 여기에 핵심 가치 카드를 렌더링하세요 */}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          팀 소개 섹션
          - team 배열을 map()으로 순회하여 멤버 카드 렌더링
          ══════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">리더십 팀</h2>
        {/* ─── [팀원 카드 그리드] ──────────────────────────────
            3열 그리드에 각 팀원 카드를 배치하세요.
            힌트: className="grid md:grid-cols-3 gap-8"

            각 카드:
            {team.map((member) => (
              <div key={member.name}
                className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))} */}
        <div>
          {/* 여기에 팀원 카드를 렌더링하세요 */}
        </div>
      </section>
    </div>
  );
}

// ─── [핵심 가치 데이터] ──────────────────────────────────
// icon, title, description 속성을 가진 4개 항목을 채워 넣으세요.
//
// 힌트:
// { icon: "💡", title: "혁신", description: "..." },
// { icon: "🤝", title: "신뢰", description: "..." },
// { icon: "🎯", title: "성과", description: "..." },
// { icon: "🌱", title: "성장", description: "..." },
const values = [];

// ─── [팀원 데이터] ──────────────────────────────────────
// avatar, name, role, bio 속성을 가진 3개 항목을 채워 넣으세요.
//
// 힌트:
// { avatar: "👨‍💼", name: "김도현", role: "CEO / 대표이사", bio: "..." },
const team = [];
