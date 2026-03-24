# 회차 1 — JSX, Props, 리스트 렌더링, 이벤트

## 주제 및 기획 의도

**상품 카드 리스트 + 카테고리 필터 + 검색**

온라인 쇼핑몰의 상품 목록 페이지를 만들어 봅니다. 이 주제를 선택한 이유는:
- 카드 UI는 실무에서 가장 자주 만드는 컴포넌트 중 하나입니다.
- 카테고리 필터와 검색은 Props 전달과 이벤트 처리를 자연스럽게 연습할 수 있습니다.
- 리스트 렌더링(map)과 key의 역할을 체감할 수 있습니다.

## 학습 목표

이 예제를 완성하면 다음을 할 수 있게 됩니다:
1. **JSX 문법**으로 HTML과 JavaScript를 결합하여 UI를 작성한다
2. **Props**를 통해 부모에서 자식으로 데이터와 함수를 전달한다
3. **map()**을 사용하여 배열 데이터를 리스트로 렌더링한다
4. **key** prop의 역할과 필요성을 이해한다
5. **onClick, onChange** 이벤트를 처리한다
6. **조건부 스타일링**으로 UI 상태를 시각적으로 표현한다
7. **filter()**로 데이터를 필터링하여 동적 UI를 구현한다

## 사전 준비

### 완성본 확인
```bash
cd completed
npm install
npm run dev
```
브라우저에서 완성된 모습을 먼저 확인하세요!

### 실습 시작
```bash
cd practice
npm install
npm run dev
```
practice 프로젝트는 에러 없이 실행되지만, 아직 빈 화면입니다.

## 핵심 학습 개념

### 1. JSX (JavaScript XML)
JSX는 JavaScript 안에서 HTML처럼 생긴 코드를 작성할 수 있게 해주는 문법입니다.
```jsx
// HTML처럼 보이지만, 실제로는 JavaScript입니다!
const element = <h1 className="title">안녕하세요</h1>;
```
- `class` 대신 `className` 사용
- JavaScript 표현식은 `{중괄호}` 안에 작성
- 반드시 하나의 루트 요소로 감싸야 함

### 2. Props (Properties)
부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법입니다.
```jsx
// 부모: props 전달
<ProductCard product={product} />

// 자식: props 받기 (구조 분해 할당)
function ProductCard({ product }) {
  return <h3>{product.name}</h3>;
}
```

### 3. 리스트 렌더링 (map + key)
배열을 map()으로 순회하면서 컴포넌트를 반복 렌더링합니다.
```jsx
{products.map((product) => (
  <ProductCard key={product.id} product={product} />
))}
```
- **key**는 React가 각 항목을 구분하기 위해 필요합니다
- key에는 배열 내에서 고유한 값을 사용합니다 (index 사용은 권장하지 않음)

### 4. 이벤트 처리
```jsx
// onClick: 클릭 이벤트
<button onClick={() => alert("클릭!")}>클릭</button>

// onChange: 입력 변경 이벤트
<input onChange={(e) => setQuery(e.target.value)} />
```

### 5. 조건부 스타일링 (삼항 연산자)
```jsx
<button className={`기본클래스 ${isActive ? "활성클래스" : "비활성클래스"}`}>
  버튼
</button>
```

## 프로젝트 구조 안내

```
src/
├── main.jsx              # 앱 진입점 (수정 불필요)
├── index.css             # Tailwind CSS 설정 (수정 불필요)
├── App.jsx               # ⭐ 메인 컴포넌트 — 상태 관리 + 필터링 로직
├── data/
│   └── mockData.js       # 상품 데이터 (수정 불필요)
└── components/
    ├── Header.jsx        # ⭐ 검색 입력창
    ├── CategoryFilter.jsx# ⭐ 카테고리 필터 버튼들
    ├── ProductList.jsx   # ⭐ 상품 목록 (그리드 레이아웃)
    └── ProductCard.jsx   # ⭐ 개별 상품 카드
```

⭐ 표시된 파일이 실습 대상입니다.

## 추천 실습 순서

### Step 1: `App.jsx` — 전체 구조 잡기
1. 필요한 import문 작성 (useState, 컴포넌트들, 데이터)
2. useState로 selectedCategory, searchQuery 상태 선언
3. 필터링 로직 작성
4. JSX에 컴포넌트 배치 및 props 전달

### Step 2: `Header.jsx` — 검색 기능 구현
1. props 받기 (searchQuery, onSearchChange)
2. Tailwind로 헤더 스타일링
3. input에 value와 onChange 연결

### Step 3: `CategoryFilter.jsx` — 카테고리 버튼
1. props 받기 (categories, selectedCategory, onCategoryChange)
2. map()으로 버튼 리스트 렌더링
3. 조건부 스타일링으로 선택 상태 표현

### Step 4: `ProductList.jsx` — 상품 목록 레이아웃
1. ProductCard import
2. props 받기 (products)
3. 빈 목록 처리 (조건부 렌더링)
4. map()으로 ProductCard 리스트 렌더링

### Step 5: `ProductCard.jsx` — 개별 카드 완성
1. props 받기 & 구조 분해 할당
2. handleAddToCart 이벤트 핸들러 작성
3. 카드 UI 구성 (이미지, 카테고리 뱃지, 평점, 이름, 설명, 가격, 버튼)
4. 재고에 따른 조건부 스타일링

## 교육자의 팁

- **map()에서 key를 빼먹지 마세요!** 콘솔에 경고가 뜨면 key를 확인하세요.
- **Props 이름을 정확히 맞추세요.** 부모가 보내는 이름과 자식이 받는 이름이 달라 `undefined`가 되는 실수가 많습니다.
- **onChange에서 `e.target.value`를 잊지 마세요.** `e`가 아니라 `e.target.value`가 입력값입니다.
- **toLocaleString()**은 숫자에 천 단위 콤마를 넣어주는 메서드입니다. `45000.toLocaleString()` → `"45,000"`.
- 삼항 연산자가 헷갈리면 먼저 if문으로 작성한 뒤, 나중에 삼항으로 바꿔보세요.

## 최종 기대 효과

이 회차를 마치면:
- React 컴포넌트를 **역할별로 분리**하여 만들 수 있습니다
- 부모 → 자식으로 **Props를 전달**하고 활용할 수 있습니다
- 배열 데이터를 **map()으로 렌더링**하고 **key의 역할**을 이해합니다
- **이벤트 핸들러**를 연결하여 사용자 인터랙션을 처리할 수 있습니다
- **Tailwind CSS**로 모던한 카드 UI를 스타일링할 수 있습니다

## 심화 도전 과제

1. **가격순 정렬 기능 추가**: "낮은 가격순" / "높은 가격순" 정렬 버튼을 만들어보세요.
2. **장바구니 카운터**: alert 대신 실제 장바구니 개수를 화면에 표시해보세요. (useState 활용 — 회차 2 미리보기!)
