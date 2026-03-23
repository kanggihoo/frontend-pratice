import { useEffect, useRef, useMemo, useCallback } from "react";
import useUiStore from "../store/uiStore";
import useDebounce from "../hooks/useDebounce";
import {
  useProductsInfinite,
  useSearchProducts,
  useCategoryProducts,
} from "../hooks/useProductQueries";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

// ─── [ProductList 컴포넌트] ───────────────────────────────
// 이 컴포넌트는 3가지 데이터 소스를 상황에 따라 전환합니다:
// 1) 검색어가 있으면 → useSearchProducts (검색 API)
// 2) 카테고리가 선택되면 → useCategoryProducts (카테고리 API)
// 3) 둘 다 아니면 → useProductsInfinite (무한 스크롤 전체 목록)

export default function ProductList() {
  // ─── [Zustand 스토어에서 UI 상태 읽기] ─────────────────
  // 힌트:
  //   const searchQuery = useUiStore((state) => state.searchQuery);
  //   const selectedCategory = useUiStore((state) => state.selectedCategory);
  //   const sortBy = useUiStore((state) => state.sortBy);


  // ─── [검색어 디바운스] ─────────────────────────────────
  // useDebounce 훅으로 searchQuery를 400ms 디바운스합니다.
  // 힌트: const debouncedSearch = useDebounce(searchQuery, 400);


  // ─── [무한 스크롤 관찰용 ref] ──────────────────────────
  // Intersection Observer가 관찰할 DOM 요소의 ref
  // 힌트: const observerRef = useRef(null);


  // ─── [현재 모드 결정] ──────────────────────────────────
  // debouncedSearch가 있으면 "search"
  // selectedCategory가 있으면 "category"
  // 그 외 "infinite"
  //
  // 힌트:
  //   const mode = debouncedSearch
  //     ? "search"
  //     : selectedCategory
  //       ? "category"
  //       : "infinite";
  const mode = "infinite";

  // ─── [3가지 쿼리 훅 호출] ──────────────────────────────
  // 각 훅은 enabled 옵션이 있어서 조건이 안 맞으면 요청하지 않습니다.
  // 따라서 3개 모두 호출해도 괜찮습니다.
  //
  // 힌트:
  //   const infiniteQuery = useProductsInfinite();
  //   const searchResult = useSearchProducts(debouncedSearch);
  //   const categoryResult = useCategoryProducts(selectedCategory);


  // ─── [mode에 따른 데이터 선택 - useMemo] ───────────────
  // mode에 따라 올바른 쿼리 결과를 선택합니다.
  // useMemo로 감싸서 불필요한 재계산을 방지합니다.
  //
  // 힌트:
  //   const { products, isLoading, isError, error } = useMemo(() => {
  //     switch (mode) {
  //       case "search":
  //         return { products: searchResult.data?.products || [], ... };
  //       case "category":
  //         return { products: categoryResult.data?.products || [], ... };
  //       default: // "infinite"
  //         return {
  //           products: infiniteQuery.data?.pages.flatMap(page => page.products) || [],
  //           ...
  //         };
  //     }
  //   }, [mode, searchResult, categoryResult, infiniteQuery]);
  const products = [];
  const isLoading = false;
  const isError = false;
  const error = null;

  // ─── [정렬된 상품 목록 - useMemo] ─────────────────────
  // sortBy 값에 따라 상품을 정렬합니다.
  // "default"이면 원본 그대로, 나머지는 정렬 기준에 따라:
  //   "price-asc": 가격 오름차순
  //   "price-desc": 가격 내림차순
  //   "rating": 별점 높은 순
  //   "name": 이름순
  //
  // 힌트:
  //   const sortedProducts = useMemo(() => {
  //     if (sortBy === "default") return products;
  //     return [...products].sort((a, b) => { ... });
  //   }, [products, sortBy]);
  const sortedProducts = products;

  // ─── [Intersection Observer - 무한 스크롤] ─────────────
  // 1. useCallback으로 observer 콜백을 만듭니다
  //    - entry.isIntersecting이고 mode === "infinite"이면
  //    - infiniteQuery.hasNextPage && !infiniteQuery.isFetchingNextPage 확인
  //    - 조건 충족 시 infiniteQuery.fetchNextPage() 호출
  //
  // 2. useEffect에서 IntersectionObserver를 생성하고
  //    observerRef.current를 observe합니다
  //    cleanup에서 observer.disconnect() 호출


  if (isLoading) return <LoadingSpinner size="lg" />;

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 dark:text-red-400 font-medium">
          {error?.message || "데이터를 불러오는 데 실패했습니다."}
        </p>
      </div>
    );
  }

  if (sortedProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          상품이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* ─── [결과 카운트 & 정렬] ────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {sortedProducts.length}개 상품
        </p>
        <SortSelect />
      </div>

      {/* ─── [상품 그리드] ────────────────────────────────── */}
      {/* grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 */}
      {/* sortedProducts.map()으로 ProductCard를 렌더링하세요 */}
      {/* key는 product.id를 사용합니다 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* ─── [무한 스크롤 트리거] ─────────────────────────── */}
      {/* mode === "infinite"일 때만 렌더링합니다 */}
      {/* ref={observerRef}를 연결하세요 */}
      {/* infiniteQuery.isFetchingNextPage이면 LoadingSpinner 표시 */}
      {/* !infiniteQuery.hasNextPage이면 "모든 상품을 불러왔습니다" 메시지 */}
    </div>
  );
}

// ─── [SortSelect 내부 컴포넌트] ──────────────────────────
// 정렬 기준 드롭다운입니다.
function SortSelect() {
  // ─── [Zustand에서 sortBy, setSortBy 구독] ──────────────
  // 힌트:
  //   const sortBy = useUiStore((state) => state.sortBy);
  //   const setSortBy = useUiStore((state) => state.setSortBy);


  return (
    <select
      // ─── [value와 onChange 연결] ────────────────────────
      // value={sortBy}
      // onChange={(e) => setSortBy(e.target.value)}
      className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option value="default">기본 정렬</option>
      <option value="price-asc">가격 낮은 순</option>
      <option value="price-desc">가격 높은 순</option>
      <option value="rating">별점 높은 순</option>
      <option value="name">이름순</option>
    </select>
  );
}
