"use client";

// 이 컴포넌트는 CategoryFilter의 필터링 상태를 관리해야 하므로 "use client"입니다.
// 하지만 ProductCard 자체는 서버 컴포넌트이므로, 여기서는 렌더링 로직만 담당합니다.
// 💡 참고: 실제 프로덕션에서는 URL 쿼리 파라미터 + 서버 컴포넌트 조합으로
//    이 패턴을 더 최적화할 수 있지만, 학습 목적으로 useState 기반으로 구성합니다.

import { useState } from "react";
import { products } from "@/data/mockData";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [filteredCategory, setFilteredCategory] = useState("전체");

  const filteredProducts =
    filteredCategory === "전체"
      ? products
      : products.filter((p) => p.category === filteredCategory);

  return (
    <section>
      {/* 카테고리 필터 — 클라이언트 컴포넌트 */}
      <div className="mb-8">
        <CategoryFilter onFilterChange={setFilteredCategory} />
      </div>

      {/* 상품 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">해당 카테고리에 상품이 없습니다.</p>
        </div>
      )}
    </section>
  );
}
