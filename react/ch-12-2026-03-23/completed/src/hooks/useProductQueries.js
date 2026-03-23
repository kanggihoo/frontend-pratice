import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  searchProducts,
  fetchCategories,
  fetchProductsByCategory,
  fetchProductDetail,
} from "../data/api";

// [아키텍처 결정] TanStack Query 훅들을 커스텀 훅으로 추상화합니다.
// 이렇게 하면 컴포넌트에서 API 로직을 분리하고,
// queryKey 관리를 한 곳에서 일관되게 할 수 있습니다.

// ── 상품 목록 (무한 스크롤) ───────────────────────────
export function useProductsInfinite() {
  return useInfiniteQuery({
    queryKey: ["products", "infinite"],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
}

// ── 상품 검색 ─────────────────────────────────────────
export function useSearchProducts(query) {
  return useQuery({
    queryKey: ["products", "search", query],
    queryFn: () => searchProducts(query),
    enabled: query.trim().length > 0,
  });
}

// ── 카테고리 목록 ─────────────────────────────────────
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 30, // 카테고리는 잘 안 바뀌므로 30분
  });
}

// ── 카테고리별 상품 ───────────────────────────────────
export function useCategoryProducts(category) {
  return useQuery({
    queryKey: ["products", "category", category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category,
  });
}

// ── 상품 상세 ─────────────────────────────────────────
export function useProductDetail(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetail(id),
    enabled: !!id,
  });
}
