import { forwardRef } from "react";

// ─── [forwardRef로 컴포넌트 감싸기] ───────────────────
const FormField = forwardRef(function FormField(
  { label, name, type, placeholder, autoComplete, error, onChange, onBlur },
  ref,
) {
  // ─── [에러 상태 확인] ───────────────────────────────
  const hasError = Boolean(error);

  // ─── [JSX 반환] ──────────────────────────────────────
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-2.5 rounded-lg border transition-colors duration-200 outline-none 
          ${
            hasError
              ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          }`}
      />
      {hasError && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <span>&#9888;</span> {error}
        </p>
      )}
    </div>
  );
});

export default FormField;
