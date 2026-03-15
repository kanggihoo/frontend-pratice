// ─── [서버 컴포넌트] ─────────────────────────────────────
// Header는 상태나 이벤트 핸들러가 없으므로 서버 컴포넌트로 유지합니다.
// "use client" 지시어가 필요하지 않습니다.

export default function Header() {
  return (
    // ─── [UI 스타일링] ──────────────────────────────────
    // Tailwind CSS로 헤더 영역을 꾸며보세요.
    // 힌트: 흰 배경(bg-white), 하단 테두리(border-b), 그림자(shadow-sm)
    <header className="">
      <div className="">
        <div className="">
          <div>
            {/* ─── [제목 스타일링] ─────────────────────── */}
            {/* 힌트: text-2xl, font-bold, text-gray-900 */}
            <h1 className="">🔒 API 프록시 대시보드</h1>

            {/* ─── [부제목 스타일링] ────────────────────── */}
            {/* 힌트: text-sm, text-gray-500, mt-1 */}
            <p className="">
              Next.js Route Handlers로 외부 API를 안전하게 프록시합니다
            </p>
          </div>

          {/* ─── [상태 표시 배지] ───────────────────────── */}
          {/* 힌트: flex, items-center, gap-2, bg-green-50, px-3, py-1.5, rounded-full */}
          <div className="">
            <span className="" />
            <span className="">서버 프록시 활성</span>
          </div>
        </div>
      </div>
    </header>
  );
}
