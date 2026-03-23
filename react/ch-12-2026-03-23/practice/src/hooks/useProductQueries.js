import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  searchProducts,
  fetchCategories,
  fetchProductsByCategory,
  fetchProductDetail,
} from "../data/api";

// ─── [TanStack Query 커스텀 훅 모음] ──────────────────────
// API 호출 로직을 커스텀 훅으로 추상화하면:
// 1) 컴포넌트에서 API 로직을 분리하여 깔끔한 코드 유지
// 2) queryKey를 한 곳에서 일관되게 관리
// 3) 여러 컴포넌트에서 재사용 가능

// ─── [상품 목록 - 무한 스크롤] ───────────────────────────
// useInfiniteQuery를 사용하여 스크롤할 때마다 다음 페이지를 불러옵니다.
//
// 필요한 옵션:
//   queryKey: ["products", "infinite"]
//   queryFn: fetchProducts  (api.js에서 import한 함수)
//   getNextPageParam: (lastPage) => lastPage.nextCursor
//     → fetchProducts가 반환하는 nextCursor 값을 다음 페이지 파라미터로 사용
//   initialPageParam: 0
//     → 첫 페이지의 시작 offset
//
// 힌트:
//   return useInfiniteQuery({
//     queryKey: [...],
//     queryFn: fetchProducts,
//     getNextPageParam: (lastPage) => lastPage.nextCursor,
//     initialPageParam: 0,
//   });
export function useProductsInfinite() {

}

// ─── [상품 검색] ─────────────────────────────────────────
// useQuery를 사용하여 검색어로 상품을 검색합니다.
//
// 필요한 옵션:
//   queryKey: ["products", "search", query]  ← query가 바뀌면 자동 재요청
//   queryFn: () => searchProducts(query)
//   enabled: query.trim().length > 0  ← 빈 문자열이면 요청하지 않음
export function useSearchProducts(query) {

}

// ─── [카테고리 목록] ─────────────────────────────────────
// 카테고리는 잘 변하지 않으므로 staleTime을 길게 (30분) 설정합니다.
//
// 필요한 옵션:
//   queryKey: ["categories"]
//   queryFn: fetchCategories
//   staleTime: 1000 * 60 * 30
export function useCategories() {

}

// ─── [카테고리별 상품] ───────────────────────────────────
// 선택된 카테고리의 상품 목록을 불러옵니다.
//
// 필요한 옵션:
//   queryKey: ["products", "category", category]
//   queryFn: () => fetchProductsByCategory(category)
//   enabled: !!category  ← 카테고리가 선택되지 않았으면 요청하지 않음
export function useCategoryProducts(category) {

}

// ─── [상품 상세] ─────────────────────────────────────────
// 상품 ID로 상세 정보를 불러옵니다.
//
// 필요한 옵션:
//   queryKey: ["product", id]
//   queryFn: () => fetchProductDetail(id)
//   enabled: !!id  ← id가 없으면 요청하지 않음
export function useProductDetail(id) {

}
