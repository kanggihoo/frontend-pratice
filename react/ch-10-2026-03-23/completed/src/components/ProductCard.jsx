import useCartStore from "../store/cartStore";
import useToastStore from "../store/toastStore";

export default function ProductCard({ product }) {
  // 여러 스토어에서 필요한 액션만 꺼내 쓰기
  const addItem = useCartStore((state) => state.addItem);
  const addToast = useToastStore((state) => state.addToast);

  const handleAddToCart = () => {
    addItem(product);
    addToast(`"${product.name}"을(를) 장바구니에 담았습니다.`, "success");
  };

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

      {/* 가격 & 담기 버튼 */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <span className="text-xl font-bold text-gray-900">
          {product.price.toLocaleString()}원
        </span>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            product.stock === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {product.stock === 0 ? "품절" : "담기"}
        </button>
      </div>

      {/* 재고 표시 */}
      <p className="text-xs text-gray-400 mt-2 text-right">
        재고: {product.stock}개
      </p>
    </div>
  );
}
