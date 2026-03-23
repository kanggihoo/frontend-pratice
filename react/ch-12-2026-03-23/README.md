# 회차 12 — 종합 프로젝트: ShopMini (미니 이커머스)

## 회차 정보

- **회차**: 12회차 (최종 종합 프로젝트)
- **핵심 개념**: 전체 아키텍처 설계, 폴더 구조, 상태 설계, API 연동, 성능 최적화
- **사용 라이브러리**: React 19, TanStack Query v5, Zustand v5, Tailwind CSS 4

---

## 주제 및 기획 의도

**ShopMini** — DummyJSON API를 활용한 미니 이커머스 앱

이 프로젝트는 1~11회차에서 배운 **모든 React 개념을 하나의 앱에 통합**하는 종합 프로젝트입니다.
실제 쇼핑몰과 유사한 기능을 구현하면서 "어떤 상태를 어디서 관리할 것인가", "컴포넌트를 어떻게 나눌 것인가" 같은 **아키텍처 설계 감각**을 키우는 것이 목표입니다.

### 왜 이커머스인가?

- **다양한 상태 유형**: 서버 데이터(상품 목록), 클라이언트 상태(장바구니, UI), 폼 입력 등
- **현실적인 UX 패턴**: 검색, 필터, 정렬, 무한 스크롤, 모달, 슬라이드 패널 등
- **성능 최적화 필요성**: 많은 상품 카드를 렌더링할 때 최적화의 중요성을 체감

---

## 학습 목표

이 예제를 완성하면 다음을 할 수 있게 됩니다:

1. **아키텍처 설계**: 서버 상태 vs 클라이언트 상태를 구분하여 적절한 도구 선택
2. **TanStack Query**: useQuery, useInfiniteQuery를 활용한 서버 데이터 관리
3. **Zustand**: persist 미들웨어, partialize, 다중 스토어 설계
4. **커스텀 훅**: useDebounce, TanStack Query 훅 추상화
5. **성능 최적화**: React.memo, useMemo, useCallback 실전 적용
6. **useRef**: 비제어 폼 + 유효성 검사 시 포커스 관리
7. **UI 패턴**: 모달, 슬라이드 패널, 토스트 알림, 다크모드

---

## 사전 준비

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

> 먼저 `completed/`를 실행하여 완성된 모습을 확인한 뒤, `practice/`에서 코드를 채워나가세요.

---

## 핵심 학습 개념

### 1. 상태 설계 원칙: "서버 상태 vs 클라이언트 상태"

이 앱에서 가장 중요한 아키텍처 결정은 **상태를 어디서 관리하는가**입니다.

| 상태 유형 | 관리 도구 | 예시 |
|-----------|-----------|------|
| **서버 상태** | TanStack Query | 상품 목록, 카테고리, 상품 상세 |
| **전역 클라이언트 상태** | Zustand | 장바구니, 위시리스트, 다크모드 |
| **UI 상태** | Zustand (uiStore) | 패널 열림/닫힘, 검색어, 정렬 기준 |
| **로컬 컴포넌트 상태** | useState | 이미지 선택, 에러 메시지 |
| **DOM 접근** | useRef | 폼 필드 포커스, 무한 스크롤 observer |

### 2. 다중 Zustand 스토어 패턴

하나의 거대한 스토어 대신 **도메인별로 스토어를 분리**합니다:

- `cartStore.js` — 장바구니 (persist)
- `wishlistStore.js` — 위시리스트 (persist)
- `uiStore.js` — UI 상태 (partialize로 darkMode만 persist)
- `toastStore.js` — 토스트 알림 (persist 없음)

### 3. TanStack Query 커스텀 훅 추상화

API 호출 로직을 `hooks/useProductQueries.js`에 모아 두면:
- queryKey가 일관되게 관리됩니다
- 컴포넌트에서 데이터 소스를 신경 쓰지 않아도 됩니다
- 여러 컴포넌트에서 같은 훅을 재사용할 수 있습니다

### 4. useInfiniteQuery와 Intersection Observer

무한 스크롤은 두 부분으로 나뉩니다:
1. **데이터**: `useInfiniteQuery`가 `getNextPageParam`으로 다음 페이지 파라미터를 결정
2. **트리거**: `IntersectionObserver`가 스크롤 감지 → `fetchNextPage()` 호출

### 5. React.memo + useCallback 실전 적용

ProductCard가 수십 개 렌더링되므로:
- `React.memo`로 props 변경 시에만 리렌더링
- `useCallback`으로 이벤트 핸들러를 메모이제이션하여 매 렌더링마다 새 함수 생성 방지

---

## 프로젝트 구조 안내

```
src/
├── main.jsx              # QueryClientProvider 설정
├── App.jsx               # 레이아웃 + 다크모드 wrapper
├── index.css             # Tailwind CSS 설정
├── data/
│   └── api.js            # DummyJSON API 함수들 (데이터 그대로 제공됨)
├── store/
│   ├── cartStore.js      # 장바구니 상태 (Zustand + persist)
│   ├── wishlistStore.js  # 위시리스트 상태 (Zustand + persist)
│   ├── uiStore.js        # UI 상태 (Zustand + partialize)
│   └── toastStore.js     # 토스트 알림 (Zustand)
├── hooks/
│   ├── useDebounce.js    # 디바운스 커스텀 훅
│   └── useProductQueries.js  # TanStack Query 훅 모음
└── components/
    ├── Header.jsx         # 상단 헤더 (검색 + 버튼들)
    ├── SearchBar.jsx      # 검색 입력 (useRef + Ctrl+K)
    ├── CategoryFilter.jsx # 카테고리 필터 버튼 목록
    ├── ProductList.jsx    # 상품 목록 (3가지 모드 전환)
    ├── ProductCard.jsx    # 개별 상품 카드 (React.memo)
    ├── ProductDetail.jsx  # 상품 상세 모달
    ├── CartPanel.jsx      # 장바구니 슬라이드 패널
    ├── CartItem.jsx       # 장바구니 아이템 (React.memo)
    ├── WishlistPanel.jsx  # 위시리스트 슬라이드 패널
    ├── OrderForm.jsx      # 주문 폼 모달 (useRef 유효성 검사)
    ├── ToastContainer.jsx # 토스트 알림 컨테이너
    └── LoadingSpinner.jsx # 로딩 스피너
```

---

## 추천 실습 순서

종합 프로젝트이므로 **아래에서 위로 (데이터 → 스토어 → 훅 → 컴포넌트)** 순서로 진행합니다.

### Phase 1: 기반 레이어 (store + hooks)

1. **`store/toastStore.js`** — 가장 간단한 스토어. addToast, removeToast 구현
2. **`store/cartStore.js`** — addItem, updateQuantity, removeItem, getTotalCount/Price
3. **`store/wishlistStore.js`** — toggleWishlist, isInWishlist
4. **`store/uiStore.js`** — 모든 setter 함수들 (간단하지만 많음)
5. **`hooks/useDebounce.js`** — useState + useEffect 조합 복습
6. **`hooks/useProductQueries.js`** — 5개의 TanStack Query 훅 작성

### Phase 2: 기본 UI 컴포넌트

7. **`components/LoadingSpinner.jsx`** — Tailwind animate-spin 연습
8. **`components/ToastContainer.jsx`** — Zustand 구독 + 리스트 렌더링
9. **`components/SearchBar.jsx`** — useRef + useCallback + useEffect
10. **`components/Header.jsx`** — 다중 스토어 구독 + 배지 렌더링

### Phase 3: 상품 관련 컴포넌트

11. **`components/CategoryFilter.jsx`** — TanStack Query + useMemo
12. **`components/ProductCard.jsx`** — React.memo + useCallback (가장 중요!)
13. **`components/ProductList.jsx`** — 3가지 모드 전환 + 무한 스크롤 (가장 복잡!)

### Phase 4: 패널/모달 컴포넌트

14. **`components/CartItem.jsx`** — React.memo + 수량 조절
15. **`components/CartPanel.jsx`** — 슬라이드 패널 + 합계 계산
16. **`components/WishlistPanel.jsx`** — CartPanel과 유사 패턴
17. **`components/ProductDetail.jsx`** — TanStack Query + 이미지 갤러리
18. **`components/OrderForm.jsx`** — useRef 비제어 컴포넌트 + 유효성 검사

### Phase 5: 마무리

19. **`App.jsx`** — 다크모드 wrapper 연결
20. 전체 기능 테스트: 검색 → 카테고리 필터 → 장바구니 → 주문

---

## 교육자의 팁

### 자주 하는 실수

1. **무한 스크롤에서 observer를 cleanup하지 않는 실수**
   - useEffect의 return에서 반드시 `observer.disconnect()` 호출

2. **React.memo 안에서 인라인 함수를 전달하는 실수**
   - `onClick={() => addItem(product)}` → memo가 무의미해짐
   - `onClick={handleAddToCart}` (useCallback 사용) → memo가 제대로 동작

3. **Zustand에서 파생 상태를 잘못 사용하는 실수**
   - `getTotalCount()` 같은 파생 값은 selector에서 **호출**해야 합니다
   - `useCartStore((state) => state.getTotalCount())` ← 괄호 주의!

4. **검색과 카테고리가 동시에 활성화되는 실수**
   - setSearchQuery에서 selectedCategory를 null로 초기화
   - setSelectedCategory에서 searchQuery를 ""로 초기화

### 꼭 기억해야 할 포인트

- **서버 상태는 TanStack Query, 클라이언트 상태는 Zustand** — 이 구분이 핵심
- **persist의 partialize** — 모든 상태를 저장하지 말고, 필요한 것만 선별
- **e.stopPropagation()** — 카드 안의 버튼이 카드 클릭 이벤트를 가로채지 않도록

---

## 최종 기대 효과

이 종합 프로젝트를 완성하면:

- **실무 수준의 React 앱 구조를 설계**할 수 있습니다
- 서버 상태와 클라이언트 상태를 **명확히 구분**하여 적절한 도구를 선택할 수 있습니다
- TanStack Query + Zustand **조합 패턴**을 자유롭게 활용할 수 있습니다
- React.memo, useMemo, useCallback을 **의미 있는 곳에 적용**할 수 있습니다
- useRef를 활용한 **DOM 직접 조작과 비제어 컴포넌트 패턴**을 이해합니다

---

## 심화 도전 과제

1. **상품 리뷰 시스템** — useMutation으로 리뷰 추가/삭제 + 낙관적 업데이트 (9회차 복습)
2. **최근 본 상품** — useEffect + Zustand persist로 최근 본 상품 목록 관리 (최대 10개)

---

## 사용 API

| 엔드포인트 | 용도 |
|-----------|------|
| `GET /products?limit=12&skip=N` | 상품 목록 (페이지네이션) |
| `GET /products/search?q=키워드` | 상품 검색 |
| `GET /products/categories` | 카테고리 목록 |
| `GET /products/category/{slug}` | 카테고리별 상품 |
| `GET /products/{id}` | 상품 상세 |

> API 문서: https://dummyjson.com/docs/products
