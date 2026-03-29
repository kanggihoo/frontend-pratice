"use client";

import { useState } from "react";
import ProductList from "./ProductList";
import ProductCard from "./ProductCard";
import Badge from "./Badge";
import QuantityControl from "./QuantityControl";
import CartSummary from "./CartSummary";

// ─── [서버 → 클라이언트 Props 타입] ───────────────────────────────
// TODO: Product, CartItem을 lib/types.ts에서 import하세요.
// import type { Product, CartItem } from "@/lib/types";

// TODO: ProductPageClientProps interface를 정의하세요.
// 힌트: products: Product[]
// interface ProductPageClientProps {
//   products: Product[];
// }

// TODO: Props에 타입 어노테이션을 추가하세요. (에러 발생 지점)
// 힌트: { products }: ProductPageClientProps
export default function ProductPageClient({ products }) {
  // ─── [useState 제네릭 타입] ─────────────────────────────────────
  // JavaScript: const [cartItems, setCartItems] = useState([]);
  // TypeScript: useState<CartItem[]>([]) — 제네릭으로 상태 타입 명시
  //
  // TODO: useState에 제네릭 타입을 추가하세요.
  // 힌트: useState<CartItem[]>([])
  const [cartItems, setCartItems] = useState([]);

  // TODO: 함수 매개변수와 반환 타입에 어노테이션을 추가하세요.
  // 힌트: (productId: number, quantity: number): void => { ... }
  const handleQuantityChange = (productId, quantity) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
      }
      return [
        ...prev,
        { productId, name: product.name, price: product.price, quantity },
      ];
    });
  };

  // TODO: 반환 타입 void를 명시해보세요.
  // 힌트: (): void => { ... }
  const handleClear = () => {
    setCartItems([]);
  };

  const inStockProducts = products.filter((p) => p.stock > 0);
  const outOfStockProducts = products.filter((p) => p.stock === 0);

  return (
    <div className="space-y-6">
      <CartSummary items={cartItems} onClear={handleClear} />

      <ProductList
        title="판매 중인 상품"
        headerAction={
          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">
            {inStockProducts.length}개 상품
          </span>
        }
      >
        {inStockProducts.map((product) => (
          <div key={product.id}>
            <ProductCard
              product={product}
              badge={
                product.stock <= 5 ? (
                  <Badge label="재고 부족" variant="warning" />
                ) : (
                  <Badge label="판매중" variant="success" />
                )
              }
            />
            <QuantityControl
              productId={product.id}
              stock={product.stock}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        ))}
      </ProductList>

      {outOfStockProducts.length > 0 && (
        <ProductList title="품절 상품">
          {outOfStockProducts.map((product) => (
            <div key={product.id} className="opacity-60">
              <ProductCard
                product={product}
                badge={<Badge label="품절" variant="danger" />}
              />
            </div>
          ))}
        </ProductList>
      )}
    </div>
  );
}
