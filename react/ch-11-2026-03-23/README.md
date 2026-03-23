# 회차 11 — Zustand 심화 + TanStack Query 연계

## 주제 및 기획 의도

**데이터 대시보드** — 필터/정렬 상태(Zustand) + 서버 데이터(TanStack Query)를 연계하는 실전 대시보드 애플리케이션

이 주제를 선택한 이유는, 실무에서 가장 흔히 마주하는 패턴이 **"클라이언트 상태로 서버 데이터를 제어하는 것"**이기 때문입니다. 검색어, 필터, 정렬 같은 UI 상태(Zustand)가 API 호출 조건(TanStack Query)을 결정하는 구조를 직접 구현해봅니다.

## 학습 목표

이 예제를 통해 다음을 배웁니다:

1. **Zustand persist 미들웨어** — 상태를 localStorage에 자동 저장/복원하는 방법
2. **partialize 옵션** — 전체 상태 중 일부만 선택적으로 저장하는 패턴
3. **Zustand + TanStack Query 조합** — 클라이언트 상태가 서버 데이터 조회 조건을 제어하는 실전 패턴
4. **상태 설계 원칙** — 클라이언트 상태와 서버 상태를 구분하여 설계하는 방법

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

## 핵심 학습 개념

### 1. 클라이언트 상태 vs 서버 상태

| 구분 | 클라이언트 상태 (Zustand) | 서버 상태 (TanStack Query) |
|------|--------------------------|---------------------------|
| 예시 | 검색어, 필터, 정렬, 페이지 크기 | 사용자 목록, 게시물, 할 일, 앨범 |
| 소유자 | 브라우저 (사용자의 UI 선택) | 서버 (API 응답) |
| 동기화 | 즉시 반영 | 캐시 + 재검증 |
| 영속성 | localStorage (persist) | 메모리 캐시 (staleTime) |

### 2. Zustand persist 미들웨어

```javascript
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      count: 0,
      name: "홍길동",
      increment: () => set((s) => ({ count: s.count + 1 })),
    }),
    {
      name: "my-storage",            // localStorage 키 이름
      partialize: (state) => ({      // 저장할 상태만 선택
        count: state.count,           // count만 저장 (name은 저장 안 함)
      }),
    }
  )
);
```

**왜 partialize가 필요한가요?**
- 모든 상태를 저장하면 불필요한 데이터까지 localStorage에 쌓입니다
- 검색어, 현재 페이지 같은 일시적 상태는 새로고침 후 초기값이 맞습니다
- 즐겨찾기, 사용자 설정 같은 영구적 상태만 선택적으로 저장합니다

### 3. Zustand + TanStack Query 연계 패턴

```javascript
// Zustand에서 필터 상태 관리
const activeCategory = useDashboardStore((s) => s.activeCategory);

// TanStack Query의 enabled 옵션으로 필터 상태 연결
const users = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  enabled: activeCategory === "all" || activeCategory === "users",
  //       ↑ Zustand 상태가 쿼리 실행 여부를 결정!
});
```

이 패턴의 장점:
- 불필요한 API 호출을 방지합니다 (카테고리에 맞는 데이터만 요청)
- 캐시된 데이터는 재요청 없이 즉시 표시합니다
- 상태 흐름이 명확합니다: UI 조작 → Zustand 업데이트 → Query 재실행

### 4. 상태 설계 원칙

이 프로젝트에서 상태를 어떻게 나눴는지 살펴보세요:

- **dashboardStore (Zustand)**: 필터, 정렬, 페이지네이션, 즐겨찾기, 사이드바
  - 이 상태들은 **사용자의 UI 선택**을 나타냅니다
  - 서버와 무관하게 즉시 반영됩니다
- **toastStore (Zustand)**: 토스트 알림
  - 일시적이고 UI에만 관련된 상태입니다
- **TanStack Query**: users, posts, todos, albums 데이터
  - 서버에서 오는 데이터는 Query가 관리합니다
  - 캐시, 재검증, 에러 처리를 자동으로 해줍니다

## 프로젝트 구조 안내

```
src/
├── main.jsx              # QueryClientProvider 설정
├── App.jsx               # 전체 레이아웃 (Header + Sidebar + Main)
├── index.css             # Tailwind CSS
├── data/
│   └── mockData.js       # 카테고리, 정렬옵션, API 엔드포인트, 통계 설정
├── store/
│   ├── dashboardStore.js # 필터/정렬/즐겨찾기 상태 (persist 적용)
│   └── toastStore.js     # 토스트 알림 상태
├── hooks/
│   ├── useDashboardQueries.js  # TanStack Query 커스텀 훅 (API 조회)
│   └── useFilteredData.js      # Zustand 필터 + Query 데이터 결합
└── components/
    ├── Header.jsx         # 상단 헤더 (검색바, 필터 초기화)
    ├── Sidebar.jsx        # 사이드바 (카테고리, 정렬, 페이지 크기)
    ├── StatCards.jsx       # 통계 카드 4개
    ├── DataTable.jsx       # 데이터 테이블 + 페이지네이션
    ├── FavoritesPanel.jsx  # 즐겨찾기 사용자 패널
    └── ToastContainer.jsx  # 토스트 알림
```

## 추천 실습 순서

### Step 1: 스토어 완성하기
1. **`store/toastStore.js`** — 간단한 Zustand 스토어 (복습)
2. **`store/dashboardStore.js`** — persist 미들웨어 + partialize 적용

### Step 2: 서버 데이터 연결하기
3. **`hooks/useDashboardQueries.js`** — useQuery 커스텀 훅 작성

### Step 3: 필터 + 서버 데이터 결합하기
4. **`hooks/useFilteredData.js`** — Zustand 상태로 Query 데이터를 필터/정렬/페이지네이션 (핵심!)

### Step 4: UI 컴포넌트 완성하기
5. **`components/StatCards.jsx`** — 통계 데이터 표시
6. **`components/Sidebar.jsx`** — 카테고리/정렬/페이지크기 UI
7. **`components/Header.jsx`** — 검색 + 필터 초기화
8. **`components/FavoritesPanel.jsx`** — 즐겨찾기 (Zustand + Query 연계)
9. **`components/DataTable.jsx`** — 데이터 테이블 + 페이지네이션
10. **`components/ToastContainer.jsx`** — 토스트 알림

### Step 5: 조립하기
11. **`App.jsx`** — 모든 컴포넌트 조립

## 교육자의 팁

### 흔히 실수하는 부분

1. **persist에 함수를 저장하지 마세요** — partialize에서 상태값만 선택해야 합니다. 함수는 JSON으로 직렬화할 수 없습니다.

2. **enabled 옵션을 잊지 마세요** — enabled를 사용하지 않으면 카테고리 변경과 무관하게 모든 쿼리가 항상 실행됩니다.

3. **useMemo의 의존성 배열** — useFilteredData에서 useMemo를 사용할 때 의존성 배열에 Zustand 상태와 Query 데이터를 모두 넣어야 합니다.

4. **정렬 시 원본 배열 변경 금지** — `sort()`는 원본 배열을 변경합니다. 반드시 `[...array].sort()`로 복사 후 정렬하세요.

### 꼭 기억해야 할 포인트

- **클라이언트 상태 ≠ 서버 상태**: 이 두 가지를 섞지 마세요. Zustand는 UI 상태, TanStack Query는 서버 데이터를 각각 관리합니다.
- **persist는 선택적으로**: 모든 상태를 localStorage에 저장할 필요 없습니다. 사용자 설정처럼 영구적인 것만 저장하세요.
- **get() vs set()**: Zustand에서 `set()`은 상태를 변경할 때, `get()`은 현재 상태를 읽을 때 사용합니다. `isFavorite` 같은 파생 값에 `get()`을 활용하세요.

## 최종 기대 효과

이 회차를 마치면 다음을 할 수 있게 됩니다:

- Zustand의 **persist 미들웨어**를 사용하여 상태를 localStorage에 저장/복원할 수 있다
- **partialize 옵션**으로 필요한 상태만 선택적으로 영속화할 수 있다
- **Zustand(클라이언트 상태) + TanStack Query(서버 상태)**를 조합하여 실전 대시보드를 구축할 수 있다
- 클라이언트 상태와 서버 상태를 **명확히 구분**하여 설계할 수 있다

## 심화 도전 과제

1. **사용자 상세 모달**: 사용자 클릭 시 모달을 열고, `useUserPostsQuery`로 해당 사용자의 게시물을 보여주세요. 모달 열림/닫힘 상태는 Zustand로 관리합니다.

2. **다크모드 추가**: dashboardStore에 `isDarkMode` 상태를 추가하고 persist로 저장하세요. Tailwind의 `dark:` 접두사를 활용하여 다크모드를 구현해보세요.
