import { create } from "zustand";

// ─── [토스트 알림 스토어] ─────────────────────────────────
// 일시적인 알림 메시지를 관리합니다.
// persist를 사용하지 않습니다 (새로고침하면 알림은 사라져야 하므로).

const useToastStore = create((set, get) => ({
  toasts: [],

  // ─── [토스트 추가] ─────────────────────────────────────
  // 1. 고유한 id를 생성합니다 (Date.now() + Math.random())
  // 2. toasts 배열에 { id, message, type } 객체를 추가합니다
  // 3. setTimeout으로 3초 후 자동으로 removeToast(id)를 호출합니다
  //
  // 힌트:
  //   const id = Date.now() + Math.random();
  //   set({ toasts: [...get().toasts, { id, message, type }] });
  //   setTimeout(() => { get().removeToast(id); }, 3000);
  addToast: (message, type = "success") => {

  },

  // ─── [토스트 제거] ─────────────────────────────────────
  // filter()로 해당 id의 토스트를 제거합니다
  removeToast: (id) => {

  },
}));

export default useToastStore;
