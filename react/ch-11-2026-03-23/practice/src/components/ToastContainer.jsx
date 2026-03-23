import useToastStore from "../store/toastStore";

// ─── [토스트 타입별 스타일 매핑] ────────────────────────
// 각 type에 맞는 배경색 클래스를 정의하세요.
// 힌트:
//   const TOAST_STYLES = {
//     info: "bg-blue-500",
//     success: "bg-emerald-500",
//     error: "bg-red-500",
//     warning: "bg-amber-500",
//   };


export default function ToastContainer() {
  // ─── [토스트 스토어에서 상태와 액션 가져오기] ─────────
  // toasts 배열과 removeToast 함수를 가져오세요.
  // 힌트: const { toasts, removeToast } = useToastStore();


  // ─── [토스트가 없으면 null 반환] ─────────────────────
  // toasts.length === 0이면 아무것도 렌더링하지 않습니다.


  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {/* ─── [토스트 목록 렌더링] ────────────────────────── */}
      {/* toasts를 map()으로 순회하며 각 토스트를 렌더링하세요.
          - key: toast.id
          - 배경색: TOAST_STYLES[toast.type]에서 가져오기
          - 메시지: toast.message
          - 닫기(✕) 버튼: onClick={() => removeToast(toast.id)}

          힌트:
          {toasts.map((toast) => (
            <div key={toast.id} className={`${TOAST_STYLES[toast.type]} text-white px-4 py-3 rounded-lg shadow-lg ...`}>
              <span>{toast.message}</span>
              <button onClick={() => removeToast(toast.id)}>✕</button>
            </div>
          ))} */}

    </div>
  );
}
