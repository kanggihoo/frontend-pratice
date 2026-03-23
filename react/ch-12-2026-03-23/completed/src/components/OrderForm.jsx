import { useRef, useState } from "react";
import useCartStore from "../store/cartStore";
import useUiStore from "../store/uiStore";
import useToastStore from "../store/toastStore";

// [아키텍처 결정] useRef로 폼 필드에 직접 접근하여 유효성 검사 실패 시
// 해당 필드에 포커스를 이동합니다 (비제어 컴포넌트 패턴).
// 실제 주문 API는 없으므로 주문 완료를 시뮬레이션합니다.

export default function OrderForm() {
  const orderFormOpen = useUiStore((state) => state.orderFormOpen);
  const setOrderFormOpen = useUiStore((state) => state.setOrderFormOpen);
  const setCartOpen = useUiStore((state) => state.setCartOpen);
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  const addToast = useToastStore((state) => state.addToast);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const address = addressRef.current.value.trim();

    if (!name) newErrors.name = "이름을 입력해주세요.";
    if (!email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (!phone) {
      newErrors.phone = "연락처를 입력해주세요.";
    } else if (!/^[\d-]{10,}$/.test(phone)) {
      newErrors.phone = "올바른 연락처를 입력해주세요.";
    }
    if (!address) newErrors.address = "배송 주소를 입력해주세요.";

    setErrors(newErrors);

    // 첫 번째 에러 필드에 포커스
    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.keys(newErrors)[0];
      const refMap = { name: nameRef, email: emailRef, phone: phoneRef, address: addressRef };
      refMap[firstError]?.current?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // 주문 API 시뮬레이션 (1.5초 딜레이)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    clearCart();
    setOrderFormOpen(false);
    setCartOpen(false);
    setIsSubmitting(false);
    addToast("주문이 완료되었습니다! 감사합니다.", "success");
  };

  if (!orderFormOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={() => !isSubmitting && setOrderFormOpen(false)}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              주문 정보
            </h2>
            <button
              onClick={() => setOrderFormOpen(false)}
              disabled={isSubmitting}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* 주문 요약 */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              주문 상품 {items.length}종
            </p>
            <div className="space-y-1">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300 truncate mr-2">
                    {item.title} x{item.quantity}
                  </span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                총 합계
              </span>
              <span className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
                ${getTotalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* 이름 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              이름 *
            </label>
            <input
              ref={nameRef}
              type="text"
              placeholder="홍길동"
              className={`w-full px-4 py-2.5 border rounded-xl text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              이메일 *
            </label>
            <input
              ref={emailRef}
              type="email"
              placeholder="example@email.com"
              className={`w-full px-4 py-2.5 border rounded-xl text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* 연락처 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              연락처 *
            </label>
            <input
              ref={phoneRef}
              type="tel"
              placeholder="010-1234-5678"
              className={`w-full px-4 py-2.5 border rounded-xl text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                errors.phone
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* 배송 주소 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              배송 주소 *
            </label>
            <textarea
              ref={addressRef}
              rows={3}
              placeholder="서울시 강남구..."
              className={`w-full px-4 py-2.5 border rounded-xl text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none ${
                errors.address
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">{errors.address}</p>
            )}
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                주문 처리 중...
              </>
            ) : (
              `${getTotalPrice.toFixed(2)}달러 결제하기`
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
