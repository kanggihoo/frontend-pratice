import { useState } from 'react';
import { Todo, FilterType } from './types';
import { mockTodos } from './data/mockData';
import TodoHeader from './components/TodoHeader';
import TodoInput from './components/TodoInput';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-0 font-sans">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <TodoHeader 
          totalCount={todos.length} 
          completedCount={todos.filter(t => t.completed).length} 
        />
        
        <div className="p-6">
          <TodoInput onAdd={addTodo} />
          
          <div className="mt-8 mb-6 border-b border-slate-100 pb-4">
            <TodoFilter currentFilter={filter} onChangeFilter={setFilter} />
          </div>
          
          <TodoList 
            todos={filteredTodos} 
            onToggle={toggleTodo} 
            onDelete={deleteTodo} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
