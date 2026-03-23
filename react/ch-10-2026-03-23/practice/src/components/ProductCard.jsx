// ─── [스토어 import] ─────────────────────────────────────────
// useCartStore와 useToastStore를 각각 import하세요.
// Zustand의 핵심: 여러 스토어에서 필요한 액션만 꺼내 쓸 수 있습니다!
// 힌트:
// import useCartStore from "../store/cartStore";
// import useToastStore from "../store/toastStore";


export default function ProductCard({ product }) {
  // ─── [스토어에서 액션 가져오기] ─────────────────────────────
  // useCartStore에서 addItem 액션을 가져오세요.
  // useToastStore에서 addToast 액션을 가져오세요.
  //
  // 힌트: const addItem = useCartStore((state) => state.addItem);
  //       const addToast = useToastStore((state) => state.addToast);


  // ─── [장바구니 담기 핸들러] ─────────────────────────────────
  // 1. addItem(product)으로 장바구니에 추가
  // 2. addToast()로 "~을(를) 장바구니에 담았습니다." 성공 알림 표시
  //
  // 힌트:
  // const handleAddToCart = () => {
  //   addItem(product);
  //   addToast(`"${product.name}"을(를) 장바구니에 담았습니다.`, "success");
  // };


  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 flex flex-col">
      {/* 상품 이미지(이모지) */}
      <div className="text-6xl text-center mb-4 py-6 bg-gray-50 rounded-lg">
        {product.image}
      </div>

      {/* 상품 정보 */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
            {product.category}
          </span>
          <span className="text-xs text-yellow-500">
            ⭐ {product.rating}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mt-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
      </div>

      {/* ─── [가격 & 담기 버튼] ──────────────────────────────── */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <span className="text-xl font-bold text-gray-900">
          {/* 가격을 toLocaleString()으로 포맷팅하여 표시하세요 */}
          {/* 힌트: {product.price.toLocaleString()}원 */}
          0원
        </span>
        <button
          // ─── onClick에 handleAddToCart를 연결하세요 ─────
          // ─── stock이 0이면 disabled 처리하세요 ──────────
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
        >
          담기
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-2 text-right">
        재고: {product.stock}개
      </p>
    </div>
  );
}
