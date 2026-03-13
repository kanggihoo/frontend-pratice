// ─── [서버 컴포넌트 확인] ──────────────────────────────
// 이 파일에는 "use client" 선언이 없습니다.
// Next.js App Router에서 모든 컴포넌트는 기본적으로 서버 컴포넌트(RSC)입니다.
// 이 Header는 정적인 UI만 담당하므로 서버 컴포넌트로 유지하는 것이 올바릅니다.
// ─────────────────────────────────────────────────────

export default function Header() {
  return (
    <header className="">
      {/* ─── [UI 스타일링] ──────────────────────────────
          배경색(bg-white), 하단 테두리(border-b border-gray-200)를 적용하세요.
          header 태그에 위 클래스를 추가하세요.
          ──────────────────────────────────────────── */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            {/* ─── [UI 스타일링] ──────────────────────────
                h1 태그: 텍스트 크기(text-2xl), 굵기(font-bold), 색상(text-indigo-600)
                p 태그: 텍스트 크기(text-sm), 색상(text-gray-500), 위쪽 마진(mt-1)
                ──────────────────────────────────────── */}
            <h1 className="">ShopNow</h1>
            <p className="">스마트한 쇼핑의 시작</p>
          </div>

          {/* ─── [UI 스타일링] ──────────────────────────────
              nav 태그에 flex 레이아웃, 간격(gap-6), 텍스트 스타일을 적용하세요.
              힌트: flex items-center gap-6 text-sm font-medium text-gray-600
              각 span에는 hover 시 색상 변경(hover:text-indigo-600)과
              cursor-pointer, transition-colors를 추가하세요.
              ──────────────────────────────────────────── */}
          <nav className="">
            <span className="">홈</span>
            <span className="">카테고리</span>
            <span className="">장바구니</span>
          </nav>
        </div>
      </div>
    </header>
  );
}
