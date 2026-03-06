// ─── [import] ────────────────────────────────────
// ProductCard 컴포넌트를 import하세요.
// 힌트: import ProductCard from "./ProductCard";


// ─── [Props 받기] ────────────────────────────────
// 이 컴포넌트는 부모(App)로부터 하나의 prop을 받습니다:
//   - products: 필터링된 상품 배열
// 힌트: function ProductList({ products })

export default function ProductList() {
  // ─── [빈 목록 처리] ────────────────────────────────
  // products 배열의 길이가 0이면 "조건에 맞는 상품이 없습니다." 메시지를 표시하세요.
  // 힌트: if (products.length === 0) return (<div>...</div>);
  // Tailwind: text-center py-16


  // ─── [그리드 레이아웃 + 리스트 렌더링] ──────────────
  // products 배열을 map()으로 순회하며 ProductCard를 렌더링하세요.
  //
  // 그리드 컨테이너 Tailwind 클래스:
  //   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
  //
  // 각 ProductCard에 전달할 props:
  //   - key={product.id}    ← React가 리스트를 효율적으로 관리하기 위해 필요
  //   - product={product}   ← 상품 데이터 전체를 넘김
  //
  // 힌트: {products.map((product) => <ProductCard key={...} product={...} />)}
  return (
    <div>
      <p className="text-gray-400">상품 카드 리스트를 여기에 렌더링하세요</p>
    </div>
  );
}
