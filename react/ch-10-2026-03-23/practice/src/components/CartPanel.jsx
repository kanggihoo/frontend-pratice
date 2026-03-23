// ─── [스토어 import] ─────────────────────────────────────────
// useCartStore와 useToastStore를 import하세요.

import CartItem from "./CartItem";

export default function CartPanel({ isOpen, onClose }) {
  // ─── [스토어에서 상태와 액션 가져오기] ──────────────────────
  // useCartStore에서 items, clearCart, getTotalPrice를 가져오세요.
  // useToastStore에서 addToast를 가져오세요.
  //
  // 각각 selector 패턴으로 개별 구독하세요:
  // const items = useCartStore((state) => state.items);
  // const clearCart = useCartStore((state) => state.clearCart);
  // const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  // const addToast = useToastStore((state) => state.addToast);
  //
  // const totalPrice = getTotalPrice();

  const items = []; // ← 위의 코드로 교체하세요
  const totalPrice = 0; // ← 위의 코드로 교체하세요

  // ─── [장바구니 비우기 핸들러] ───────────────────────────────
  // 1. clearCart()으로 장바구니 비우기
  // 2. addToast()로 안내 알림 표시 (type: "info")


  // ─── [결제 핸들러] ─────────────────────────────────────────
  // 1. items.length === 0이면 경고 토스트 표시 후 return
  // 2. 결제 완료 성공 토스트 표시
  // 3. clearCart()으로 장바구니 비우기
  // 4. onClose()로 패널 닫기


  return (
    <>
      {/* ─── [오버레이] ──────────────────────────────────────── */}
      {/* isOpen일 때만 오버레이를 렌더링하세요 */}
      {/* onClick에 onClose를 연결하여 패널 밖 클릭 시 닫기 */}
      {/* 힌트:
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      */}

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

          {/* ─── [아이템 목록 렌더링] ───────────────────────── */}
          <div className="flex-1 overflow-y-auto p-5">
            {/* items가 비어있을 때 빈 상태 UI를 보여주고, */}
            {/* 아이템이 있으면 items.map()으로 CartItem을 렌더링하세요 */}
            {/*
            힌트:
            {items.length === 0 ? (
              <div className="text-center text-gray-400 mt-20">
                <p className="text-5xl mb-4">🛒</p>
                <p className="text-lg">장바구니가 비어있습니다</p>
                <p className="text-sm mt-2">상품을 담아보세요!</p>
              </div>
            ) : (
              items.map((item) => <CartItem key={item.id} item={item} />)
            )}
            */}
          </div>

          {/* ─── [하단 결제 영역] ───────────────────────────── */}
          {/* items.length > 0 일 때만 결제 영역을 보여주세요 */}
          {/* 총 결제 금액: totalPrice.toLocaleString() */}
          {/* 비우기 버튼: handleClearCart 연결 */}
          {/* 결제하기 버튼: handleCheckout 연결 */}
          {/*
          힌트:
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-600">총 결제 금액</span>
                <span className="text-2xl font-bold text-indigo-600">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
              <div className="flex gap-3">
                <button onClick={handleClearCart} className="flex-1 py-3 border border-gray-300 rounded-lg ...">비우기</button>
                <button onClick={handleCheckout} className="flex-2 py-3 bg-indigo-600 text-white rounded-lg ...">결제하기</button>
              </div>
            </div>
          )}
          */}
        </div>
      </aside>
    </>
  );
}
