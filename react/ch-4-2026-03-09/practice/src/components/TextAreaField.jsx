import { forwardRef } from "react";

// ─── [forwardRef로 TextAreaField 컴포넌트 만들기] ──────
// FormField와 동일한 패턴으로, textarea를 감싸는 컴포넌트입니다.
// Props: label, name, placeholder, maxLength, error, onChange, onBlur, charCount
// 두 번째 매개변수 ref는 textarea DOM 요소에 연결합니다.
const TextAreaField = forwardRef(function TextAreaField(
  { label, name, placeholder, maxLength, error, onChange, onBlur, charCount },
  ref
) {
  // ─── [에러 상태 확인] ───────────────────────────────
  // error prop이 존재하는지 Boolean으로 변환하세요.

  // ─── [JSX 반환] ──────────────────────────────────────
  // 아래 구조로 JSX를 반환하세요:
  // 1. <div> 래퍼 (mb-4)
  // 2.   <div> — label과 글자 수를 양쪽에 배치 (flex justify-between items-center mb-1)
  //        - <label> htmlFor={name}, 텍스트: {label}
  //        - {maxLength가 있을 때} <span> "{charCount}/{maxLength}" 표시
  //          글자 수 초과 시 "text-red-500", 아니면 "text-gray-400"
  // 3.   <textarea> — ref={ref}를 반드시 연결!
  //        id={name}, name={name}, placeholder, rows={3}
  //        onChange, onBlur 이벤트 핸들러 연결
  //        Tailwind: FormField의 input과 유사 + "resize-none" 추가
  // 4.   {hasError일 때} 에러 메시지 <p>
  return (
    <div>
      {/* 여기에 label, 글자 수, textarea, 에러 메시지를 구현하세요 */}
    </div>
  );
});

export default TextAreaField;
