// ─── [유니온 타입 정의] ───────────────────────────────
export type Category = "All" | "Electronics" | "Clothing" | "Books" | "Home";

// ─── [인터페이스 정의] ───────────────────────────────
// Product 인터페이스를 선언하세요.
// id(number), name(string), price(number), category(Category),
// imageUrl(string), inStock(boolean) 속성을 가져야 합니다.
export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  imageUrl: string;
  inStock: boolean;
}
