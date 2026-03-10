const priorityStyles = {
  높음: "bg-rose-100 text-rose-700",
  보통: "bg-amber-100 text-amber-700",
  낮음: "bg-emerald-100 text-emerald-700",
};

export default function TodoItem({ todo, onToggleTodo, onDeleteTodo }) {
  return (
    <article className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-1 items-start gap-4">
          <button
            type="button"
            onClick={() => onToggleTodo(todo.id)}
            className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
              todo.completed
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-slate-300 bg-white text-transparent hover:border-indigo-400"
            }`}
            aria-label="할 일 완료 상태 토글"
          >
            ✓
          </button>

          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {todo.category}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  priorityStyles[todo.priority]
                }`}
              >
                {todo.priority}
              </span>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                마감 {todo.dueDate}
              </span>
            </div>

            <h3
              className={`text-lg font-bold ${
                todo.completed ? "text-slate-400 line-through" : "text-slate-900"
              }`}
            >
              {todo.title}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {todo.completed
                ? "완료된 항목입니다. 필요하면 삭제해서 목록을 정리해 보세요."
                : "아직 진행 중인 항목입니다. 완료 버튼으로 상태를 업데이트해 보세요."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onDeleteTodo(todo.id)}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
        >
          삭제
        </button>
      </div>
    </article>
  );
}
