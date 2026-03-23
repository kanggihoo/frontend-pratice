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

// [아키텍처 결정] ProductList는 3가지 데이터 소스를 상황에 따라 전환합니다:
// 1) 검색어가 있으면 → 검색 API
// 2) 카테고리가 선택되면 → 카테고리 API
// 3) 둘 다 아니면 → 무한 스크롤 전체 목록

export default function ProductList() {
  const searchQuery = useUiStore((state) => state.searchQuery);
  const selectedCategory = useUiStore((state) => state.selectedCategory);
  const sortBy = useUiStore((state) => state.sortBy);
  const debouncedSearch = useDebounce(searchQuery, 400);
  const observerRef = useRef(null);

  // 모드 결정
  const mode = debouncedSearch
    ? "search"
    : selectedCategory
      ? "category"
      : "infinite";

  // 각 쿼리 훅 호출
  const infiniteQuery = useProductsInfinite();
  const searchResult = useSearchProducts(debouncedSearch);
  const categoryResult = useCategoryProducts(selectedCategory);

  // 현재 모드에 따른 데이터 선택
  const { products, isLoading, isError, error } = useMemo(() => {
    switch (mode) {
      case "search":
        return {
          products: searchResult.data?.products || [],
          isLoading: searchResult.isLoading,
          isError: searchResult.isError,
          error: searchResult.error,
        };
      case "category":
        return {
          products: categoryResult.data?.products || [],
          isLoading: categoryResult.isLoading,
          isError: categoryResult.isError,
          error: categoryResult.error,
        };
      default:
        return {
          products:
            infiniteQuery.data?.pages.flatMap((page) => page.products) || [],
          isLoading: infiniteQuery.isLoading,
          isError: infiniteQuery.isError,
          error: infiniteQuery.error,
        };
    }
  }, [mode, searchResult, categoryResult, infiniteQuery]);

  // [성능 최적화] useMemo로 정렬된 상품 목록을 캐싱합니다.
  const sortedProducts = useMemo(() => {
    if (sortBy === "default") return products;
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [products, sortBy]);

  // 무한 스크롤: Intersection Observer
  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      if (
        entry.isIntersecting &&
        mode === "infinite" &&
        infiniteQuery.hasNextPage &&
        !infiniteQuery.isFetchingNextPage
      ) {
        infiniteQuery.fetchNextPage();
      }
    },
    [mode, infiniteQuery]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

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
        <svg
          className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          {debouncedSearch
            ? `"${debouncedSearch}"에 대한 검색 결과가 없습니다.`
            : "상품이 없습니다."}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* 결과 카운트 & 정렬 */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {mode === "search" && `"${debouncedSearch}" 검색 결과: `}
          {sortedProducts.length}개 상품
        </p>
        <SortSelect />
      </div>

      {/* 상품 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 무한 스크롤 트리거 */}
      {mode === "infinite" && (
        <div ref={observerRef} className="py-4">
          {infiniteQuery.isFetchingNextPage && <LoadingSpinner size="sm" />}
          {!infiniteQuery.hasNextPage && sortedProducts.length > 0 && (
            <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-4">
              모든 상품을 불러왔습니다.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// 정렬 셀렉트 (내부 컴포넌트)
function SortSelect() {
  const sortBy = useUiStore((state) => state.sortBy);
  const setSortBy = useUiStore((state) => state.setSortBy);

  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
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
