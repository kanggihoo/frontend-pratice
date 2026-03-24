// ─── [Props 받기] ────────────────────────────────
// 이 컴포넌트는 부모(ProductList)로부터 하나의 prop을 받습니다:
//   - product: 상품 객체 (id, name, category, price, rating, image, description, inStock)
// 힌트: function ProductCard({ product })

export default function ProductCard({ product }) {
  // ─── [구조 분해 할당] ──────────────────────────────
  // product 객체에서 필요한 속성들을 꺼내세요.
  // 힌트: const { name, category, price, rating, image, description, inStock } = product;
  const { name, category, price, rating, image, description, inStock } =
    product;

  // ─── [이벤트 핸들러] ──────────────────────────────
  // "담기" 버튼을 클릭하면 alert로 메시지를 표시하는 함수를 만드세요.
  // 예시: alert(`"${name}" 상품이 장바구니에 추가되었습니다!`);
  // 힌트: const handleAddToCart = () => { ... };
  const handlerAddToCart = () => {
    alert(`"${name}" 상품이 추가되었습니다.`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex-col ">
      <div className="bg-gray-100 h-48 flex items-center justify-center text-7xl">
        {image}
      </div>

      {/* ─── [카드 본문] ────────────────────────────── */}
      {/* Tailwind: p-5 flex flex-col flex-1             */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
            {category}
          </span>
          <span className="text-sm text-yellow-500 font-medium">
            ⭐ {rating}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-4 flex-1">{description}</p>

        {/* ─── [가격 + 담기 버튼] ───────────────────── */}

        <div className="flex items-center justify-between mt-auto">
          <span>{price.toLocaleString()}원</span>
          <button
            onClick={handlerAddToCart}
            disabled={!inStock}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
              inStock
                ? "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {inStock ? "담기" : "품절"}
          </button>
        </div>
      </div>
    </div>
  );
}
