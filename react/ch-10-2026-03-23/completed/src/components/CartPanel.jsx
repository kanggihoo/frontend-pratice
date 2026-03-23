import useCartStore from "../store/cartStore";
import useToastStore from "../store/toastStore";
import CartItem from "./CartItem";

export default function CartPanel({ isOpen, onClose }) {
  // selector 패턴: 상태와 액션을 개별적으로 구독
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const addToast = useToastStore((state) => state.addToast);

  const totalPrice = getTotalPrice();

  const handleClearCart = () => {
    clearCart();
    addToast("장바구니를 비웠습니다.", "info");
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      addToast("장바구니가 비어있습니다.", "warning");
      return;
    }
    addToast(
      `총 ${totalPrice.toLocaleString()}원 결제가 완료되었습니다! 🎉`,
      "success",
      4000
    );
    clearCart();
    onClose();
  };

  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* 장바구니 패널 */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              🛒 장바구니 ({items.length})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* 아이템 목록 */}
          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="text-center text-gray-400 mt-20">
                <p className="text-5xl mb-4">🛒</p>
                <p className="text-lg">장바구니가 비어있습니다</p>
                <p className="text-sm mt-2">상품을 담아보세요!</p>
              </div>
            ) : (
              items.map((item) => <CartItem key={item.id} item={item} />)
            )}
          </div>

          {/* 하단 결제 영역 */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-600">
                  총 결제 금액
                </span>
                <span className="text-2xl font-bold text-indigo-600">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleClearCart}
                  className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer font-medium"
                >
                  비우기
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-2 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer font-medium"
                >
                  결제하기
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
