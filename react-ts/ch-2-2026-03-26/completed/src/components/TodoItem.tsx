import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
      todo.completed 
        ? 'bg-slate-50/50 border-slate-200 text-slate-400' 
        : 'bg-white border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md'
    }`}>
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors ${
            todo.completed
              ? 'bg-blue-500 border-blue-500 text-white'
              : 'border-slate-300 text-transparent hover:border-blue-400'
          }`}
          aria-label={todo.completed ? '완료 취소' : '완료 표시'}
        >
          <svg className="w-3.5 h-3.5 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </button>
        <span className={`text-lg transition-all ${
          todo.completed ? 'line-through' : 'text-slate-700 font-medium'
        }`}>
          {todo.text}
        </span>
      </div>
      
      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all focus:opacity-100"
        aria-label="삭제"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
    </li>
  );
}
