"use client";

// ⚡ 클라이언트 컴포넌트
// "use client" 지시어가 파일 최상단에 있어야 합니다.
// 이 컴포넌트는 useState를 사용하여 수량 상태를 관리하고,
// 버튼 클릭 이벤트를 처리해야 하므로 클라이언트에서 실행되어야 합니다.
//
// 💡 핵심 포인트:
// - "use client"는 이 파일과 이 파일이 import하는 모든 모듈을
//   클라이언트 번들에 포함시키라는 의미입니다.
// - 따라서 트리의 가장 말단(leaf)에서만 사용하는 것이 좋습니다.
// - ProductCard 전체를 "use client"로 만들면 불필요하게 많은 코드가
//   클라이언트로 전송됩니다. 상호작용이 필요한 이 부분만 분리합니다.

import { useState } from "react";

export default function QuantityControl({ productName }) {
  const [quantity, setQuantity] = useState(0);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(99, prev + 1));
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrease}
            disabled={quantity === 0}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-bold text-lg transition-colors hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={`${productName} 수량 감소`}
          >
            −
          </button>

          <span className="w-8 text-center text-lg font-semibold text-gray-900">
            {quantity}
          </span>

          <button
            onClick={handleIncrease}
            disabled={quantity === 99}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-500 text-white font-bold text-lg transition-colors hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={`${productName} 수량 증가`}
          >
            +
          </button>
        </div>

        {quantity > 0 && (
          <button className="px-4 py-1.5 bg-indigo-500 text-white text-sm font-medium rounded-full transition-colors hover:bg-indigo-600">
            담기
          </button>
        )}
      </div>
    </div>
  );
}
