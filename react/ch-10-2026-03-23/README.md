# 회차 10 — Zustand 기초: 장바구니 + 토스트 알림 시스템

## 🎯 주제 및 기획 의도

**장바구니 + 전역 토스트 알림 시스템**을 만들며 Zustand의 핵심 개념을 학습합니다.

장바구니는 여러 컴포넌트(상품 목록, 헤더 배지, 장바구니 패널)에서 동시에 읽고 써야 하는 대표적인 **전역 상태**입니다. 토스트 알림 역시 어떤 컴포넌트에서든 호출할 수 있어야 하므로, 전역 상태 관리의 필요성을 체감하기에 최적의 주제입니다.

## 📚 학습 목표

이 예제를 마치면 다음을 할 수 있게 됩니다:

1. **Zustand의 `create()`로 스토어를 생성**하고, 상태와 액션을 정의할 수 있다
2. **여러 컴포넌트에서 하나의 스토어를 구독**하여 전역 상태를 공유할 수 있다
3. **selector 패턴** `(state) => state.value`으로 필요한 값만 구독하여 불필요한 리렌더링을 방지할 수 있다
4. **여러 개의 스토어**를 만들고 조합하여 관심사를 분리할 수 있다
5. **`set()`과 `get()`**의 차이를 이해하고 적절히 사용할 수 있다

## 🛠 사전 준비

```bash
# completed (완성본) 실행
cd completed
npm install
npm run dev

# practice (실습용) 실행
cd practice
npm install
npm run dev
```

## 💡 왜 Zustand인가? (Context API와의 비교)

5회차에서 배운 **Context API**도 전역 상태를 관리할 수 있지만, 몇 가지 한계가 있습니다:

| 비교 항목 | Context API | Zustand |
|-----------|------------|---------|
| **보일러플레이트** | Provider, createContext, useContext 필요 | `create()` 하나로 끝 |
| **리렌더링** | Provider 하위 모든 컴포넌트가 리렌더링 | selector로 구독한 값이 변할 때만 리렌더링 |
| **코드량** | Context + Provider + Hook 파일 분리 | 단일 파일에 상태 + 액션 정의 |
| **DevTools** | 별도 설정 필요 | 미들웨어로 간편 연동 |
| **학습 곡선** | React 기본 개념 | 매우 낮음 (Redux보다 훨씬 간단) |

**핵심 요약**: Zustand는 **적은 코드로 강력한 전역 상태 관리**를 제공합니다.

## 🔑 핵심 학습 개념

### 1. `create()` — 스토어 생성

```jsx
import { create } from 'zustand';

const useStore = create((set, get) => ({
  // 상태
  count: 0,

  // 액션 (상태를 변경하는 함수)
  increment: () => set((state) => ({ count: state.count + 1 })),

  // 파생 상태 (get으로 현재 상태 읽기)
  getDoubled: () => get().count * 2,
}));
```

- `set()`: 상태를 업데이트합니다. 콜백 함수로 이전 상태를 받을 수 있습니다.
- `get()`: 현재 상태를 동기적으로 읽습니다. 파생 값 계산에 유용합니다.

### 2. Selector 패턴 — 필요한 것만 구독

```jsx
// ✅ 좋은 예: count만 구독 → count가 변할 때만 리렌더링
const count = useStore((state) => state.count);

// ❌ 나쁜 예: 전체 상태 구독 → 어떤 값이든 변하면 리렌더링
const state = useStore();
```

### 3. 여러 스토어 분리 — 관심사 분리

```jsx
// 장바구니 전용 스토어
const useCartStore = create(/* ... */);

// 토스트 알림 전용 스토어
const useToastStore = create(/* ... */);
```

하나의 거대한 스토어 대신, **역할별로 스토어를 분리**하면 코드가 깔끔해지고 유지보수가 쉬워집니다.

## 📁 프로젝트 구조 안내

```
ch-10-2026-03-23/
├── completed/                    # 완성본
│   └── src/
│       ├── App.jsx               # 레이아웃, 장바구니 패널 토글
│       ├── store/
│       │   ├── cartStore.js      # ⭐ 장바구니 Zustand 스토어
│       │   └── toastStore.js     # ⭐ 토스트 알림 Zustand 스토어
│       ├── components/
│       │   ├── Header.jsx        # 상단 헤더 + 장바구니 배지
│       │   ├── CategoryFilter.jsx# 카테고리 필터 버튼
│       │   ├── ProductList.jsx   # 상품 목록 (필터링 로직)
│       │   ├── ProductCard.jsx   # 개별 상품 카드 (담기 버튼)
│       │   ├── CartPanel.jsx     # 슬라이드 장바구니 패널
│       │   ├── CartItem.jsx      # 장바구니 개별 아이템
│       │   └── ToastContainer.jsx# 토스트 알림 렌더링
│       └── data/
│           └── mockData.js       # 상품 & 카테고리 더미 데이터
├── practice/                     # 실습용 (동일 구조, 뼈대 코드)
└── README.md                     # 이 파일
```

## 📝 추천 실습 순서

> **원칙**: 스토어(데이터)를 먼저 만들고 → 컴포넌트(UI)에서 연결하는 순서로 진행합니다.

### Step 1: `store/cartStore.js` — 장바구니 스토어 완성
- `create()` 사용법 익히기
- `set()`으로 상태 업데이트하는 패턴 이해
- `get()`으로 파생 상태 계산하기

### Step 2: `store/toastStore.js` — 토스트 스토어 완성
- 두 번째 스토어를 만들며 관심사 분리 체감
- `setTimeout`과 `set()`을 조합한 자동 제거 로직

### Step 3: `App.jsx` — 전체 레이아웃 구성
- 컴포넌트 조합 및 상태 연결

### Step 4: `components/Header.jsx` — selector 패턴 실습
- `useCartStore((state) => state.getTotalQuantity)`로 필요한 값만 구독

### Step 5: `components/ProductCard.jsx` — 여러 스토어 동시 사용
- useCartStore + useToastStore에서 각각 액션 가져와 조합

### Step 6: `components/CartItem.jsx` — 수량 조절 로직
### Step 7: `components/CartPanel.jsx` — 장바구니 패널 완성
### Step 8: `components/ToastContainer.jsx` — 토스트 UI 완성
### Step 9: `components/CategoryFilter.jsx` & `ProductList.jsx` — 필터링

## 🧑‍🏫 교육자의 팁

1. **`set()`에 객체 vs 콜백 함수**
   - `set({ count: 0 })` — 값을 직접 지정 (이전 상태가 필요 없을 때)
   - `set((state) => ({ count: state.count + 1 }))` — 이전 상태 기반 업데이트

2. **Zustand는 불변성을 자동으로 처리하지 않습니다**
   - 배열/객체를 업데이트할 때 반드시 spread 연산자를 사용하세요
   - `set((state) => ({ items: [...state.items, newItem] }))`

3. **selector를 빼먹으면 전체 리렌더링이 발생합니다**
   - `useStore()` 대신 `useStore((state) => state.필요한값)`을 사용하세요

4. **스토어 외부에서 상태를 읽을 수도 있습니다**
   - `useCartStore.getState().items` — React 컴포넌트 바깥에서도 사용 가능

## ✅ 최종 기대 효과

이 회차를 마치면:
- **Zustand로 전역 상태 관리**를 자유롭게 할 수 있습니다
- **여러 스토어를 분리**하여 관심사별로 상태를 관리할 수 있습니다
- **selector 패턴**으로 성능을 최적화할 수 있습니다
- Context API와의 차이를 이해하고, 상황에 맞는 도구를 선택할 수 있습니다

## 🚀 심화 도전 과제

1. **Zustand devtools 미들웨어 적용**
   - `import { devtools } from 'zustand/middleware'`를 사용하여 브라우저 Redux DevTools에서 상태 변화를 추적해보세요.

2. **상품 재고 관리 연동**
   - 장바구니에 담을 때 재고를 차감하고, 제거할 때 재고를 복원하는 로직을 추가해보세요.
   - 재고가 0이면 "품절" 상태로 버튼을 비활성화하세요.
