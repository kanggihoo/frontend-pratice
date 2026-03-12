import { forwardRef } from "react";

// ─── [forwardRef로 AgreementCheckbox 컴포넌트 만들기] ──
// 체크박스 입력을 감싸는 컴포넌트입니다.
// Props: id, label, required, onChange
// ref는 checkbox input 요소에 연결합니다.
// 힌트: forwardRef(function 컴포넌트명({ props들 }, ref) { ... })
const AgreementCheckbox = forwardRef(function AgreementCheckbox(
  { id, label, required, onChange },
  ref
) {
  // ─── [JSX 반환] ──────────────────────────────────────
  // 아래 구조로 JSX를 반환하세요:
  // 1. <label> — htmlFor={id}
  //      Tailwind: "flex items-center gap-2 cursor-pointer py-1"
  // 2.   <input> — ref={ref}를 반드시 연결!
  //        type="checkbox", id={id}, name={id}, onChange
  //        Tailwind: "w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
  // 3.   <span> — 라벨 텍스트 + required일 때 빨간 별표(*)
  //        Tailwind: "text-sm text-gray-700"
  //        힌트: {required && <span className="text-red-500 ml-1">*</span>}
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer py-1">
      {/* 여기에 checkbox input과 label 텍스트를 구현하세요 */}
    </label>
  );
});

export default AgreementCheckbox;
