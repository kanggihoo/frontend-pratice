import { products } from "@/data/mockData";
import ProductCard from "./components/ProductCard";

// ✅ 이 파일은 서버 컴포넌트(RSC)입니다.
// "use client"가 없으므로 기본적으로 서버에서 실행됩니다.
// 서버 컴포넌트에서는 데이터를 직접 import하거나 fetch할 수 있습니다.
// 이 컴포넌트는 상태(State)나 이벤트 핸들러를 사용하지 않으므로 서버에서 렌더링하는 것이 적합합니다.

export default function Home() {
  // 서버 컴포넌트에서 데이터를 직접 가져옵니다.
  // React의 useEffect + fetch 패턴이 필요 없습니다!
  const availableProducts = products.filter((p) => p.inStock);
  const soldOutProducts = products.filter((p) => !p.inStock);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 페이지 헤더 — 정적 콘텐츠이므로 서버 컴포넌트가 적합 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          오늘의 추천 상품
        </h2>
        <p className="text-gray-600">
          총 <span className="font-semibold text-indigo-600">{products.length}</span>개의 상품이 있습니다.
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
            // ProductCard 내부에 클라이언트 컴포넌트(QuantityControl)가 포함됩니다.
            // 서버 컴포넌트(ProductCard)가 데이터를 받아 UI 껍데기를 그리고,
            // 상호작용이 필요한 부분만 클라이언트 컴포넌트로 분리합니다.
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 품절 상품 */}
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
