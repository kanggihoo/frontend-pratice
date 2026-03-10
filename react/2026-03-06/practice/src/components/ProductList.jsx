import ProductCard from "./ProductCard";

// ─── [Props 받기] ────────────────────────────────
export default function ProductList({ products }) {
  // ─── [빈 목록 처리] ────────────────────────────────
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-6xl mb-4">😅</p>
        <p className="text-gray-500 text-lg">조건에 맞는 상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
