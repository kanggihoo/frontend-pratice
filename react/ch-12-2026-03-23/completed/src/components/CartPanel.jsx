import useCartStore from "../store/cartStore";
import useUiStore from "../store/uiStore";
import CartItem from "./CartItem";

export default function CartPanel() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice());
  const getTotalCount = useCartStore((state) => state.getTotalCount());
  const cartOpen = useUiStore((state) => state.cartOpen);
  const setCartOpen = useUiStore((state) => state.setCartOpen);
  const setOrderFormOpen = useUiStore((state) => state.setOrderFormOpen);

  return (
    <>
      {/* 오버레이 */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* 슬라이드 패널 */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            장바구니 ({getTotalCount})
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-y-auto px-6 py-4" style={{ maxHeight: "calc(100vh - 200px)" }}>
          {items.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">
                장바구니가 비어있습니다.
              </p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              <button
                onClick={clearCart}
                className="mt-4 text-sm text-red-500 hover:text-red-600 transition-colors"
              >
                장바구니 비우기
              </button>
            </>
          )}
        </div>

        {/* 하단: 합계 + 주문 버튼 */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                총 합계
              </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                ${getTotalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => setOrderFormOpen(true)}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              주문하기
            </button>
          </div>
        )}
      </div>
    </>
  );
}
