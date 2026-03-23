import { useState, useCallback } from "react";
import { useProductDetail } from "../hooks/useProductQueries";
import useCartStore from "../store/cartStore";
import useWishlistStore from "../store/wishlistStore";
import useUiStore from "../store/uiStore";
import useToastStore from "../store/toastStore";
import LoadingSpinner from "./LoadingSpinner";

// ─── [ProductDetail 컴포넌트] ─────────────────────────────
// 상품 상세 정보를 모달로 표시합니다.
// detailProductId가 null이 아닐 때만 렌더링됩니다.
// useProductDetail 훅으로 상품 상세 데이터를 가져옵니다.

export default function ProductDetail() {
  // ─── [Zustand 스토어 구독] ─────────────────────────────
  // 힌트:
  //   const detailProductId = useUiStore((state) => state.detailProductId);
  //   const setDetailProductId = useUiStore((state) => state.setDetailProductId);
  //   const addItem = useCartStore((state) => state.addItem);
  //   const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  //   const isInWishlist = useWishlistStore((state) =>
  //     detailProductId ? state.isInWishlist(detailProductId) : false
  //   );
  //   const addToast = useToastStore((state) => state.addToast);


  // ─── [이미지 선택 상태] ────────────────────────────────
  // 상품에 여러 이미지가 있을 때 선택된 이미지 인덱스를 관리합니다
  // 힌트: const [selectedImage, setSelectedImage] = useState(0);


  // ─── [TanStack Query로 상품 상세 데이터 가져오기] ───────
  // 힌트: const { data: product, isLoading, isError } = useProductDetail(detailProductId);


  // ─── [장바구니 추가 핸들러] ─────────────────────────────
  // useCallback으로 메모이제이션
  // addItem(product) → addToast(메시지, "success")


  // ─── [위시리스트 토글 핸들러] ──────────────────────────
  // useCallback으로 메모이제이션
  // toggleWishlist(product) → 상태에 따른 토스트


  // ─── [null 체크] ──────────────────────────────────────
  // detailProductId가 null이면 아무것도 렌더링하지 않습니다
  // if (!detailProductId) return null;
  return null; // 이 줄을 위 null 체크 + 아래 JSX로 교체하세요

  // ─── [모달 레이아웃] ──────────────────────────────────
  // 1. 배경 오버레이: fixed inset-0 bg-black/50 backdrop-blur-sm
  //    - 오버레이 클릭 시 setDetailProductId(null)로 모달 닫기
  // 2. 모달 컨테이너: bg-white rounded-2xl shadow-2xl max-w-3xl
  //    - e.stopPropagation()으로 모달 내부 클릭 시 닫기 방지
  // 3. 좌측: 이미지 영역 (메인 이미지 + 썸네일 목록)
  // 4. 우측: 상품 정보 (브랜드, 제목, 별점, 설명, 가격, 재고)
  // 5. 액션 버튼: 장바구니 담기 + 위시리스트 토글
  // 6. 추가 정보: 브랜드, 보증, 배송 정보

  // return (
  //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
  //        onClick={() => setDetailProductId(null)}>
  //     <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
  //          onClick={(e) => e.stopPropagation()}>
  //       {/* isLoading이면 LoadingSpinner */}
  //       {/* isError이면 에러 메시지 */}
  //       {/* product가 있으면 상세 정보 렌더링 */}
  //     </div>
  //   </div>
  // );
}
