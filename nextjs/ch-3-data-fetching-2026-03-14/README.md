# 회차 3 — 서버사이드 데이터 페칭 및 렌더링 전략

## 주제 및 기획 의도

**서버사이드 유저 대시보드** — JSONPlaceholder API에서 유저, 게시글, 앨범 데이터를 서버에서 가져와 대시보드 형태로 렌더링합니다.

이 주제를 선택한 이유는 대시보드가 **여러 API를 동시에 호출하고, 데이터를 가공하여 다양한 형태로 표현**하는 전형적인 서버사이드 렌더링 시나리오이기 때문입니다.

---

## 학습 목표

1. **서버 컴포넌트에서 `async/await`로 데이터 가져오기** — `useEffect` 없이 직관적으로 데이터 페칭
2. **`Promise.all`을 활용한 병렬 데이터 페칭** — 여러 API를 동시에 호출하여 성능 최적화
3. **서버에서 데이터 가공 후 자식 컴포넌트에 전달** — 서버 로직과 UI 분리 패턴
4. **Next.js 15+ 기본 캐싱 정책 이해** — 기본적으로 캐시되지 않는 fetch의 동작 방식

---

## React와의 차이점

| 구분 | React (기존 방식) | Next.js App Router (서버 컴포넌트) |
|------|-------------------|-----------------------------------|
| 데이터 페칭 위치 | 브라우저 (클라이언트) | 서버 |
| 페칭 방법 | `useEffect` + `useState` + `fetch` | `async function` + `await fetch` |
| 로딩 상태 | `const [loading, setLoading] = useState(true)` | 자동 (서버에서 완료 후 전달) |
| API 키 보안 | `.env`에 넣어도 브라우저에 노출 위험 | 서버에서만 실행, 클라이언트에 절대 노출되지 않음 |
| SEO | 초기 HTML이 비어있음 (CSR) | 완성된 HTML 전달 (SSR) |
| JS 번들 크기 | 페칭 로직이 번들에 포함됨 | 서버 코드는 번들에 포함되지 않음 |

### 코드 비교

**React 방식 (useEffect):**
```jsx
"use client";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>로딩 중...</p>;
  return <div>{/* 유저 목록 렌더링 */}</div>;
}
```

**Next.js 서버 컴포넌트 방식:**
```jsx
// "use client" 없음 = 서버 컴포넌트 (기본값)

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
}

export default async function Dashboard() {
  const users = await getUsers(); // useState, useEffect 불필요!
  return <div>{/* 유저 목록 렌더링 */}</div>;
}
```

---

## 사전 준비

```bash
# 완성본 실행
cd completed
npm install
npm run dev
# → http://localhost:3000 에서 확인

# 실습본 실행 (별도 터미널)
cd practice
npm install
npm run dev -- --port 3001
# → http://localhost:3001 에서 확인
```

---

## 핵심 학습 개념

### 1. 서버 컴포넌트에서의 데이터 페칭

Next.js App Router에서 **모든 컴포넌트는 기본적으로 서버 컴포넌트**입니다.
서버 컴포넌트는 서버에서만 실행되기 때문에:

- 컴포넌트 함수를 `async`로 선언할 수 있습니다
- `await`를 사용하여 데이터를 직접 가져올 수 있습니다
- `useState`, `useEffect`가 필요 없습니다
- API 키 등 민감한 정보가 클라이언트에 노출되지 않습니다

```jsx
// 이것이 가능한 이유: 서버에서만 실행되니까!
export default async function Page() {
  const data = await fetch("https://api.example.com/data");
  const json = await data.json();
  return <div>{json.title}</div>;
}
```

### 2. 병렬 데이터 페칭 (`Promise.all`)

여러 API를 호출할 때는 `Promise.all`을 사용하면 **모든 요청이 동시에 시작**됩니다.

```
순차 호출: A(200ms) → B(200ms) → C(200ms) = 총 600ms
병렬 호출: A, B, C 동시 시작 = 총 ~200ms (가장 느린 것 기준)
```

### 3. Next.js 15+ 캐싱 정책

Next.js 15부터 `fetch`는 **기본적으로 캐시하지 않습니다** (`no-store`가 기본값).
이전 버전(14 이하)에서는 기본적으로 캐시했으므로 주의가 필요합니다.

- 캐시 원할 때: `fetch(url, { cache: "force-cache" })`
- 일정 시간마다 갱신: `fetch(url, { next: { revalidate: 60 } })` (60초)
- 캐시 안 함 (기본값): `fetch(url)` 또는 `fetch(url, { cache: "no-store" })`

### 4. 렌더링 전략 개요

| 전략 | 약어 | 설명 | 사용 시점 |
|------|------|------|----------|
| Static Site Generation | SSG | 빌드 시 HTML 생성 | 변경 없는 콘텐츠 |
| Server-Side Rendering | SSR | 요청마다 서버에서 렌더링 | 실시간 데이터 필요 시 |
| Incremental Static Regeneration | ISR | 일정 주기로 정적 페이지 갱신 | 자주 바뀌지 않는 콘텐츠 |
| Streaming | - | 점진적 렌더링 (Suspense) | 일부만 먼저 보여주고 싶을 때 |

> 이번 회차에서는 SSR(서버사이드 렌더링)에 집중합니다. ISR과 Streaming은 이후 회차에서 다룹니다.

---

## 프로젝트 구조 안내

```
ch-3-data-fetching-2026-03-14/
├── completed/                         # 완성본
│   └── app/
│       ├── layout.js                  # 루트 레이아웃 (헤더 포함)
│       ├── page.js                    # ★ 메인 페이지 (async 서버 컴포넌트, 데이터 페칭)
│       ├── globals.css                # Tailwind CSS import
│       └── components/
│           ├── UserStatsCards.js       # 통계 카드 (서버 컴포넌트)
│           ├── UserTable.js           # 유저 테이블 (서버 컴포넌트)
│           └── UserAlbums.js          # 앨범 카드 그리드 (서버 컴포넌트)
├── practice/                          # 실습용 (뼈대 + 힌트 주석)
│   └── (completed와 동일 구조, 학습 대상 코드가 비어있음)
└── README.md                          # 이 파일
```

---

## 추천 실습 순서

### Step 1: `page.js` — API 베이스 URL 설정
- `API_BASE` 상수에 JSONPlaceholder URL을 입력하세요
- `https://jsonplaceholder.typicode.com`

### Step 2: `page.js` — 데이터 페칭 함수 완성
- `getUsers()`, `getPosts()`, `getAlbums()` 함수 내부를 채우세요
- `fetch` → `res.ok` 체크 → `res.json()` 반환 패턴

### Step 3: `page.js` — `Promise.all`로 병렬 호출
- 세 함수를 `Promise.all`로 묶어 동시에 실행하세요
- 구조 분해 할당으로 결과를 받으세요

### Step 4: `page.js` — 데이터 가공
- `users.map()`을 사용하여 각 유저에 `postCount`, `albumCount` 추가
- `posts.filter()`, `albums.filter()`로 유저별 데이터 집계

### Step 5: `page.js` — 자식 컴포넌트에 props 전달
- `UserStatsCards`, `UserTable`, `UserAlbums`에 적절한 props를 전달하세요

### Step 6: 컴포넌트 파일들 — Tailwind CSS 스타일링
- `UserStatsCards.js`: stats 배열 정의 + 그리드 레이아웃
- `UserTable.js`: 테이블 스타일 + 배지(pill) 스타일
- `UserAlbums.js`: `getUserName` 유틸리티 함수 + 카드 그리드

---

## 교육자의 팁

### 자주 하는 실수들

1. **`async`를 빼먹는 실수**
   ```jsx
   // ❌ async가 없으면 await를 사용할 수 없음!
   export default function Home() {
     const users = await getUsers(); // SyntaxError!
   }

   // ✅ async를 반드시 추가
   export default async function Home() {
     const users = await getUsers();
   }
   ```

2. **서버 컴포넌트에서 훅 사용 시도**
   ```jsx
   // ❌ 서버 컴포넌트에서 useState를 사용할 수 없음!
   export default async function Page() {
     const [data, setData] = useState([]); // Error!
   }
   ```
   - 서버 컴포넌트에서는 `useState`, `useEffect`, `useRef` 등 React 훅을 사용할 수 없습니다
   - 훅이 필요하면 별도의 클라이언트 컴포넌트(`"use client"`)를 만들어야 합니다

3. **에러 핸들링 누락**
   ```jsx
   // ❌ 네트워크 실패 시 대응 불가
   const res = await fetch(url);
   const data = await res.json();

   // ✅ 에러 확인 후 처리
   const res = await fetch(url);
   if (!res.ok) throw new Error("데이터 로딩 실패");
   const data = await res.json();
   ```

4. **순차 호출로 인한 성능 저하**
   - 독립적인 API 호출은 반드시 `Promise.all`로 병렬 처리하세요
   - 서로 의존하는 요청만 순차적으로 호출하세요

---

## 최종 기대 효과

이 회차를 마치면:
- 서버 컴포넌트에서 `async/await`로 데이터를 가져오는 패턴을 자유롭게 사용할 수 있습니다
- `Promise.all`을 활용한 병렬 데이터 페칭으로 성능을 최적화할 수 있습니다
- `useEffect`를 사용하지 않고도 데이터를 렌더링할 수 있다는 것을 이해합니다
- 서버에서 데이터를 가공한 후 자식 컴포넌트에 전달하는 패턴을 익힙니다

---

## 심화 도전 과제

1. **개별 유저 상세 페이지 추가**: `app/users/[id]/page.js`를 만들어 특정 유저의 게시글과 앨범을 보여주세요 (4회차 동적 라우팅 선행 학습)
2. **캐싱 옵션 실험**: `fetch`에 `{ next: { revalidate: 10 } }` 옵션을 추가하고, 개발 서버를 재시작하여 캐싱 동작을 관찰해 보세요
