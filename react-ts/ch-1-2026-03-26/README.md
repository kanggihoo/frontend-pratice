# [1회차] React + TypeScript - 기초 압축 1 (상품 카드 리스트 + 필터)

## 📌 회차 정보
- **회차**: 1회차 (기초 압축)
- **핵심 개념**: `type`/`interface`, TSX 문법, Components Props 타입, 리스트 렌더링 (`map()`), `key`, 클릭/변경 이벤트 핸들러 타입 선언, 유니온(Union) 타입.

## 🎯 주제 및 기획 의도
온라인 상점의 **상품 카드 리스트와 카테고리별 필터 기능**을 구현해 봅니다.
React만 사용할 때는 각 컴포넌트 간 전달되는 (Props) 데이터의 형태를 알기 어려워 에러를 겪는 경우가 많습니다. 이번 주제에서는 데이터를 화면에 표시하는 과정(상품 목록 표시 및 필터 적용)을 TypeScript와 결합하여 어떻게 런타임 이전(개발 시점)에 버그를 예방할 수 있는지를 집중적으로 연습합니다.

## ✨ 학습 목표
1. TypeScript 환경에서 React **Props(프롭스)** 인터페이스를 정의하고 활용할 수 있다.
2. 부모-자식 컴포넌트 간에 객체나 배열, 함수 등을 타입 안정성(Type-safety) 있게 전달할 수 있다.
3. 클릭 이벤트(`React.MouseEvent`)와 같은 기본적인 **이벤트 핸들러의 타입**을 지정할 수 있다.
4. `TypeScript Union Type(유니온 타입)`을 활용하여 특정한 값(예: 특정 카테고리만 가능)만 들어오도록 제한할 수 있다.

## 🛠 사전 준비

해당 디렉토리의 터미널에서 아래의 명령어를 입력하여 필요한 패키지를 설치하고 개발 서버를 엽니다:

**완성본(Completed) 실행:**
```bash
cd completed/
npm install
npm run dev
```

**실습용(Practice) 실행:**
```bash
cd practice/
npm install
npm run dev
```

---

## 💡 핵심 학습 개념

### 1. `type` vs `interface`
실무에서는 주로 객체 구조를 표현할 때 `interface`를, 유니온 타입이나 특정 원시값의 별칠을 지을 때는 `type`을 활용합니다.
```ts
// 특정 문자열만 허용하는 유니온 타입
export type Category = 'All' | 'Electronics' | 'Clothing';

// 객체의 모양(Shape)을 정의
export interface Product {
  id: number;
  name: string;
  category: Category; 
}
```

### 2. Props 패턴 정의 (`React.FC<Props>`)
컴포넌트 함수를 만들 때, 매개변수로 들어오는 Props의 구조를 명시합니다.
```tsx
interface ProductCardProps {
  product: Product;          // 필수 항목
  onClick?: () => void;      // 선택(optional) 항목 (?)을 붙이면 넘기지 않아도 됩니다.
}
```

### 3. 이벤트 타입 (`React.MouseEvent`)
버튼을 클릭하거나 키보드를 입력할 때, 해당 이벤트(Event) 객체의 타입을 정확히 명시해야 TypeScript가 `e.target` 등을 안전하게 인식할 수 있습니다.
```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("Button Clicked!")
}
```

---

## 📂 프로젝트 구조 안내

이번 프로젝트는 다음과 같은 폴더 및 파일로 구성되어 있습니다.

```text
src/
├── data/
│   └── mockData.ts          # 연습에 사용할 상품 8개의 더미 데이터
├── types/
│   └── index.ts             # 전역에서 쓰일 Product, Category 타입 모음
├── components/
│   ├── CategoryFilter.tsx   # 카테고리 필터 버튼 묶음 컴포넌트
│   └── ProductCard.tsx      # 상품 정보 1개를 렌더링하는 카드 컴포넌트
├── App.tsx                  # 최상위 컴포넌트(리스트와 상태관리 로직이 들어가는 곳)
├── index.css                # Tailwind CSS Import 등 글로벌 CSS
└── main.tsx                 # React DOM을 브라우저에 연결하는 Entry Point
```

---

## 🚀 추천 실습 순서 (`practice` 디렉토리 위주 진행)

각 파일 내에는 `// ─── [...] ───` 형태의 주석과 **TODO**가 적혀있습니다. 다음 순서대로 빈칸을 채워 나가보세요.

1. **`src/types/index.ts`**
   - 시스템 전체를 관통하는 명세서(타입)를 우선 작성합니다. DB 테이블 스키마를 짠다고 생각하세요.
2. **`src/components/ProductCard.tsx`**
   - 방금 정의한 전역 타입을 불러와 Props 형태로 연결하고, JSX(HTML 구조) 사이사이에 알맞은 데이터를 꽂아넣습니다.
3. **`src/components/CategoryFilter.tsx`**
   - 버튼 목록을 `map()` 함수를 활용하여 렌더링하고, 상위 계층에서 Props로 받아온 `onClick` 함수를 바인딩합니다.
4. **`src/App.tsx`**
   - 최종적으로 카테고리를 추적할 상태(`useState`)를 정의하고, 조건부에 따라 `ProductCard` 배열을 렌더링하세요!

---

## 👩‍🏫 교육자의 팁

- **TypeScript의 에러를 두려워하지 마세요!** 화면이 터지거나 고객이 버그를 겪기 전에 `IDE (에디터)`가 미리 에러를 잡아준 것입니다! 마우스를 올렸을 때 나타나는 붉은 줄의 메시지(Typescript compiler error)를 주의 깊게 읽어보는 습관이 중요합니다.
- `map()` 함수로 반복되는 컴포넌트를 렌더링할 땐 반드시 가장 겉에 있는 태그에 **유일한 값을 가진 `key` 속성**을 부여해야 해요! (보통 배열에 담긴 원소의 `id` 값을 씁니다.)
- Tailwind CSS에서 긴 조건문으로 클래스명을 만들때는 백틱(`` ` ``)을 이용해 코드를 간결하게 관리하세요! 예: ``className={`text-sm ${isActive ? 'text-blue-500' : 'text-gray-500'}`}``

---

## 🎉 최종 기대 효과

이 회차를 마치면,
- `interface`와 `type`을 자유자재로 다루며 어떤 데이터를 받아올 수 있는지 미리 상상하고 개발할 수 있습니다.
- Props 객체를 내리며 발생할 수 있는 오타로 인한 버그를 미연에 방지합니다.
- TypeScript의 기본기가 잡히며 이후 회차의 더 복잡한 데이터 구조와 비동기 처리를 맞이할 준비가 됩니다.

---

## 🔥 심화 도전 과제 (선택)

1. **품절 상태 표시 정교화**: `product.inStock`이 `false`인 경우, `ProductCard` 전체가 약간 회색빛이 돌거나 반투명해지도록 TailwindCSS 클래스(`opacity-50` 등)를 적용해보세요!
2. **가격 순 정렬 기능**: App.tsx에 '낮은 가격순', '높은 가격순' 정렬 상태와 버튼을 만들어서, `filteredProducts` 배열이 렌더링 되기 전, 조건에 맞추어 `sort()` 메서드로 정렬 처리해보세요!
