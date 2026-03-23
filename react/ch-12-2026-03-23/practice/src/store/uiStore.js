import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── [UI 상태 스토어] ────────────────────────────────────
// 다크모드, 패널 열림/닫힘, 검색어, 카테고리 선택 등
// UI 관련 상태를 하나의 스토어로 관리합니다.
//
// partialize 옵션을 사용하면 특정 값만 localStorage에 저장할 수 있습니다.
// 여기서는 darkMode만 저장하고, 나머지는 매번 초기화됩니다.

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

      // ─── [다크모드 토글] ──────────────────────────────────
      // set()에 함수를 전달하여 이전 상태를 기반으로 토글합니다
      // 힌트: set((state) => ({ darkMode: !state.darkMode }))
      toggleDarkMode: () => {

      },

      // ─── [장바구니 패널 열기/닫기] ─────────────────────────
      // 장바구니를 열 때 위시리스트는 닫아야 합니다 (동시에 열리면 안 됨)
      // 힌트: set({ cartOpen: open, wishlistOpen: false })
      setCartOpen: (open) => {

      },

      // ─── [위시리스트 패널 열기/닫기] ────────────────────────
      // 위시리스트를 열 때 장바구니는 닫아야 합니다
      setWishlistOpen: (open) => {

      },

      // ─── [상품 상세 모달] ──────────────────────────────────
      // 상품 id를 설정하면 ProductDetail 모달이 열립니다
      // null을 설정하면 닫힙니다
      setDetailProductId: (id) => {

      },

      // ─── [주문 폼 모달] ────────────────────────────────────
      setOrderFormOpen: (open) => {

      },

      // ─── [검색어 변경] ─────────────────────────────────────
      // 검색어를 설정할 때 카테고리 선택을 초기화합니다 (둘은 동시에 활성화되지 않음)
      // 힌트: set({ searchQuery: query, selectedCategory: null })
      setSearchQuery: (query) => {

      },

      // ─── [카테고리 선택] ───────────────────────────────────
      // 카테고리를 선택할 때 검색어를 초기화합니다
      setSelectedCategory: (category) => {

      },

      // ─── [정렬 기준 변경] ──────────────────────────────────
      setSortBy: (sortBy) => {

      },
    }),
    {
      name: "shop-mini-ui",
      // partialize로 darkMode만 localStorage에 저장합니다
      partialize: (state) => ({ darkMode: state.darkMode }),
    }
  )
);

export default useUiStore;
