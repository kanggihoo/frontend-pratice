import { create } from "zustand";

// [아키텍처 결정] 토스트 알림은 세션 간 유지할 필요가 없으므로
// persist를 사용하지 않습니다. 자동 제거를 위해 setTimeout을 활용합니다.

const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: (message, type = "success") => {
    const id = Date.now() + Math.random();
    set({ toasts: [...get().toasts, { id, message, type }] });

    // 3초 후 자동 제거
    setTimeout(() => {
      get().removeToast(id);
    }, 3000);
  },

  removeToast: (id) => {
    set({ toasts: get().toasts.filter((t) => t.id !== id) });
  },
}));

export default useToastStore;
