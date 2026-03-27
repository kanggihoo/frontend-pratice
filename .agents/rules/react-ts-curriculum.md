---
trigger: manual
---

# React + TypeScript 학습 커리큘럼

> Vite + React + TypeScript + Tailwind CSS 기반, React 감각에 타입 감각을 자연스럽게 붙이는 압축 커리큘럼

## 커리큘럼 개요

| 구간            | 회차 | 핵심 개념                                            | 예시 주제                                 | 데이터   |
| --------------- | ---- | ---------------------------------------------------- | ----------------------------------------- | -------- |
| **기초 압축**   | 1 [x]  | TSX, Props 타입, 리스트 렌더링, 이벤트 타입, 유니온 타입 | 상품 카드 리스트 + 필터                   | 목업     |
|                 | 2 [x]  | useState 제네릭, 배열/객체 상태 타입, 불변성         | Todo 앱 (CRUD)                            | 목업     |
|                 | 3    | 폼 타입, `ChangeEvent`, `FormEvent`, `useRef` 타입   | 회원가입 폼 + 유효성 검사                 | 목업/API |
| **중급**        | 4    | useEffect + API 호출, 응답 타입, 로딩/에러 처리      | 유저 대시보드                             | API      |
|                 | 5    | useContext, 전역 상태 타입, nullable 처리            | 다크모드 + 인증 상태                      | 목업     |
|                 | 6    | 커스텀 훅, 제네릭 훅, 반환 타입 설계                  | useFetch, useDebounce, useLocalStorage    | API      |
| **실무 확장**   | 7    | Zustand 또는 TanStack Query 타입 적용                 | 장바구니/토스트 또는 포켓몬 도감          | 목업/API |

---

## 회차별 상세

### 회차 1 - TSX, Props 타입, 리스트 렌더링, 이벤트 타입

- **목표**: React 기본 문법 위에 TypeScript 타입을 얹는 감각을 빠르게 익히기
- **핵심 키워드**: `type`/`interface`, TSX 문법, props 타입, `map()`, `key`, 클릭/변경 이벤트 타입, 유니온 타입
- **예시 주제**: 상품 카드 리스트 - 카드 컴포넌트를 만들고, 카테고리 필터 버튼으로 필터링
- **데이터**: 목업 (`mockData.ts`)
- **참고**: 처음부터 `any`를 쓰지 않고, 데이터 모델과 UI props를 명확히 분리하는 연습을 중심에 둠

### 회차 2 - useState 제네릭, 배열/객체 상태 타입, 불변성

- **목표**: 복합 상태를 TypeScript로 안전하게 다루고, 배열/객체 업데이트 패턴에 익숙해지기
- **핵심 키워드**: `useState<T>()`, 배열 상태 타입, 객체 상태 타입, spread 연산자, lifting state up
- **예시 주제**: Todo 앱 - 추가, 삭제, 완료 토글, 필터(전체/완료/미완료)
- **데이터**: 목업
- **참고**: 상태가 커질수록 타입이 설계 문서처럼 동작한다는 점을 체감하게 하는 회차

### 회차 3 - 폼 타입, `ChangeEvent`, `FormEvent`, `useRef` 타입

- **목표**: 입력 폼과 DOM 참조를 TypeScript로 정확하게 다루기
- **핵심 키워드**: `ChangeEvent<HTMLInputElement>`, `FormEvent<HTMLFormElement>`, `useRef<HTMLInputElement | null>`, 제어/비제어 컴포넌트, 유효성 검사
- **예시 주제**: 회원가입 폼 - 필수 입력값 검증 + 에러 발생 시 해당 필드로 자동 포커스
- **데이터**: 목업 또는 API 제출 시뮬레이션
- **참고**: 이벤트 타입과 ref null 처리가 왜 필요한지 실무 관점에서 익히는 데 초점을 둠

### 회차 4 - useEffect + API 호출, 응답 타입, 로딩/에러 처리

- **목표**: 서버에서 들어오는 데이터를 안전하게 다루는 법을 익히기
- **핵심 키워드**: `useEffect`, `async/await`, 응답 타입 정의, `loading`/`error` 상태, API 상수 분리
- **예시 주제**: 유저 대시보드 - JSONPlaceholder에서 유저 목록을 불러와 카드로 표시
- **데이터**: API (JSONPlaceholder)
- **참고**: 외부 데이터는 항상 불완전할 수 있으므로, 타입 선언과 런타임 상태 처리를 같이 설명

### 회차 5 - useContext, 전역 상태 타입, nullable 처리

- **목표**: prop drilling 문제를 인식하고, Context API를 타입 안전하게 설계하기
- **핵심 키워드**: `createContext`, `useContext`, Provider 패턴, `User | null`, 전역 상태 타입
- **예시 주제**: 다크모드 토글 + 로그인 사용자 정보를 전역에서 관리하는 미니 레이아웃
- **데이터**: 목업
- **참고**: Context 기본값과 `null` 처리 방식이 런타임 안정성에 어떤 영향을 주는지 설명

### 회차 6 - 커스텀 훅, 제네릭 훅, 반환 타입 설계

- **목표**: 반복 로직을 재사용 가능한 타입 안전 훅으로 분리하기
- **핵심 키워드**: 커스텀 훅 작성 규칙, 제네릭 훅, 반환 타입, 로직 분리, `useFetch<T>`
- **예시 주제**: `useFetch`, `useDebounce`, `useLocalStorage`
- **데이터**: API (PokeAPI 또는 JSONPlaceholder)
- **참고**: 훅의 입력과 출력을 타입으로 고정하면 재사용성이 얼마나 좋아지는지 체감하는 회차

### 회차 7 - Zustand 또는 TanStack Query 타입 적용

- **목표**: 실무 라이브러리에 타입을 붙이며 전역 상태와 서버 상태를 다루는 감각을 익히기
- **핵심 키워드**: `create()` store 타입, selector 패턴, `useQuery<T>`, `useMutation`, 상태 분리, 타입 재사용
- **예시 주제**:
  - Zustand: 장바구니 + 토스트 알림 시스템
  - TanStack Query: 포켓몬 도감 또는 게시판 목록
- **데이터**: 목업 또는 API
- **참고**: 이 회차는 라이브러리 자체보다 "언제 전역 상태를 쓰고, 언제 서버 상태를 써야 하는지"를 함께 익히는 데 목적이 있음

---

## 활용 가능한 공개 API 목록

| API                | URL                                  | 용도                                 |
| ------------------ | ------------------------------------ | ------------------------------------ |
| JSONPlaceholder    | https://jsonplaceholder.typicode.com | posts, users, todos, comments        |
| PokeAPI            | https://pokeapi.co/api/v2            | 포켓몬 데이터 (리스트, 상세, 이미지) |
| DummyJSON          | https://dummyjson.com                | 상품, 유저, 게시물, 장바구니         |
| Rick and Morty API | https://rickandmortyapi.com/api      | 캐릭터, 에피소드 (무한스크롤 연습)   |

---

## 결과물 구조

> TypeScript 버전은 `tsx`/`ts` 파일을 기본으로 사용하고, 공통 타입은 `src/types/`에 모아두는 구조를 권장합니다.

```
react-ts/ch-{커리큘럼 회차}-{날짜}/
├── completed/                    # 완성본 프로젝트
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css             # Tailwind 지시어 포함
│       ├── vite-env.d.ts
│       ├── components/           # 컴포넌트 파일들
│       ├── hooks/                # (커스텀 훅 회차부터)
│       ├── store/                # (Zustand 회차부터)
│       ├── types/                # 공통 도메인 타입
│       │   └── index.ts
│       └── data/                 # (목업 데이터 사용 시)
│           └── mockData.ts
├── practice/                     # 실습용 프로젝트 (동일 구조)
│   ├── package.json              # completed와 동일
│   ├── vite.config.ts            # completed와 동일
│   ├── tsconfig.json             # completed와 동일
│   ├── tsconfig.app.json         # completed와 동일
│   ├── tsconfig.node.json        # completed와 동일
│   ├── index.html                # completed와 동일
│   └── src/
│       ├── main.tsx              # completed와 동일
│       ├── App.tsx               # 뼈대 + 힌트 주석
│       ├── index.css             # completed와 동일
│       ├── vite-env.d.ts
│       ├── components/           # 뼈대 + 힌트 주석
│       ├── hooks/                # 뼈대 + 힌트 주석
│       ├── store/                # 뼈대 + 힌트 주석
│       ├── types/                # 공통 타입 뼈대
│       └── data/                 # completed와 동일 (데이터는 그대로 제공)
│           └── mockData.ts
└── README.md                     # 학습 가이드
```

## 결과물 상세 규칙

### 1. 완성본 (`completed/`)

- 모든 React 로직과 Tailwind CSS가 완벽하게 적용된 프로젝트입니다.
- `npm install && npm run dev`만으로 바로 실행 가능해야 합니다.
- 모던하고 깔끔한 UI 디자인을 적용해주세요 (색상, 여백, 그림자, 반응형 등).
- 컴포넌트는 **역할별로 적절히 분리**해주세요.
- 해당 회차의 핵심 개념이 **명확하게 드러나는** 코드여야 합니다.
- TypeScript는 단순 주석이 아니라, 실제로 타입 안정성을 체감할 수 있게 사용해야 합니다.

### 2. 실습용 (`practice/`)

- `completed/`와 **완벽히 동일한 파일 구조와 컴포넌트 구조**를 가집니다.
- **설정 파일**(`package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `main.tsx`, `index.css`)은 completed와 동일하게 제공합니다.
- **데이터 파일**(`data/mockData.ts`)도 그대로 제공합니다.
- **컴포넌트 파일들에서 학습 대상 코드를 비워둡니다:**
  - React 로직 (`useState`, `useEffect`, 이벤트 핸들러 등)
  - TypeScript 타입 선언과 타입 적용이 필요한 핵심 부분
  - Tailwind CSS 클래스
  - 조건부 렌더링 / 리스트 렌더링 로직
- `npm install && npm run dev`로 **에러 없이 실행은 되어야** 합니다 (빈 화면이라도 OK).
- 비워둔 자리마다 **아주 상세하고 친절한 주석**을 달아주세요.

#### 주석 작성 가이드

```tsx
// ─── [타입 정의] ───────────────────────────────
// 상품 한 개의 구조를 나타내는 타입을 정의하세요.
// 예: id, name, price, category, imageUrl
// 힌트: type Product = { ... } 또는 interface Product { ... }

// ─── [상태 선언] ───────────────────────────────
// useState를 사용하여 상품 목록(배열)을 관리하는 상태를 선언하세요.
// 제네릭을 사용해 배열 원소 타입을 명시합니다.
// 힌트: const [items, setItems] = useState<Product[]>([]);

// ─── [이벤트 타입] ─────────────────────────────
// 버튼 클릭이나 input 변경 이벤트의 타입을 정확히 지정하세요.
// 힌트: React.MouseEvent<HTMLButtonElement> / React.ChangeEvent<HTMLInputElement>

// ─── [리스트 렌더링] ──────────────────────────────
// items 배열을 map()으로 순회하며 ItemCard 컴포넌트를 렌더링하세요.
// 반드시 key prop에 고유한 값을 전달해야 합니다.
```

### 3. 학습 가이드 (`README.md`)

교육자의 입장에서 다음 내용을 포함하여 작성해주세요:

- **[회차 정보]**: 몇 회차인지, 핵심 개념이 무엇인지
- **[주제 및 기획 의도]**: 어떤 UI를 만드는지, 왜 이 주제를 선택했는지
- **[학습 목표]**: 이 예제를 통해 구체적으로 무엇을 배우는지
- **[사전 준비]**: 프로젝트 실행 방법 (`npm install`, `npm run dev` 등)
- **[핵심 학습 개념]**: 해당 회차에서 다루는 React/TypeScript/라이브러리 개념 설명
  - 처음 등장하는 라이브러리(TanStack Query, Zustand 등)는 **"왜 이것이 필요한지"부터 설명**
  - TypeScript 개념은 `type`, `interface`, union, generic, utility type, nullable 처리처럼 실무에 직접 연결되는 순서로 설명
- **[프로젝트 구조 안내]**: 각 파일의 역할 설명
- **[추천 실습 순서]**: 어떤 파일부터, 어떤 순서로 채워 넣어야 효과적인지
- **[교육자의 팁]**: 흔히 실수하는 부분, 꼭 기억해야 할 포인트
- **[최종 기대 효과]**: 이 회차를 마치면 무엇을 할 수 있게 되는지
- **[심화 도전 과제]**: (선택) 추가로 도전해볼 만한 기능 1~2개

## 데이터 관련 규칙

### 목업 데이터 사용 시

- `src/data/mockData.ts`에 충분히 현실적인 더미 데이터를 생성해주세요.
- 배열 항목은 최소 6개 이상으로, UI를 채울 수 있을 만큼 제공합니다.
- 가능하면 도메인 타입을 함께 정의해서 데이터와 타입이 서로 맞물리도록 구성해주세요.

### API 사용 시

- 무료 공개 API를 사용합니다 (JSONPlaceholder, PokeAPI, DummyJSON 등).
- API URL은 상수로 분리해주세요.
- 로딩 상태와 에러 상태를 반드시 처리해주세요.
- 서버 응답 타입과 화면에서 사용하는 타입을 분리할 필요가 있으면 그 이유를 README에 설명해주세요.

## 주의사항

- **TypeScript를 사용합니다.** React 컴포넌트와 훅은 `.tsx`, 일반 유틸과 데이터는 `.ts`로 작성하세요.
- **CSS 파일을 별도로 만들지 마세요.** 모든 스타일은 Tailwind CSS 유틸리티 클래스로 처리합니다.
- 회차 초반에는 `components/` 폴더만 사용하고, 회차가 진행되며 `hooks/`, `store/`, `types/` 등이 자연스럽게 추가됩니다.
- practice 프로젝트는 반드시 에러 없이 실행 가능한 상태여야 합니다.
