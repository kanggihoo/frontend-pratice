// ─── [클라이언트 컴포넌트 선언] ──────────────────────────
// 이 컴포넌트는 카테고리 필터링 상태(State)를 관리해야 하므로
// 클라이언트 컴포넌트로 선언해야 합니다.
//
// 힌트: 파일의 가장 첫 줄에 "use client"; 를 추가하세요.
// ─────────────────────────────────────────────────────

// ─── [임포트] ─────────────────────────────────────────
// 1. React의 useState를 임포트하세요.
// 2. mockData에서 products 배열을 임포트하세요.
// 3. CategoryFilter 컴포넌트를 임포트하세요.
// 4. ProductCard 컴포넌트를 임포트하세요.
//
// 힌트:
// import { useState } from "react";
// import { products } from "@/data/mockData";
// import CategoryFilter from "./CategoryFilter";
// import ProductCard from "./ProductCard";
// ─────────────────────────────────────────────────────

export default function ProductGrid() {
  // ─── [필터 상태 선언] ──────────────────────────────────
  // 현재 선택된 카테고리를 추적할 상태를 선언하세요.
  // 초기값은 "전체"입니다.
  // 힌트: const [filteredCategory, setFilteredCategory] = useState("전체");
  // ─────────────────────────────────────────────────────

  // ─── [상품 필터링 로직] ─────────────────────────────────
  // filteredCategory가 "전체"이면 모든 상품을, 아니면 해당 카테고리만 필터링하세요.
  //
  // 힌트:
  // const filteredProducts =
  //   filteredCategory === "전체"
  //     ? products
  //     : products.filter((p) => p.category === filteredCategory);
  // ─────────────────────────────────────────────────────
  const filteredProducts = []; // ← 위 힌트를 참고하여 교체하세요

  return (
    <section>
      {/* ─── [카테고리 필터 컴포넌트] ──────────────────────
          CategoryFilter 컴포넌트를 렌더링하고,
          onFilterChange prop에 setFilteredCategory를 전달하세요.

          힌트:
          <div className="mb-8">
            <CategoryFilter onFilterChange={setFilteredCategory} />
          </div>
          ──────────────────────────────────────────────── */}

      {/* ─── [상품 그리드] ────────────────────────────────
          filteredProducts 배열을 map으로 순회하며 ProductCard를 렌더링하세요.
          각 ProductCard에는 key={product.id}와 product prop을 전달하세요.

          그리드 스타일 힌트:
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6

          힌트:
          <div className="grid ...">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          ──────────────────────────────────────────────── */}
      <div>
        {/* 여기에 상품 카드 목록을 렌더링하세요 */}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">해당 카테고리에 상품이 없습니다.</p>
        </div>
      )}
    </section>
  );
}
