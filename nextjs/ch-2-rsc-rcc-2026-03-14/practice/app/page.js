// ─── [서버 컴포넌트 이해하기] ──────────────────────────
// 이 파일(page.js)은 App Router에서 기본적으로 "서버 컴포넌트(RSC)"입니다.
// "use client" 지시어가 없으면 → 서버 컴포넌트!
// 서버 컴포넌트에서는 데이터를 직접 import하거나 fetch할 수 있습니다.

// ─── [데이터 가져오기] ──────────────────────────────────
import { products } from "@/data/mockData";
import ProductCard from "./components/ProductCard";

export default function Home() {
  // ─── [데이터 필터링] ──────────────────────────────────
  const availableProducts = products.filter((product) => product.inStock);
  const soldOutProducts = products.filter((product) => !product.inStock);
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ─── [페이지 헤더 스타일링] ──────────────────────── */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          오늘의 추천 상품
        </h2>
        <p className="text-gray-600">
          총{" "}
          <span className="font-semibold text-indigo-600">
            {products.length}
          </span>
          개의 상품이 있습니다.
        </p>
      </div>

      {/* 판매 중인 상품 목록 */}
      <section className="mb-12">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          판매 중 ({availableProducts.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {availableProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ─── [품절 상품 목록] ────────────────────────────── */}
      {soldOutProducts.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-gray-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            품절 ({soldOutProducts.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {soldOutProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
