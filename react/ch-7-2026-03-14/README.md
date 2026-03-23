# 회차 7 — React.memo, useMemo, useCallback (성능 최적화)

## 주제 및 기획 의도

**대량 상품 리스트 + 실시간 검색 + 정렬** 앱을 만들며, 성능 최적화 기법을 체감합니다.

200개의 상품 데이터를 다루면서 검색, 카테고리 필터, 정렬 기능을 구현합니다. 이 과정에서 불필요한 리렌더링이 얼마나 발생하는지 직접 눈으로 확인하고, `React.memo`, `useMemo`, `useCallback`을 적용하여 최적화 전후 차이를 체감합니다.

## 학습 목표

- `React.memo`로 컴포넌트의 불필요한 리렌더링을 방지할 수 있다
- `useMemo`로 비용이 큰 계산(필터링, 정렬, 통계)을 메모이제이션할 수 있다
- `useCallback`으로 함수 참조를 유지하여 `memo`가 제대로 동작하게 할 수 있다
- `RenderCounter`를 통해 리렌더링 횟수를 추적하고 최적화 효과를 측정할 수 있다

## 사전 준비

```bash
# completed(완성본) 또는 practice(실습용) 폴더로 이동
cd completed  # 또는 cd practice

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

## 핵심 학습 개념

### 1. React.memo — 컴포넌트 메모이제이션

```jsx
import { memo } from "react";

// memo로 감싸면 props가 변경되지 않을 때 리렌더링을 건너뜁니다.
const MyComponent = memo(function MyComponent({ name, onClick }) {
  return <button onClick={onClick}>{name}</button>;
});
```

**언제 사용하나요?**
- 부모가 자주 리렌더링되지만, 자식의 props는 잘 바뀌지 않을 때
- 리스트에서 개별 아이템 컴포넌트에 적용할 때 (200개 중 대부분이 리렌더링을 건너뜀)

**주의사항:**
- `memo`는 **얕은 비교(shallow comparison)**를 합니다
- 객체/배열/함수를 props로 전달하면, 매번 새 참조가 생겨 `memo`가 무력화될 수 있습니다
- → 그래서 `useMemo`와 `useCallback`이 함께 필요합니다

### 2. useMemo — 값 메모이제이션

```jsx
import { useMemo } from "react";

// 의존성(searchTerm)이 변경될 때만 필터링을 재실행합니다.
const filtered = useMemo(() => {
  return products.filter(p => p.name.includes(searchTerm));
}, [searchTerm]);
```

**언제 사용하나요?**
- 배열 필터링/정렬처럼 계산 비용이 큰 작업
- 의존하지 않는 상태가 변경되었을 때 불필요한 재계산을 방지하고 싶을 때

### 3. useCallback — 함수 메모이제이션

```jsx
import { useCallback } from "react";

// 의존성이 변경될 때만 새 함수를 생성합니다.
const handleClick = useCallback((id) => {
  setSelected(id);
}, []);
```

**왜 필요한가요?**
```
useCallback 없이 → App 리렌더링 → 새 함수 객체 생성 → memo가 props 변경 감지 → 자식 리렌더링
useCallback 사용 → App 리렌더링 → 같은 함수 참조 유지 → memo가 변경 없음 감지 → 리렌더링 건너뜀
```

### 세 가지의 관계

```
memo + useCallback + useMemo = 완전한 최적화

memo만 사용  → 함수 props가 매번 바뀌어서 효과 없음
useCallback만 → memo가 없으면 어차피 리렌더링
useMemo만   → 계산은 줄지만 컴포넌트 리렌더링은 그대로
```

## 프로젝트 구조 안내

```
src/
├── main.jsx              # 엔트리 포인트 (수정 불필요)
├── index.css             # Tailwind 설정 (수정 불필요)
├── App.jsx               # ⭐ 메인: useState, useMemo, useCallback 사용
├── data/
│   └── mockData.js       # 200개 상품 목업 데이터 (수정 불필요)
└── components/
    ├── RenderCounter.jsx # 리렌더링 횟수 표시 (수정 불필요)
    ├── SearchBar.jsx     # ⭐ React.memo 적용
    ├── CategoryFilter.jsx# ⭐ React.memo 적용
    ├── SortControls.jsx  # ⭐ React.memo 적용
    ├── ProductItem.jsx   # ⭐ React.memo 적용 (가장 큰 효과)
    ├── ProductList.jsx   # memo 미적용 (이유 이해하기)
    └── StatsPanel.jsx    # ⭐ useMemo 적용
```

## 추천 실습 순서

### Step 1: App.jsx — 상태와 기본 구조

1. `useState`로 3개 상태 선언 (`searchTerm`, `selectedCategory`, `sortOption`)
2. 핸들러 함수 3개 작성 (아직 `useCallback` 없이 일반 함수로)
3. 앱이 정상 실행되는지 확인

### Step 2: ProductItem.jsx — 기본 UI 구현

1. `product`에서 구조분해 할당으로 데이터 추출
2. 가격 포맷팅, 별점 표시 로직 작성
3. JSX로 상품 카드 UI 구현 (카테고리 뱃지, 가격, 별점, 재고 등)

### Step 3: ProductList.jsx — 리스트 렌더링

1. 빈 결과 처리 (products.length === 0)
2. `products.map()`으로 `ProductItem` 렌더링
3. 상품 개수 표시

### Step 4: SearchBar, CategoryFilter, SortControls — 컨트롤 UI

1. 각 컴포넌트의 UI 구현 (input, button, select)
2. 이벤트 핸들러 연결

### Step 5: StatsPanel.jsx — useMemo 적용

1. `useMemo`로 통계 계산 로직 감싸기
2. 의존성 배열에 `[products]` 설정

### Step 6: React.memo 적용

1. `SearchBar`, `CategoryFilter`, `SortControls`, `ProductItem`에 `memo` 적용
2. RenderCounter로 리렌더링 횟수 관찰

### Step 7: useCallback 적용

1. App.jsx의 핸들러 함수들을 `useCallback`으로 감싸기
2. **memo + useCallback 적용 전후의 RenderCounter 차이** 관찰

### Step 8: useMemo로 필터링/정렬 최적화

1. `filteredProducts`를 `useMemo`로 감싸기 (의존성: `[searchTerm, selectedCategory]`)
2. `sortedProducts`를 `useMemo`로 감싸기 (의존성: `[filteredProducts, sortOption]`)

## 교육자의 팁

### 흔한 실수

1. **memo만 적용하고 useCallback을 빠뜨리는 경우**
   - 함수 props가 매번 새로 생성되어 memo가 무력화됩니다
   - RenderCounter로 확인해보세요!

2. **useMemo 의존성 배열을 잘못 설정하는 경우**
   - 의존성에 불필요한 값을 넣으면 → 너무 자주 재계산
   - 필요한 값을 빠뜨리면 → 오래된 데이터가 표시됨

3. **모든 곳에 memo/useMemo/useCallback을 남용하는 경우**
   - 메모이제이션 자체도 비용이 있습니다
   - 간단한 컴포넌트나 계산에는 오히려 오버헤드가 될 수 있습니다

### 최적화를 적용해야 하는 기준

- 컴포넌트가 **자주 리렌더링**되는가?
- 리렌더링이 **실제로 성능 문제**를 일으키는가?
- 리스트의 **아이템 수가 많은가?** (이 예제처럼 200개)
- 계산이 **실제로 무거운가?**

> "먼저 측정하고, 그 다음 최적화하라" — React 공식 문서

## 최종 기대 효과

이 회차를 마치면:

- 리렌더링의 원인과 영향을 이해하고 설명할 수 있습니다
- `React.memo`, `useMemo`, `useCallback`의 역할과 차이를 구분할 수 있습니다
- 세 가지 도구를 **언제, 왜** 사용해야 하는지 판단할 수 있습니다
- RenderCounter같은 도구로 최적화 효과를 측정하는 방법을 알게 됩니다

## 심화 도전 과제

1. **최적화 전후 비교 토글**: 버튼을 눌러 최적화를 켜고 끌 수 있는 기능을 추가해보세요. (최적화 OFF일 때 RenderCounter 숫자가 얼마나 빠르게 증가하는지 체감)

2. **React DevTools Profiler 사용**: 브라우저에서 React DevTools의 Profiler 탭을 열고, 검색할 때의 렌더링 성능을 직접 측정해보세요. (각 컴포넌트별 렌더링 시간을 확인할 수 있습니다)
