import useCartStore from "../store/cartStore";
import useToastStore from "../store/toastStore";

export default function CartItem({ item }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const addToast = useToastStore((state) => state.addToast);

  const handleRemove = () => {
    removeItem(item.id);
    addToast(`"${item.name}"을(를) 장바구니에서 제거했습니다.`, "error");
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
      {/* 상품 이모지 */}
      <span className="text-3xl w-12 text-center">{item.image}</span>

      {/* 상품 정보 */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-800 truncate">
          {item.name}
        </h4>
        <p className="text-sm text-gray-500">
          {item.price.toLocaleString()}원
        </p>
      </div>

      {/* 수량 조절 */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-medium">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
        >
          +
        </button>
      </div>

      {/* 소계 */}
      <span className="text-sm font-bold text-gray-800 w-20 text-right">
        {(item.price * item.quantity).toLocaleString()}원
      </span>

      {/* 삭제 */}
      <button
        onClick={handleRemove}
        className="text-red-400 hover:text-red-600 transition-colors cursor-pointer text-lg"
      >
        ✕
      </button>
    </div>
  );
}
