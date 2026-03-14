// ─── [서버 컴포넌트 vs 클라이언트 컴포넌트 결정하기] ───────
// 질문: 이 ProductCard 컴포넌트는 서버 컴포넌트일까요, 클라이언트 컴포넌트일까요?
//
// 생각해보세요:
// - 이 컴포넌트는 상품 정보를 "표시"하는 역할입니다.
// - useState, useEffect 같은 훅을 사용하나요? → 아니요!
// - 버튼 클릭 같은 이벤트 핸들러가 있나요? → 이 컴포넌트 자체에는 없습니다!
// - 결론: "use client"가 필요 없습니다 = 서버 컴포넌트로 유지합니다.
//
// 💡 핵심: 상호작용이 필요한 부분(수량 조절)은 별도의 클라이언트 컴포넌트로 분리합니다.

// ─── [컴포넌트 Import] ──────────────────────────────────
// 힌트: QuantityControl과 RatingStars 컴포넌트를 import하세요.
// import QuantityControl from "./QuantityControl";
// import RatingStars from "./RatingStars";

export default function ProductCard({ product }) {
  // ─── [가격 포맷팅] ────────────────────────────────────
  // 힌트: toLocaleString을 사용하여 가격에 천 단위 쉼표를 추가하세요.
  // const formattedPrice = product.price.toLocaleString("ko-KR");

  return (
    // ─── [카드 컨테이너 스타일링] ────────────────────────
    // 힌트: 카드 스타일을 Tailwind로 적용하세요.
    // - 기본: bg-white, rounded-2xl, shadow-md, border, border-gray-100, overflow-hidden
    // - 호버 효과: hover:shadow-lg, transition-all, duration-200
    // - 품절 시: opacity-60, grayscale (product.inStock으로 조건부 적용)
    <div>
      {/* ─── [상품 이미지 영역] ────────────────────────── */}
      {/* 힌트: 그라데이션 배경에 이모지를 크게 표시하세요.         */}
      {/* Tailwind: bg-gradient-to-br, from-indigo-50, to-purple-50 */}
      {/*           p-8, text-center, text-6xl                      */}
      <div>
        <span>{product.image}</span>
      </div>

      {/* ─── [상품 정보 영역] ──────────────────────────── */}
      <div className="p-5">
        {/* ─── [카테고리 뱃지] ──────────────────────────── */}
        {/* 힌트: 카테고리를 작은 뱃지 형태로 표시하세요.           */}
        {/* Tailwind: text-xs, font-medium, text-indigo-600,       */}
        {/*           bg-indigo-50, px-2, py-0.5, rounded-full     */}
        <div className="flex items-center justify-between mb-1">
          <span>{product.category}</span>
          {/* 품절일 때 "품절" 뱃지도 표시하세요 (조건부 렌더링) */}
        </div>

        {/* ─── [상품명과 설명] ──────────────────────────── */}
        {/* 힌트: 상품명은 크고 굵게, 설명은 작고 회색으로           */}
        {/* Tailwind 상품명: text-lg, font-bold, text-gray-900     */}
        {/* Tailwind 설명: text-sm, text-gray-500, line-clamp-2    */}
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        {/* ─── [별점 컴포넌트] ──────────────────────────── */}
        {/* 힌트: RatingStars 컴포넌트를 렌더링하세요.              */}
        {/* <RatingStars rating={product.rating} reviewCount={product.reviewCount} /> */}

        {/* ─── [가격 표시] ────────────────────────────────── */}
        {/* 힌트: 포맷팅된 가격을 표시하세요. ₩ 기호를 붙이세요.    */}
        {/* Tailwind: text-xl, font-bold, text-gray-900            */}
        <div className="mt-3">
          <p>가격이 여기에 표시됩니다.</p>
        </div>

        {/* ─── [수량 조절 컴포넌트] ────────────────────── */}
        {/* 힌트: 재고가 있을 때만(product.inStock) QuantityControl을 렌더링하세요. */}
        {/* 이것이 바로 "클라이언트 컴포넌트를 트리 말단에 배치"하는 핵심 패턴입니다! */}
        {/* {product.inStock && <QuantityControl productName={product.name} />} */}
      </div>
    </div>
  );
}
