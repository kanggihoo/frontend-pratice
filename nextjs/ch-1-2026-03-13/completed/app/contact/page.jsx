export const metadata = {
  title: "문의하기 - NovaTech Solutions",
  description:
    "NovaTech Solutions에 프로젝트 문의, 파트너십 제안 등을 남겨주세요.",
};

export default function ContactPage() {
  return (
    <div>
      {/* 페이지 헤더 */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold mb-4">문의하기</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            프로젝트 의뢰, 기술 상담, 파트너십 제안 등 무엇이든 편하게
            연락해주세요.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* 연락처 정보 */}
          <div>
            <h2 className="text-2xl font-bold mb-6">연락처 정보</h2>
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{info.label}</h3>
                    <p className="text-gray-500">{info.value}</p>
                    {info.sub && (
                      <p className="text-gray-400 text-sm">{info.sub}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 지도 플레이스홀더 */}
            <div className="mt-8 bg-gray-100 rounded-2xl h-48 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-3xl mb-2">🗺️</p>
                <p className="text-sm">지도 영역 (추후 연동)</p>
              </div>
            </div>
          </div>

          {/* 문의 폼 (정적 - 서버 액션은 이후 회차에서) */}
          <div>
            <h2 className="text-2xl font-bold mb-6">문의 양식</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input
                  type="text"
                  placeholder="홍길동"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  type="email"
                  placeholder="hong@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  문의 유형
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white">
                  <option>프로젝트 의뢰</option>
                  <option>기술 상담</option>
                  <option>파트너십 제안</option>
                  <option>채용 문의</option>
                  <option>기타</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  메시지
                </label>
                <textarea
                  rows={5}
                  placeholder="문의 내용을 입력해주세요..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow resize-none"
                />
              </div>
              <button
                type="button"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                문의 보내기
              </button>
              <p className="text-xs text-gray-400 text-center">
                * 이 폼은 현재 정적 UI입니다. 서버 액션을 활용한 폼 제출은
                이후 회차에서 다룹니다.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

const contactInfo = [
  {
    icon: "📍",
    label: "주소",
    value: "서울시 강남구 테헤란로 123, NovaTech 빌딩 8층",
    sub: "2호선 강남역 3번 출구에서 도보 5분",
  },
  {
    icon: "📞",
    label: "전화",
    value: "02-1234-5678",
    sub: "평일 09:00 ~ 18:00",
  },
  {
    icon: "✉️",
    label: "이메일",
    value: "contact@novatech.kr",
    sub: "영업일 기준 24시간 이내 답변",
  },
];
