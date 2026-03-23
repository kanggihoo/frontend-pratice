import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── [Zustand + persist 미들웨어] ──────────────────────────────────
// 장바구니 상태를 전역으로 관리하고, localStorage에 자동 저장합니다.
// persist 미들웨어를 사용하면 새로고침해도 장바구니가 유지됩니다.
//
// 힌트: create(persist((set, get) => ({ ... }), { name: "키이름" }))

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // ─── [장바구니에 상품 추가] ────────────────────────────
      // 1. get()으로 현재 items를 가져옵니다
      // 2. items에서 동일한 id의 상품이 있는지 find()로 확인합니다
      // 3-a. 이미 있으면: map()으로 해당 상품의 quantity만 +1 합니다
      // 3-b. 없으면: spread로 기존 배열 복사 후 { ...product, quantity: 1 } 추가
      // 4. set()으로 상태를 업데이트합니다
      addItem: (product) => {

      },

      // ─── [수량 변경] ──────────────────────────────────────
      // 1. quantity가 0 이하이면 removeItem을 호출하여 삭제합니다
      // 2. 그 외에는 map()으로 해당 id의 아이템만 quantity를 변경합니다
      // 힌트: items.map(item => item.id === id ? { ...item, quantity } : item)
      updateQuantity: (id, quantity) => {

      },

      // ─── [상품 제거] ──────────────────────────────────────
      // filter()로 해당 id가 아닌 아이템만 남깁니다
      // 힌트: set({ items: get().items.filter(item => item.id !== id) })
      removeItem: (id) => {

      },

      // ─── [장바구니 비우기] ─────────────────────────────────
      // items를 빈 배열로 설정합니다
      clearCart: () => {

      },

      // ─── [파생 상태: 총 수량] ──────────────────────────────
      // reduce()로 모든 아이템의 quantity를 합산합니다
      // 힌트: get().items.reduce((sum, item) => sum + item.quantity, 0)
      getTotalCount: () => {
        return 0;
      },

      // ─── [파생 상태: 총 금액] ──────────────────────────────
      // reduce()로 price * quantity의 합계를 계산합니다
      getTotalPrice: () => {
        return 0;
      },
    }),
    {
      name: "shop-mini-cart",
    }
  )
);

export default useCartStore;
