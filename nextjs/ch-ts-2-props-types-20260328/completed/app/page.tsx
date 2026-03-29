// 서버 컴포넌트 — 데이터 로딩은 여기서
import { mockProducts } from "@/data/mockData";
import ProductPageClient from "./components/ProductPageClient";

// ─── 서버 컴포넌트의 반환 타입 ─────────────────────────────────────
//
// JavaScript: export default function Home() { ... }
// TypeScript: async 서버 컴포넌트는 Promise<JSX.Element>를 반환하지만
//             TypeScript가 자동으로 추론하므로 명시하지 않아도 됩니다.
//
// export default async function Home(): Promise<JSX.Element> { ... }
//   ↑ 명시적으로 쓸 수도 있지만, 추론에 맡기는 것이 일반적

export default function Home() {
  // 서버에서 데이터를 가져와 클라이언트 컴포넌트에 Props로 전달
  // mockProducts: Product[] 타입 (data/mockData.ts에서 가져옴)
  const products = mockProducts;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">상품 목록</h1>
        <p className="mt-1 text-gray-500">
          2회차 — Props 타입 심화: React.FC&lt;T&gt;, ReactNode vs ReactElement
        </p>
      </div>

      {/* 클라이언트 컴포넌트에 Product[] 타입 데이터 전달 */}
      <ProductPageClient products={products} />
    </main>
  );
}
