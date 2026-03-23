import { useState, useCallback } from "react";
import { useProductDetail } from "../hooks/useProductQueries";
import useCartStore from "../store/cartStore";
import useWishlistStore from "../store/wishlistStore";
import useUiStore from "../store/uiStore";
import useToastStore from "../store/toastStore";
import LoadingSpinner from "./LoadingSpinner";

export default function ProductDetail() {
  const detailProductId = useUiStore((state) => state.detailProductId);
  const setDetailProductId = useUiStore((state) => state.setDetailProductId);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) =>
    detailProductId ? state.isInWishlist(detailProductId) : false
  );
  const addToast = useToastStore((state) => state.addToast);

  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading, isError } = useProductDetail(detailProductId);

  const handleAddToCart = useCallback(() => {
    if (product) {
      addItem(product);
      addToast(`${product.title} 장바구니에 추가!`, "success");
    }
  }, [addItem, product, addToast]);

  const handleToggleWishlist = useCallback(() => {
    if (product) {
      toggleWishlist(product);
      addToast(
        isInWishlist
          ? `${product.title} 위시리스트에서 제거`
          : `${product.title} 위시리스트에 추가!`,
        isInWishlist ? "info" : "success"
      );
    }
  }, [toggleWishlist, product, isInWishlist, addToast]);

  if (!detailProductId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={() => setDetailProductId(null)}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && (
          <div className="p-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {isError && (
          <div className="p-12 text-center text-red-500">
            상품 정보를 불러올 수 없습니다.
          </div>
        )}

        {product && (
          <div className="md:flex">
            {/* 이미지 영역 */}
            <div className="md:w-1/2 p-6">
              <div className="relative aspect-square bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden mb-3">
                <img
                  src={product.images?.[selectedImage] || product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
              {product.images?.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${
                        selectedImage === i
                          ? "border-indigo-600"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 정보 영역 */}
            <div className="md:w-1/2 p-6">
              {/* 닫기 버튼 */}
              <div className="flex justify-end mb-2 md:mb-0">
                <button
                  onClick={() => setDetailProductId(null)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wide">
                {product.brand || product.category}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1 mb-2">
                {product.title}
              </h2>

              {/* 별점 */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
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
                <span className="text-sm text-gray-500">{product.rating} / 5</span>
              </div>

              {/* 설명 */}
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* 가격 */}
              <div className="mb-6">
                {product.discountPercentage > 0 ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      $
                      {(
                        product.price *
                        (1 - product.discountPercentage / 100)
                      ).toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ${product.price}
                    </span>
                    <span className="text-sm font-semibold text-red-500 bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded">
                      -{Math.round(product.discountPercentage)}%
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    ${product.price}
                  </span>
                )}
              </div>

              {/* 재고 */}
              <p
                className={`text-sm mb-6 ${
                  product.stock > 5
                    ? "text-green-600 dark:text-green-400"
                    : product.stock > 0
                      ? "text-orange-500"
                      : "text-red-500"
                }`}
              >
                {product.stock > 5
                  ? `재고 있음 (${product.stock}개)`
                  : product.stock > 0
                    ? `재고 ${product.stock}개 남음`
                    : "품절"}
              </p>

              {/* 액션 버튼들 */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  장바구니 담기
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`p-3 rounded-xl border-2 transition-colors ${
                    isInWishlist
                      ? "border-pink-500 bg-pink-50 dark:bg-pink-900/30"
                      : "border-gray-200 dark:border-gray-600 hover:border-pink-300"
                  }`}
                >
                  <svg
                    className={`w-6 h-6 ${
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
              </div>

              {/* 추가 정보 */}
              {(product.brand || product.warrantyInformation || product.shippingInformation) && (
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 space-y-2">
                  {product.brand && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">브랜드</span>
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        {product.brand}
                      </span>
                    </div>
                  )}
                  {product.warrantyInformation && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">보증</span>
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        {product.warrantyInformation}
                      </span>
                    </div>
                  )}
                  {product.shippingInformation && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">배송</span>
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        {product.shippingInformation}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
