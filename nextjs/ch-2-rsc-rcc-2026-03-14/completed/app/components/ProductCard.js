import QuantityControl from "./QuantityControl";
import RatingStars from "./RatingStars";

// ✅ 서버 컴포넌트 (기본값)
// 이 컴포넌트는 상품 정보를 "표시"하는 역할만 합니다.
// 상태나 이벤트 핸들러가 필요 없으므로 서버에서 렌더링합니다.
// → 장점: JS 번들에 포함되지 않아 클라이언트로 전송되는 코드 양이 줄어듭니다.

export default function ProductCard({ product }) {
  const formattedPrice = product.price.toLocaleString("ko-KR");

  return (
    <div
      className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-lg ${
        !product.inStock ? "opacity-60 grayscale" : ""
      }`}
    >
      {/* 상품 이미지 영역 */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 text-center">
        <span className="text-6xl" role="img" aria-label={product.name}>
          {product.image}
        </span>
      </div>

      {/* 상품 정보 영역 — 서버에서 렌더링되는 정적 콘텐츠 */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
          {!product.inStock && (
            <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
              품절
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* 별점 표시 — 서버 컴포넌트 (상호작용 없음) */}
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">
            ₩{formattedPrice}
          </p>
        </div>

        {/* 수량 조절 — 클라이언트 컴포넌트 (상호작용 필요!) */}
        {product.inStock && <QuantityControl productName={product.name} />}
      </div>
    </div>
  );
}
