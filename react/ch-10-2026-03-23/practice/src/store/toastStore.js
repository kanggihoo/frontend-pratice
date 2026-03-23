import { create } from "zustand";

// 토스트 고유 id를 위한 카운터
let toastId = 0;

// ─── [토스트 알림 스토어 생성] ────────────────────────────────
// create()를 사용하여 토스트 알림을 관리하는 스토어를 만드세요.
// 각 토스트는 { id, message, type, duration } 형태입니다.
// type은 "success", "error", "warning", "info" 중 하나입니다.

const useToastStore = create((set) => ({
  // ─── [초기 상태] ──────────────────────────────────────────
  // 토스트 목록을 담을 빈 배열을 선언하세요.
  // 힌트: toasts: [],


  // ─── [토스트 추가 함수] ────────────────────────────────────
  // addToast(message, type, duration) 함수를 작성하세요.
  //
  // 1. 고유 id 생성: const id = ++toastId;
  //
  // 2. set()으로 toasts 배열에 새 토스트 추가:
  //    set((state) => ({
  //      toasts: [...state.toasts, { id, message, type, duration }]
  //    }))
  //
  // 3. setTimeout()으로 duration(밀리초) 후 자동 제거:
  //    setTimeout(() => {
  //      set((state) => ({
  //        toasts: state.toasts.filter(toast => toast.id !== id)
  //      }))
  //    }, duration)
  //
  // 기본값: type = "info", duration = 3000


  // ─── [토스트 수동 제거 함수] ───────────────────────────────
  // id를 받아서 해당 토스트를 배열에서 제거하는 removeToast 함수를 작성하세요.
  // 힌트: cartStore의 removeItem과 동일한 패턴입니다.

}));

export default useToastStore;
