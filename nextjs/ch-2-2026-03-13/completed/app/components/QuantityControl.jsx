"use client";

// 클라이언트 컴포넌트 — +/- 버튼 클릭으로 수량 State를 변경하므로 "use client"가 필요합니다.
// 이 컴포넌트는 트리의 "말단(leaf)"에 위치하여 클라이언트 번들 크기를 최소화합니다.

import { useState } from "react";

export default function QuantityControl({ stock }) {
  const [quantity, setQuantity] = useState(0);

  const decrease = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const increase = () => {
    setQuantity((prev) => Math.min(stock, prev + 1));
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={decrease}
        disabled={quantity === 0}
        className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold text-lg flex items-center justify-center hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        −
      </button>
      <span className="w-8 text-center font-semibold text-lg tabular-nums">
        {quantity}
      </span>
      <button
        onClick={increase}
        disabled={quantity >= stock}
        className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg flex items-center justify-center hover:bg-indigo-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        +
      </button>
      {quantity > 0 && (
        <span className="text-xs text-indigo-600 font-medium ml-1">
          {(quantity * stock).toLocaleString()}개 가능 중 {quantity}개 선택
        </span>
      )}
    </div>
  );
}
