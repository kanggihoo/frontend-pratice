"use client";

export default function DeleteButton({ children, small = false }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("정말 삭제하시겠습니까?")) {
          e.preventDefault();
        }
      }}
      className={
        small
          ? "text-xs text-red-400 hover:text-red-600 transition-colors cursor-pointer"
          : "text-sm text-red-500 hover:text-red-700 transition-colors font-medium cursor-pointer"
      }
    >
      {children}
    </button>
  );
}
