// ─── [import] ────────────────────────────────────
// React에서 useState를 가져오세요.
// 힌트: import { useState } from "react";

// ─── [컴포넌트 import] ──────────────────────────────
// 아래 3개의 컴포넌트를 import하세요:
// - Header      (./components/Header)
// - CategoryFilter (./components/CategoryFilter)
// - ProductList (./components/ProductList)


// ─── [데이터 import] ────────────────────────────────
// mockData.js에서 products와 categories를 가져오세요.
// 힌트: import { products, categories } from "./data/mockData";


export default function App() {
  // ─── [상태 선언 1] ──────────────────────────────────
  // 현재 선택된 카테고리를 관리하는 상태를 선언하세요.
  // 초기값은 "전체"입니다.
  // 힌트: const [변수명, 세터함수] = useState("전체");


  // ─── [상태 선언 2] ──────────────────────────────────
  // 검색어를 관리하는 상태를 선언하세요.
  // 초기값은 빈 문자열("")입니다.


  // ─── [필터링 로직] ─────────────────────────────────
  // products 배열을 filter()로 필터링하여 filteredProducts를 만드세요.
  // 두 가지 조건을 모두 만족해야 합니다:
  //   1. 선택된 카테고리가 "전체"이거나, 상품의 category가 selectedCategory와 같은 경우
  //   2. 상품의 name이 검색어(searchQuery)를 포함하는 경우 (대소문자 무시)
  // 힌트: const filteredProducts = products.filter((product) => { ... });
  // 힌트: 문자열.toLowerCase().includes(검색어.toLowerCase())
  const filteredProducts = [];

  // ─── [JSX 반환] ────────────────────────────────────
  // 아래 구조로 JSX를 완성하세요:
  // 1. 최상위 div에 Tailwind 클래스 적용: min-h-screen bg-gray-50
  // 2. <Header />에 searchQuery와 onSearchChange props 전달
  // 3. <main> 태그에 max-w-7xl mx-auto px-4 py-8 클래스 적용
  // 4. <CategoryFilter />에 categories, selectedCategory, onCategoryChange props 전달
  // 5. 상품 개수를 보여주는 <p> 태그
  // 6. <ProductList />에 products={filteredProducts} 전달
  return (
    <div>
      {/* 여기에 Header, CategoryFilter, ProductList를 배치하세요 */}
      <main>
        <p>상품 목록이 여기에 표시됩니다.</p>
      </main>
    </div>
  );
}
