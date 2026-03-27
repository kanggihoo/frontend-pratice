import { useState } from 'react';

// ─── [컴포넌트 Props 타입 정의] ────────────────────
// 문자열 text를 인자로 받는 onAdd 함수의 타입을 정의하세요.
// 힌트: onAdd: (text: string) => void;
interface TodoInputProps {
  
}

export default function TodoInput(props: any) { // TODO: 타입을 TodoInputProps로 변경하세요
  // 상태 선언: input의 value를 관리할 text 상태 (초기값: '')
  const [text, setText] = useState('');

  // ─── [이벤트 타입 지정 및 핸들러 구현] ───────────────
  // form submit 이벤트의 타입을 지정하세요. (React.FormEvent<HTMLFormElement>)
  // 1. 기본 브라우저 새로고침 방지 (e.preventDefault())
  // 2. 빈 문자열 입력 방지 (text.trim())
  // 3. onAdd 함수 호출
  // 4. text 상태 초기화
  const handleSubmit = (e: any) => {
    // 여기에 코드를 작성하세요.
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        type="text"
        value={text}
        // onChange 이벤트의 타입을 지정해보세요. e: React.ChangeEvent<HTMLInputElement>
        onChange={(e) => {}} // TODO: setText를 활용해 입력값을 상태에 반영하세요.
        placeholder="새로운 할 일을 입력하세요..."
        className=""
      />
      <button
        type="submit"
        // text가 비어있을 때 버튼을 비활성화하는 로직을 추가하세요.
        disabled={false} // TODO: 수정
        className=""
        aria-label="할 일 추가"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </button>
    </form>
  );
}
