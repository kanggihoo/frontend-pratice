// ─── [서버 컴포넌트 이해하기] ──────────────────────────
// 이 파일(page.js)은 App Router에서 기본적으로 "서버 컴포넌트(RSC)"입니다.
// "use client" 지시어가 없으면 → 서버 컴포넌트!
// 서버 컴포넌트에서는 데이터를 직접 import하거나 fetch할 수 있습니다.
// React의 useEffect + fetch 패턴이 필요 없습니다.

// ─── [데이터 가져오기] ──────────────────────────────────
// 힌트: data/mockData.js에서 products 배열을 import하세요.
// 경로 별칭 @/를 사용합니다: import { products } from "@/data/mockData";

// ─── [컴포넌트 가져오기] ────────────────────────────────
// 힌트: 아래에서 만들 ProductCard 컴포넌트를 import하세요.
// import ProductCard from "./components/ProductCard";

export default function Home() {
  // ─── [데이터 필터링] ──────────────────────────────────
  // 서버 컴포넌트에서는 JavaScript 로직을 자유롭게 사용할 수 있습니다.
  // 힌트: products 배열을 inStock 기준으로 필터링하세요.
  // const availableProducts = products.filter((p) => p.inStock);
  // const soldOutProducts = products.filter((p) => !p.inStock);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ─── [페이지 헤더 스타일링] ──────────────────────── */}
      {/* Tailwind로 제목과 상품 개수 텍스트를 스타일링하세요.        */}
      {/* 힌트: text-2xl, font-bold, text-gray-900, mb-2 등 활용    */}
      {/*       상품 개수는 products.length로 표시할 수 있습니다.     */}
      <div className="mb-8">
        <h2>오늘의 추천 상품</h2>
        <p>상품 목록이 여기에 표시됩니다.</p>
      </div>

      {/* ─── [판매 중인 상품 목록] ──────────────────────── */}
      {/* 힌트: availableProducts를 map으로 순회하며                */}
      {/*       ProductCard 컴포넌트를 렌더링하세요.                */}
      {/* Tailwind Grid 사용법:                                    */}
      {/*   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3          */}
      {/*   xl:grid-cols-4 gap-6                                    */}
      <section className="mb-12">
        <h3>판매 중</h3>
        <div>
          {/* 여기에 상품 카드를 map으로 렌더링하세요 */}
          {/* {availableProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))} */}
        </div>
      </section>

      {/* ─── [품절 상품 목록] ────────────────────────────── */}
      {/* 힌트: soldOutProducts가 있을 때만 이 섹션을 보여주세요.   */}
      {/* 조건부 렌더링: {soldOutProducts.length > 0 && (...)}      */}
    </main>
  );
}
