# 2회차 — Props 타입 심화: `React.FC<T>`, `ReactNode` vs `ReactElement`

## 회차 정보

- **주제**: 컴포넌트 Props 타입 분리, `React.FC<T>` vs 일반 함수, `ReactNode` vs `ReactElement`, 이벤트 핸들러 타입
- **예제**: 상품 목록 페이지 (서버 컴포넌트 + 클라이언트 수량 조절)

---

## 학습 목표

이 예제를 통해 익히는 TypeScript 패턴:

1. **Props 타입 분리** — `interface`를 `lib/types.ts`에 정의하고 `import type`으로 가져오기
2. **React.FC\<T\> vs 일반 함수 컴포넌트** — 두 방식의 차이와 권장 방식 이해
3. **React.ReactNode vs React.ReactElement** — 언제 어떤 타입을 써야 하는지
4. **이벤트 핸들러 타입** — `() => void`, `(id: number) => void` 등
5. **useState 제네릭** — `useState<CartItem[]>([])` 패턴

---

## JS → TS 변환 가이드 ⭐️

### 1. Props 타입 분리

```tsx
// JavaScript
function ProductCard({ product, badge }) {
  return <div>{product.name}</div>;
}

// TypeScript — 1단계: interface 정의 (lib/types.ts)
interface ProductCardProps {
  product: Product;
  badge?: React.ReactNode;
}

// TypeScript — 2단계: 함수에 타입 어노테이션 적용
function ProductCard({ product, badge }: ProductCardProps) {
  return <div>{product.name}</div>;
}
```

### 2. React.FC\<T\> vs 일반 함수 컴포넌트

```tsx
// 방법 1: 일반 함수 컴포넌트 (권장 ✅)
function Badge({ label, variant = "default" }: BadgeProps) {
  return <span>{label}</span>;
}

// 방법 2: React.FC<T>
const Badge: React.FC<BadgeProps> = ({ label, variant = "default" }) => {
  return <span>{label}</span>;
};
```

**왜 일반 함수를 권장하나?**
- React 18+에서 `React.FC`는 `children`을 자동으로 포함하지 않습니다.
- 일반 함수가 더 간결하고 타입 추론이 명확합니다.
- 공식 문서와 대부분의 프로젝트에서 일반 함수 방식을 사용합니다.

### 3. React.ReactNode vs React.ReactElement

```tsx
// React.ReactNode — 가장 넓은 타입 (거의 모든 것 허용)
//   JSX 요소, string, number, null, undefined, boolean, 배열 모두 가능
interface ProductCardProps {
  badge?: React.ReactNode;  // badge={<Badge />}, badge="NEW", badge={null} 모두 가능
  children: React.ReactNode;
}

// React.ReactElement — JSX 요소만 허용 (더 엄격)
//   <div />, <MyComponent /> 등 JSX만 가능
//   string, number, null 등은 타입 에러 발생
interface ProductListProps {
  headerAction?: React.ReactElement;  // 반드시 JSX 요소여야 함
}
```

**언제 `ReactElement`를 쓰나?**
- "이 자리에는 반드시 JSX 요소가 와야 한다"는 의도를 코드로 표현할 때
- 슬롯(slot) 패턴에서 특정 컴포넌트만 받고 싶을 때

### 4. 이벤트 핸들러 타입

```tsx
// JavaScript
function handleClick() { ... }
const handleChange = (e) => { ... }

// TypeScript
const handleClick = (): void => { ... }
//                           ↑ 반환값 없음

const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => { ... }
//                        ↑ 이벤트 객체 타입 명시

// Props로 전달되는 콜백 함수
interface QuantityControlProps {
  onQuantityChange: (productId: number, quantity: number) => void;
  //                 ↑ 매개변수 타입       ↑ 매개변수 타입  ↑ 반환값 없음
  onClear: () => void;  // 인자 없고 반환값 없는 함수
}
```

### 5. useState 제네릭 타입

```tsx
// JavaScript
const [cartItems, setCartItems] = useState([]);  // 타입 모름

// TypeScript
const [cartItems, setCartItems] = useState<CartItem[]>([]);
//                                         ↑ 배열 요소 타입 명시
// 이렇게 하면 setCartItems에 CartItem이 아닌 값을 넣으면 타입 에러 발생

const [quantity, setQuantity] = useState<number>(1);
//                               ↑ 초기값으로 추론 가능하므로 생략 가능하지만 명시적으로 쓸 수 있음
```

---

## 주요 타입 설명

### `Product` 인터페이스
```ts
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
  description: string;
  imageUrl: string;
}
```
상품 데이터의 구조를 정의합니다. API나 목업 데이터가 이 구조를 따라야 TypeScript가 올바른 속성 접근을 보장합니다.

### `BadgeProps`의 유니언 타입
```ts
interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "danger";
  //         ↑ 유니언 타입: 이 4가지 문자열만 허용
  //  ?      ↑ 선택적 속성: 없으면 기본값 "default" 사용
}
```

### `CartItem`과 `CartSummaryProps`
```ts
interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartSummaryProps {
  items: CartItem[];     // CartItem 배열
  onClear: () => void;   // 인자 없고 반환값 없는 함수
}
```

---

## 자주 하는 실수

### 1. Props 타입을 컴포넌트 파일 안에 정의하기

```tsx
// ❌ 안 좋은 예: 파일 안에 직접 정의
export default function Badge({ label }: { label: string }) { ... }

// ✅ 좋은 예: lib/types.ts에 분리 정의 후 import
import type { BadgeProps } from "@/lib/types";
export default function Badge({ label }: BadgeProps) { ... }
```

### 2. `React.ReactNode`와 `React.ReactElement` 혼동

```tsx
// ❌ children에 ReactElement를 쓰면 string을 전달할 때 에러
interface WrapperProps {
  children: React.ReactElement;  // "안녕" 전달 시 에러
}

// ✅ children에는 ReactNode가 적절
interface WrapperProps {
  children: React.ReactNode;  // JSX, string, null 모두 허용
}
```

### 3. 콜백 함수 타입에서 반환 타입 생략

```tsx
// ❌ 반환 타입 없이 정의 (추론은 되지만 명시적이지 않음)
interface ButtonProps {
  onClick: (id: number) => any;  // any 사용 금지!
}

// ✅ 반환값이 없으면 void 명시
interface ButtonProps {
  onClick: (id: number) => void;
}
```

### 4. `useState` 초기값으로 타입을 좁히지 못하는 경우

```tsx
// ❌ 빈 배열은 never[] 타입으로 추론됨
const [items, setItems] = useState([]);
// setItems([{ id: 1 }]) → 에러!

// ✅ 제네릭으로 타입 명시
const [items, setItems] = useState<CartItem[]>([]);
```

---

## 실습 순서

1. **`lib/types.ts`** — 모든 interface를 먼저 정의하세요
   - `Product`, `CartItem`
   - `BadgeProps`, `ProductCardProps`, `ProductListProps`
   - `QuantityControlProps`, `CartSummaryProps`

2. **`data/mockData.ts`** — `Product` import 후 타입 어노테이션 추가

3. **`app/components/Badge.tsx`** — `BadgeProps` import + 함수 매개변수에 적용

4. **`app/components/ProductCard.tsx`** — `ProductCardProps` import + 적용

5. **`app/components/ProductList.tsx`** — `ProductListProps` import + 적용

6. **`app/components/QuantityControl.tsx`** — `QuantityControlProps` import + `useState<number>` 추가

7. **`app/components/CartSummary.tsx`** — `CartSummaryProps` import + 적용

8. **`app/components/ProductPageClient.tsx`** — `Product`, `CartItem` import + `useState<CartItem[]>` + 콜백 타입

---

## 사전 준비

```bash
# completed 실행
cd completed && npm install && npm run dev
# http://localhost:3000

# practice 실행 (다른 터미널)
cd practice && npm install && npm run dev
# http://localhost:3001
```

---

## 심화 도전

1. `Badge` 컴포넌트를 `React.FC<BadgeProps>` 방식으로도 작성해보고 일반 함수 방식과 비교해보세요.
2. `ProductCard`의 `badge` 타입을 `React.ReactElement`로 바꿔보세요. 어떤 에러가 발생하나요?
3. `QuantityControl`에서 버튼 클릭 핸들러에 `React.MouseEvent<HTMLButtonElement>` 타입을 명시해보세요.
4. `ProductPageClient`의 `handleQuantityChange` 함수에 명시적 반환 타입 `void`를 추가해보세요.
