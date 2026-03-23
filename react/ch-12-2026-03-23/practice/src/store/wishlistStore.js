import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── [위시리스트 스토어] ─────────────────────────────────
// 관심 상품을 관리하는 전역 상태입니다.
// persist 미들웨어로 새로고침해도 유지됩니다.

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      // ─── [위시리스트 토글] ─────────────────────────────────
      // 1. get().items에서 product.id와 동일한 아이템이 있는지 some()으로 확인
      // 2-a. 있으면: filter()로 해당 아이템 제거
      // 2-b. 없으면: spread로 기존 배열에 product 추가
      // 힌트: const exists = items.some(item => item.id === product.id)
      toggleWishlist: (product) => {

      },

      // ─── [위시리스트 확인] ─────────────────────────────────
      // 주어진 id가 items 배열에 존재하는지 boolean을 반환합니다
      // 힌트: get().items.some(item => item.id === id)
      isInWishlist: (id) => {
        return false;
      },

      // ─── [위시리스트 비우기] ────────────────────────────────
      clearWishlist: () => {

      },
    }),
    {
      name: "shop-mini-wishlist",
    }
  )
);

export default useWishlistStore;
