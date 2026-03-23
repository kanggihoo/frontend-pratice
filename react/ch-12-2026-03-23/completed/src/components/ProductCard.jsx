import { memo, useCallback } from "react";
import useCartStore from "../store/cartStore";
import useWishlistStore from "../store/wishlistStore";
import useUiStore from "../store/uiStore";
import useToastStore from "../store/toastStore";

// [아키텍처 결정] React.memo로 감싸서 props가 바뀌지 않으면 리렌더링을 방지합니다.
// 상품 목록이 수십~수백 개이므로 이 최적화가 실질적인 성능 향상을 가져옵니다.

const ProductCard = memo(function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const setDetailProductId = useUiStore((state) => state.setDetailProductId);
  const addToast = useToastStore((state) => state.addToast);

  // useCallback으로 이벤트 핸들러 메모이제이션
  const handleAddToCart = useCallback(
    (e) => {
      e.stopPropagation();
      addItem(product);
      addToast(`${product.title} 장바구니에 추가!`, "success");
    },
    [addItem, product, addToast]
  );

  const handleToggleWishlist = useCallback(
    (e) => {
      e.stopPropagation();
      toggleWishlist(product);
      addToast(
        isInWishlist
          ? `${product.title} 위시리스트에서 제거`
          : `${product.title} 위시리스트에 추가!`,
        isInWishlist ? "info" : "success"
      );
    },
    [toggleWishlist, product, isInWishlist, addToast]
  );

  const discountedPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div
      onClick={() => setDetailProductId(product.id)}
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
    >
      {/* 이미지 영역 */}
      <div className="relative aspect-square bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* 할인 배지 */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        {/* 위시리스트 버튼 */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow hover:bg-white dark:hover:bg-gray-800 transition-colors"
          aria-label="위시리스트"
        >
          <svg
            className={`w-4 h-4 ${
              isInWishlist ? "text-pink-500 fill-pink-500" : "text-gray-400"
            }`}
            fill={isInWishlist ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* 재고 부족 표시 */}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
            재고 {product.stock}개
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">품절</span>
          </div>
        )}
      </div>

      {/* 정보 영역 */}
      <div className="p-4">
        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2 min-h-[2.5rem]">
          {product.title}
        </h3>

        {/* 별점 */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.round(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-200 dark:text-gray-600"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {product.rating}
          </span>
        </div>

        {/* 가격 */}
        <div className="flex items-center justify-between">
          <div>
            {discountedPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  ${discountedPrice}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${product.price}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                ${product.price}
              </span>
            )}
          </div>

          {/* 장바구니 추가 버튼 */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            aria-label="장바구니 추가"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
