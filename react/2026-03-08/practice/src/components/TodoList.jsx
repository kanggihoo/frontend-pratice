// ─── [import] ────────────────────────────────────
// TodoItem 컴포넌트를 import하세요.
// 힌트: import TodoItem from "./TodoItem";

// ─── [Props 받기] ────────────────────────────────
// - todos: 현재 필터링된 할 일 배열
// - onToggleTodo: 완료 상태 토글 함수
// - onDeleteTodo: 삭제 함수

export default function TodoList() {
  // ─── [빈 목록 처리] ───────────────────────────────
  // todos.length === 0 이면 안내 문구를 먼저 반환하세요.
  // 예: "표시할 할 일이 없습니다"

  return (
    // ─── [리스트 렌더링] ─────────────────────────────
    // todos.map((todo) => (
    //   <TodoItem
    //     key={todo.id}
    //     todo={todo}
    //     onToggleTodo={onToggleTodo}
    //     onDeleteTodo={onDeleteTodo}
    //   />
    // ))
    <section>
      <p>TodoItem 목록을 여기에 렌더링하세요.</p>
    </section>
  );
}
