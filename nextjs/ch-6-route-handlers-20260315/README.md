# 6회차 — Route Handlers (자체 API 엔드포인트 구축)

## 회차 정보

- **회차**: 6회차 (심화 — API & 뮤테이션 구간)
- **핵심 개념**: Route Handlers (`app/api/route.js`), GET/POST 메서드, `NextRequest`/`NextResponse`, API Key 마스킹
- **날짜**: 2026-03-15

---

## 주제 및 기획 의도

### 📡 외부 API 프록시 대시보드

외부 API(DummyJSON)의 데이터를 **Next.js Route Handler를 거쳐** 클라이언트에 안전하게 전달하는 프록시 패턴 대시보드를 구현합니다.

**왜 이 주제인가?**

실무에서는 외부 API Key를 클라이언트에 직접 노출하면 보안 문제가 발생합니다. Next.js의 Route Handlers를 사용하면 서버 측에서 외부 API를 호출하고, API Key를 숨긴 채 정제된 데이터만 클라이언트에 전달할 수 있습니다. 이 패턴은 프론트엔드 개발에서 가장 흔하게 사용하는 백엔드 연동 방식입니다.

---

## 학습 목표

이 예제를 통해 다음을 배우게 됩니다:

1. **Route Handler의 개념과 역할**: `app/api/` 폴더에 `route.js` 파일을 만들어 자체 API 엔드포인트를 구축하는 방법
2. **GET 요청 핸들러**: 외부 API를 프록시하여 클라이언트에 데이터를 전달하는 방법
3. **POST 요청 핸들러**: 클라이언트에서 보낸 데이터를 서버에서 검증하고 처리하는 방법
4. **쿼리 파라미터 처리**: `request.nextUrl.searchParams`를 활용한 파라미터 추출
5. **NextResponse API**: JSON 응답 생성, 상태 코드 설정, 에러 핸들링
6. **API Key 마스킹**: `.env.local` 환경변수를 활용한 보안 패턴 (`NEXT_PUBLIC_` 접두사 없이 서버 전용)

---

## React와의 차이점

| React (CRA/Vite) | Next.js (App Router) |
|---|---|
| 별도 백엔드 서버(Express 등) 필요 | `app/api/route.js`로 자체 API 구축 |
| API Key를 `.env`에 넣어도 빌드 시 번들에 포함 위험 | `NEXT_PUBLIC_` 없는 환경변수는 서버 전용 |
| CORS 이슈로 프록시 설정 필요 (`proxy` 설정) | 같은 도메인이므로 CORS 이슈 없음 |
| API 호출을 위해 `axios` 등 설치 | `fetch` 내장, `NextResponse` 제공 |

---

## 사전 준비

```bash
# 1. completed 프로젝트 실행 (완성본 확인)
cd completed
npm install
npm run dev
# → http://localhost:3000 에서 완성된 화면 확인

# 2. practice 프로젝트 실행 (실습)
cd ../practice
npm install
npm run dev
# → http://localhost:3001 (포트 충돌 시 자동 변경)
```

---

## 핵심 학습 개념

### 1. Route Handler란?

Next.js App Router에서 **서버 측 API 엔드포인트**를 만드는 방법입니다. `app/api/` 폴더 아래에 `route.js` 파일을 생성하면, 해당 경로가 자동으로 API 엔드포인트가 됩니다.

```
app/api/quotes/route.js → GET /api/quotes
app/api/recipes/route.js → GET /api/recipes
app/api/feedback/route.js → POST /api/feedback
```

**왜 필요한가?**
- 외부 API Key를 서버에 숨기고 싶을 때
- 외부 API 응답을 가공(필터, 변환)하여 클라이언트에 전달하고 싶을 때
- Webhook 수신, 폼 데이터 처리 등 서버 로직이 필요할 때

### 2. GET vs POST Handler

```javascript
// app/api/example/route.js

// GET 요청 처리 (데이터 조회)
export async function GET(request) {
  return NextResponse.json({ message: "Hello" });
}

// POST 요청 처리 (데이터 생성/수정)
export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ received: body }, { status: 201 });
}
```

### 3. 환경변수와 API Key 보안

```bash
# .env.local
# ❌ NEXT_PUBLIC_ 접두사 → 클라이언트에 노출됨!
NEXT_PUBLIC_API_KEY=exposed-to-browser

# ✅ 접두사 없음 → 서버에서만 접근 가능
API_KEY=safe-on-server-only
```

Route Handler는 서버에서 실행되므로 `process.env.API_KEY`에 안전하게 접근할 수 있습니다.

### 4. NextRequest & NextResponse

```javascript
import { NextResponse } from "next/server";

export async function GET(request) {
  // request: NextRequest 객체
  const { searchParams } = request.nextUrl;
  const limit = searchParams.get("limit"); // 쿼리 파라미터 추출

  // NextResponse.json()으로 JSON 응답 생성
  return NextResponse.json(
    { data: [...] },        // 응답 본문
    { status: 200 }          // 상태 코드 (선택)
  );
}
```

---

## 프로젝트 구조 안내

```
ch-route-handlers-20260315/
├── completed/                      # 완성본
│   ├── .env.local                  # 환경변수 (API Key, URL)
│   ├── app/
│   │   ├── layout.js               # 루트 레이아웃
│   │   ├── page.js                 # 메인 페이지 (서버 컴포넌트)
│   │   ├── globals.css             # Tailwind CSS
│   │   ├── api/
│   │   │   ├── quotes/route.js     # ★ GET - 명언 프록시 API
│   │   │   ├── recipes/route.js    # ★ GET - 레시피 프록시 API (검색 지원)
│   │   │   └── feedback/route.js   # ★ POST - 피드백 수신 API
│   │   └── components/
│   │       ├── Header.js           # 서버 컴포넌트 - 헤더
│   │       ├── ApiInfoCard.js      # 서버 컴포넌트 - API 정보 카드
│   │       ├── QuoteSection.js     # 클라이언트 컴포넌트 - 명언 표시
│   │       ├── RecipeSection.js    # 클라이언트 컴포넌트 - 레시피 검색
│   │       └── FeedbackForm.js     # 클라이언트 컴포넌트 - 피드백 폼
├── practice/                       # 실습용 (뼈대 + 힌트 주석)
│   └── (completed와 동일한 구조)
└── README.md                       # 이 파일
```

### 파일별 역할

| 파일 | 역할 | 유형 |
|---|---|---|
| `api/quotes/route.js` | 외부 명언 API 프록시 (GET) | Route Handler |
| `api/recipes/route.js` | 외부 레시피 API 프록시 + 검색 (GET) | Route Handler |
| `api/feedback/route.js` | 피드백 수신 및 검증 (POST) | Route Handler |
| `components/Header.js` | 헤더 UI | 서버 컴포넌트 |
| `components/ApiInfoCard.js` | API 엔드포인트 정보 표시 | 서버 컴포넌트 |
| `components/QuoteSection.js` | 명언 데이터 fetch 및 표시 | 클라이언트 컴포넌트 |
| `components/RecipeSection.js` | 레시피 검색 및 표시 | 클라이언트 컴포넌트 |
| `components/FeedbackForm.js` | 피드백 폼 제출 | 클라이언트 컴포넌트 |

---

## 추천 실습 순서

### Step 1: Route Handler 구현 (핵심!)

가장 먼저 API 엔드포인트를 완성하세요. 이것이 이번 회차의 **핵심 학습 대상**입니다.

1. **`app/api/quotes/route.js`** — 가장 단순한 GET 핸들러
   - 환경변수 읽기 (`process.env`)
   - 외부 API 호출 (`fetch`)
   - 데이터 가공 및 `NextResponse.json()` 반환

2. **`app/api/recipes/route.js`** — 쿼리 파라미터가 있는 GET 핸들러
   - `request.nextUrl.searchParams`로 파라미터 추출
   - 조건부 API URL 구성 (검색어 유무에 따라)

3. **`app/api/feedback/route.js`** — POST 핸들러
   - `request.json()`으로 요청 본문 파싱
   - 서버 측 유효성 검증
   - 상태 코드와 함께 응답 반환 (`{ status: 201 }`)

### Step 2: 클라이언트 컴포넌트에서 Route Handler 호출

Route Handler가 완성되면, 클라이언트 컴포넌트에서 호출하는 로직을 채우세요.

4. **`components/QuoteSection.js`** — `fetch("/api/quotes")`
5. **`components/RecipeSection.js`** — `fetch("/api/recipes?q=...")`
6. **`components/FeedbackForm.js`** — `fetch("/api/feedback", { method: "POST", ... })`

### Step 3: Tailwind CSS 스타일링

마지막으로 UI를 꾸며주세요.

7. **`components/Header.js`** — 헤더 스타일링
8. **`components/ApiInfoCard.js`** — API 정보 카드 스타일링
9. 나머지 컴포넌트의 Tailwind 클래스 채우기

---

## 교육자의 팁

### 흔히 하는 실수

1. **Route Handler에서 `export default` 사용**
   - ❌ `export default function handler(req, res) { ... }` (Pages Router 방식)
   - ✅ `export async function GET(request) { ... }` (App Router 방식)

2. **`NEXT_PUBLIC_` 접두사로 API Key 노출**
   - ❌ `NEXT_PUBLIC_API_KEY` → 브라우저 번들에 포함됨!
   - ✅ `API_KEY` → Route Handler(서버)에서만 접근 가능

3. **Route Handler 파일명 오류**
   - ❌ `app/api/quotes/index.js` (Pages Router 방식)
   - ✅ `app/api/quotes/route.js` (App Router 방식)

4. **POST 요청 시 Content-Type 누락**
   - `fetch`로 POST 요청 시 `headers: { "Content-Type": "application/json" }` 필수

### 꼭 기억할 포인트

- Route Handler는 **항상 서버에서 실행**됩니다 → `process.env` 안전 접근 가능
- `route.js`와 `page.js`는 **같은 폴더에 공존할 수 없습니다**
- Route Handler에서 반환하는 Response는 반드시 `NextResponse` 또는 Web API `Response`를 사용해야 합니다
- **단순한 폼 제출이나 데이터 뮤테이션은 다음 회차에서 배울 Server Actions이 더 적합**합니다. Route Handler는 외부 연동, Webhook 수신 등에 주로 사용합니다.

### 디버깅 팁

브라우저 개발자 도구(F12) → **Network 탭**에서:
- 클라이언트가 `/api/quotes`로 요청하는 것을 확인하세요
- 실제 외부 API URL(`dummyjson.com`)은 보이지 않아야 합니다
- Route Handler의 `console.log`는 **터미널(서버)**에서 확인됩니다 (브라우저 콘솔이 아님!)

---

## 최종 기대 효과

이 회차를 마치면:

- ✅ `app/api/route.js`로 자체 API 엔드포인트를 만들 수 있습니다
- ✅ GET/POST 요청을 처리하는 Route Handler를 구현할 수 있습니다
- ✅ 외부 API Key를 안전하게 숨기는 프록시 패턴을 이해합니다
- ✅ `NextRequest`와 `NextResponse` API를 활용할 수 있습니다
- ✅ 클라이언트에서 자체 API를 호출하는 전체 데이터 흐름을 이해합니다

---

## 심화 도전 과제

1. **PUT/DELETE 메서드 추가**: `feedback` Route Handler에 PUT(수정), DELETE(삭제) 메서드를 추가해보세요
2. **응답 캐싱 헤더 설정**: Route Handler에서 `Cache-Control` 헤더를 설정하여 응답 캐싱을 제어해보세요
   ```javascript
   return new NextResponse(JSON.stringify(data), {
     headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate" },
   });
   ```
