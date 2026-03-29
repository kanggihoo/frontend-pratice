import Image from "next/image";

// ─── [Props 타입 정의] ─────────────────────────────────────────────
// TODO: ProductCardProps를 import하세요.
// import type { ProductCardProps } from "@/lib/types";

// ─── [React.ReactNode vs React.ReactElement] ───────────────────────
// badge?: React.ReactNode
//   → JSX, string, number, null, undefined, boolean 등 모두 허용
//   → "없어도 된다"는 의미를 ? 와 함께 표현
//
// 예:
//   <ProductCard product={p} badge={<Badge label="신상품" />} />  ← JSX
//   <ProductCard product={p} badge="NEW" />                       ← string도 가능
//   <ProductCard product={p} />                                   ← badge 없어도 가능

// TODO: Props에 타입 어노테이션을 추가하세요. (에러 발생 지점)
// 힌트: { product, badge }: ProductCardProps
export default function ProductCard({ product, badge }) {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="relative mb-3 overflow-hidden rounded-lg bg-gray-50">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={200}
          className="h-40 w-full object-cover"
        />
        {badge && (
          <div className="absolute top-2 right-2">{badge}</div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-800">
              품절
            </span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-xs text-gray-400">{product.category}</p>
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm text-gray-600">{product.rating}</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-bold text-gray-900">
            {product.price.toLocaleString()}원
          </span>
          {isLowStock && (
            <span className="text-xs text-orange-500 font-medium">
              잔여 {product.stock}개
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
