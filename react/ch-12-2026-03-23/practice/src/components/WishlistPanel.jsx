import useWishlistStore from "../store/wishlistStore";
import useCartStore from "../store/cartStore";
import useUiStore from "../store/uiStore";
import useToastStore from "../store/toastStore";

// ─── [WishlistPanel 컴포넌트] ─────────────────────────────
// 오른쪽에서 슬라이드되는 위시리스트 패널입니다.
// CartPanel과 유사한 구조이지만, "장바구니로 이동" 기능이 추가됩니다.

export default function WishlistPanel() {
  // ─── [Zustand 스토어 구독] ─────────────────────────────
  // 4개의 스토어에서 필요한 값을 구독합니다.
  //
  // 힌트:
  //   const items = useWishlistStore((state) => state.items);
  //   const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  //   const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  //   const addItem = useCartStore((state) => state.addItem);
  //   const wishlistOpen = useUiStore((state) => state.wishlistOpen);
  //   const setWishlistOpen = useUiStore((state) => state.setWishlistOpen);
  //   const addToast = useToastStore((state) => state.addToast);


  // ─── [장바구니로 이동 함수] ─────────────────────────────
  // 1. addItem(product)으로 장바구니에 추가
  // 2. toggleWishlist(product)으로 위시리스트에서 제거
  // 3. addToast로 알림 표시
  //
  // const handleMoveToCart = (product) => { ... };


  return (
    <>
      {/* ─── [오버레이] ──────────────────────────────────── */}
      {/* wishlistOpen일 때만 렌더링합니다 */}
      {/* CartPanel과 동일한 패턴 */}

      {/* ─── [슬라이드 패널] ──────────────────────────────── */}
      {/* CartPanel과 동일한 구조 */}
      {/* wishlistOpen에 따라 translate-x-0 / translate-x-full */}
      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl transform translate-x-full transition-transform duration-300">
        {/* ─── [헤더] ─────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            위시리스트 (0)
          </h2>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {/* ─── [위시리스트 아이템 목록] ────────────────────── */}
        {/* items.length === 0이면 빈 상태 메시지 */}
        {/* items.map()으로 각 아이템을 렌더링: */}
        {/*   - 썸네일 이미지 */}
        {/*   - 상품명 + 가격 */}
        {/*   - "장바구니로 이동" 링크 → handleMoveToCart(item) */}
        {/*   - 제거 버튼 → toggleWishlist(item) */}
        {/* "위시리스트 비우기" 버튼: clearWishlist() 호출 */}
        <div className="overflow-y-auto px-6 py-4" style={{ maxHeight: "calc(100vh - 80px)" }}>
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">
              위시리스트가 비어있습니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
