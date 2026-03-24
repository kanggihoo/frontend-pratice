export default function TodoComposer({
  form,
  categoryOptions,
  priorityOptions,
  onFieldChange,
  onSubmit,
}) {
  return (
    <section className="rounded-[28px] bg-slate-900 p-6 text-white shadow-xl shadow-slate-900/10">
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-200">
          Add Todo
        </p>
        <h2 className="text-2xl font-bold">새로운 할 일을 추가해 보세요</h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          하나의 객체 상태(form) 안에서 입력값을 관리하면 관련된 폼 데이터를 한곳에서 다룰 수
          있습니다.
        </p>
      </div>

      <form className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr_auto]" onSubmit={onSubmit}>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-200">할 일 제목</span>
          <input
            type="text"
            value={form.title}
            onChange={(event) => onFieldChange("title", event.target.value)}
            placeholder="예: 컴포넌트 분리 기준 정리하기"
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-200">카테고리</span>
          <select
            value={form.category}
            onChange={(event) => onFieldChange("category", event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category} className="text-slate-900">
                {category}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-200">우선순위</span>
            <select
              value={form.priority}
              onChange={(event) => onFieldChange("priority", event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
            >
              {priorityOptions.map((priority) => (
                <option key={priority} value={priority} className="text-slate-900">
                  {priority}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-200">마감일</span>
            <input
              type="date"
              value={form.dueDate}
              onChange={(event) => onFieldChange("dueDate", event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-auto rounded-2xl bg-indigo-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-indigo-300"
        >
          할 일 추가
        </button>
      </form>
    </section>
  );
}
