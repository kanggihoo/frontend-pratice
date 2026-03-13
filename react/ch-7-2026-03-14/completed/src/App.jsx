import { useState, useMemo, useCallback } from "react";
import { products, categories } from "./data/mockData";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import SortControls from "./components/SortControls";
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";
import RenderCounter from "./components/RenderCounter";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [sortOption, setSortOption] = useState("default");

  // ─── useCallback ─────────────────────────────────────
  // 이벤트 핸들러를 useCallback으로 감싸면, 함수의 참조가 유지됩니다.
  // memo로 감싼 자식 컴포넌트에 props로 전달할 때, 함수 참조가 바뀌지 않아야
  // memo가 제대로 동작합니다.
  //
  // useCallback을 사용하지 않으면?
  // → App이 리렌더링될 때마다 새로운 함수 객체가 생성됨
  // → memo로 감싼 SearchBar에 전달되는 onSearchChange의 참조가 달라짐
  // → SearchBar가 불필요하게 리렌더링됨
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleSortChange = useCallback((option) => {
    setSortOption(option);
  }, []);

  // ─── useMemo (필터링) ──────────────────────────────────
  // 200개 상품을 매 렌더링마다 필터링하는 것은 비효율적입니다.
  // useMemo를 사용하면 searchTerm이나 selectedCategory가 변경될 때만 재계산합니다.
  //
  // 의존성 배열: [searchTerm, selectedCategory]
  // → 이 두 값이 바뀔 때만 필터링을 다시 실행
  // → sortOption이 바뀌어도 필터링은 다시 실행되지 않음 (정렬은 별도 useMemo)
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

  // ─── useMemo (정렬) ──────────────────────────────────
  // 필터링과 정렬을 분리하여, 정렬 옵션만 바뀌었을 때 필터링을 다시 하지 않도록 합니다.
  // filteredProducts가 바뀌거나 sortOption이 바뀔 때만 재계산합니다.
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
              <h1 className="text-2xl font-bold text-gray-900">
                🛒 상품 마켓
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                React.memo, useMemo, useCallback으로 최적화된 대량 상품 리스트
              </p>
            </div>
            <RenderCounter label="App" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* 통계 패널 — useMemo로 연산 최적화 */}
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
                SearchBar, CategoryFilter, SortControls, ProductItem을
                memo로 감싸서, props가 변경되지 않으면 리렌더링을
                건너뜁니다.
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="font-bold text-green-700">useMemo</h3>
              <p className="mt-1 text-sm text-gray-600">
                필터링, 정렬, 통계 연산을 메모이제이션하여 의존성이 변경될
                때만 재계산합니다.
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="font-bold text-purple-700">useCallback</h3>
              <p className="mt-1 text-sm text-gray-600">
                이벤트 핸들러의 참조를 유지하여, memo로 감싼 자식에게
                전달할 때 불필요한 리렌더링을 방지합니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
