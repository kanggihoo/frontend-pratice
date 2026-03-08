// ─── [스타일 객체] ───────────────────────────────
// 우선순위별 badge 스타일을 객체로 분리해 보세요.
// 예:
// const priorityStyles = {
//   높음: "bg-rose-100 text-rose-700",
//   보통: "bg-amber-100 text-amber-700",
//   낮음: "bg-emerald-100 text-emerald-700",
// };

// ─── [Props 받기] ────────────────────────────────
// - todo: 개별 할 일 객체
// - onToggleTodo: 완료 상태 토글 함수
// - onDeleteTodo: 삭제 함수

export default function TodoItem() {
  return (
    // ─── [카드 레이아웃] ─────────────────────────────
    // rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm
    <article>
      {/* ─── [완료 토글 버튼] ───────────────────────── */}
      {/* 버튼 클릭 시 onToggleTodo(todo.id)를 호출하세요.
          완료 여부에 따라 버튼 배경색/테두리색을 다르게 설정하면 좋습니다. */}
      <div>
        <button type="button">✓</button>
      </div>

      {/* ─── [카테고리 / 우선순위 / 마감일 뱃지] ─────── */}
      {/* todo.category, todo.priority, todo.dueDate를 표시하세요.
          priorityStyles[todo.priority]를 활용하면 우선순위 색상을 쉽게 바꿀 수 있습니다. */}
      <div>
        <span>카테고리</span>
        <span>우선순위</span>
        <span>마감일</span>
      </div>

      {/* ─── [제목 + 설명 문구] ─────────────────────── */}
      {/* 완료된 항목이면 line-through 클래스를 적용해 보세요.
          조건부 렌더링으로 완료/진행 중 안내 문구를 나눠도 좋습니다. */}
      <h3>할 일 제목</h3>
      <p>상태에 따라 설명 문구를 바꿔보세요.</p>

      {/* ─── [삭제 버튼] ────────────────────────────── */}
      {/* 버튼 클릭 시 onDeleteTodo(todo.id)를 호출하세요. */}
      <button type="button">삭제</button>
    </article>
  );
}
