import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDashboardStore = create(
  persist(
    (set, get) => ({
      // ─── 필터 상태 ───
      activeCategory: "all",
      searchQuery: "",
      sortOption: "default",
      pageSize: 10,
      currentPage: 1,

      // ─── 사이드바 상태 ───
      isSidebarOpen: true,

      // ─── 즐겨찾기 (사용자 ID 목록) ───
      favorites: [],

      // ─── 필터 액션 ───
      setActiveCategory: (category) =>
        set({ activeCategory: category, currentPage: 1 }),

      setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

      setSortOption: (option) => set({ sortOption: option }),

      setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),

      setCurrentPage: (page) => set({ currentPage: page }),

      // ─── 사이드바 액션 ───
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      // ─── 즐겨찾기 액션 ───
      toggleFavorite: (userId) =>
        set((state) => ({
          favorites: state.favorites.includes(userId)
            ? state.favorites.filter((id) => id !== userId)
            : [...state.favorites, userId],
        })),

      isFavorite: (userId) => get().favorites.includes(userId),

      // ─── 필터 초기화 ───
      resetFilters: () =>
        set({
          activeCategory: "all",
          searchQuery: "",
          sortOption: "default",
          pageSize: 10,
          currentPage: 1,
        }),
    }),
    {
      name: "dashboard-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        pageSize: state.pageSize,
        isSidebarOpen: state.isSidebarOpen,
      }),
    }
  )
);

export default useDashboardStore;
