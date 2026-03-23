import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── [Zustand 스토어 생성 — persist 미들웨어 적용] ──────────────────
// create() 함수 안에 persist() 미들웨어를 감싸서 스토어를 만듭니다.
// persist 미들웨어는 스토어의 일부 상태를 localStorage에 자동 저장/복원합니다.
//
// 구조:
//   const useStore = create(
//     persist(
//       (set, get) => ({ ... }),
//       { name: "저장소키", partialize: (state) => ({ 저장할필드들 }) }
//     )
//   );
//
// persist의 두 번째 인자 옵션:
//   - name: localStorage에 저장될 키 이름 (예: "dashboard-storage")
//   - partialize: 전체 상태 중 localStorage에 저장할 필드만 골라내는 함수
//     (모든 상태를 저장하면 불필요한 데이터까지 유지되므로, 필요한 것만 선택)

const useDashboardStore = create(
  persist(
    (set, get) => ({
      // ─── [필터 상태 선언] ──────────────────────────────
      // 아래 5개의 상태를 선언하세요:
      // 1. activeCategory: 현재 선택된 카테고리 (초기값: "all")
      // 2. searchQuery: 검색어 (초기값: "")
      // 3. sortOption: 정렬 방식 (초기값: "default")
      // 4. pageSize: 페이지당 항목 수 (초기값: 10)
      // 5. currentPage: 현재 페이지 번호 (초기값: 1)


      // ─── [사이드바 상태 선언] ──────────────────────────
      // isSidebarOpen: 사이드바 열림/닫힘 (초기값: true)


      // ─── [즐겨찾기 상태 선언] ──────────────────────────
      // favorites: 즐겨찾기한 사용자 ID 배열 (초기값: [])


      // ─── [필터 액션 — setActiveCategory] ───────────────
      // 카테고리를 변경하는 함수입니다.
      // 카테고리가 바뀌면 currentPage를 1로 리셋해야 합니다.
      // 힌트: set({ activeCategory: category, currentPage: 1 })


      // ─── [필터 액션 — setSearchQuery] ──────────────────
      // 검색어를 변경하는 함수입니다.
      // 검색어가 바뀌면 currentPage를 1로 리셋해야 합니다.


      // ─── [필터 액션 — setSortOption] ───────────────────
      // 정렬 옵션을 변경하는 함수입니다.


      // ─── [필터 액션 — setPageSize] ─────────────────────
      // 페이지 크기를 변경하는 함수입니다.
      // 페이지 크기가 바뀌면 currentPage를 1로 리셋해야 합니다.


      // ─── [필터 액션 — setCurrentPage] ──────────────────
      // 현재 페이지 번호를 변경하는 함수입니다.


      // ─── [사이드바 액션 — toggleSidebar] ───────────────
      // 사이드바 열림/닫힘을 토글하는 함수입니다.
      // 힌트: set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))


      // ─── [즐겨찾기 액션 — toggleFavorite] ──────────────
      // 사용자 ID를 받아서 즐겨찾기를 토글합니다.
      // - 이미 즐겨찾기에 있으면 → filter()로 제거
      // - 없으면 → spread로 추가
      // 힌트:
      //   set((state) => ({
      //     favorites: state.favorites.includes(userId)
      //       ? state.favorites.filter((id) => id !== userId)
      //       : [...state.favorites, userId],
      //   }))


      // ─── [즐겨찾기 확인 — isFavorite] ─────────────────
      // get()을 사용하여 특정 userId가 즐겨찾기에 있는지 확인합니다.
      // 힌트: isFavorite: (userId) => get().favorites.includes(userId)


      // ─── [필터 초기화 — resetFilters] ─────────────────
      // 모든 필터 상태를 초기값으로 되돌리는 함수입니다.
      // activeCategory: "all", searchQuery: "", sortOption: "default",
      // pageSize: 10, currentPage: 1

    }),
    {
      // ─── [persist 옵션 설정] ──────────────────────────
      // name: localStorage 키 이름 (예: "dashboard-storage")
      // partialize: 저장할 상태만 선택하는 함수
      //   → favorites, pageSize, isSidebarOpen만 저장하세요
      //   → 검색어나 카테고리 같은 일시적 상태는 저장하지 않습니다
      //
      // 힌트:
      //   name: "dashboard-storage",
      //   partialize: (state) => ({
      //     favorites: state.favorites,
      //     pageSize: state.pageSize,
      //     isSidebarOpen: state.isSidebarOpen,
      //   }),

    }
  )
);

export default useDashboardStore;
