# 회차 2 — 서버 컴포넌트(RSC) vs 클라이언트 컴포넌트(RCC)

## 주제 및 기획 의도

**상품 목록 + 수량 조절 카드** 화면을 만듭니다.

상품 정보를 보여주는 "껍데기"는 서버 컴포넌트가 담당하고, 사용자가 +/- 버튼으로 수량을 조절하는 부분만 클라이언트 컴포넌트로 분리합니다. 이 과정에서 **RSC/RCC 분리 전략**의 핵심을 체험할 수 있습니다.

---

## 학습 목표

1. Next.js App Router에서 **모든 컴포넌트가 기본적으로 서버 컴포넌트**임을 이해한다.
2. `"use client"` 지시어의 역할과 **언제, 어디에** 선언해야 하는지 판단할 수 있다.
3. 서버 컴포넌트 안에 클라이언트 컴포넌트를 **말단(leaf)에 주입**하는 패턴을 익힌다.
4. `"use client"` 남발을 피하고 **클라이언트 번들 크기를 최소화**하는 설계 감각을 기른다.

---

## React와의 차이점

| React (기존 SPA) | Next.js App Router |
|---|---|
| 모든 컴포넌트가 클라이언트에서 실행 | **기본이 서버 컴포넌트**, 필요할 때만 `"use client"` |
| `useEffect` + `fetch`로 데이터 로딩 | 서버 컴포넌트에서 직접 `await fetch` |
| 컴포넌트 전체가 JS 번들에 포함 | 서버 컴포넌트는 **JS 번들에 포함되지 않음** |
| 렌더링 환경 구분 없음 | **서버/클라이언트 역할 분리** 필수 |

---

## 사전 준비

```bash
# 완성본 확인
cd completed
npm install
npm run dev
# → http://localhost:3000 에서 완성된 화면 확인

# 실습 시작
cd ../practice
npm install
npm run dev
# → http://localhost:3000 에서 빈 뼈대 화면 확인
```

---

## 핵심 학습 개념

### 1. 서버 컴포넌트 (React Server Components, RSC)

Next.js App Router에서 `app/` 디렉토리 안의 모든 컴포넌트는 **기본적으로 서버 컴포넌트**입니다.

**서버 컴포넌트의 특징:**
- 서버에서 HTML로 렌더링되어 클라이언트에 전송
- **JavaScript 번들에 포함되지 않음** → 페이지 로딩 속도 향상
- `async/await`로 데이터를 직접 가져올 수 있음 (3회차에서 심화 학습)
- `useState`, `useEffect` 등 **React 훅 사용 불가**
- `onClick` 등 **이벤트 핸들러 사용 불가**

### 2. 클라이언트 컴포넌트 (Client Components, RCC)

파일 최상단에 `"use client";`를 선언하면 클라이언트 컴포넌트가 됩니다.

**클라이언트 컴포넌트가 필요한 경우:**
- `useState`, `useEffect` 등 React 훅 사용 시
- `onClick`, `onChange` 등 이벤트 핸들러 사용 시
- 브라우저 전용 API (`window`, `document` 등) 접근 시

### 3. 분리 전략: 말단(Leaf) 주입 패턴

```
page.jsx (서버) ─── Header (서버)
                └── ProductGrid (클라이언트 - 필터 상태 관리)
                    ├── CategoryFilter (클라이언트 - 클릭 이벤트)
                    └── ProductCard (서버 - 정적 표시)
                        └── QuantityControl (클라이언트 - 수량 상태)
```

> **원칙**: 트리의 가능한 한 아래쪽(말단)에서만 `"use client"`를 선언하여, 서버에서 렌더링할 수 있는 부분을 최대화합니다.

---

## 프로젝트 구조 안내

```
ch-2-2026-03-13/
├── completed/                     # 완성본
│   ├── app/
│   │   ├── layout.jsx            # Root Layout (서버 컴포넌트)
│   │   ├── page.jsx              # 메인 페이지 (서버 컴포넌트)
│   │   ├── globals.css           # Tailwind CSS 지시어
│   │   └── components/
│   │       ├── Header.jsx        # 🟢 서버 컴포넌트 — 정적 네비게이션
│   │       ├── CategoryFilter.jsx # 🔵 클라이언트 — 카테고리 선택 상태
│   │       ├── ProductCard.jsx   # 🟢 서버 컴포넌트 — 카드 UI 껍데기
│   │       ├── ProductGrid.jsx   # 🔵 클라이언트 — 필터링 상태 관리
│   │       └── QuantityControl.jsx # 🔵 클라이언트 — 수량 ± 상태
│   └── data/
│       └── mockData.js           # 상품 목업 데이터 (8개)
├── practice/                     # 실습용 (뼈대 + 힌트 주석)
│   └── (completed와 동일 구조)
└── README.md                     # 이 파일
```

🟢 = 서버 컴포넌트 (기본값, `"use client"` 없음)
🔵 = 클라이언트 컴포넌트 (`"use client"` 선언 필요)

---

## 추천 실습 순서

### Step 1: `Header.jsx` (서버 컴포넌트 — Tailwind 스타일링)
- 가장 단순한 서버 컴포넌트입니다.
- `"use client"`가 없어도 정상 동작하는 것을 확인하세요.
- Tailwind CSS 클래스만 채워 넣으면 됩니다.

### Step 2: `QuantityControl.jsx` (클라이언트 컴포넌트 — 핵심!)
- `"use client"` 지시어를 직접 추가해 보세요.
- `useState`로 수량 상태를 관리하세요.
- **만약 `"use client"` 없이 `useState`를 사용하면 어떤 에러가 발생하는지 확인해 보세요!**

### Step 3: `CategoryFilter.jsx` (클라이언트 컴포넌트)
- `"use client"` 선언 + `useState` + 이벤트 핸들러 조합을 연습합니다.
- 부모 컴포넌트에 상태 변경을 알리는 콜백 패턴을 구현합니다.

### Step 4: `ProductCard.jsx` (서버 컴포넌트 — RSC/RCC 조합)
- 서버 컴포넌트 안에서 클라이언트 컴포넌트(QuantityControl)를 import하여 사용합니다.
- **이것이 이번 회차의 핵심 패턴입니다!**

### Step 5: `ProductGrid.jsx` (클라이언트 컴포넌트)
- 필터링 상태를 관리하며 CategoryFilter와 ProductCard를 조합합니다.

### Step 6: `page.jsx` (서버 컴포넌트)
- Header와 ProductGrid를 조합하여 전체 페이지를 완성합니다.

---

## 교육자의 팁

### 흔한 실수 1: 서버 컴포넌트에서 훅 사용
```
Error: useState only works in Client Components. Add the "use client" directive at the top of the file.
```
→ `"use client"` 선언을 잊으면 이 에러가 발생합니다. **의도적으로 한번 에러를 경험해 보세요!**

### 흔한 실수 2: `"use client"` 남발
모든 파일에 `"use client"`를 붙이면 에러는 안 나지만, 서버 컴포넌트의 장점(JS 번들 제외, 빠른 초기 로딩)을 모두 잃게 됩니다. **꼭 필요한 곳에만** 선언하세요.

### 흔한 실수 3: `"use client"` 위치
`"use client"`는 반드시 **파일의 가장 첫 줄**에 위치해야 합니다. import 문보다도 위에 있어야 합니다.

### 기억할 포인트
- 서버 컴포넌트는 클라이언트 컴포넌트를 **import하여 자식으로 렌더링**할 수 있습니다.
- 클라이언트 컴포넌트는 서버 컴포넌트를 직접 import할 수 없습니다 (children prop으로 전달은 가능).
- `"use client"` 경계 아래의 모든 import도 자동으로 클라이언트 번들에 포함됩니다.

---

## 최종 기대 효과

이 회차를 마치면:
- **서버/클라이언트 컴포넌트의 차이**를 명확히 설명할 수 있습니다.
- 새 컴포넌트를 만들 때 **"이건 서버? 클라이언트?"를 즉시 판단**할 수 있습니다.
- `"use client"` 남발 없이 **효율적인 컴포넌트 트리**를 설계할 수 있습니다.

---

## 심화 도전 과제

1. **장바구니 합산 표시**: 각 상품의 선택 수량과 가격을 합산하여 하단에 총 금액을 표시하는 `CartSummary` 클라이언트 컴포넌트를 추가해 보세요. (상태 끌어올리기 패턴 연습)

2. **좋아요 토글 버튼**: ProductCard 안에 하트(♥) 버튼을 추가하여 좋아요 상태를 토글하는 `LikeButton` 클라이언트 컴포넌트를 분리해 보세요. (말단 주입 패턴 추가 연습)
