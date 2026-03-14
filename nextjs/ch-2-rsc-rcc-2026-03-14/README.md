# 회차 2 — 서버 컴포넌트(RSC) vs 클라이언트 컴포넌트(RCC) ⭐️

> Next.js App Router의 **가장 중요한 핵심 개념**을 다루는 회차입니다.

---

## 주제 및 기획 의도

**프레시마켓 상품 목록** — 상품 정보를 서버에서 렌더링하고, 수량 조절(+/−) 버튼처럼 상호작용이 필요한 부분만 클라이언트 컴포넌트로 분리하는 패턴을 실습합니다.

이 주제를 선택한 이유:
- 상품 목록은 "데이터를 보여주는 영역(서버)"과 "사용자와 상호작용하는 영역(클라이언트)"이 명확하게 구분됩니다.
- 실무에서 가장 자주 마주치는 RSC/RCC 분리 패턴을 자연스럽게 체험할 수 있습니다.

---

## 학습 목표

이 예제를 통해 다음을 배웁니다:

1. **서버 컴포넌트(RSC)의 기본 개념** — `"use client"` 없으면 서버 컴포넌트
2. **클라이언트 컴포넌트(RCC)의 사용 시점** — `useState`, 이벤트 핸들러가 필요할 때
3. **`"use client"` 지시어의 올바른 사용법** — 트리의 말단(leaf)에만 배치
4. **컴포넌트 역할 분리 전략** — 서버 컴포넌트가 껍데기를 그리고, 상호작용 부분만 클라이언트로 분리

---

## React와의 차이점

| React (SPA) | Next.js (App Router) |
|---|---|
| 모든 컴포넌트가 클라이언트에서 실행 | 기본적으로 서버에서 실행 (RSC) |
| `useEffect` + `fetch`로 데이터 로딩 | 서버 컴포넌트에서 직접 `import` 또는 `fetch` |
| 모든 컴포넌트 JS가 브라우저로 전송 | 서버 컴포넌트는 JS 번들에 **포함되지 않음** |
| 별도 분리 기준 없음 | `"use client"` 지시어로 경계 설정 |

---

## 사전 준비

```bash
# 1. completed(완성본) 프로젝트 실행
cd completed
npm install
npm run dev
# → http://localhost:3000 에서 완성된 화면 확인

# 2. practice(실습용) 프로젝트 실행
cd ../practice
npm install
npm run dev
# → http://localhost:3001 (포트가 겹치면 자동으로 다음 포트 사용)
```

---

## 핵심 학습 개념

### 1. 서버 컴포넌트 (React Server Components, RSC)

Next.js App Router에서 **모든 컴포넌트는 기본적으로 서버 컴포넌트**입니다.

**왜 서버 컴포넌트가 필요한가?**
- 브라우저로 전송되는 JavaScript 양을 줄여 **로딩 속도가 빨라집니다.**
- 서버에서 직접 데이터에 접근하므로 **API 호출 왕복이 줄어듭니다.**
- 민감한 데이터(DB 연결, API 키)가 **클라이언트에 노출되지 않습니다.**

**서버 컴포넌트에서 할 수 있는 것:**
- 데이터를 직접 `import`하거나 `fetch`
- `async/await` 사용
- Node.js API 접근 (파일 시스템, 환경변수 등)

**서버 컴포넌트에서 할 수 없는 것:**
- `useState`, `useEffect` 등 React 훅 사용 ❌
- `onClick`, `onChange` 등 이벤트 핸들러 ❌
- 브라우저 전용 API (`window`, `document`) ❌

### 2. 클라이언트 컴포넌트 (Client Components, RCC)

파일 최상단에 `"use client"` 지시어를 추가하면 클라이언트 컴포넌트가 됩니다.

```jsx
"use client";  // ← 반드시 파일의 첫 번째 줄!

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 3. `"use client"` 남발 방지 — 트리 말단 배치 전략

```
page.js (서버 컴포넌트) ← 데이터 import, 레이아웃 구성
  └── ProductCard (서버 컴포넌트) ← 상품 정보 표시
        ├── RatingStars (서버 컴포넌트) ← 별점 표시만 함
        └── QuantityControl (🔴 클라이언트) ← useState, onClick 필요!
```

**핵심**: `"use client"`는 **상호작용이 필요한 가장 작은 단위**에만 적용합니다.

---

## 프로젝트 구조 안내

```
ch-2-rsc-rcc-2026-03-14/
├── completed/                    # 완성본
│   ├── app/
│   │   ├── layout.js            # 루트 레이아웃 (헤더 포함)
│   │   ├── page.js              # 메인 페이지 (서버 컴포넌트)
│   │   ├── globals.css          # Tailwind 설정
│   │   └── components/
│   │       ├── ProductCard.js   # 상품 카드 (서버 컴포넌트)
│   │       ├── RatingStars.js   # 별점 표시 (서버 컴포넌트)
│   │       └── QuantityControl.js  # 수량 조절 (클라이언트 컴포넌트 ⚡)
│   └── data/
│       └── mockData.js          # 목업 상품 데이터
├── practice/                     # 실습용 (뼈대 + 힌트)
│   ├── (completed와 동일한 구조, 코드가 비어있음)
│   └── data/
│       └── mockData.js          # 데이터는 동일하게 제공
└── README.md                    # 이 파일
```

### 각 파일의 역할

| 파일 | 역할 | RSC/RCC |
|------|------|---------|
| `page.js` | 데이터 가져오기, 상품 목록 레이아웃 | 서버 |
| `ProductCard.js` | 개별 상품 카드 UI 렌더링 | 서버 |
| `RatingStars.js` | 별점 표시 (표시만, 상호작용 없음) | 서버 |
| `QuantityControl.js` | +/− 버튼으로 수량 조절 | **클라이언트** |

---

## 추천 실습 순서

> 데이터 흐름(위에서 아래)을 따라가며 실습하세요.

### Step 1: `page.js` — 데이터 가져오기
1. `@/data/mockData.js`에서 `products`를 import
2. `inStock` 기준으로 상품 필터링
3. 헤더 영역에 Tailwind CSS 적용
4. `ProductCard` import 후 map으로 렌더링

### Step 2: `RatingStars.js` — 서버 컴포넌트 연습
1. `rating` 값에서 별 개수 계산
2. `Array(5).map()`으로 별 5개 렌더링
3. 조건부 스타일링 (꽉 찬 별 / 반 별 / 빈 별)

### Step 3: `ProductCard.js` — 서버 컴포넌트 + 자식 조합
1. `QuantityControl`과 `RatingStars` import
2. 상품 정보(이미지, 카테고리, 이름, 설명, 가격) 표시
3. Tailwind CSS로 카드 디자인
4. 품절 상품에 조건부 스타일 적용

### Step 4: `QuantityControl.js` — 클라이언트 컴포넌트 핵심!
1. **`"use client"` 지시어를 파일 최상단에 추가** ← 가장 중요!
2. `useState`로 수량 상태 관리
3. 감소(−) / 증가(+) 버튼과 이벤트 핸들러 구현
4. 수량 > 0일 때 "담기" 버튼 조건부 표시

---

## 교육자의 팁

### 흔히 하는 실수 TOP 3

1. **서버 컴포넌트에서 `useState` 사용**
   ```
   Error: useState only works in Client Components.
   Add the "use client" directive at the top of the file to use it.
   ```
   → 해결: 해당 파일 최상단에 `"use client"` 추가

2. **`"use client"`를 너무 위에 배치**
   - `page.js`에 `"use client"`를 넣으면 모든 자식이 클라이언트 번들에 포함됨
   - → 가장 말단(QuantityControl)에만 넣어야 함

3. **`"use client"` 위치 오류**
   - `"use client"`는 반드시 **파일의 첫 번째 줄**에 와야 합니다 (import보다 위!)

### 기억해야 할 포인트

- 기본 = 서버 컴포넌트. `"use client"`를 넣어야만 클라이언트 컴포넌트가 됩니다.
- 서버 컴포넌트는 **JS 번들에 포함되지 않으므로** 성능에 유리합니다.
- 상호작용(State, Event)이 필요한 **최소한의 컴포넌트만** 클라이언트로 분리하세요.

---

## 최종 기대 효과

이 회차를 마치면:
- 서버 컴포넌트와 클라이언트 컴포넌트의 차이를 명확히 이해합니다.
- 컴포넌트를 설계할 때 "이건 서버? 클라이언트?" 판단을 할 수 있습니다.
- `"use client"`를 트리 말단에 배치하는 최적화 전략을 체득합니다.

---

## 심화 도전 과제

1. **장바구니 총합 표시**: 각 상품의 수량 × 가격을 합산하여 하단에 총 금액을 표시해보세요. (힌트: 부모-자식 간 상태 공유가 필요하면 어떤 컴포넌트가 클라이언트가 되어야 할까요?)

2. **카테고리 필터**: 상단에 카테고리 버튼을 추가하여 특정 카테고리의 상품만 표시하는 필터 기능을 만들어보세요. (힌트: 필터 버튼은 클라이언트 컴포넌트, 필터링된 결과 표시는 어떻게 해야 할까요?)
