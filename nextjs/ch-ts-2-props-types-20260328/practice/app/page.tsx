// 서버 컴포넌트 — 타입 어노테이션 없이도 Next.js가 실행됩니다.
// lib/types.ts를 완성하면 아래에서 타입을 import해 보세요.
import { mockProducts } from "@/data/mockData";
import ProductPageClient from "./components/ProductPageClient";

// ─── [서버 컴포넌트 반환 타입] ────────────────────────────────────
// JavaScript: export default function Home() { ... }
// TypeScript: async 서버 컴포넌트는 Promise<JSX.Element>를 반환하지만
//             TypeScript가 자동으로 추론하므로 명시하지 않아도 됩니다.
//
// 선택 도전: 아래 함수에 반환 타입을 명시해보세요.
// export default function Home(): JSX.Element { ... }

export default function Home() {
  const products = mockProducts;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">상품 목록</h1>
        <p className="mt-1 text-gray-500">
          2회차 실습 — lib/types.ts에서 타입을 정의하고 각 컴포넌트에 적용해보세요
        </p>
      </div>

      {/* ProductPageClient에 products를 전달합니다 */}
      {/* lib/types.ts 완성 후 타입 에러가 사라지는 것을 확인하세요 */}
      <ProductPageClient products={products} />
    </main>
  );
}
