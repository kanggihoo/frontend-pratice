import ProductItem from "./ProductItem";
import RenderCounter from "./RenderCounter";

// ─── [memo를 적용하지 않는 이유] ────────────────────────
// ProductList는 memo를 적용하지 않습니다.
// 왜냐하면 filteredProducts가 useMemo로 계산된 새 배열이라,
// 검색/필터/정렬이 바뀌면 항상 새로운 배열 참조가 전달되기 때문입니다.
// 대신 자식 ProductItem에 memo를 적용하여 개별 카드의 리렌더링을 최적화합니다.

export default function ProductList({ products }) {
  // ─── [빈 결과 처리] ────────────────────────────────────
  // products 배열이 비어있으면 "검색 결과가 없습니다" 메시지를 보여주세요.
  // 힌트: if (products.length === 0) return ( <div>...</div> );


  return (
    <div>
      {/* ─── [상품 개수 표시] ─────────────────────────────── */}
      {/* "총 N개 상품" 텍스트와 RenderCounter를 나란히 배치하세요. */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {/* 힌트: products.length를 사용하세요 */}
        </p>
        <RenderCounter label="ProductList" />
      </div>

      {/* ─── [상품 그리드] ────────────────────────────────── */}
      {/* products 배열을 map()으로 순회하며 ProductItem을 렌더링하세요. */}
      {/* 반드시 key에 product.id를 전달하세요. */}
      {/* 각 ProductItem에는 product prop을 전달합니다. */}
      {/* */}
      {/* 힌트: */}
      {/*   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> */}
      {/*     {products.map((product) => ( */}
      {/*       <ProductItem key={product.id} product={product} /> */}
      {/*     ))} */}
      {/*   </div> */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      </div>
    </div>
  );
}
