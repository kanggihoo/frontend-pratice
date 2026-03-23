import { create } from "zustand";

// ─── [Zustand 스토어 생성] ─────────────────────────────────
// create() 함수를 사용하여 장바구니 스토어를 만드세요.
// create()에는 콜백 함수를 전달하며, 이 함수는 (set, get) 매개변수를 받습니다.
//   - set: 상태를 업데이트하는 함수
//   - get: 현재 상태를 읽는 함수
// 힌트: const useCartStore = create((set, get) => ({ ... }));

const useCartStore = create((set, get) => ({
  // ─── [초기 상태] ──────────────────────────────────────────
  // 장바구니 아이템을 담을 배열을 선언하세요.
  // 각 아이템은 { ...product, quantity } 형태입니다.
  // 힌트: items: [],


  // ─── [장바구니에 상품 추가 함수] ──────────────────────────
  // set()을 사용하여 상태를 업데이트하는 addItem 함수를 작성하세요.
  // 1. 이미 장바구니에 있는 상품이면 → quantity만 +1
  // 2. 새 상품이면 → { ...product, quantity: 1 }로 배열에 추가
  //
  // 힌트: set()에는 콜백 함수를 전달합니다.
  //   set((state) => ({ items: ... }))
  //
  // 기존 아이템 찾기: state.items.find(item => item.id === product.id)
  // 수량 증가: state.items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
  // 새 아이템 추가: [...state.items, { ...product, quantity: 1 }]


  // ─── [장바구니에서 상품 제거 함수] ─────────────────────────
  // productId를 받아서 해당 상품을 배열에서 제거하는 removeItem 함수를 작성하세요.
  // 힌트: filter()를 사용하여 해당 id가 아닌 아이템만 남깁니다.
  //   set((state) => ({ items: state.items.filter(...) }))


  // ─── [수량 변경 함수] ──────────────────────────────────────
  // productId와 quantity를 받아서 수량을 변경하는 updateQuantity 함수를 작성하세요.
  // 1. quantity가 0 이하이면 → 해당 상품을 배열에서 제거
  // 2. 그 외 → 해당 상품의 quantity를 새 값으로 업데이트
  // 힌트: map()으로 해당 아이템만 수정, filter()로 제거


  // ─── [장바구니 비우기 함수] ─────────────────────────────────
  // items를 빈 배열로 초기화하는 clearCart 함수를 작성하세요.
  // 힌트: set({ items: [] })


  // ─── [파생 상태: 총 수량 계산] ──────────────────────────────
  // get()을 사용하여 현재 items를 가져온 뒤, 모든 아이템의 quantity 합계를 반환하세요.
  // 힌트: get().items.reduce((total, item) => total + item.quantity, 0)
  // 이 함수는 컴포넌트에서 getTotalQuantity()로 호출합니다.


  // ─── [파생 상태: 총 금액 계산] ──────────────────────────────
  // get()을 사용하여 현재 items를 가져온 뒤, price * quantity의 합계를 반환하세요.
  // 힌트: get().items.reduce((total, item) => total + item.price * item.quantity, 0)

}));

export default useCartStore;
