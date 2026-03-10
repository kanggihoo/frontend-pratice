// ─── [forwardRef 임포트] ───────────────────────────
// React에서 forwardRef를 임포트하세요.
// forwardRef는 부모 컴포넌트가 자식 컴포넌트의 DOM 요소에
// 직접 접근할 수 있도록 ref를 전달하는 기능입니다.
// 힌트: import { forwardRef } from "react";
import { forwardRef } from "react";

// ─── [forwardRef로 컴포넌트 감싸기] ───────────────────
// forwardRef를 사용하여 FormField 컴포넌트를 만들어주세요.
// forwardRef의 두 번째 매개변수가 부모로부터 전달받은 ref입니다.
// Props: label, name, type, placeholder, autoComplete, error, onChange, onBlur
// 힌트: const 컴포넌트 = forwardRef(function 컴포넌트(props, ref) { ... });
const FormField = forwardRef(function FormField(
  { label, name, type, placeholder, autoComplete, error, onChange, onBlur },
  ref
) {
  // ─── [에러 상태 확인] ───────────────────────────────
  // error prop이 존재하는지 Boolean으로 변환하여 hasError 변수에 저장하세요.
  // 힌트: Boolean(값) 또는 !!값

  // ─── [JSX 반환] ──────────────────────────────────────
  // 아래 구조로 JSX를 반환하세요:
  // 1. <div> 래퍼 (mb-4 클래스)
  // 2.   <label> — htmlFor={name}, 텍스트: {label}
  //        Tailwind: "block text-sm font-semibold text-gray-700 mb-1"
  // 3.   <input> — ref={ref}를 반드시 연결!
  //        id={name}, name={name}, type, placeholder, autoComplete
  //        onChange, onBlur 이벤트 핸들러 연결
  //        Tailwind: 기본 "w-full px-4 py-2.5 rounded-lg border transition-colors duration-200 outline-none"
  //        에러 시: "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
  //        정상 시: "border-gray-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
  //        힌트: 조건부 클래스는 템플릿 리터럴 + 삼항 연산자로 조합
  // 4.   {hasError일 때} <p> 에러 메시지 표시
  //        Tailwind: "mt-1 text-sm text-red-500 flex items-center gap-1"
  return (
    <div>
      {/* 여기에 label, input, 에러 메시지를 구현하세요 */}
    </div>
  );
});

export default FormField;
