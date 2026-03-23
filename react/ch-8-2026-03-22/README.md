# 회차 8 — TanStack Query 기초

## 주제 및 기획 의도

**포켓몬 도감** — PokeAPI에서 포켓몬 데이터를 가져와 목록 조회, 상세 보기, 페이지네이션을 구현합니다.

이 주제를 선택한 이유:
- 실제 API를 호출하며 서버 상태 관리의 필요성을 체감할 수 있습니다.
- 목록 → 상세 페이지 전환에서 캐싱의 장점을 직접 경험할 수 있습니다.
- 페이지네이션으로 queryKey의 동작 원리를 자연스럽게 학습합니다.

## 학습 목표

이 예제를 통해 다음을 배울 수 있습니다:

1. **TanStack Query가 왜 필요한지** 이해하기
2. **QueryClient / QueryClientProvider** 설정하기
3. **useQuery** 훅으로 데이터 선언적으로 가져오기
4. **queryKey**의 역할과 캐싱 동작 이해하기
5. **staleTime / gcTime** 옵션으로 캐시 전략 설정하기
6. **enabled** 옵션으로 조건부 쿼리 실행하기 (의존적 쿼리)
7. **placeholderData**로 페이지 전환 시 UX 개선하기
8. **로딩/에러 상태** 처리 패턴 익히기

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

### 왜 useEffect + fetch 대신 TanStack Query를 쓸까?

기존 방식 (useEffect + fetch):
```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  setLoading(true);
  fetch(url)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => setError(err))
    .finally(() => setLoading(false));
}, [url]);
```

**문제점:**
- 매번 로딩/에러/데이터 상태를 직접 관리해야 함
- 캐싱이 없어서 같은 데이터를 반복 요청함
- 컴포넌트 언마운트 후 상태 업데이트로 메모리 누수 가능
- 여러 컴포넌트가 같은 데이터를 필요로 하면 중복 요청 발생

TanStack Query 방식:
```jsx
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["pokemon", id],
  queryFn: () => fetchPokemon(id),
});
```

**장점:**
- 로딩/에러/데이터 상태를 자동 관리
- 똑똑한 캐싱 (같은 queryKey면 캐시된 데이터 반환)
- 백그라운드 리패칭 (stale 데이터 자동 갱신)
- 메모리 누수 방지 (자동 cleanup)
- 여러 컴포넌트가 같은 queryKey를 사용하면 요청을 하나로 합침

### QueryClient & QueryClientProvider

```jsx
// main.jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // 5분간 데이터를 "신선"하게 유지
      gcTime: 1000 * 60 * 10,    // 10분간 캐시 보관
    },
  },
});

// 앱 전체를 QueryClientProvider로 감싸야 함
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

### queryKey — 쿼리의 "주소"

```jsx
// 같은 queryKey = 같은 데이터 (캐시 공유)
useQuery({ queryKey: ["pokemon-list", 0], ... })  // 1페이지
useQuery({ queryKey: ["pokemon-list", 1], ... })  // 2페이지 (다른 캐시)
useQuery({ queryKey: ["pokemon-detail", "pikachu"], ... })  // 피카츄 상세
```

- queryKey는 **배열** 형태
- 배열의 요소가 바뀌면 **새로운 쿼리**로 인식
- 같은 queryKey를 쓰는 모든 컴포넌트는 **캐시를 공유**

### staleTime vs gcTime

| 옵션 | 의미 | 기본값 |
|------|------|--------|
| `staleTime` | 데이터가 "신선"한 시간. 이 시간 동안은 재요청하지 않음 | 0 (즉시 stale) |
| `gcTime` | 사용하지 않는 캐시를 메모리에 보관하는 시간 | 5분 |

### enabled — 조건부 쿼리 실행

```jsx
// pokemon 데이터가 로드된 후에만 species 쿼리 실행
const { data: species } = useQuery({
  queryKey: ["species", pokemon?.id],
  queryFn: () => fetchSpecies(pokemon.id),
  enabled: !!pokemon?.id,  // pokemon.id가 있을 때만!
});
```

### placeholderData — 페이지 전환 UX 개선

```jsx
const { data, isPlaceholderData } = useQuery({
  queryKey: ["pokemon-list", page],
  queryFn: () => fetchPokemonList(page),
  placeholderData: (previousData) => previousData,
  // → 새 페이지 로드 중에 이전 페이지 데이터를 보여줌
});
```

## 프로젝트 구조 안내

```
src/
├── main.jsx            ← QueryClient 생성 & Provider 설정 (실습 대상)
├── App.jsx             ← 목록/상세 전환 로직 (실습 대상)
├── index.css           ← Tailwind CSS
├── data/
│   └── api.js          ← PokeAPI 호출 함수 (제공됨, 수정 불필요)
└── components/
    ├── PokemonList.jsx   ← useQuery로 목록 조회 + 페이지네이션 (핵심 실습)
    ├── PokemonCard.jsx   ← useQuery + enabled로 한글 이름 조회 (실습 대상)
    ├── PokemonDetail.jsx ← 의존적 쿼리 패턴 (핵심 실습)
    ├── StatBar.jsx       ← 능력치 바 (제공됨)
    ├── Pagination.jsx    ← 페이지네이션 UI (제공됨)
    ├── LoadingSpinner.jsx← 로딩 UI (제공됨)
    └── ErrorMessage.jsx  ← 에러 UI (제공됨)
```

## 추천 실습 순서

### Step 1: main.jsx — TanStack Query 초기 설정
1. `QueryClient`, `QueryClientProvider` import
2. `ReactQueryDevtools` import
3. `QueryClient` 인스턴스 생성 (staleTime, gcTime 설정)
4. `App`을 `QueryClientProvider`로 감싸기
5. `ReactQueryDevtools` 추가

### Step 2: App.jsx — 기본 라우팅 로직
1. `selectedPokemon` 상태 선언
2. 조건부 렌더링 (PokemonList / PokemonDetail)

### Step 3: PokemonList.jsx — useQuery 기초 (핵심!)
1. `useQuery` import
2. 페이지 상태 선언
3. `useQuery`로 포켓몬 목록 조회 (queryKey, queryFn, placeholderData)
4. 로딩/에러 상태 처리
5. 카드 그리드 렌더링 (map + key)
6. `extractIdFromUrl` 유틸 함수 작성
7. Pagination 컴포넌트 연결

### Step 4: PokemonCard.jsx — enabled 옵션
1. `useQuery` + `enabled` 옵션으로 조건부 쿼리
2. 한글 이름 표시 로직

### Step 5: PokemonDetail.jsx — 의존적 쿼리 (심화)
1. 기본 정보 쿼리 (useQuery)
2. 종 정보 쿼리 (의존적 쿼리 — enabled 활용)
3. 로딩/에러 상태 처리
4. 상세 정보 렌더링 (타입, 능력치, 특성 등)

## 교육자의 팁

1. **queryKey는 의존성 배열과 비슷합니다**
   - useEffect의 의존성 배열처럼, queryKey의 값이 바뀌면 쿼리가 다시 실행됩니다.
   - 단, TanStack Query는 이전 결과를 캐시하므로 훨씬 효율적입니다.

2. **React DevTools + TanStack Query DevTools를 함께 사용하세요**
   - 브라우저 하단에 꽃 모양 아이콘이 나타납니다.
   - 각 쿼리의 상태(fresh/stale/fetching/inactive)를 실시간으로 확인할 수 있습니다.

3. **staleTime을 0으로 두면?**
   - 컴포넌트가 마운트될 때마다 백그라운드에서 재요청합니다.
   - 개발 중에는 괜찮지만, 프로덕션에서는 적절한 staleTime 설정이 중요합니다.

4. **흔한 실수: queryFn에 함수 호출 결과를 전달하기**
   ```jsx
   // 잘못된 예 — 즉시 실행됨!
   queryFn: fetchPokemonList(page)

   // 올바른 예 — 함수를 전달
   queryFn: () => fetchPokemonList(page)
   ```

5. **enabled가 false이면 쿼리는 절대 실행되지 않습니다**
   - isLoading은 true, data는 undefined 상태로 유지됩니다.
   - 의존적 쿼리에서 이 점을 꼭 기억하세요.

## 최종 기대 효과

이 회차를 마치면 다음을 할 수 있게 됩니다:
- TanStack Query의 필요성과 장점을 설명할 수 있다
- useQuery로 API 데이터를 선언적으로 가져올 수 있다
- queryKey로 캐싱 전략을 설계할 수 있다
- enabled 옵션으로 의존적 쿼리를 구현할 수 있다
- 페이지네이션에서 placeholderData로 UX를 개선할 수 있다

## 심화 도전 과제

1. **검색 기능 추가**: 포켓몬 이름으로 검색하여 상세 페이지로 바로 이동하는 기능을 구현해보세요. (힌트: useQuery의 enabled 옵션 활용)

2. **포켓몬 타입별 필터**: 포켓몬 타입 목록(`https://pokeapi.co/api/v2/type`)을 불러와서 타입별로 포켓몬을 필터링하는 기능을 추가해보세요. (힌트: 새로운 queryKey + 별도의 useQuery)
