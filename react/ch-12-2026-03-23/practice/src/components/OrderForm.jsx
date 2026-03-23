import { useRef, useState } from "react";
import useCartStore from "../store/cartStore";
import useUiStore from "../store/uiStore";
import useToastStore from "../store/toastStore";

// ─── [OrderForm 컴포넌트] ─────────────────────────────────
// 주문 폼 모달입니다.
// useRef로 폼 필드에 접근하여 유효성 검사 실패 시 포커스를 이동합니다.
// 이것은 "비제어 컴포넌트" 패턴입니다 (value/onChange 없이 ref로 값을 읽음).

export default function OrderForm() {
  // ─── [Zustand 스토어 구독] ─────────────────────────────
  // 힌트:
  //   const orderFormOpen = useUiStore((state) => state.orderFormOpen);
  //   const setOrderFormOpen = useUiStore((state) => state.setOrderFormOpen);
  //   const setCartOpen = useUiStore((state) => state.setCartOpen);
  //   const items = useCartStore((state) => state.items);
  //   const getTotalPrice = useCartStore((state) => state.getTotalPrice());
  //   const clearCart = useCartStore((state) => state.clearCart);
  //   const addToast = useToastStore((state) => state.addToast);


  // ─── [useRef로 폼 필드 참조] ──────────────────────────
  // 각 입력 필드에 대한 ref를 생성합니다.
  // 유효성 검사 실패 시 해당 ref의 current.focus()로 포커스를 이동합니다.
  //
  // 힌트:
  //   const nameRef = useRef(null);
  //   const emailRef = useRef(null);
  //   const phoneRef = useRef(null);
  //   const addressRef = useRef(null);


  // ─── [에러 상태 & 제출 중 상태] ────────────────────────
  // 힌트:
  //   const [errors, setErrors] = useState({});
  //   const [isSubmitting, setIsSubmitting] = useState(false);


  // ─── [유효성 검사 함수] ────────────────────────────────
  // 1. 각 ref의 current.value.trim()으로 값을 읽습니다
  // 2. 비어있으면 에러 메시지를 errors 객체에 추가
  // 3. 이메일 형식 검사: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  // 4. 연락처 형식 검사: /^[\d-]{10,}$/.test(phone)
  // 5. 에러가 있으면 첫 번째 에러 필드에 focus()
  // 6. 에러가 없으면 true 반환
  //
  // const validate = () => {
  //   const newErrors = {};
  //   const name = nameRef.current.value.trim();
  //   ...
  //   if (!name) newErrors.name = "이름을 입력해주세요.";
  //   ...
  //   setErrors(newErrors);
  //   if (Object.keys(newErrors).length > 0) {
  //     // 첫 번째 에러 필드에 포커스
  //     return false;
  //   }
  //   return true;
  // };


  // ─── [폼 제출 핸들러] ──────────────────────────────────
  // 1. e.preventDefault()로 기본 제출 방지
  // 2. validate()가 false면 return
  // 3. setIsSubmitting(true)
  // 4. 1.5초 딜레이로 API 호출 시뮬레이션
  //    await new Promise(resolve => setTimeout(resolve, 1500))
  // 5. clearCart()으로 장바구니 비우기
  // 6. 모달과 패널 닫기
  // 7. addToast("주문이 완료되었습니다!", "success")
  //
  // const handleSubmit = async (e) => { ... };


  // ─── [모달 표시 조건] ──────────────────────────────────
  // orderFormOpen이 false이면 null 반환
  // if (!orderFormOpen) return null;
  return null; // 이 줄을 위 null 체크 + 아래 JSX로 교체하세요

  // return (
  //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
  //        onClick={() => !isSubmitting && setOrderFormOpen(false)}>
  //     <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
  //          onClick={(e) => e.stopPropagation()}>
  //
  //       {/* 헤더: "주문 정보" + 닫기 버튼 */}
  //
  //       <form onSubmit={handleSubmit}>
  //         {/* 주문 요약: items.map()으로 상품명 x수량, 소계 표시 */}
  //         {/* 총 합계: getTotalPrice.toFixed(2) */}
  //
  //         {/* 이름 입력 필드: ref={nameRef} */}
  //         {/* 에러 시 border-red-500 + 에러 메시지 표시 */}
  //
  //         {/* 이메일 입력 필드: ref={emailRef} */}
  //         {/* 연락처 입력 필드: ref={phoneRef} */}
  //         {/* 배송 주소 입력 필드: ref={addressRef} (textarea) */}
  //
  //         {/* 제출 버튼 */}
  //         {/* isSubmitting이면 로딩 스피너 + "주문 처리 중..." */}
  //         {/* 아니면 "${합계}달러 결제하기" */}
  //       </form>
  //     </div>
  //   </div>
  // );
}
