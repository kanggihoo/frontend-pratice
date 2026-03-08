---
trigger: manual
---

# React 학습 커리큘럼

> Vite + React + Tailwind CSS 기반, 회차별 핵심 개념 집중 학습

## 커리큘럼 개요

| 구간                | 회차 | 핵심 개념                         | 예시 주제                                 | 데이터   |
| ------------------- | ---- | --------------------------------- | ----------------------------------------- | -------- |
| **기초 압축**       | 1    | JSX, Props, 리스트 렌더링, 이벤트 | 상품 카드 리스트 + 필터                   | 목업     |
|                     | 2    | useState 심화 + 컴포넌트 분리     | Todo 앱 (CRUD)                            | 목업     |
| **중급**            | 3    | useEffect + API 호출              | 유저 대시보드                             | API      |
|                     | 4    | useRef + 비제어 컴포넌트          | 폼 유효성 검사 / 포커스 관리              | API      |
|                     | 5    | useContext + 전역 상태            | 다크모드 + 인증 상태                      | 목업     |
|                     | 6    | 커스텀 훅                         | useFetch, useDebounce                     | API      |
| **성능 최적화**     | 7    | React.memo, useMemo, useCallback  | 대량 리스트 + 무거운 연산                 | 목업/API |
| **실무 라이브러리** | 8    | TanStack Query 기초               | 포켓몬 도감 (페이지네이션)                | API      |
|                     | 9    | TanStack Query 심화               | 게시판 CRUD (낙관적 업데이트, 무한스크롤) | API      |
|                     | 10   | Zustand 기초                      | 장바구니 + 전역 알림 시스템               | 목업/API |
|                     | 11   | Zustand 심화 + TanStack 연계      | 대시보드 (필터 상태 + 서버 데이터)        | API      |
| **종합 프로젝트**   | 12   | 전체 종합                         | 미니 이커머스 or 소셜 피드 앱             | API      |

---

## 회차별 상세

### 회차 1 — JSX, Props, 리스트 렌더링, 이벤트
- **목표**: React의 기본 문법을 빠르게 복습하고, 컴포넌트 단위 사고에 익숙해지기
- **핵심 키워드**: JSX 문법, props 전달, map()을 이용한 리스트 렌더링, key의 역할, onClick/onChange 이벤트
- **예시 주제**: 상품 카드 리스트 — 카드 컴포넌트를 만들고, 카테고리 필터 버튼으로 필터링
- **데이터**: 목업 (mockData.js)

### 회차 2 — useState 심화 + 컴포넌트 분리
- **목표**: 복합 상태 관리와 컴포넌트를 역할별로 쪼개는 감각 익히기
- **핵심 키워드**: useState로 배열/객체 상태 관리, 불변성(spread), 부모-자식 간 상태 흐름, lifting state up
- **예시 주제**: Todo 앱 — 추가, 삭제, 완료 토글, 필터(전체/완료/미완료)
- **데이터**: 목업

### 회차 3 — useEffect + API 호출
- **목표**: 사이드 이펙트 개념을 이해하고, 외부 데이터를 가져와 화면에 렌더링하기
- **핵심 키워드**: useEffect 의존성 배열, cleanup, fetch/async-await, 로딩/에러 상태 처리
- **예시 주제**: 유저 대시보드 — JSONPlaceholder에서 유저 목록을 불러와 카드로 표시
- **데이터**: API (JSONPlaceholder)

### 회차 4 — useRef + 비제어 컴포넌트
- **목표**: DOM에 직접 접근해야 하는 상황을 이해하고, 제어/비제어 컴포넌트의 차이를 체감하기
- **핵심 키워드**: useRef, forwardRef, DOM 조작(포커스, 스크롤), 제어 vs 비제어 컴포넌트
- **예시 주제**: 회원가입 폼 — 유효성 검사 + 에러 시 해당 필드로 자동 포커스
- **데이터**: 목업 (폼 제출 시 API로 전송하는 시뮬레이션)

### 회차 5 — useContext + 전역 상태
- **목표**: prop drilling 문제를 인식하고, Context API로 전역 상태를 관리하는 패턴 익히기
- **핵심 키워드**: createContext, useContext, Provider 패턴, 전역 상태 설계
- **예시 주제**: 다크모드 토글 + 로그인 사용자 정보를 전역에서 관리하는 미니 레이아웃
- **데이터**: 목업

### 회차 6 — 커스텀 훅
- **목표**: 반복되는 로직을 재사용 가능한 훅으로 추출하는 패턴 익히기
- **핵심 키워드**: 커스텀 훅 작성 규칙(use 접두사), 로직 분리, 관심사 분리
- **예시 주제**: useFetch (API 호출 추상화), useDebounce (검색 입력 최적화), useLocalStorage
- **데이터**: API (PokeAPI 또는 JSONPlaceholder)

### 회차 7 — React.memo, useMemo, useCallback
- **목표**: 불필요한 리렌더링을 감지하고, 적절한 최적화 도구를 선택하여 적용하기
- **핵심 키워드**: React.memo, useMemo, useCallback, React DevTools Profiler, 리렌더링 추적
- **예시 주제**: 대량 상품 리스트 + 실시간 검색 + 정렬 — 최적화 전후 비교 체감
- **데이터**: 목업 (대량 데이터 생성) + API

### 회차 8 — TanStack Query 기초
- **목표**: 서버 상태 관리의 개념을 이해하고, useQuery로 데이터를 선언적으로 다루기
- **핵심 키워드**: useQuery, queryKey, staleTime, cacheTime, enabled 옵션, QueryClient/QueryClientProvider
- **예시 주제**: 포켓몬 도감 — 목록 조회 + 상세 보기 + 페이지네이션
- **데이터**: API (PokeAPI)
- **참고**: TanStack Query를 처음 접하는 학습자 눈높이에서, "왜 useEffect + fetch 대신 이걸 쓰는지"부터 설명

### 회차 9 — TanStack Query 심화
- **목표**: useMutation과 낙관적 업데이트를 이해하고, 무한 스크롤 패턴 구현하기
- **핵심 키워드**: useMutation, onMutate/onError/onSettled, invalidateQueries, useInfiniteQuery, getNextPageParam
- **예시 주제**: 게시판 — 글 작성/수정/삭제(낙관적 업데이트) + 무한 스크롤 목록
- **데이터**: API (JSONPlaceholder 또는 목업 API 서버)
- **참고**: 낙관적 업데이트 개념을 "왜 UX가 좋아지는지" 관점에서 친절하게 설명

### 회차 10 — Zustand 기초
- **목표**: Zustand의 심플한 전역 상태 관리 패턴을 이해하고, Context API와의 차이를 체감하기
- **핵심 키워드**: create(), store 구독, selector 패턴, devtools 미들웨어
- **예시 주제**: 장바구니 + 토스트 알림 시스템 — 여러 컴포넌트에서 전역 상태 읽기/쓰기
- **데이터**: 목업 + API
- **참고**: Zustand를 처음 접하는 학습자 눈높이에서, "왜 Context 대신 이걸 쓰는지"부터 설명

### 회차 11 — Zustand 심화 + TanStack Query 연계
- **목표**: 클라이언트 상태(Zustand)와 서버 상태(TanStack Query)를 구분하여 함께 사용하는 실전 패턴 익히기
- **핵심 키워드**: persist 미들웨어, 슬라이스 패턴, Zustand + TanStack Query 조합, 상태 설계 원칙
- **예시 주제**: 데이터 대시보드 — 필터/정렬 상태(Zustand) + 서버 데이터(TanStack Query)
- **데이터**: API

### 회차 12 — 종합 프로젝트
- **목표**: 지금까지 배운 모든 개념을 통합하여 하나의 완성된 앱을 구축하기
- **핵심 키워드**: 전체 아키텍처 설계, 폴더 구조, 상태 설계, API 연동, 성능 최적화
- **예시 주제 후보**:
  - 미니 이커머스 (상품 목록, 장바구니, 검색/필터, 주문)
  - 소셜 피드 (게시물 CRUD, 좋아요, 무한 스크롤, 사용자 프로필)
- **데이터**: API (복합 — 여러 엔드포인트 활용)
- **참고**: completed 코드에 아키텍처 결정의 "왜"를 주석으로 설명

---

## 활용 가능한 공개 API 목록

| API                | URL                                  | 용도                                 |
| ------------------ | ------------------------------------ | ------------------------------------ |
| JSONPlaceholder    | https://jsonplaceholder.typicode.com | posts, users, todos, comments        |
| PokeAPI            | https://pokeapi.co/api/v2            | 포켓몬 데이터 (리스트, 상세, 이미지) |
| DummyJSON          | https://dummyjson.com                | 상품, 유저, 게시물, 장바구니         |
| Rick and Morty API | https://rickandmortyapi.com/api      | 캐릭터, 에피소드 (무한스크롤 연습)   |

---

## 진행 상태

- [x] 회차 1 — JSX, Props, 리스트 렌더링, 이벤트
- [x] 회차 2 — useState 심화 + 컴포넌트 분리
- [x] 회차 3 — useEffect + API 호출
- [ ] 회차 4 — useRef + 비제어 컴포넌트
- [ ] 회차 5 — useContext + 전역 상태
- [ ] 회차 6 — 커스텀 훅
- [ ] 회차 7 — React.memo, useMemo, useCallback
- [ ] 회차 8 — TanStack Query 기초
- [ ] 회차 9 — TanStack Query 심화
- [ ] 회차 10 — Zustand 기초
- [ ] 회차 11 — Zustand 심화 + TanStack Query 연계
- [ ] 회차 12 — 종합 프로젝트
