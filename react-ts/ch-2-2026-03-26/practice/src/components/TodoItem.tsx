import { Todo } from '../types';

interface TodoItemProps {
  todo: any; // TODO: Todo 타입으로 변경
  onToggle: any; // TODO: id 기반 반전 함수 타입으로 변경
  onDelete: any; // TODO: id 기반 삭제 함수 타입으로 변경
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    // ─── [조건부 스타일링] ───────────────────────
    // todo.completed 값에 따라 완료된 항목은 흐리게(또는 취소선) 처리하고 배경색을 다르게 줍니다.
    <li className="">
      <div className="">
        <button
          onClick={() => {}} // TODO: 클릭 시 onToggle 호출
          className=""
          aria-label={todo?.completed ? '완료 취소' : '완료 표시'} // 옵셔널 체이닝으로 임시 에러 방지
        >
          {/* 완료시 체크 마크 SVG 표시 */}
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </button>
        <span className="">
          {/* 할 일 텍스트 출력 */}
          할 일 내용 표시
        </span>
      </div>
      
      <button
        onClick={() => {}} // TODO: 클릭 시 onDelete 호출
        className=""
        aria-label="삭제"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="20" height="20">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
    </li>
  );
}
