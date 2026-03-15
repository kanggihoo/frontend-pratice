// ─── [서버 컴포넌트 vs 클라이언트 컴포넌트 결정하기] ───────

// 생각해보세요:
// - 이 컴포넌트는 상품 정보를 "표시"하는 역할입니다.
// - useState, useEffect 같은 훅을 사용하나요? → 아니요!
// - 버튼 클릭 같은 이벤트 핸들러가 있나요? → 이 컴포넌트 자체에는 없습니다!
// - 결론: "use client"가 필요 없습니다 = 서버 컴포넌트로 유지합니다.
// 💡 핵심: 상호작용이 필요한 부분(수량 조절)은 별도의 클라이언트 컴포넌트로 분리합니다.

import QuantityControl from "./QuantityControl";
import RatingStars from "./RatingStars";

export default function ProductCard({ product }) {
  // ─── [가격 포맷팅] ────────────────────────────────────
  // 힌트: toLocaleString을 사용하여 가격에 천 단위 쉼표를 추가하세요.
  const formattedPrice = product.price.toLocaleString("ko-KR");

  return (
    // ─── [카드 컨테이너 스타일링] ────────────────────────
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
        {/* ─── [카테고리 뱃지] ──────────────────────────── */}
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

        {/* ─── [상품명과 설명] ──────────────────────────── */}
        <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* ─── [별점 컴포넌트] ──────────────────────────── */}
        <RatingStars
          rating={product.rating}
          reviewCount={product.reviewCount}
        />

        {/* ─── [가격 표시] ────────────────────────────────── */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">₩{formattedPrice}</p>
        </div>

        {/* 수량 조절 — 클라이언트 컴포넌트 (상호작용 필요!) */}
        {/* 이것이 바로 "클라이언트 컴포넌트를 트리 말단에 배치"하는 핵심 패턴입니다! */}
        {product.inStock && <QuantityControl productName={product.name} />}
      </div>
    </div>
  );
}
