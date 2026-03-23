import { create } from "zustand";

const useCartStore = create((set, get) => ({
  // 장바구니 아이템 배열: { ...product, quantity }
  items: [],

  // 장바구니에 상품 추가
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        // 이미 있는 상품이면 수량만 증가
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      // 새 상품이면 quantity: 1로 추가
      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),

  // 장바구니에서 상품 제거
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),

  // 수량 변경
  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((item) => item.id !== productId) };
      }
      return {
        items: state.items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      };
    }),

  // 장바구니 비우기
  clearCart: () => set({ items: [] }),

  // 파생 상태: 총 수량 (selector로 사용)
  getTotalQuantity: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  // 파생 상태: 총 금액 (selector로 사용)
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));

export default useCartStore;
