"use client";

// ─── [Props 타입 정의] ─────────────────────────────────────────────
// TODO: CartSummaryProps를 import하세요.
import { CartItem } from "@/lib/types";
export interface CartSummaryProps {
  items: CartItem[];
  onClear: () => void;
}

// ─── [Props 타입 분리 원칙] ───────────────────────────────────────
// JavaScript: function CartSummary({ items, onClear }) { ... }
// TypeScript:
//   1. lib/types.ts에 CartItem, CartSummaryProps interface 정의
//   2. 컴포넌트 함수에 타입 어노테이션 적용
//
// onClear: () => void
//   → "인자 없이 호출되고, 아무것도 반환하지 않는 함수"
//   → void는 "반환값을 사용하지 않겠다"는 의미

// TODO: Props에 타입 어노테이션을 추가하세요. (에러 발생 지점)
// 힌트: { items, onClear }: CartSummaryProps
export default function CartSummary({ items, onClear }: CartSummaryProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-400">
        선택된 상품이 없습니다
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">선택 내역</h3>
        <button
          onClick={onClear}
          className="text-xs text-gray-400 hover:text-red-500"
        >
          초기화
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.productId} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.name} × {item.quantity}
            </span>
            <span className="font-medium text-gray-900">
              {(item.price * item.quantity).toLocaleString()}원
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 border-t pt-3 flex justify-between font-semibold">
        <span>합계</span>
        <span className="text-blue-600">{total.toLocaleString()}원</span>
      </div>
    </div>
  );
}
