// ─── [페이지별 메타데이터] ──────────────────────────────────
// 힌트: export const metadata = { title: "문의하기 - NovaTech Solutions", description: "..." };


export default function ContactPage() {
  return (
    <div>
      {/* ══════════════════════════════════════════════════════
          페이지 헤더 섹션
          ══════════════════════════════════════════════════════ */}

      {/* ─── [헤더 스타일링] ──────────────────────────────────
          블루~시안 그라데이션 배경에 페이지 제목을 배치하세요.
          힌트: className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16" */}
      <section className="">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="">문의하기</h1>
          <p className="">
            프로젝트 의뢰, 기술 상담, 파트너십 제안 등 무엇이든 편하게
            연락해주세요.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* ─── [2열 레이아웃] ──────────────────────────────────
            왼쪽: 연락처 정보 / 오른쪽: 문의 폼
            힌트: className="grid md:grid-cols-2 gap-12" */}
        <div className="">

          {/* ══════════════════════════════════════════════════
              왼쪽: 연락처 정보
              ══════════════════════════════════════════════════ */}
          <div>
            <h2 className="">연락처 정보</h2>
            {/* ─── [연락처 리스트] ──────────────────────────────
                contactInfo 배열을 map()으로 순회하여 연락처 항목을 표시하세요.
                각 항목은 아이콘 + 라벨 + 값 구조입니다.

                힌트:
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.label}</h3>
                        <p className="text-gray-500">{info.value}</p>
                        {info.sub && <p className="text-gray-400 text-sm">{info.sub}</p>}
                      </div>
                    </div>
                  ))}
                </div> */}
            <div>
              {/* 여기에 연락처 정보를 렌더링하세요 */}
            </div>

            {/* 지도 플레이스홀더 */}
            <div className="mt-8 bg-gray-100 rounded-2xl h-48 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-3xl mb-2">🗺️</p>
                <p className="text-sm">지도 영역 (추후 연동)</p>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              오른쪽: 문의 폼
              ══════════════════════════════════════════════════ */}
          <div>
            <h2 className="">문의 양식</h2>
            {/* ─── [폼 요소 스타일링] ──────────────────────────────
                각 입력 필드에 Tailwind CSS를 적용하세요.
                - 라벨: block text-sm font-medium text-gray-700 mb-1
                - 입력: w-full px-4 py-3 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                - 버튼: w-full bg-blue-600 text-white font-semibold py-3 rounded-lg
                        hover:bg-blue-700 transition-colors

                힌트: completed 코드를 참고하면서 className을 채워 넣으세요. */}
            <form className="">
              <div>
                <label className="">이름</label>
                <input type="text" placeholder="홍길동" className="" />
              </div>
              <div>
                <label className="">이메일</label>
                <input type="email" placeholder="hong@example.com" className="" />
              </div>
              <div>
                <label className="">문의 유형</label>
                <select className="">
                  <option>프로젝트 의뢰</option>
                  <option>기술 상담</option>
                  <option>파트너십 제안</option>
                  <option>채용 문의</option>
                  <option>기타</option>
                </select>
              </div>
              <div>
                <label className="">메시지</label>
                <textarea rows={5} placeholder="문의 내용을 입력해주세요..." className="" />
              </div>
              <button type="button" className="">
                문의 보내기
              </button>
              <p className="text-xs text-gray-400 text-center mt-2">
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

// ─── [연락처 데이터] ──────────────────────────────────────
// icon, label, value, sub 속성을 가진 3개 항목을 채워 넣으세요.
//
// 힌트:
// { icon: "📍", label: "주소", value: "서울시 강남구 테헤란로 123, NovaTech 빌딩 8층", sub: "2호선 강남역 3번 출구에서 도보 5분" },
// { icon: "📞", label: "전화", value: "02-1234-5678", sub: "평일 09:00 ~ 18:00" },
// { icon: "✉️", label: "이메일", value: "contact@novatech.kr", sub: "영업일 기준 24시간 이내 답변" },
const contactInfo = [];
