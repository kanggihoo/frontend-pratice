import { memo, useCallback } from "react";
import useCartStore from "../store/cartStore";
import useWishlistStore from "../store/wishlistStore";
import useUiStore from "../store/uiStore";
import useToastStore from "../store/toastStore";

// ─── [ProductCard 컴포넌트 - React.memo] ─────────────────
// React.memo로 감싸서 props(product)가 바뀌지 않으면 리렌더링을 방지합니다.
// 상품 목록이 수십~수백 개일 때 실질적인 성능 향상을 가져옵니다.
//
// memo() 사용법: const 컴포넌트 = memo(function 컴포넌트(props) { ... });

const ProductCard = memo(function ProductCard({ product }) {
  // ─── [Zustand 스토어 구독] ─────────────────────────────
  // 4개의 스토어에서 필요한 액션/상태를 구독합니다.
  //
  // 힌트:
  //   const addItem = useCartStore((state) => state.addItem);
  //   const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  //   const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  //   const setDetailProductId = useUiStore((state) => state.setDetailProductId);
  //   const addToast = useToastStore((state) => state.addToast);


  // ─── [장바구니 추가 핸들러 - useCallback] ──────────────
  // e.stopPropagation()으로 카드 클릭 이벤트(상세보기)와 분리합니다
  // addItem(product)으로 장바구니에 추가
  // addToast(`${product.title} 장바구니에 추가!`, "success")로 알림
  //
  // 힌트: useCallback((e) => { e.stopPropagation(); ... }, [addItem, product, addToast])


  // ─── [위시리스트 토글 핸들러 - useCallback] ─────────────
  // e.stopPropagation() 필수!
  // toggleWishlist(product) 호출
  // isInWishlist 여부에 따라 다른 토스트 메시지 표시


  // ─── [할인가 계산] ─────────────────────────────────────
  // product.discountPercentage가 있으면 할인가를 계산합니다
  // 힌트: (product.price * (1 - product.discountPercentage / 100)).toFixed(2)


  return (
    <div
      // ─── [카드 클릭 → 상세 모달] ──────────────────────
      // onClick에서 setDetailProductId(product.id)를 호출합니다
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
    >
      {/* ─── [이미지 영역] ────────────────────────────────── */}
      <div className="relative aspect-square bg-gray-50 dark:bg-gray-900 overflow-hidden">
        {/* img 태그: src={product.thumbnail}, loading="lazy" */}
        {/* group-hover:scale-105 transition-transform으로 호버 확대 효과 */}

        {/* ─── [할인 배지] ────────────────────────────── */}
        {/* product.discountPercentage > 0이면 좌상단에 빨간 배지 표시 */}
        {/* 예: -15% */}

        {/* ─── [위시리스트 버튼] ──────────────────────── */}
        {/* 우상단에 하트 버튼 배치 */}
        {/* isInWishlist이면 채워진 핑크 하트, 아니면 빈 하트 */}
        {/* onClick에서 handleToggleWishlist 호출 */}

        {/* ─── [품절 오버레이] ────────────────────────── */}
        {/* product.stock === 0이면 반투명 검정 오버레이 + "품절" 텍스트 */}
      </div>

      {/* ─── [정보 영역] ──────────────────────────────────── */}
      <div className="p-4">
        {/* 카테고리 */}
        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-1">
          {product.category}
        </p>

        {/* 상품명 (line-clamp-2로 2줄 제한) */}
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2 min-h-[2.5rem]">
          {product.title}
        </h3>

        {/* ─── [별점 표시] ────────────────────────────── */}
        {/* Array.from({ length: 5 }).map()으로 별 5개를 렌더링 */}
        {/* i < Math.round(product.rating)이면 노란색, 아니면 회색 */}

        {/* ─── [가격 + 장바구니 버튼] ─────────────────── */}
        <div className="flex items-center justify-between mt-2">
          {/* 가격: 할인가가 있으면 원가에 line-through, 할인가를 볼드로 */}
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ${product.price}
          </span>

          {/* 장바구니 추가 버튼 (+아이콘) */}
          {/* onClick에서 handleAddToCart 호출 */}
          {/* product.stock === 0이면 disabled */}
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
