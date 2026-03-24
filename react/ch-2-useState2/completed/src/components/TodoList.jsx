import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  if (todos.length === 0) {
    return (
      <section className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <p className="text-5xl">🗂️</p>
        <h2 className="mt-4 text-xl font-bold text-slate-900">표시할 할 일이 없습니다</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          현재 필터에 맞는 항목이 없어요. 새 할 일을 추가하거나 다른 필터를 선택해 보세요.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </section>
  );
}
