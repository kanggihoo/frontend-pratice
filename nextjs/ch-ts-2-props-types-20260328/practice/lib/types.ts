// practice/lib/types.ts
// ─── [타입 정의 파일] ──────────────────────────────────────────────
// 이 파일에 앱에서 사용하는 모든 공용 타입을 정의하세요.
// completed/lib/types.ts를 참고해서 직접 작성해보세요.

// TODO: Product 인터페이스를 정의하세요.
// 상품 데이터의 구조를 나타냅니다.
// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   category: string;
//   rating: number;
//   stock: number;
//   description: string;
//   imageUrl: string;
// }

// TODO: BadgeProps 인터페이스를 정의하세요.
// 힌트: variant는 4가지 문자열 중 하나 (유니언 타입), 선택적 속성
// interface BadgeProps {
//   label: string;
//   variant?: "default" | "success" | "warning" | "danger";
// }

// TODO: ProductCardProps 인터페이스를 정의하세요.
// 힌트: badge는 React.ReactNode (JSX, string 등 무엇이든 허용)
// interface ProductCardProps {
//   product: Product;
//   badge?: React.ReactNode;
// }

// TODO: ProductListProps 인터페이스를 정의하세요.
// 힌트: headerAction은 React.ReactElement (JSX 요소만 허용 — ReactNode보다 엄격)
//       children은 React.ReactNode
// interface ProductListProps {
//   title: string;
//   headerAction?: React.ReactElement;
//   children: React.ReactNode;
// }

// TODO: QuantityControlProps 인터페이스를 정의하세요.
// 힌트: onQuantityChange는 두 개의 인자를 받고 반환값이 없는 함수
// interface QuantityControlProps {
//   productId: number;
//   stock: number;
//   onQuantityChange: (productId: number, quantity: number) => void;
// }

// TODO: CartItem, CartSummaryProps 인터페이스를 정의하세요.
// interface CartItem {
//   productId: number;
//   name: string;
//   price: number;
//   quantity: number;
// }
// interface CartSummaryProps {
//   items: CartItem[];
//   onClear: () => void;   ← 인자 없고 반환값 없는 함수
// }
