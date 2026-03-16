// ─── [클라이언트 컴포넌트 선언] ──────────────────────────
// 이 컴포넌트는 +/- 버튼 클릭으로 수량(State)을 변경해야 합니다.
// useState 훅과 onClick 이벤트를 사용하므로 클라이언트 컴포넌트여야 합니다.
//
// 💡 핵심 포인트: 이 컴포넌트는 트리의 "말단(leaf)"에 위치합니다.
// 서버 컴포넌트인 ProductCard 안에 이 작은 클라이언트 컴포넌트만 주입함으로써,
// 클라이언트로 전송되는 JavaScript 번들 크기를 최소화합니다.
//
// 힌트: 파일의 가장 첫 줄에 "use client"; 를 추가하세요.
// ─────────────────────────────────────────────────────

// ─── [useState 임포트] ────────────────────────────────
// 힌트: import { useState } from "react";
// ─────────────────────────────────────────────────────

export default function QuantityControl({ stock }) {
  // ─── [수량 상태 선언] ──────────────────────────────────
  // 현재 수량을 추적할 상태를 선언하세요. 초기값은 0입니다.
  // 힌트: const [quantity, setQuantity] = useState(0);
  // ─────────────────────────────────────────────────────
  const quantity = 0; // ← 이 줄을 useState로 교체하세요

  const decrease = () => {
    // ─── [수량 감소 로직] ──────────────────────────────
    // 수량을 1 감소시키되, 0 미만으로 내려가지 않도록 하세요.
    // 힌트: setQuantity((prev) => Math.max(0, prev - 1));
    // ─────────────────────────────────────────────────
  };

  const increase = () => {
    // ─── [수량 증가 로직] ──────────────────────────────
    // 수량을 1 증가시키되, 재고(stock) 이상으로 올라가지 않도록 하세요.
    // 힌트: setQuantity((prev) => Math.min(stock, prev + 1));
    // ─────────────────────────────────────────────────
  };

  return (
    <div className="flex items-center gap-3">
      {/* ─── [감소 버튼] ──────────────────────────────────
          onClick에 decrease 함수를 연결하세요.
          quantity가 0일 때 disabled 상태로 만드세요.

          스타일 힌트:
          w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold text-lg
          flex items-center justify-center hover:bg-gray-200
          disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer
          ──────────────────────────────────────────────── */}
      <button className="">−</button>

      {/* ─── [수량 표시] ──────────────────────────────────
          quantity 상태값을 표시하세요.
          스타일 힌트: w-8 text-center font-semibold text-lg tabular-nums
          ──────────────────────────────────────────────── */}
      <span className="">{quantity}</span>

      {/* ─── [증가 버튼] ──────────────────────────────────
          onClick에 increase 함수를 연결하세요.
          quantity가 stock 이상일 때 disabled 상태로 만드세요.

          스타일 힌트:
          w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg
          flex items-center justify-center hover:bg-indigo-200
          disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer
          ──────────────────────────────────────────────── */}
      <button className="">+</button>
    </div>
  );
}
