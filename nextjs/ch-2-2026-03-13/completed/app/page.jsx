// 서버 컴포넌트 (기본값) — 이 페이지 자체는 서버에서 렌더링됩니다.
// 서버 컴포넌트인 Header와 클라이언트 컴포넌트를 포함하는 ProductGrid를 조합합니다.

import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";

export default function HomePage() {
  return (
    <>
      {/* Header — 서버 컴포넌트 (정적 UI) */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 페이지 타이틀 영역 — 서버에서 렌더링 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            인기 상품 🔥
          </h2>
          <p className="text-gray-500">
            마음에 드는 상품의 수량을 선택해 보세요.
          </p>
        </div>

        {/* ProductGrid — 필터링 상태를 관리하는 클라이언트 컴포넌트 영역 */}
        <ProductGrid />
      </div>
    </>
  );
}
