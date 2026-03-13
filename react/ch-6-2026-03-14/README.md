# 회차 6 — 커스텀 훅 (Custom Hooks)

## 주제 및 기획 의도

**유저 검색 대시보드** — JSONPlaceholder API에서 유저 목록을 가져와 검색하고, 즐겨찾기를 관리하는 앱입니다.

이 주제를 선택한 이유는 하나의 앱 안에서 **3가지 커스텀 훅**이 자연스럽게 필요한 상황을 만들기 위해서입니다:
- API 호출이 반복됨 → `useFetch`
- 검색 입력마다 필터링이 너무 자주 실행됨 → `useDebounce`
- 즐겨찾기가 새로고침하면 사라짐 → `useLocalStorage`

## 학습 목표

1. **커스텀 훅의 작성 규칙**을 이해한다 (`use` 접두사, 훅 내부에서 다른 훅 사용 가능)
2. **반복되는 로직을 훅으로 추출**하는 감각을 익힌다
3. **관심사 분리(Separation of Concerns)** 원칙을 체감한다
4. 각 훅의 **실전 사용 사례**를 경험한다

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

### 커스텀 훅이란?

커스텀 훅은 **`use`로 시작하는 함수**로, 내부에서 React의 기본 훅(useState, useEffect 등)을 사용할 수 있습니다. 반복되는 상태 관리 로직을 재사용 가능한 함수로 분리하는 패턴입니다.

```jsx
// ❌ 커스텀 훅 없이 — 매번 같은 로직 반복
function UserList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);
  // ...
}

// ✅ 커스텀 훅 사용 — 한 줄로 해결
function UserList() {
  const { data, loading, error } = useFetch('/api/users');
  // ...
}
```

### 이번 프로젝트의 3가지 커스텀 훅

#### 1. `useFetch` — API 호출 추상화

| 항목 | 설명 |
|------|------|
| **문제** | API를 호출할 때마다 data, loading, error 상태를 매번 선언하고 관리해야 함 |
| **해결** | URL만 전달하면 데이터, 로딩, 에러, 재요청 함수를 반환하는 훅 |
| **핵심** | useState + useEffect + async/await 조합 |

```jsx
const { data, loading, error, refetch } = useFetch('https://api.example.com/users');
```

#### 2. `useDebounce` — 값 변경 지연

| 항목 | 설명 |
|------|------|
| **문제** | 검색 input에 타이핑할 때마다 필터링/API 호출이 실행되어 성능 낭비 |
| **해결** | 값이 변경된 후 일정 시간(delay) 동안 추가 변경이 없을 때만 값을 업데이트 |
| **핵심** | useState + useEffect + setTimeout/clearTimeout (cleanup) |

```jsx
const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 400);
// search가 바뀔 때마다가 아니라, 400ms 동안 멈춰야 debouncedSearch가 업데이트됨
```

#### 3. `useLocalStorage` — 브라우저 저장소 동기화

| 항목 | 설명 |
|------|------|
| **문제** | useState의 값은 새로고침하면 초기화됨 |
| **해결** | useState처럼 사용하되, 값이 localStorage에 자동 저장/복원되는 훅 |
| **핵심** | useState (lazy initialization) + useEffect + localStorage API |

```jsx
const [favorites, setFavorites, reset] = useLocalStorage('my-key', []);
// 새로고침해도 favorites가 유지됨!
```

## 프로젝트 구조 안내

```
src/
├── main.jsx              # 엔트리 포인트 (수정 불필요)
├── index.css             # Tailwind 설정 (수정 불필요)
├── App.jsx               # 메인 컴포넌트 — 훅 3개를 조합하는 곳
├── hooks/
│   ├── useFetch.js       # ⭐ API 호출 커스텀 훅
│   ├── useDebounce.js    # ⭐ 디바운스 커스텀 훅
│   └── useLocalStorage.js # ⭐ localStorage 커스텀 훅
└── components/
    ├── SearchBar.jsx     # 검색 입력 UI
    ├── UserList.jsx      # 유저 목록 (로딩/에러/빈 상태 처리)
    ├── UserCard.jsx      # 개별 유저 카드
    └── FavoritesList.jsx # 즐겨찾기 사이드 패널
```

## 추천 실습 순서

### Step 1: `hooks/useDebounce.js` (가장 간단한 훅)
- useState + useEffect + setTimeout/clearTimeout만으로 구현
- cleanup 함수의 역할을 이해하는 것이 핵심

### Step 2: `hooks/useFetch.js` (API 호출 패턴)
- 3개의 상태(data, loading, error) 선언
- useEffect로 자동 호출 + refetch 함수 구현

### Step 3: `hooks/useLocalStorage.js` (고급 패턴)
- lazy initialization (useState에 함수 전달)
- useEffect로 자동 저장
- reset 함수까지 구현

### Step 4: `App.jsx` (훅 조합)
- 3개의 훅을 import하여 실제 사용
- 검색 필터링, 즐겨찾기 토글 로직 구현
- 컴포넌트에 props 연결

### Step 5: `components/` (UI 완성)
- SearchBar → UserList → UserCard → FavoritesList 순서
- 조건부 렌더링, 리스트 렌더링, 이벤트 처리, Tailwind 스타일링

## 교육자의 팁

### 자주 하는 실수들

1. **훅 이름에 `use` 접두사를 빼먹는 경우**
   - React는 `use`로 시작하는 함수만 훅으로 인식합니다
   - `fetchData` ❌ → `useFetch` ✅

2. **useEffect의 cleanup을 잊는 경우 (useDebounce)**
   - cleanup이 없으면 타이머가 계속 쌓여서 디바운스가 작동하지 않습니다
   - `return () => clearTimeout(timer);` 를 반드시 작성하세요

3. **useEffect 의존성 배열을 빈 배열로 고정하는 경우 (useFetch)**
   - URL이 바뀌면 다시 fetch해야 하므로 `[url]`을 의존성에 넣어야 합니다

4. **localStorage에 객체를 그냥 저장하는 경우**
   - `JSON.stringify()`로 저장하고 `JSON.parse()`로 읽어야 합니다
   - 그냥 저장하면 `[object Object]` 문자열이 저장됩니다

### 꼭 기억하세요

- 커스텀 훅은 **로직만 분리**합니다. UI(JSX)는 포함하지 않습니다.
- 커스텀 훅 내부에서 **다른 훅을 자유롭게 사용**할 수 있습니다.
- 같은 커스텀 훅을 여러 컴포넌트에서 사용해도 **상태는 각각 독립**입니다.

## 최종 기대 효과

이 회차를 마치면:
- 반복되는 로직을 발견했을 때 "이건 커스텀 훅으로 만들 수 있겠다"는 감각이 생깁니다
- `useFetch`, `useDebounce`, `useLocalStorage` 패턴을 실무에서 바로 활용할 수 있습니다
- 컴포넌트의 역할이 "UI 렌더링"에만 집중하고, 로직은 훅으로 분리하는 클린한 구조를 이해합니다

## 심화 도전 과제

1. **useWindowSize 훅 만들기**: 브라우저 창 크기 변경을 감지하여 반응형 레이아웃에 활용
2. **useFetch에 캐싱 추가하기**: 같은 URL로 다시 요청할 때 캐시된 데이터를 먼저 보여주고, 백그라운드에서 새 데이터를 가져오는 패턴 (이것이 TanStack Query가 하는 일의 시작점!)
