// ─── [성능 최적화 핵심 훅 import] ────────────────────────
// useState와 함께 useMemo, useCallback을 import하세요.
//
// useMemo: 계산 비용이 큰 값을 메모이제이션 (값을 캐싱)
// useCallback: 함수를 메모이제이션 (함수 참조를 유지)
//
import { useState, useMemo, useCallback } from "react";

import { products, categories } from "./data/mockData";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import SortControls from "./components/SortControls";
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";
import RenderCounter from "./components/RenderCounter";

export default function App() {
  // ─── [상태 선언] ──────────────────────────────────────
  // 3개의 상태를 useState로 선언하세요.
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [sortOption, setSortOption] = useState("default");
  //

  // ─── [useCallback — 이벤트 핸들러 메모이제이션] ────────
  // 아래 3개의 핸들러 함수를 useCallback으로 감싸세요.
  //
  // useCallback이란?
  // - 함수를 메모이제이션하여 참조를 유지하는 훅입니다.
  // - 의존성 배열의 값이 변경될 때만 새로운 함수를 생성합니다.
  // - memo로 감싼 자식 컴포넌트에 함수를 전달할 때 반드시 필요합니다.
  //
  // 왜 필요할까?
  // - useCallback이 없으면, App이 리렌더링될 때마다 새로운 함수 객체가 생성됩니다.
  // - 새로운 함수 참조 → memo가 props 변경으로 감지 → 자식 리렌더링
  // - useCallback을 사용하면 같은 함수 참조가 유지되어 memo가 제대로 동작합니다.
  //

  // 검색어 변경 핸들러
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  // 카테고리 변경 핸들러
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  // 정렬 옵션 변경 핸들러
  const handleSortChange = useCallback((option) => {
    setSortOption(option);
  }, []);

  // ─── [useMemo — 필터링 로직 메모이제이션] ──────────────
  // 200개의 상품을 필터링하는 로직을 useMemo로 감싸세요.
  //
  // 의존성 배열: [searchTerm, selectedCategory]
  // → 검색어나 카테고리가 바뀔 때만 필터링을 다시 실행합니다.
  // → 정렬 옵션(sortOption)이 바뀌어도 필터링은 재실행되지 않습니다.
  //
  // 필터링 조건:
  // 1. searchTerm이 비어있거나, 상품명/브랜드/카테고리에 포함되면 통과
  // 2. selectedCategory가 "전체"이거나, 상품 카테고리와 일치하면 통과

  const filteredProducts = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        searchTerm === "" ||
        product.name.toLowerCase().includes(lowerSearch) ||
        product.brand.toLowerCase().includes(lowerSearch) ||
        product.category.toLowerCase().includes(lowerSearch);

      const matchesCategory =
        selectedCategory === "전체" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // ─── [useMemo — 정렬 로직 메모이제이션] ────────────────
  // 필터링된 결과를 정렬하는 로직을 useMemo로 감싸세요.
  //
  // 의존성 배열: [filteredProducts, sortOption]
  // → 필터 결과나 정렬 옵션이 바뀔 때만 정렬을 다시 실행합니다.
  const sortedProducts = useMemo(() => {
    if (sortOption === "default") return filteredProducts;

    return [...filteredProducts].sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.discountedPrice - b.discountedPrice;
        case "price-desc":
          return b.discountedPrice - a.discountedPrice;
        case "rating-desc":
          return b.rating - a.rating;
        case "review-desc":
          return b.reviewCount - a.reviewCount;
        case "discount-desc":
          return b.discount - a.discount;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortOption]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🛒 상품 마켓</h1>
              <p className="mt-1 text-sm text-gray-500">
                React.memo, useMemo, useCallback으로 최적화된 대량 상품 리스트
              </p>
            </div>
            <RenderCounter label="App" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* 통계 패널 */}
        <StatsPanel products={sortedProducts} />

        {/* 검색 & 필터 컨트롤 */}
        <div className="mt-6 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex-1">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
              />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
              <SortControls
                sortOption={sortOption}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        </div>

        {/* 상품 리스트 */}
        <div className="mt-6">
          <ProductList products={sortedProducts} />
        </div>

        {/* 최적화 설명 카드 */}
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="mb-3 text-lg font-bold text-amber-800">
            💡 이 앱에서 사용된 최적화 기법
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="font-bold text-blue-700">React.memo</h3>
              <p className="mt-1 text-sm text-gray-600">
                SearchBar, CategoryFilter, SortControls, ProductItem을 memo로
                감싸서, props가 변경되지 않으면 리렌더링을 건너뜁니다.
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="font-bold text-green-700">useMemo</h3>
              <p className="mt-1 text-sm text-gray-600">
                필터링, 정렬, 통계 연산을 메모이제이션하여 의존성이 변경될 때만
                재계산합니다.
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="font-bold text-purple-700">useCallback</h3>
              <p className="mt-1 text-sm text-gray-600">
                이벤트 핸들러의 참조를 유지하여, memo로 감싼 자식에게 전달할 때
                불필요한 리렌더링을 방지합니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
