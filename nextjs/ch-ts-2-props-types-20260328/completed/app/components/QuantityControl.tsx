"use client";

import { useState } from "react";
import type { QuantityControlProps } from "@/lib/types";

// ─── 이벤트 핸들러 타입 ────────────────────────────────────────────
//
// JavaScript: function handleClick() { ... }
// TypeScript: 버튼 클릭 → () => void
//             인풋 변경 → (e: React.ChangeEvent<HTMLInputElement>) => void
//             마우스 이벤트 → (e: React.MouseEvent<HTMLButtonElement>) => void
//
// 이 컴포넌트에서 onQuantityChange는 부모로부터 받는 콜백 함수입니다.
// 타입: (productId: number, quantity: number) => void
//        ↑ 인자 두 개           ↑ 반환값 없음

export default function QuantityControl({
  productId,
  stock,
  onQuantityChange,
}: QuantityControlProps) {
  const [quantity, setQuantity] = useState<number>(1);

  const isOutOfStock = stock === 0;

  // () => void — 인자 없고 반환값 없는 함수
  const handleDecrease = (): void => {
    const next = Math.max(1, quantity - 1);
    setQuantity(next);
    onQuantityChange(productId, next);
  };

  const handleIncrease = (): void => {
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
