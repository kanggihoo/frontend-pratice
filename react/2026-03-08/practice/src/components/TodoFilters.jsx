// ─── [Props 받기] ────────────────────────────────
// - filterOptions: [{ label, value }, ...]
// - currentFilter: 현재 선택된 필터 값
// - activeCount: 진행 중 개수
// - completedCount: 완료 개수
// - onFilterChange: 필터 변경 함수
// - onClearCompleted: 완료 항목 일괄 삭제 함수

export default function TodoFilters() {
  return (
    // ─── [섹션 박스] ─────────────────────────────────
    // flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm
    <section>
      {/* ─── [설명 + 필터 버튼 목록] ─────────────────── */}
      {/* filterOptions.map((option) => ...) 패턴으로 버튼을 렌더링하세요.
          버튼 클릭 시 onFilterChange(option.value)를 호출합니다.
          선택된 버튼은 배경색을 진하게, 나머지는 연하게 스타일링하세요. */}
      <div>
        <div>
          <h2>필터로 상태를 전환해 보세요</h2>
          <p>선택한 필터에 따라 리스트가 달라집니다.</p>
        </div>

        <div>
          <p>필터 버튼들을 여기에 렌더링하세요.</p>
        </div>
      </div>

      {/* ─── [카운트 정보 + 완료 항목 삭제 버튼] ─────── */}
      {/* activeCount와 completedCount를 badge처럼 보여주세요.
          "완료 항목 지우기" 버튼에는 onClick={onClearCompleted}를 연결하세요. */}
      <div>
        <p>진행 중 0개 / 완료 0개</p>
        <button type="button">완료 항목 지우기</button>
      </div>
    </section>
  );
}
