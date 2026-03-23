import { create } from "zustand";

// ─── [토스트 알림 스토어] ────────────────────────────────
// 토스트 알림을 관리하는 Zustand 스토어입니다.
// 이 스토어는 persist 미들웨어를 사용하지 않습니다.
// (알림은 일시적이므로 새로고침 후 유지할 필요 없음)

const useToastStore = create((set) => ({
  // ─── [상태 선언] ──────────────────────────────────────
  // toasts: 토스트 알림 배열 (초기값: [])
  // 각 토스트 객체: { id, message, type }


  // ─── [addToast 함수] ──────────────────────────────────
  // 매개변수: message(문자열), type(문자열, 기본값 "info")
  // 1. 고유 id 생성 (Date.now() 활용)
  // 2. 새 토스트를 배열에 추가
  // 3. setTimeout으로 3초 후 자동 제거
  //
  // 힌트:
  //   addToast: (message, type = "info") => {
  //     const id = Date.now();
  //     set((state) => ({
  //       toasts: [...state.toasts, { id, message, type }],
  //     }));
  //     setTimeout(() => {
  //       set((state) => ({
  //         toasts: state.toasts.filter((t) => t.id !== id),
  //       }));
  //     }, 3000);
  //   },


  // ─── [removeToast 함수] ───────────────────────────────
  // id를 받아서 해당 토스트를 배열에서 제거합니다.
  // 힌트: filter()로 해당 id를 제외

}));

export default useToastStore;
