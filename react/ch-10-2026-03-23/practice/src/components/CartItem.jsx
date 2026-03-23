// ─── [스토어 import] ─────────────────────────────────────────
// useCartStore와 useToastStore를 import하세요.


export default function CartItem({ item }) {
  // ─── [스토어에서 액션 가져오기] ─────────────────────────────
  // useCartStore에서 updateQuantity, removeItem 액션을 가져오세요.
  // useToastStore에서 addToast 액션을 가져오세요.
  //
  // 힌트:
  // const updateQuantity = useCartStore((state) => state.updateQuantity);
  // const removeItem = useCartStore((state) => state.removeItem);
  // const addToast = useToastStore((state) => state.addToast);


  // ─── [상품 제거 핸들러] ────────────────────────────────────
  // 1. removeItem(item.id)로 장바구니에서 제거
  // 2. addToast()로 제거 알림 표시 (type: "error")
  //
  // 힌트:
  // const handleRemove = () => {
  //   removeItem(item.id);
  //   addToast(`"${item.name}"을(를) 장바구니에서 제거했습니다.`, "error");
  // };


  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
      {/* 상품 이모지 */}
      <span className="text-3xl w-12 text-center">{item.image}</span>

      {/* 상품 정보 */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-800 truncate">
          {item.name}
        </h4>
        <p className="text-sm text-gray-500">
          {item.price.toLocaleString()}원
        </p>
      </div>

      {/* ─── [수량 조절 버튼] ──────────────────────────────── */}
      {/* - 버튼: updateQuantity(item.id, item.quantity - 1) */}
      {/* + 버튼: updateQuantity(item.id, item.quantity + 1) */}
      {/* 가운데에 현재 수량(item.quantity) 표시 */}
      <div className="flex items-center gap-2">
        <button
          // onClick에 수량 감소 로직 연결
          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-medium">
          {/* item.quantity 표시 */}
          0
        </span>
        <button
          // onClick에 수량 증가 로직 연결
          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
        >
          +
        </button>
      </div>

      {/* ─── [소계 표시] ──────────────────────────────────── */}
      {/* item.price * item.quantity를 toLocaleString()으로 표시하세요 */}
      <span className="text-sm font-bold text-gray-800 w-20 text-right">
        0원
      </span>

      {/* ─── [삭제 버튼] ──────────────────────────────────── */}
      {/* onClick에 handleRemove를 연결하세요 */}
      <button
        className="text-red-400 hover:text-red-600 transition-colors cursor-pointer text-lg"
      >
        ✕
      </button>
    </div>
  );
}
