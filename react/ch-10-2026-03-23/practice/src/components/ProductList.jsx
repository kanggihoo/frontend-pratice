import { useState } from "react";
import { products } from "../data/mockData";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";

export default function ProductList() {
  // ─── [카테고리 필터 상태] ───────────────────────────────────
  // 선택된 카테고리를 관리하는 상태를 선언하세요.
  // 초기값은 "전체"입니다.
  // 힌트: const [selectedCategory, setSelectedCategory] = useState("전체");


  // ─── [필터링 로직] ──────────────────────────────────────────
  // selectedCategory가 "전체"이면 모든 상품을 보여주고,
  // 그 외에는 해당 카테고리의 상품만 필터링하세요.
  //
  // 힌트:
  // const filteredProducts =
  //   selectedCategory === "전체"
  //     ? products
  //     : products.filter((p) => p.category === selectedCategory);

  const filteredProducts = products; // ← 위의 필터링 로직으로 교체하세요

  return (
    <section>
      {/* ─── [CategoryFilter 컴포넌트 연결] ──────────────── */}
      {/* selectedCategory와 onSelectCategory props를 전달하세요 */}

      {/* ─── [상품 그리드 렌더링] ─────────────────────────── */}
      {/* filteredProducts를 map()으로 순회하며 ProductCard를 렌더링하세요 */}
      {/* 힌트:
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      */}
    </section>
  );
}
