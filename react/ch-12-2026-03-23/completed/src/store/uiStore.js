import { create } from "zustand";
import { persist } from "zustand/middleware";

// [아키텍처 결정] UI 상태(다크모드, 패널 열림/닫힘)를 하나의 스토어로 관리합니다.
// 다크모드 설정은 persist로 유지하고, 패널 상태는 세션마다 초기화됩니다.
// partialize 옵션으로 darkMode만 localStorage에 저장합니다.

const useUiStore = create(
  persist(
    (set) => ({
      darkMode: false,
      cartOpen: false,
      wishlistOpen: false,
      detailProductId: null,
      orderFormOpen: false,
      searchQuery: "",
      selectedCategory: null,
      sortBy: "default",

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setCartOpen: (open) => set({ cartOpen: open, wishlistOpen: false }),
      setWishlistOpen: (open) => set({ wishlistOpen: open, cartOpen: false }),
      setDetailProductId: (id) => set({ detailProductId: id }),
      setOrderFormOpen: (open) => set({ orderFormOpen: open, cartOpen: false }),
      setSearchQuery: (query) =>
        set({ searchQuery: query, selectedCategory: null }),
      setSelectedCategory: (category) =>
        set({ selectedCategory: category, searchQuery: "" }),
      setSortBy: (sortBy) => set({ sortBy }),
    }),
    {
      name: "shop-mini-ui",
      partialize: (state) => ({ darkMode: state.darkMode }),
    }
  )
);

export default useUiStore;
