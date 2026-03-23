import useCartStore from "../store/cartStore";

export default function Header({ onToggleCart }) {
  // selector 패턴: 필요한 상태만 구독하여 불필요한 리렌더링 방지
  const getTotalQuantity = useCartStore((state) => state.getTotalQuantity);
  const totalQuantity = getTotalQuantity();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          🛍️ Zustand 마켓
        </h1>
        <button
          onClick={onToggleCart}
          className="relative bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          🛒 장바구니
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {totalQuantity}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
