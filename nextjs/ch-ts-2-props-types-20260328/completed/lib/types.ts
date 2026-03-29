// ─── 도메인 타입 ────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
  description: string;
  imageUrl: string;
}

// ─── 컴포넌트 Props 타입 ────────────────────────────────────────────

export interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "danger";
}

export interface ProductCardProps {
  product: Product;
  // React.ReactNode: JSX, string, number, null, undefined 등 모두 허용
  badge?: React.ReactNode;
}

export interface ProductListProps {
  title: string;
  // React.ReactElement: JSX 요소만 허용 (더 엄격)
  // 헤더 영역에 JSX 요소만 허용한다는 의도를 명확히 표현
  headerAction?: React.ReactElement;
  children: React.ReactNode;
}

export interface QuantityControlProps {
  productId: number;
  stock: number;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export interface CartSummaryProps {
  items: CartItem[];
  onClear: () => void;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}
