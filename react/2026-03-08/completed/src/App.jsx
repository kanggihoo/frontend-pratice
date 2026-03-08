import { useState } from "react";
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
  const [todos, setTodos] = useState(initialTodos);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [form, setForm] = useState({ ...initialFormState });

  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    active: todos.filter((todo) => !todo.completed).length,
  };

  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "active") {
      return !todo.completed;
    }

    if (currentFilter === "completed") {
      return todo.completed;
    }

    return true;
  });

  const handleFieldChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    const trimmedTitle = form.title.trim();

    if (!trimmedTitle) {
      return;
    }

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

  const handleToggleTodo = (todoId) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      ),
    );
  };

  const handleDeleteTodo = (todoId) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

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
          onFilterChange={setCurrentFilter}
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
