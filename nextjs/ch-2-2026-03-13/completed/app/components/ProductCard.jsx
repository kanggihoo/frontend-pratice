// 서버 컴포넌트 (기본값) — 카드 껍데기(UI 레이아웃)는 서버에서 렌더링합니다.
// 상호작용이 필요한 QuantityControl만 클라이언트 컴포넌트로 분리하여 주입합니다.
// 이것이 RSC/RCC 분리의 핵심 패턴입니다!

import QuantityControl from "./QuantityControl";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* 이미지 영역 — 서버에서 렌더링 (정적 콘텐츠) */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
          {product.category}
        </span>
      </div>

      {/* 상품 정보 영역 — 서버에서 렌더링 (정적 콘텐츠) */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-lg leading-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-sm font-medium text-gray-600">
              {product.rating}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-indigo-600">
            {product.price.toLocaleString()}원
          </span>
          <span className="text-xs text-gray-400">
            재고 {product.stock}개
          </span>
        </div>

        {/* 수량 조절 — 클라이언트 컴포넌트 (상호작용 필요) */}
        <QuantityControl stock={product.stock} />
      </div>
    </div>
  );
}
