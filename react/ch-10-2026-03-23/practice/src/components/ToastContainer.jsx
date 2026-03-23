// ─── [스토어 import] ─────────────────────────────────────────
// useToastStore를 import하세요.
// 힌트: import useToastStore from "../store/toastStore";


// ─── [토스트 타입별 스타일 정의] ──────────────────────────────
// 아래 객체를 참고하여 타입별 배경색과 아이콘을 정의하세요.
// 이 객체들은 토스트를 렌더링할 때 사용됩니다.
//
// const typeStyles = {
//   success: "bg-green-500",
//   error: "bg-red-500",
//   warning: "bg-yellow-500",
//   info: "bg-blue-500",
// };
//
// const typeIcons = {
//   success: "✅",
//   error: "❌",
//   warning: "⚠️",
//   info: "ℹ️",
// };


export default function ToastContainer() {
  // ─── [스토어에서 상태와 액션 가져오기] ──────────────────────
  // useToastStore에서 toasts 배열과 removeToast 함수를 가져오세요.
  //
  // 힌트:
  // const toasts = useToastStore((state) => state.toasts);
  // const removeToast = useToastStore((state) => state.removeToast);


  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
      {/* ─── [토스트 리스트 렌더링] ─────────────────────────── */}
      {/* toasts 배열을 map()으로 순회하며 각 토스트를 렌더링하세요 */}
      {/*
      1. key에 toast.id 전달
      2. typeStyles[toast.type]으로 배경색 적용
      3. typeIcons[toast.type]으로 아이콘 표시
      4. toast.message 텍스트 표시
      5. ✕ 버튼 클릭 시 removeToast(toast.id) 호출

      힌트:
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${typeStyles[toast.type]} text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3`}
        >
          <span className="text-lg">{typeIcons[toast.type]}</span>
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="text-white/70 hover:text-white ...">✕</button>
        </div>
      ))}
      */}
    </div>
  );
}
