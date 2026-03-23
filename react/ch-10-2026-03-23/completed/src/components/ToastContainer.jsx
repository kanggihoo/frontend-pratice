import useToastStore from "../store/toastStore";

const typeStyles = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
};

const typeIcons = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
};

export default function ToastContainer() {
  // 전역 스토어에서 토스트 목록과 제거 함수를 가져옴
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${typeStyles[toast.type]} text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-[slideIn_0.3s_ease-out]`}
        >
          <span className="text-lg">{typeIcons[toast.type]}</span>
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
