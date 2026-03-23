import { create } from "zustand";
import { persist } from "zustand/middleware";

// [아키텍처 결정] 장바구니는 브라우저를 닫아도 유지되어야 하므로
// persist 미들웨어로 localStorage에 자동 저장합니다.
// selector 패턴을 사용하여 필요한 상태만 구독하면 리렌더링을 최소화할 수 있습니다.

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // 장바구니에 상품 추가 (이미 있으면 수량 증가)
      addItem: (product) => {
        const { items } = get();
        const existing = items.find((item) => item.id === product.id);

        if (existing) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
          });
        }
      },

      // 수량 변경
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      // 상품 제거
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      // 장바구니 비우기
      clearCart: () => set({ items: [] }),

      // 파생 상태: 총 수량
      getTotalCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      // 파생 상태: 총 금액
      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "shop-mini-cart",
    }
  )
);

export default useCartStore;
