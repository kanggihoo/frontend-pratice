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

import { useState } from "react";

export default function App() {
  // ─── [상태 선언] ──────────────────────
  const [todos, setTodos] = useState(initialTodos);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [form, setForm] = useState({ ...initialFormState });

  // ─── [통계 계산] ───────────────────────────────────
  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    active: todos.filter((todo) => !todo.completed).length,
  };

  // ─── [필터링 로직] ─────────────────────────────────
  // currentFilter 값에 따라 todos를 걸러 filteredTodos를 만드세요.
  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "completed") {
      return todo.completed;
    } else if (currentFilter === "active") {
      return !todo.completed;
    }
    return true;
  });

  // ─── [입력값 변경 함수] ────────────────────────────
  // form 객체의 특정 필드만 바꾸는 함수를 작성하세요.
  const handleFieldChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    const trimmedTitle = form.title.trim();
    if (!trimmedTitle) return;

    const newTodo = {
      id: Date.now(),
      title: trimmedTitle,
      category: form.category,
      priority: form.priority,
      dueDate: form.dueDate,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setForm({ ...initialFormState });
  };

  // ─── [완료 토글 함수] ─────────────────────────────
  // 특정 todo의 completed 값을 true/false로 뒤집는 함수를 작성하세요.
  // 힌트: map()으로 순회하면서 id가 같은 항목만 {...todo, completed: !todo.completed}
  const handleToggleTodo = (todoId) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // ─── [삭제 함수] ───────────────────────────────────
  // 특정 todo를 배열에서 제거하는 함수를 작성하세요.
  const handleDeleteTodo = (todoId) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  // ─── [완료 항목 일괄 삭제] ─────────────────────────
  // completed가 true인 항목을 모두 제거하는 함수를 작성하세요.
  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

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
