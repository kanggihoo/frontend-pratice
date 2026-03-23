// [아키텍처 결정] API 관련 로직을 한 곳에 모아두면
// 엔드포인트 변경 시 이 파일만 수정하면 됩니다.
// 또한 TanStack Query의 queryFn에서 재사용하기 좋은 구조입니다.

const BASE_URL = "https://dummyjson.com";

// ── 상품 목록 (페이지네이션) ──────────────────────────
export async function fetchProducts({ pageParam = 0 }) {
  const limit = 12;
  const res = await fetch(
    `${BASE_URL}/products?limit=${limit}&skip=${pageParam}&select=id,title,price,thumbnail,category,rating,stock,discountPercentage,brand`
  );
  if (!res.ok) throw new Error("상품 목록을 불러오는 데 실패했습니다.");
  const data = await res.json();
  return {
    products: data.products,
    total: data.total,
    nextCursor: pageParam + limit < data.total ? pageParam + limit : undefined,
  };
}

// ── 상품 검색 ─────────────────────────────────────────
export async function searchProducts(query) {
  if (!query.trim()) return { products: [] };
  const res = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&select=id,title,price,thumbnail,category,rating,stock,discountPercentage,brand`
  );
  if (!res.ok) throw new Error("상품 검색에 실패했습니다.");
  return res.json();
}

// ── 카테고리 목록 ─────────────────────────────────────
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("카테고리를 불러오는 데 실패했습니다.");
  return res.json();
}

// ── 카테고리별 상품 ───────────────────────────────────
export async function fetchProductsByCategory(category) {
  const res = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(category)}?select=id,title,price,thumbnail,category,rating,stock,discountPercentage,brand`
  );
  if (!res.ok) throw new Error("카테고리별 상품을 불러오는 데 실패했습니다.");
  return res.json();
}

// ── 상품 상세 ─────────────────────────────────────────
export async function fetchProductDetail(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("상품 상세 정보를 불러오는 데 실패했습니다.");
  return res.json();
}
