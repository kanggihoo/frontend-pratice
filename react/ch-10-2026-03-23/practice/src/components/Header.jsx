// ─── [스토어 import] ─────────────────────────────────────────
// useCartStore를 import하세요.
// 힌트: import useCartStore from "../store/cartStore";


export default function Header({ onToggleCart }) {
  // ─── [Zustand selector 패턴] ─────────────────────────────
  // useCartStore에서 getTotalQuantity 함수를 가져오세요.
  // Zustand에서는 "(state) => state.원하는값" 형태의 selector를 사용합니다.
  // selector를 사용하면 해당 값이 변경될 때만 컴포넌트가 리렌더링됩니다.
  //
  // 힌트:
  // const getTotalQuantity = useCartStore((state) => state.getTotalQuantity);
  // const totalQuantity = getTotalQuantity();

  const totalQuantity = 0; // ← 이 줄을 위의 코드로 교체하세요

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          🛍️ Zustand 마켓
        </h1>

        {/* ─── [장바구니 버튼] ──────────────────────────────── */}
        {/* onToggleCart을 onClick에 연결하세요 */}
        {/* totalQuantity가 0보다 클 때만 배지를 보여주세요 */}
        <button
          className="relative bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          🛒 장바구니
          {/* ─── [배지 렌더링] ─────────────────────────────── */}
          {/* totalQuantity > 0 일 때 아래 span을 조건부 렌더링하세요 */}
          {/* 힌트: {totalQuantity > 0 && (<span>...</span>)} */}
        </button>
      </div>
    </header>
  );
}
