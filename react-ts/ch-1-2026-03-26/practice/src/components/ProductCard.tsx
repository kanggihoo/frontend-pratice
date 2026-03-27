import React from "react";
import type { Product } from "../types";

// ─── [Props 인터페이스] ──────────────────────────────
// ProductCardProps 인터페이스를 정의하세요.
// product 속성은 Product 타입이어야 하고,
// onClick 속성은 선택적(optional)이며, productId(number)를 받아 반환값이 없는(void) 함수여야 합니다.
interface ProductCardProps {
  product: Product;
  onClick?: (productId: number) => void;
}

// ─── [컴포넌트 정의] ─────────────────────────────────
// React.FC를 사용하여 ProductCard를 설계하세요.
// 제네릭에 ProductCardProps를 넘겨주고, 구조 분해 할당({ product, onClick })으로 Props를 받아옵니다.
const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  // ─── [이벤트 핸들러 타입] ──────────────────────────────
  // div 요소 클릭 이벤트의 타입을 React.MouseEvent<HTMLDivElement> 로 지정하세요.
  const handleClick = () => {
    if (onClick) {
      onClick(product.id);
    }
    // onClick 함수가 전달되었다면, product의 id를 넘겨 호출하세요.
  };

  return (
    <div
      // onClick에 이벤트 핸들러를 연결하세요.
      onClick={handleClick}
      // Tailwind CSS 클래스를 완성하여 스타일을 적용하세요.
      // (onClick이 있을 때만 cursor-pointer 클래스 추가하는 조건부 로직 예시)
      className={`border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-black/[0.05] transition-all hover:shadow-lg hover:-translate-y-1 ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <img
          // product의 정보들을 활용하여 src와 alt를 채워주세요.
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* ─── [조건부 렌더링] ─────────────────────── */}
        {/* product가 재고가 없을(inStock이 false) 경우에만 'Sold Out' 태그를 렌더링하세요. */}
        {!product.inStock && (
          <div className="absolute top-2 right-2 rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white shadow-sm">
            Sold Out
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 text-xs font-medium text-primary-600 bg-primary-50 inline-block px-2 py-1 rounded-full">
          {product.category}
        </div>
        <h3 className="mb-2 text-lg font-bold text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xl font-bold text-gray-900">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
