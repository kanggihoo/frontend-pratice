export default function Header({ stats }) {
  // ─── [오늘 날짜 표시] ─────────────────────────────
  const todayLabel = new Date().toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });
  return (
    // ─── [헤더 배경 스타일링] ────────────────────────
    // <header>에 다음 클래스를 적용하세요:
    // border-b border-indigo-100 bg-white/80 backdrop-blur
    <header className="border-b border-indigo-100 bg-white/80 backdrop-blur">
      {/* ─── [헤더 내부 컨테이너] ────────────────────── */}
      {/* 다음 클래스를 적용하세요:
          mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 lg:px-6
      */}
      <div className="mx-auto flex flex-col w-full max-w-6xl gap-6 px-4 py-8 lg:px-6">
        {/* ─── [상단 소개 영역] ───────────────────────── */}
        {/* 좌측에는 회차 정보, 제목, 설명 문장을 배치하세요.
            우측에는 오늘 날짜가 표시되는 카드 하나를 둡니다.
            lg 이상에서는 가로 정렬, 모바일에서는 세로 정렬이 되도록 구성하세요. */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              React 회차 2 · useState 심화 + 컴포넌트 분리
            </p>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              오늘 해야 할 일을 상태로 관리하는 Todo 플래너
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {" "}
              배열 상태 업데이트, 객체 상태 관리, 부모에서 자식으로 함수
              전달하기를 한 화면에서 연습할 수 있도록 구성한 예제입니다.
            </p>
          </div>

          <div className=" rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">{todayLabel}</p>
            <p>할 일 흐름과 필터 상태를 함께 다뤄보세요.</p>
          </div>
        </div>

        {/* ─── [통계 카드 3개] ───────────────────────── */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-lg shadow-slate-900/10">
            <p className="text-sm text-slate-300">전체 할 일</p>
            <p className="mt-2 text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-5 py-4 shadow-sm ring-1 ring-emerald-100">
            <p className="text-sm text-emerald-700">완료된 할 일</p>
            <p className="mt-2 text-3xl font-bold text-emerald-900">
              {stats.completed}
            </p>
          </div>
          <div className="rounded-2xl bg-amber-50 px-5 py-4 shadow-sm ring-1 ring-amber-100">
            <p className="text-sm text-amber-700">남은 할 일</p>
            <p className="mt-2 text-3xl font-bold text-amber-900">
              {stats.active}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
