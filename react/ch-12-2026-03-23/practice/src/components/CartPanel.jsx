import useCartStore from "../store/cartStore";
import useUiStore from "../store/uiStore";
import CartItem from "./CartItem";

// ─── [CartPanel 컴포넌트] ─────────────────────────────────
// 오른쪽에서 슬라이드되는 장바구니 패널입니다.
// cartOpen 상태에 따라 transform으로 열림/닫힘을 구현합니다.

export default function CartPanel() {
  // ─── [Zustand 스토어 구독] ─────────────────────────────
  // 힌트:
  //   const items = useCartStore((state) => state.items);
  //   const clearCart = useCartStore((state) => state.clearCart);
  //   const getTotalPrice = useCartStore((state) => state.getTotalPrice());
  //   const getTotalCount = useCartStore((state) => state.getTotalCount());
  //   const cartOpen = useUiStore((state) => state.cartOpen);
  //   const setCartOpen = useUiStore((state) => state.setCartOpen);
  //   const setOrderFormOpen = useUiStore((state) => state.setOrderFormOpen);


  return (
    <>
      {/* ─── [오버레이] ──────────────────────────────────── */}
      {/* cartOpen일 때만 렌더링합니다 */}
      {/* fixed inset-0 bg-black/30 backdrop-blur-sm */}
      {/* 클릭 시 setCartOpen(false) */}

      {/* ─── [슬라이드 패널] ──────────────────────────────── */}
      {/* fixed top-0 right-0 h-full w-full max-w-md */}
      {/* cartOpen이면 translate-x-0, 아니면 translate-x-full */}
      {/* transition-transform duration-300 으로 애니메이션 */}
      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl transform translate-x-full transition-transform duration-300">
        {/* ─── [헤더: 제목 + 닫기 버튼] ─────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            장바구니 (0)
          </h2>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {/* ─── [장바구니 아이템 목록] ─────────────────────── */}
        {/* items.length === 0이면 "장바구니가 비어있습니다" 메시지 */}
        {/* items.map()으로 CartItem 컴포넌트를 렌더링 */}
        {/* "장바구니 비우기" 버튼: clearCart() 호출 */}
        <div className="flex-1 overflow-y-auto px-6 py-4" style={{ maxHeight: "calc(100vh - 200px)" }}>
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">
              장바구니가 비어있습니다.
            </p>
          </div>
        </div>

        {/* ─── [하단: 합계 + 주문 버튼] ──────────────────── */}
        {/* items.length > 0일 때만 렌더링합니다 */}
        {/* getTotalPrice.toFixed(2)로 합계 표시 */}
        {/* "주문하기" 버튼: setOrderFormOpen(true) 호출 */}
      </div>
    </>
  );
}
