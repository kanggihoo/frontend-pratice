import { useState } from "react";
import type { Category } from "./types";
import { products } from "./data/mockData";
// 만들어둔 컴포넌트들을 import 하세요.
import ProductCard from "./components/ProductCard";
import CategoryFilter from "./components/CategoryFilter";

// 필터에 사용할 전체 카테고리 배열
const CATEGORIES: Category[] = [
  "All",
  "Electronics",
  "Clothing",
  "Books",
  "Home",
];

function App() {
  // ─── [상태 선언] ───────────────────────────────
  // useState를 사용하여 현재 선택된 카테고리를 관리해주세요.
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  // ─── [이벤트 핸들러] ────────────────────────────
  // 클릭된 카테고리를 받아 상태를 업데이트하는 함수를 만듭니다.
  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  // ─── [데이터 필터링] ────────────────────────────
  // 현재 'selectedCategory' 값에 따라 products를 걸러내 배열을 만드세요.
  // 만약 카테고리가 'All'이라면 모든 데이터를,
  // 아니라면 product.category === selectedCategory 인 객체로만 구성하세요.
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Trending Products
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Explore our curated collection of the latest electronics, fashion,
            and lifestyle essentials.
          </p>
        </header>
        <div className="flex justify-center">
          {/* ─── [UI 렌더링 - 카테고리 필터] ──────────────── */}
          <CategoryFilter
            catetgories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </div>
        {/* ─── [조건부 렌더링 및 리스트 렌더링] ─────────────────────── */}
        {/* filteredProducts 배열의 길이를 확인하여,
            길이가 0보다 클 때(조건)는 리스트를 모두 map()으로 순회하며 ProductCard들을 랜더링,
            길이가 0이라면 '검색 결과 없음'을 의미하는 빈 화면 영역을 렌더링하세요. */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={(id) => console.log("Product clicked: ", id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No products found
            </h3>
            <p className="text-gray-500">
              There are no products in this category at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
