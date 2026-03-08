export default function Header({ userCount }) {
  return (
    // ─── [헤더 스타일링] ──────────────────────────────────
    // 헤더 컨테이너에 Tailwind CSS 클래스를 적용하세요:
    // - 배경색: bg-white
    // - 그림자: shadow-sm
    // - 하단 테두리: border-b border-slate-200
    <header className="">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            {/* ─── [타이틀 스타일링] ───────────────────────── */}
            {/* h1에 적용할 클래스: text-2xl font-bold text-slate-800 */}
            <h1 className="">
              유저 대시보드
            </h1>
            {/* p에 적용할 클래스: text-sm text-slate-500 mt-1 */}
            <p className="">
              JSONPlaceholder API에서 불러온 유저 목록
            </p>
          </div>

          {/* ─── [유저 수 배지] ──────────────────────────── */}
          {/* 배지 스타일: bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold */}
          {/* 내용: 총 {userCount}명 */}
          <div className="">

          </div>
        </div>
      </div>
    </header>
  );
}
