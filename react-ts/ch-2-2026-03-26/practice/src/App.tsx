import { useState } from 'react';
import { Todo, FilterType } from './types';
import { mockTodos } from './data/mockData';
import TodoHeader from './components/TodoHeader';
import TodoInput from './components/TodoInput';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';

function App() {
  // ─── [상태 선언] ───────────────────────────────
  // useState를 사용하여 할 일 목록(배열)을 관리하는 상태를 선언하세요.
  // 제네릭을 사용해 배열 원소의 타입을 Todo[]로 명시합니다.
  // 초기값은 mockTodos로 설정합니다.
  // 힌트: const [todos, setTodos] = useState<Todo[]>(mockTodos);
  
  // useState를 사용하여 현재 필터 상태를 선언하세요.
  // 제네릭을 사용해 FilterType으로 타입을 명시합니다.
  // 초기값은 'all' 입니다.
  // 힌트: const [filter, setFilter] = useState<FilterType>('all');

  const [todos, setTodos] = useState<any[]>(mockTodos); // TODO: 타입을 Todo[]로 변경하세요
  const [filter, setFilter] = useState<any>('all'); // TODO: 타입을 FilterType으로 변경하세요

  // ─── [할 일 추가 함수] ───────────────────────────
  // 새로운 할 일 객체를 만들어 기존 배열 앞에 추가하는 함수를 작성하세요.
  // 1. 고유 id 생성 (Date.now().toString() 활용)
  // 2. 입력받은 text, completed: false, createdAt 설정
  // 3. spread 연산자로 기존 배열을 복사한 뒤 새 항목 추가
  const addTodo = (text: string) => {
    // 여기에 코드를 작성하세요.
  };

  // ─── [할 일 완료 토글 함수] ───────────────────────
  // id를 받아 해당 할 일의 completed 상태를 반전시키는 함수를 작성하세요.
  // 배열의 map() 메서드를 활용합니다.
  const toggleTodo = (id: string) => {
    // 여기에 코드를 작성하세요.
  };

  // ─── [할 일 삭제 함수] ───────────────────────────
  // id를 받아 해당 할 일을 배열에서 제거하는 함수를 작성하세요.
  // 배열의 filter() 메서드를 활용합니다.
  const deleteTodo = (id: string) => {
    // 여기에 코드를 작성하세요.
  };

  // ─── [할 일 필터링 로직] ──────────────────────────
  // 현재 filter 상태값('all', 'active', 'completed')에 따라 
  // 화면에 보여줄 배열을 필터링하세요.
  const filteredTodos = todos; // 이 부분을 수정하여 실제 필터링 로직을 구현하세요.

  return (
    // ─── [Tailwind CSS 스타일링] ─────────────────────
    // 전체 배경 화면을 구성하는 가장 바깥 div입니다.
    // 힌트: 최소 높이 스크린 크기, 회색 배경, 폰트 종류 등을 설정하세요. (예: "min-h-screen bg-slate-50 ...")
    <div className="">
      <div className="">
        <TodoHeader 
          totalCount={todos.length} 
          completedCount={todos.filter(t => t.completed).length} 
        />
        
        <div className="">
          <TodoInput onAdd={addTodo} />
          
          <div className="">
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
