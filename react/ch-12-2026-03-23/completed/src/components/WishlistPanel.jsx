import useWishlistStore from "../store/wishlistStore";
import useCartStore from "../store/cartStore";
import useUiStore from "../store/uiStore";
import useToastStore from "../store/toastStore";

export default function WishlistPanel() {
  const items = useWishlistStore((state) => state.items);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const addItem = useCartStore((state) => state.addItem);
  const wishlistOpen = useUiStore((state) => state.wishlistOpen);
  const setWishlistOpen = useUiStore((state) => state.setWishlistOpen);
  const addToast = useToastStore((state) => state.addToast);

  const handleMoveToCart = (product) => {
    addItem(product);
    toggleWishlist(product);
    addToast(`${product.title} 장바구니로 이동!`, "success");
  };

  return (
    <>
      {/* 오버레이 */}
      {wishlistOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setWishlistOpen(false)}
        />
      )}

      {/* 슬라이드 패널 */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ${
          wishlistOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            위시리스트 ({items.length})
          </h2>
          <button
            onClick={() => setWishlistOpen(false)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 내용 */}
        <div className="overflow-y-auto px-6 py-4" style={{ maxHeight: "calc(100vh - 80px)" }}>
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">
                위시리스트가 비어있습니다.
              </p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-50 dark:bg-gray-900 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {item.title}
                    </h4>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
                      ${item.price}
                    </p>
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                    >
                      장바구니로 이동
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      toggleWishlist(item);
                      addToast(`${item.title} 위시리스트에서 제거`, "info");
                    }}
                    className="self-start p-1 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="제거"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  clearWishlist();
                  addToast("위시리스트를 비웠습니다.", "info");
                }}
                className="mt-4 text-sm text-red-500 hover:text-red-600 transition-colors"
              >
                위시리스트 비우기
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
