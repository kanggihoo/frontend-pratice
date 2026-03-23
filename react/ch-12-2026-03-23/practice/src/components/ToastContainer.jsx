import useToastStore from "../store/toastStore";

// ─── [ToastContainer 컴포넌트] ────────────────────────────
// 화면 우하단에 토스트 알림 목록을 표시합니다.
// Zustand toastStore에서 toasts 배열과 removeToast 함수를 구독합니다.

export default function ToastContainer() {
  // ─── [Zustand 스토어 구독] ─────────────────────────────
  // selector 패턴으로 필요한 상태만 구독하세요.
  // 힌트:
  //   const toasts = useToastStore((state) => state.toasts);
  //   const removeToast = useToastStore((state) => state.removeToast);


  // ─── [빈 배열 체크] ────────────────────────────────────
  // toasts가 비어있으면 null을 반환합니다 (아무것도 렌더링하지 않음)


  // ─── [타입별 스타일 매핑] ──────────────────────────────
  // success → bg-green-500
  // error → bg-red-500
  // info → bg-blue-500
  // warning → bg-yellow-500 text-black


  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {/* ─── [토스트 리스트 렌더링] ────────────────────────── */}
      {/* toasts.map()으로 각 토스트를 렌더링하세요. */}
      {/* 각 토스트: 배경색(타입별) + 메시지 + 닫기 버튼 */}
      {/* key는 toast.id를 사용합니다 */}
      {/* 닫기 버튼 클릭 시 removeToast(toast.id) 호출 */}
    </div>
  );
}
