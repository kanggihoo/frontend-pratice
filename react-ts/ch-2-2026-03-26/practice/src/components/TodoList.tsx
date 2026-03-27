import { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: any[]; // TODO: Todo[] 타입으로 변경
  onToggle: any;
  onDelete: any;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  // ─── [조건부 렌더링 : 빈 리스트 처리] ───────────────────
  // 만약 todos.length === 0 이라면 "할 일이 없습니다"를 의미하는 JSX를 반환하세요.
  
  return (
    <ul className="">
      {/* ─── [리스트 렌더링] ────────────────────────────── */}
      {/* todos 배열을 map()으로 순회하며 TodoItem 컴포넌트들을 반환합니다. */}
      {/* 고유한 key prop(todo.id) 전달을 잊지 마세요. */}
      리스트 아이템들이 렌더링되어야 합니다.
    </ul>
  );
}
