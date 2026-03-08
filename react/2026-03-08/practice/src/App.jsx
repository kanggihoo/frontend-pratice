import Header from "./components/Header";
import TodoComposer from "./components/TodoComposer";
import TodoFilters from "./components/TodoFilters";
import TodoList from "./components/TodoList";
import {
  categoryOptions,
  filterOptions,
  initialFormState,
  initialTodos,
  priorityOptions,
} from "./data/mockData";

export default function App() {
  // ─── [import 추가] ─────────────────────────────────
  // React에서 useState를 import하세요.
  // 힌트: import { useState } from "react";

  // ─── [상태 선언 1: 할 일 목록] ──────────────────────
  // useState를 사용하여 todos 상태를 선언하세요.
  // 초기값은 mockData.js의 initialTodos입니다.
  // 이 상태는 추가/완료 토글/삭제가 발생할 때마다 변경됩니다.
  // 힌트: const [todos, setTodos] = useState(initialTodos);
  const todos = [];

  // ─── [상태 선언 2: 현재 필터] ──────────────────────
  // 현재 보고 있는 필터 상태를 관리하세요.
  // 가능한 값: "all", "active", "completed"
  // 초기값은 "all"입니다.
  const currentFilter = "all";

  // ─── [상태 선언 3: 입력 폼 객체] ───────────────────
  // title, category, priority, dueDate를 하나의 객체 상태로 관리하세요.
  // 초기값은 initialFormState를 사용합니다.
  // 힌트: const [form, setForm] = useState({ ...initialFormState });
  const form = initialFormState;

  // ─── [통계 계산] ───────────────────────────────────
  // todos 배열을 기반으로 다음 값을 계산하세요:
  // - total: 전체 개수
  // - completed: completed === true 인 개수
  // - active: completed === false 인 개수
  // 힌트: filter()를 활용하면 깔끔하게 계산할 수 있습니다.
  const stats = {
    total: 0,
    completed: 0,
    active: 0,
  };

  // ─── [필터링 로직] ─────────────────────────────────
  // currentFilter 값에 따라 todos를 걸러 filteredTodos를 만드세요.
  // - "active"이면 완료되지 않은 항목만 반환
  // - "completed"이면 완료된 항목만 반환
  // - "all"이면 전체 반환
  // 힌트: const filteredTodos = todos.filter((todo) => { ... });
  const filteredTodos = [];

  // ─── [입력값 변경 함수] ────────────────────────────
  // form 객체의 특정 필드만 바꾸는 함수를 작성하세요.
  // 1. name, value를 매개변수로 받습니다.
  // 2. 이전 상태(prev)를 spread로 복사합니다.
  // 3. [name]: value 형태로 한 필드만 교체합니다.
  // 힌트: setForm((prev) => ({ ...prev, [name]: value }));
  const handleFieldChange = () => {};

  // ─── [할 일 추가 함수] ─────────────────────────────
  // 폼 제출 시 새 Todo를 배열 맨 앞에 추가하는 함수를 작성하세요.
  // 해야 할 일:
  // 1. event.preventDefault() 호출
  // 2. form.title.trim()이 비어 있으면 함수 종료
  // 3. 새 객체 생성
  //    - id: Date.now()
  //    - title/category/priority/dueDate: form 값 사용
  //    - completed: false
  // 4. setTodos로 기존 배열 앞에 새 항목 추가
  // 5. setForm으로 initialFormState로 초기화
  const handleAddTodo = (event) => {
    event.preventDefault();
  };

  // ─── [완료 토글 함수] ─────────────────────────────
  // 특정 todo의 completed 값을 true/false로 뒤집는 함수를 작성하세요.
  // 힌트: map()으로 순회하면서 id가 같은 항목만 {...todo, completed: !todo.completed}
  const handleToggleTodo = () => {};

  // ─── [삭제 함수] ───────────────────────────────────
  // 특정 todo를 배열에서 제거하는 함수를 작성하세요.
  // 힌트: filter()를 사용하여 id가 다른 항목만 남기면 됩니다.
  const handleDeleteTodo = () => {};

  // ─── [완료 항목 일괄 삭제] ─────────────────────────
  // completed가 true인 항목을 모두 제거하는 함수를 작성하세요.
  const handleClearCompleted = () => {};

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f5f7ff_0%,_#eef2ff_35%,_#ffffff_100%)]">
      <Header stats={stats} />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 lg:px-6 lg:py-10">
        <TodoComposer
          form={form}
          categoryOptions={categoryOptions}
          priorityOptions={priorityOptions}
          onFieldChange={handleFieldChange}
          onSubmit={handleAddTodo}
        />

        <TodoFilters
          filterOptions={filterOptions}
          currentFilter={currentFilter}
          activeCount={stats.active}
          completedCount={stats.completed}
          onFilterChange={() => {}}
          onClearCompleted={handleClearCompleted}
        />

        <TodoList
          todos={filteredTodos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </main>
    </div>
  );
}
