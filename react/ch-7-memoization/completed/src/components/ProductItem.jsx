import { memo } from "react";
import RenderCounter from "./RenderCounter";

// memo로 감싸서 product 객체의 참조가 변경되지 않으면 리렌더링 방지
// 200개의 상품 카드 중 변경되지 않은 카드는 리렌더링하지 않으므로 성능이 크게 향상됨
const ProductItem = memo(function ProductItem({ product }) {
  const {
    name,
    category,
    brand,
    price,
    discountedPrice,
    discount,
    rating,
    reviewCount,
    stock,
  } = product;

  const formattedPrice = price.toLocaleString("ko-KR");
  const formattedDiscountedPrice = discountedPrice.toLocaleString("ko-KR");

  // 별점을 시각적으로 표현
  const stars =
    "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));

  return (
    <div className="group rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
            {category}
          </span>
          <span className="ml-1 inline-block rounded-md bg-gray-50 px-2 py-0.5 text-xs text-gray-500">
            {brand}
          </span>
        </div>
        <RenderCounter label="Item" />
      </div>

      <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-800 group-hover:text-blue-600">
        {name}
      </h3>

      <div className="mb-2">
        {discount > 0 ? (
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-red-500">{discount}%</span>
            <span className="text-lg font-bold text-gray-900">
              {formattedDiscountedPrice}원
            </span>
            <span className="text-xs text-gray-400 line-through">
              {formattedPrice}원
            </span>
          </div>
        ) : (
          <span className="text-lg font-bold text-gray-900">
            {formattedPrice}원
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-yellow-500">{stars}</span>
        <span className="font-medium text-gray-700">{rating}</span>
        <span className="text-gray-400">({reviewCount.toLocaleString()})</span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3">
        <span
          className={`text-xs font-medium ${
            stock > 20
              ? "text-green-600"
              : stock > 0
                ? "text-orange-500"
                : "text-red-500"
          }`}
        >
          {stock > 20 ? "재고 충분" : stock > 0 ? `${stock}개 남음` : "품절"}
        </span>
        <button className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-600">
          장바구니
        </button>
      </div>
    </div>
  );
});

export default ProductItem;
