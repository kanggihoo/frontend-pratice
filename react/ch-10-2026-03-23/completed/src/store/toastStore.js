import { create } from "zustand";

let toastId = 0;

const useToastStore = create((set) => ({
  // 토스트 배열: { id, message, type, duration }
  toasts: [],

  // 토스트 추가
  addToast: (message, type = "info", duration = 3000) => {
    const id = ++toastId;

    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }));

    // duration 후 자동 제거
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, duration);
  },

  // 토스트 수동 제거
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export default useToastStore;
