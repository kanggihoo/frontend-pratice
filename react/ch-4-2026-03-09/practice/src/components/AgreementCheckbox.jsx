import { forwardRef } from "react";

const AgreementCheckbox = forwardRef(function AgreementCheckbox(
  { id, label, required, onChange },
  ref,
) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer py-1">
      <input
        type="checkbox"
        ref={ref}
        id={id}
        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        onChange={onChange}
      />
      <span className="text-sm text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
    </label>
  );
});

export default AgreementCheckbox;
