import { useState } from "react";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";

// ─── [데이터 import] ────────────────────────────────
// mockData.js에서 products와 categories를 가져오세요.
import { products, categories } from "./data/mockData";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  // ─── [필터링 로직] ─────────────────────────────────
  // products 배열을 filter()로 필터링하여 filteredProducts를 만드세요.
  //   1. 선택된 카테고리가 "전체"이거나, 상품의 category가 selectedCategory와 같은 경우
  //   2. 상품의 name이 검색어(searchQuery)를 포함하는 경우 (대소문자 무시)
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      product.category === selectedCategory || selectedCategory === "전체";
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 여기에 Header, CategoryFilter, ProductList를 배치하세요 */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <p className="text-gray-500 mb-6">
          총{" "}
          <span className="font-bold text-indigo-600">
            {filteredProducts.length}
          </span>
          개의 상품
        </p>
        <ProductList products={filteredProducts} />
      </main>
    </div>
  );
}
