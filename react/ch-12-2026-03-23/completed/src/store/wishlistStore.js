import { create } from "zustand";
import { persist } from "zustand/middleware";

// [아키텍처 결정] 위시리스트도 persist로 유지합니다.
// Set 대신 배열을 사용하는 이유: JSON 직렬화 호환성 (localStorage 저장)

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      // 위시리스트 토글 (있으면 제거, 없으면 추가)
      toggleWishlist: (product) => {
        const { items } = get();
        const exists = items.some((item) => item.id === product.id);

        if (exists) {
          set({ items: items.filter((item) => item.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },

      // 위시리스트에 있는지 확인
      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },

      // 위시리스트 비우기
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "shop-mini-wishlist",
    }
  )
);

export default useWishlistStore;
