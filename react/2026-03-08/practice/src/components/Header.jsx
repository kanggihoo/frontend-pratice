// ─── [Props 받기] ────────────────────────────────
// 이 컴포넌트는 부모(App)로부터 stats 객체를 받습니다.
// stats 안에는 total, completed, active 값이 들어 있습니다.
// 힌트: function Header({ stats }) { ... }

export default function Header() {
  // ─── [오늘 날짜 표시] ─────────────────────────────
  // new Date().toLocaleDateString()을 사용해서
  // "3월 8일 (일)" 같은 문자열을 만들어 보세요.
  // 이 값은 헤더 오른쪽 카드에 표시하면 됩니다.

  return (
    // ─── [헤더 배경 스타일링] ────────────────────────
    // <header>에 다음 클래스를 적용하세요:
    // border-b border-indigo-100 bg-white/80 backdrop-blur
    <header>
      {/* ─── [헤더 내부 컨테이너] ────────────────────── */}
      {/* 다음 클래스를 적용하세요:
          mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 lg:px-6
      */}
      <div>
        {/* ─── [상단 소개 영역] ───────────────────────── */}
        {/* 좌측에는 회차 정보, 제목, 설명 문장을 배치하세요.
            우측에는 오늘 날짜가 표시되는 카드 하나를 둡니다.
            lg 이상에서는 가로 정렬, 모바일에서는 세로 정렬이 되도록 구성하세요. */}
        <div>
          <div>
            <p>React 회차 2</p>
            <h1>Todo 플래너</h1>
            <p>배열 상태와 객체 상태를 함께 연습하는 학습 예제입니다.</p>
          </div>

          <div>
            <p>오늘 날짜</p>
            <p>여기에 날짜 문자열을 넣으세요.</p>
          </div>
        </div>

        {/* ─── [통계 카드 3개] ───────────────────────── */}
        {/* stats.total, stats.completed, stats.active를 화면에 표시하세요.
            grid grid-cols-1 gap-3 sm:grid-cols-3 레이아웃을 추천합니다.
            각 카드마다 배경색을 다르게 주면 상태가 더 잘 구분됩니다. */}
        <div>
          <p>전체 / 완료 / 남은 할 일 카드를 여기에 배치하세요.</p>
        </div>
      </div>
    </header>
  );
}
