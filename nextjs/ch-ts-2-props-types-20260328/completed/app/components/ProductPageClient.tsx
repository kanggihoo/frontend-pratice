"use client";

import { useState } from "react";
import type { Product, CartItem } from "@/lib/types";
import ProductList from "./ProductList";
import ProductCard from "./ProductCard";
import Badge from "./Badge";
import QuantityControl from "./QuantityControl";
import CartSummary from "./CartSummary";

// ─── 서버 컴포넌트 + 클라이언트 컴포넌트 분리 패턴 ────────────────
//
// page.tsx (서버 컴포넌트): 데이터 로딩, SEO, 초기 렌더링
// ProductPageClient.tsx (클라이언트): 상태(useState), 이벤트 핸들러
//
// Props 타입:
//   - 서버에서 클라이언트로 데이터 전달: interface로 명확하게 정의
//   - Product[] — 서버에서 가져온 상품 배열

interface ProductPageClientProps {
  products: Product[];
}

export default function ProductPageClient({ products }: ProductPageClientProps) {
  // useState<CartItem[]> — 제네릭으로 상태 타입 명시
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // (productId: number, quantity: number) => void
  const handleQuantityChange = (productId: number, quantity: number): void => {
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

  // () => void — 인자 없고 반환값 없음
  const handleClear = (): void => {
    setCartItems([]);
  };

  const inStockProducts = products.filter((p) => p.stock > 0);
  const outOfStockProducts = products.filter((p) => p.stock === 0);

  return (
    <div className="space-y-6">
      {/* CartSummary */}
      <CartSummary items={cartItems} onClear={handleClear} />

      {/* 재고 있는 상품 */}
      <ProductList
        title="판매 중인 상품"
        // headerAction: React.ReactElement — JSX 요소만 가능
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
              // badge: React.ReactNode — JSX, string 등 무엇이든 가능
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

      {/* 품절 상품 */}
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
