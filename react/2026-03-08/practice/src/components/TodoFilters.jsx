// - filterOptions: [{ label, value }, ...]
// - currentFilter: 현재 선택된 필터 값
// - activeCount: 진행 중 개수
// - completedCount: 완료 개수
// - onFilterChange: 필터 변경 함수
// - onClearCompleted: 완료 항목 일괄 삭제 함수
export default function TodoFilters({
  filterOptions,
  currentFilter,
  activeCount,
  completedCount,
  onFilterChange,
  onClearCompleted,
}) {
  return (
    // ─── [섹션 박스] ─────────────────────────────────
    // flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm
    <section className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      {/* ─── [설명 + 필터 버튼 목록] ─────────────────── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            필터로 상태를 전환해 보세요
          </h2>
          <p className="text-sm text-slate-500">
            선택한 필터에 따라 같은 배열이라도 다른 결과가 렌더링됩니다.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => onFilterChange(option.value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                currentFilter === option.value
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── [카운트 정보 + 완료 항목 삭제 버튼] ─────── */}
      <div className="flex flex-col gap-3 rounded-2xl bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2 text-sm text-slate-600">
          <span className="rounded-full bg-white px-3 py-1 font-medium">
            진행 중 {activeCount}개
          </span>
          <span className="rounded-full bg-white px-3 py-1 font-medium">
            완료 {completedCount}개
          </span>
        </div>
        <button
          type="button"
          onClick={onClearCompleted}
          className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
        >
          완료 항목 지우기
        </button>
      </div>
    </section>
  );
}
