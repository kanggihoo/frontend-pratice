import React from "react";
import type { Product } from "../types";

// 컴포넌트 Props 인터페이스 정의
interface ProductCardProps {
  product: Product;
  onClick?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  // 이벤트 핸들러: onClick prop이 전달된 경우 호출
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClick = (_e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(product.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-black/[0.05] transition-all hover:shadow-lg hover:-translate-y-1 ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
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
