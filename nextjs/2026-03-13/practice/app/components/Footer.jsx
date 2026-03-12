export default function Footer() {
  return (
    // ─── [푸터 스타일링] ──────────────────────────────────
    // 어두운 배경의 푸터를 만드세요.
    // 힌트: className="bg-gray-900 text-gray-400 py-12"
    <footer className="">
      {/* ─── [푸터 컨테이너] ──────────────────────────────────
          최대 너비를 제한하고 가운데 정렬합니다.
          힌트: className="max-w-6xl mx-auto px-6" */}
      <div className="">
        {/* ─── [푸터 그리드] ──────────────────────────────────
            3개의 컬럼으로 구성된 푸터 영역을 만드세요.
            - 회사 소개 / 바로가기 링크 / 연락처 정보
            - 반응형: 모바일에서는 1열, md 이상에서 3열
            힌트: className="grid md:grid-cols-3 gap-8 mb-8" */}
        <div className="">
          {/* ─── 컬럼 1: 회사 소개 ─── */}
          <div>
            {/* 힌트: <h3 className="text-white font-bold text-lg mb-3">NovaTech</h3> */}
            <h3>NovaTech</h3>
            <p>
              혁신적인 기술로 비즈니스의 디지털 전환을 선도하는 IT 솔루션
              파트너입니다.
            </p>
          </div>

          {/* ─── 컬럼 2: 바로가기 ─── */}
          <div>
            <h4>바로가기</h4>
            {/* 힌트: <a> 태그나 <Link>로 각 페이지 링크를 추가하세요 */}
            <ul>
              <li><a href="/">홈</a></li>
              <li><a href="/about">회사 소개</a></li>
              <li><a href="/contact">문의하기</a></li>
            </ul>
          </div>

          {/* ─── 컬럼 3: 연락처 ─── */}
          <div>
            <h4>연락처</h4>
            <ul>
              <li>서울시 강남구 테헤란로 123</li>
              <li>02-1234-5678</li>
              <li>contact@novatech.kr</li>
            </ul>
          </div>
        </div>

        {/* ─── [저작권 영역] ──────────────────────────────────
            상단에 구분선을 넣고 중앙 정렬된 저작권 텍스트를 표시하세요.
            힌트: className="border-t border-gray-800 pt-6 text-center text-sm" */}
        <div className="">
          <p>&copy; 2026 NovaTech Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
