// ─── [클라이언트 컴포넌트 선언] ──────────────────────────
// ⚡ 이 컴포넌트는 반드시 클라이언트 컴포넌트여야 합니다!
//
// 이유:
// 1. useState를 사용하여 수량 상태를 관리합니다.
// 2. 버튼의 onClick 이벤트를 처리합니다.
// → 이 두 가지는 브라우저(클라이언트)에서만 동작합니다.
//
// 힌트: 파일 최상단에 "use client"; 지시어를 추가하세요.
// "use client"는 반드시 파일의 첫 번째 줄에 와야 합니다!
//
// 💡 핵심 포인트:
// "use client"는 이 파일부터 시작되는 컴포넌트 트리를
// 클라이언트 번들에 포함시키라는 의미입니다.
// 따라서 트리의 가장 말단(leaf)에서만 사용하는 것이 좋습니다.
// ProductCard 전체를 "use client"로 만들면 불필요하게 많은 코드가
// 클라이언트로 전송됩니다.

// ─── [React 훅 Import] ──────────────────────────────────
// 힌트: useState를 import하세요.
// import { useState } from "react";

export default function QuantityControl({ productName }) {
  // ─── [상태 선언] ──────────────────────────────────────
  // 힌트: 수량을 관리할 state를 선언하세요. 초기값은 0입니다.
  // const [quantity, setQuantity] = useState(0);

  // ─── [수량 감소 핸들러] ────────────────────────────────
  // 힌트: 수량이 0 미만이 되지 않도록 Math.max를 사용하세요.
  // const handleDecrease = () => {
  //   setQuantity((prev) => Math.max(0, prev - 1));
  // };

  // ─── [수량 증가 핸들러] ────────────────────────────────
  // 힌트: 수량이 99를 넘지 않도록 Math.min을 사용하세요.
  // const handleIncrease = () => {
  //   setQuantity((prev) => Math.min(99, prev + 1));
  // };

  return (
    // ─── [수량 조절 UI] ──────────────────────────────────
    // 힌트: - (감소) 버튼, 수량 표시, + (증가) 버튼을 만드세요.
    //
    // 감소 버튼 스타일:
    //   w-8 h-8 flex items-center justify-center rounded-full
    //   bg-gray-100 text-gray-600 font-bold text-lg
    //   hover:bg-gray-200
    //   disabled:opacity-40 disabled:cursor-not-allowed
    //   → disabled 조건: quantity === 0
    //
    // 수량 표시:
    //   w-8 text-center text-lg font-semibold text-gray-900
    //
    // 증가 버튼 스타일:
    //   w-8 h-8 flex items-center justify-center rounded-full
    //   bg-indigo-500 text-white font-bold text-lg
    //   hover:bg-indigo-600
    //   disabled:opacity-40 disabled:cursor-not-allowed
    //   → disabled 조건: quantity === 99
    //
    // "담기" 버튼 (quantity > 0일 때만 표시):
    //   px-4 py-1.5 bg-indigo-500 text-white text-sm font-medium
    //   rounded-full hover:bg-indigo-600
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* 감소 버튼 */}
          <button>−</button>

          {/* 수량 표시 */}
          <span>0</span>

          {/* 증가 버튼 */}
          <button>+</button>
        </div>

        {/* "담기" 버튼 — quantity > 0일 때만 표시 */}
      </div>
    </div>
  );
}
