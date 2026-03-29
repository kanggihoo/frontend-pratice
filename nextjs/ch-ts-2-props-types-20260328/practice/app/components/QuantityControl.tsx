"use client";

import { useState } from "react";

// ─── [Props 타입 정의] ─────────────────────────────────────────────
// TODO: QuantityControlProps를 import하세요.
// import type { QuantityControlProps } from "@/lib/types";

// ─── [이벤트 핸들러 타입] ─────────────────────────────────────────
// JavaScript: function handleClick() { ... }
// TypeScript:
//   버튼 클릭 → () => void
//   인풋 변경 → (e: React.ChangeEvent<HTMLInputElement>) => void
//   마우스 이벤트 → (e: React.MouseEvent<HTMLButtonElement>) => void
//
// onQuantityChange: (productId: number, quantity: number) => void
//   → 두 개의 인자를 받고, 반환값이 없는 함수

// TODO: Props에 타입 어노테이션을 추가하세요. (에러 발생 지점)
// 힌트: { productId, stock, onQuantityChange }: QuantityControlProps
export default function QuantityControl({ productId, stock, onQuantityChange }) {
  // TODO: useState에 제네릭 타입을 추가하세요.
  // 힌트: useState<number>(1)
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = stock === 0;

  // TODO: 반환 타입 void를 명시해보세요 (선택)
  // 힌트: const handleDecrease = (): void => { ... }
  const handleDecrease = () => {
    const next = Math.max(1, quantity - 1);
    setQuantity(next);
    onQuantityChange(productId, next);
  };

  const handleIncrease = () => {
    const next = Math.min(stock, quantity + 1);
    setQuantity(next);
    onQuantityChange(productId, next);
  };

  if (isOutOfStock) {
    return (
      <p className="mt-3 text-center text-sm text-gray-400">품절된 상품입니다</p>
    );
  }

  return (
    <div className="mt-3 flex items-center gap-2">
      <button
        onClick={handleDecrease}
        disabled={quantity <= 1}
        className="rounded border px-2 py-1 text-sm disabled:opacity-40"
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-medium">{quantity}</span>
      <button
        onClick={handleIncrease}
        disabled={quantity >= stock}
        className="rounded border px-2 py-1 text-sm disabled:opacity-40"
      >
        +
      </button>
      <span className="text-xs text-gray-400">/ {stock}개</span>
    </div>
  );
}
