import { memo, useCallback } from "react";
import useCartStore from "../store/cartStore";

// ─── [CartItem 컴포넌트 - React.memo] ────────────────────
// 개별 장바구니 아이템을 표시합니다.
// React.memo로 감싸서 다른 아이템의 수량 변경 시 리렌더링을 방지합니다.

const CartItem = memo(function CartItem({ item }) {
  // ─── [Zustand 스토어 구독] ─────────────────────────────
  // 힌트:
  //   const updateQuantity = useCartStore((state) => state.updateQuantity);
  //   const removeItem = useCartStore((state) => state.removeItem);


  // ─── [수량 증가 핸들러 - useCallback] ──────────────────
  // updateQuantity(item.id, item.quantity + 1)
  // 의존성: [updateQuantity, item.id, item.quantity]


  // ─── [수량 감소 핸들러 - useCallback] ──────────────────
  // updateQuantity(item.id, item.quantity - 1)
  // cartStore에서 quantity <= 0이면 자동으로 removeItem 호출


  // ─── [삭제 핸들러 - useCallback] ──────────────────────
  // removeItem(item.id)


  return (
    <div className="flex gap-3 py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
      {/* ─── [썸네일 이미지] ──────────────────────────── */}
      {/* src={item.thumbnail}, alt={item.title} */}
      {/* w-16 h-16 rounded-lg object-cover */}
      <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0" />

      {/* ─── [상품 정보] ─────────────────────────────── */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
          {item.title}
        </h4>
        {/* ─── [소계 금액] ───────────────────────────── */}
        {/* item.price * item.quantity를 표시합니다 */}
        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
          ${item.price}
        </p>

        {/* ─── [수량 조절 버튼] ──────────────────────── */}
        {/* [-] 버튼 → handleDecrease */}
        {/* 현재 수량 표시 */}
        {/* [+] 버튼 → handleIncrease */}
        <div className="flex items-center gap-2 mt-2">
          <button className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
            -
          </button>
          <span className="text-sm font-medium w-6 text-center">
            {item.quantity}
          </span>
          <button className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
            +
          </button>
        </div>
      </div>

      {/* ─── [삭제 버튼] ─────────────────────────────── */}
      {/* onClick에서 handleRemove 호출 */}
      <button className="self-start p-1 text-gray-400 hover:text-red-500 transition-colors">
        ✕
      </button>
    </div>
  );
});

export default CartItem;
