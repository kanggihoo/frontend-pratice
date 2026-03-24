# 회차 3 — useEffect + API 호출

## 주제 및 기획 의도

**유저 대시보드** — JSONPlaceholder API에서 유저 목록을 불러와 카드로 표시하고, 유저를 클릭하면 상세 정보와 게시물을 확인할 수 있는 대시보드를 만듭니다.

이 주제를 선택한 이유:
- 실제 API를 호출하여 데이터를 가져오는 경험을 할 수 있습니다.
- 로딩/에러/성공 3가지 상태를 자연스럽게 다루게 됩니다.
- useEffect의 의존성 배열과 cleanup 함수를 실전에서 체감할 수 있습니다.

## 학습 목표

이 예제를 완료하면 다음을 할 수 있게 됩니다:

1. **useEffect로 API 호출하기** — 컴포넌트 마운트 시 데이터 fetching
2. **의존성 배열 이해하기** — `[]`, `[searchTerm]` 등 언제 이펙트가 재실행되는지
3. **cleanup 함수 활용하기** — AbortController로 이전 요청 취소, 메모리 누수 방지
4. **로딩/에러 상태 처리하기** — try-catch-finally 패턴
5. **Promise.all로 여러 API 동시 호출하기**
6. **async/await 패턴 이해하기** — useEffect 안에서 비동기 함수 사용법

## 사전 준비

```bash
# completed (완성본) 실행
cd react/2026-03-09/completed
npm install
npm run dev

# practice (실습용) 실행
cd react/2026-03-09/practice
npm install
npm run dev
```

## 핵심 학습 개념

### 1. useEffect란?

React 컴포넌트에서 **사이드 이펙트**(side effect)를 처리하는 Hook입니다.
사이드 이펙트란 "렌더링 자체와는 직접 관련 없는 작업"을 말합니다.

```jsx
// 대표적인 사이드 이펙트들:
// - API 호출 (데이터 가져오기)
// - document.title 변경
// - 타이머 설정 (setInterval, setTimeout)
// - 이벤트 리스너 등록/해제
// - 로컬 스토리지 읽기/쓰기
```

### 2. 의존성 배열 (Dependency Array)

```jsx
// 1) 매 렌더링마다 실행 (의존성 배열 생략)
useEffect(() => { console.log("매번 실행"); });

// 2) 마운트 시 1회만 실행 (빈 배열)
useEffect(() => { console.log("처음 1번만"); }, []);

// 3) 특정 값이 변경될 때만 실행
useEffect(() => { console.log("count 변경!"); }, [count]);
```

### 3. Cleanup 함수

useEffect가 반환하는 함수는 **정리(cleanup)** 함수입니다.
컴포넌트가 언마운트되거나, 이펙트가 재실행되기 직전에 호출됩니다.

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data));

  // cleanup: 컴포넌트 언마운트 시 진행 중인 요청을 취소
  return () => controller.abort();
}, [url]);
```

### 4. useEffect 안에서 async/await 사용하기

```jsx
// ❌ 잘못된 방법 — useEffect는 async가 될 수 없습니다
useEffect(async () => {
  const data = await fetchData();
}, []);

// ✅ 올바른 방법 — 내부에 async 함수를 정의하고 호출
useEffect(() => {
  const fetchData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
  };
  fetchData();
}, []);
```

### 5. 로딩/에러 상태 처리 패턴

```jsx
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`에러: ${res.status}`);
      const data = await res.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // 성공이든 실패든 로딩 종료
    }
  };
  fetchData();
}, []);
```

## 프로젝트 구조 안내

```
src/
├── App.jsx              ← 메인 컴포넌트 (상태 관리, useEffect 3개)
├── main.jsx             ← 엔트리 포인트
├── index.css            ← Tailwind 설정
└── components/
    ├── Header.jsx       ← 상단 헤더 (유저 수 표시)
    ├── SearchBar.jsx    ← 검색 입력 필드
    ├── UserList.jsx     ← 유저 카드 그리드 레이아웃
    ├── UserCard.jsx     ← 개별 유저 카드
    ├── UserDetail.jsx   ← 유저 상세 페이지 (★ 핵심: AbortController + Promise.all)
    ├── LoadingSpinner.jsx ← 로딩 스피너
    └── ErrorMessage.jsx  ← 에러 메시지
```

## 추천 실습 순서

### Step 1: LoadingSpinner.jsx & ErrorMessage.jsx
가장 단순한 UI 컴포넌트부터 시작하세요. Tailwind 클래스만 채우면 됩니다.

### Step 2: Header.jsx
props 전달과 Tailwind 스타일링을 복습합니다.

### Step 3: SearchBar.jsx
`value`와 `onChange`를 연결하는 제어 컴포넌트 패턴을 연습합니다.

### Step 4: UserCard.jsx
이니셜 추출 로직과 이벤트 핸들러 연결을 연습합니다.

### Step 5: UserList.jsx
`map()` 리스트 렌더링과 빈 목록 처리를 구현합니다.

### Step 6: App.jsx (★ 핵심)
이 파일이 이번 회차의 핵심입니다! 3개의 useEffect를 직접 작성하세요:
1. API 호출 (fetch + async/await)
2. 검색 필터링 (의존성 배열 활용)
3. document.title 변경 (cleanup 함수)

### Step 7: UserDetail.jsx (★★ 심화)
가장 어려운 부분입니다. 두 가지 고급 패턴을 학습합니다:
- **AbortController**: cleanup에서 진행 중인 요청 취소
- **Promise.all**: 여러 API를 동시에 호출

## 교육자의 팁

1. **useEffect의 실행 시점을 콘솔로 확인하세요**
   ```jsx
   useEffect(() => {
     console.log("이펙트 실행!", { searchTerm });
     return () => console.log("cleanup 실행!");
   }, [searchTerm]);
   ```

2. **AbortError 무시가 왜 필요한지 꼭 이해하세요**
   - AbortController.abort()를 호출하면 fetch가 AbortError를 던집니다.
   - 이것은 에러가 아니라 "의도적인 취소"이므로 무시해야 합니다.

3. **StrictMode에서 useEffect가 2번 실행됩니다**
   - 개발 모드에서 React는 버그를 찾기 위해 이펙트를 일부러 2번 실행합니다.
   - cleanup이 제대로 되어 있다면 문제없습니다. 이것이 cleanup의 중요성!

4. **의존성 배열을 빠뜨리지 마세요**
   - 이펙트 안에서 사용하는 state나 props는 반드시 의존성 배열에 포함해야 합니다.
   - ESLint의 `exhaustive-deps` 규칙이 이를 경고해줍니다.

## 최종 기대 효과

이 회차를 마치면:
- useEffect로 API를 호출하고 데이터를 화면에 표시할 수 있습니다.
- 의존성 배열의 동작 원리를 명확히 이해합니다.
- cleanup 함수로 메모리 누수를 방지하는 방법을 알게 됩니다.
- try-catch-finally 패턴으로 로딩/에러 상태를 관리할 수 있습니다.
- 실제 API를 다루는 React 앱을 자신있게 만들 수 있습니다.

## 심화 도전 과제

1. **새로고침 버튼 추가**: 버튼을 클릭하면 유저 목록을 다시 불러오는 기능을 구현해보세요. (힌트: useEffect의 의존성 배열에 상태 변수를 추가)

2. **정렬 기능 추가**: 이름순, 회사순 등으로 유저 목록을 정렬하는 기능을 추가해보세요. (힌트: 별도의 useEffect 또는 useMemo 활용)
