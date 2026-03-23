import useToastStore from "../store/toastStore";

const TOAST_STYLES = {
  info: "bg-blue-500",
  success: "bg-emerald-500",
  error: "bg-red-500",
  warning: "bg-amber-500",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${TOAST_STYLES[toast.type] ?? TOAST_STYLES.info} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[280px] animate-[slideIn_0.3s_ease-out]`}
        >
          <span className="text-sm flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/80 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
