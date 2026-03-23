import { memo, useCallback } from "react";
import useCartStore from "../store/cartStore";

// [성능 최적화] 개별 장바구니 아이템도 React.memo로 감싸서
// 다른 아이템의 수량 변경 시 불필요한 리렌더링을 방지합니다.

const CartItem = memo(function CartItem({ item }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleIncrease = useCallback(() => {
    updateQuantity(item.id, item.quantity + 1);
  }, [updateQuantity, item.id, item.quantity]);

  const handleDecrease = useCallback(() => {
    updateQuantity(item.id, item.quantity - 1);
  }, [updateQuantity, item.id, item.quantity]);

  const handleRemove = useCallback(() => {
    removeItem(item.id);
  }, [removeItem, item.id]);

  return (
    <div className="flex gap-3 py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
      {/* 썸네일 */}
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-16 h-16 rounded-lg object-cover bg-gray-50 dark:bg-gray-900 shrink-0"
      />

      {/* 정보 */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
          {item.title}
        </h4>
        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        {/* 수량 조절 */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleDecrease}
            className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm transition-colors"
          >
            -
          </button>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* 삭제 버튼 */}
      <button
        onClick={handleRemove}
        className="self-start p-1 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="삭제"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
});

export default CartItem;
