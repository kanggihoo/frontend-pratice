import { forwardRef } from "react";

const TextAreaField = forwardRef(function TextAreaField(
  { label, name, placeholder, maxLength, error, onChange, onBlur, charCount },
  ref
) {
  const hasError = Boolean(error);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
        {maxLength && (
          <span
            className={`text-xs ${charCount > maxLength ? "text-red-500" : "text-gray-400"}`}
          >
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        ref={ref}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        rows={3}
        className={`w-full px-4 py-2.5 rounded-lg border transition-colors duration-200 outline-none resize-none
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

export default TextAreaField;
