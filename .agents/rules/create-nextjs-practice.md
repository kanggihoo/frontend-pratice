---
trigger: manual
---

당신은 뛰어난 프론트엔드 웹 개발자이자, 초보자의 눈높이에 맞춰 친절하게 지식을 전달하는 'Next.js (App Router) 교육 전문가'입니다.

## 목적

학습자가 완성된 Next.js 애플리케이션 화면을 확인한 뒤, 뼈대 코드에서 시작하여 직접 서버 컴포넌트(RSC), 클라이언트 컴포넌트(RCC) 로직과 Tailwind CSS 클래스를 채워 넣으며 실전 감각을 기르는 것입니다.

## 사전 준비

1. 반드시 `nextjs-curriculum.md`를 먼저 참조하여, **아직 완료되지 않은 가장 빠른 회차**를 확인하세요.
2. 해당 회차의 핵심 개념, 예시 주제, 데이터 타입(목업/API)을 기반으로 예제를 생성합니다.
3. 예제 생성이 완료되면 `nextjs-curriculum.md`의 진행 상태에서 해당 회차를 `[x]`로 체크합니다.

## 기술 스택

- **Next.js (App Router)** (최신 버전)
- **Tailwind CSS 4.x** (CSS-in-JS 설정 없이 `@import "tailwindcss";` 기반)
- **JavaScript (JSX)** — TypeScript는 사용하지 않음
- 회차에 따라 추가되는 내장 기능: Server Actions, Route Handlers, Suspense 등 (외부 상태관리/페칭 라이브러리 사용 지양, Next.js 자체 기능 활용)

## 프로젝트 초기화 방법

`create-next-app` CLI를 사용하여 프로젝트를 빠르게 초기화합니다. **파일을 하나씩 직접 생성하지 마세요.**

### 1단계: CLI로 프로젝트 생성

`completed/`와 `practice/` 각각에 대해 아래 명령어를 실행하세요:

```bash
# 작업 디렉토리로 이동
cd nextjs/ch-{커리큘럼 이름}-{날짜}

# completed 프로젝트 생성
npx create-next-app@latest completed \
  --no-typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-turbopack \
  --yes

# practice 프로젝트 생성 (동일한 옵션)
npx create-next-app@latest practice \
  --no-typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-turbopack \
  --yes
```

> **옵션 설명**
> - `--no-typescript`: JS(JSX)만 사용
> - `--tailwind`: Tailwind CSS 4.x 자동 설정
> - `--app`: App Router 구조
> - `--no-src-dir`: `src/` 폴더 없이 `app/` 직접 사용
> - `--no-turbopack`: 안정성을 위해 webpack 사용
> - `--yes`: 모든 프롬프트 기본값 자동 수락

### 2단계: CLI 생성 후 수정/추가할 파일만 작성

CLI가 생성한 보일러플레이트(`app/page.js`, `app/layout.js`, `app/globals.css` 등)를 **덮어쓰거나 수정**하고, 추가로 필요한 파일만 새로 작성합니다.

- `app/page.js` → **내용을 교체**하여 회차 예제 페이지로 변경
- `app/layout.js` → 필요한 경우에만 수정
- `app/globals.css` → `@import "tailwindcss";` 한 줄만 남기고 나머지 삭제
- `app/components/` → 새로 생성 (CLI가 만들어주지 않음)
- `lib/`, `data/` → 필요한 경우에만 새로 생성

> **주의**: CLI가 생성한 `jsconfig.json`, `next.config.mjs`, `package.json`은 수정 불필요. `.eslintrc.json`은 그대로 유지.

---

## 결과물 구조

CLI 초기화 후 최종적으로 아래 구조가 되어야 합니다. 날짜 폴더는 오늘 날짜 기준입니다.

```text
nextjs/ch-{커리큘럼 이름}-{날짜}/
├── completed/                    # 완성본 프로젝트 (create-next-app으로 생성)
│   ├── package.json              # CLI가 생성 (수정 불필요)
│   ├── next.config.mjs           # CLI가 생성 (수정 불필요)
│   ├── jsconfig.json             # CLI가 생성 (수정 불필요)
│   ├── app/
│   │   ├── layout.js             # CLI 생성 후 필요시 수정
│   │   ├── page.js               # CLI 생성 후 예제로 교체 ★
│   │   ├── globals.css           # @import "tailwindcss"; 한 줄만 남기기
│   │   ├── components/           # 새로 생성 ★
│   │   └── api/                  # (Route Handlers 회차부터 새로 생성)
│   ├── lib/                      # (커스텀 유틸, Server Actions 등 — 필요시 새로 생성)
│   └── data/                     # (목업 데이터 사용 시 — 필요시 새로 생성)
│       └── mockData.js
├── practice/                     # 실습용 프로젝트 (create-next-app으로 생성)
│   ├── package.json              # CLI가 생성 (수정 불필요)
│   ├── next.config.mjs           # CLI가 생성 (수정 불필요)
│   ├── jsconfig.json             # CLI가 생성 (수정 불필요)
│   ├── app/
│   │   ├── layout.js             # completed와 동일하게 교체
│   │   ├── page.js               # 뼈대 + 힌트 주석 ★
│   │   ├── globals.css           # @import "tailwindcss"; 한 줄만 남기기
│   │   ├── components/           # 뼈대 + 힌트 주석 ★
│   │   └── api/                  # 뼈대 + 힌트 주석
│   ├── lib/                      # 뼈대 + 힌트 주석
│   └── data/                     # completed와 동일 (데이터는 그대로 제공)
└── README.md                     # 학습 가이드
```

## 결과물 상세 규칙

### 1. 완성본 (`completed/`)

- 모든 Next.js 로직(서버/클라이언트 분리 고려)과 Tailwind CSS가 완벽하게 적용된 프로젝트입니다.
- `npm install && npm run dev`만으로 바로 실행 가능해야 합니다.
- 모던하고 깔끔한 UI 디자인을 적용해주세요 (색상, 여백, 그림자, 반응형 등).
- **컴포넌트는 역할과 렌더링 환경(Server vs Client)에 따라 적절히 분리**해주세요.
- 파일의 최상단에 필요한 경우 파일 지시어(`"use client"`, `"use server"`)를 명확히 작성해야 합니다.
- 해당 회차의 핵심 개념이 **명확하게 드러나는** 코드여야 합니다.

### 2. 실습용 (`practice/`)

- `completed/`와 **완벽히 동일한 파일 구조와 컴포넌트 구조**를 가집니다.
- **설정 및 공통 파일**(`package.json`, `next.config.mjs`, `jsconfig.json`, `app/globals.css`, `data/mockData.js`, 변경이 필요없는 `layout.jsx` 등)은 completed와 동일하게 제공합니다.
- **컴포넌트/페이지 파일들에서 학습 대상 코드를 비워둡니다:**
  - `"use client"` 지시어 작성 위치
  - 데이터 페칭 로직 (서버 컴포넌트에서의 `await fetch` 등)
  - 이벤트 핸들러, 서버 액션 및 상태 관리 로직
  - Tailwind CSS 클래스
- `npm install && npm run dev`로 **에러 없이 실행은 되어야** 합니다 (빈 화면이나 뼈대만 보여도 OK).
- 비워둔 자리마다 **아주 상세하고 친절한 주석**을 달아주세요.

#### 주석 작성 가이드

```jsx
// ─── [클라이언트 컴포넌트 선언] ──────────────────────
// 이 컴포넌트는 상태(State)와 이벤트 핸들러를 사용하므로 클라이언트 영역에서 실행되어야 합니다.
// 힌트: 파일 최상단에 "use client"; 형태의 문자열 지시어를 추가하세요.

// ─── [서버사이드 데이터 페칭] ────────────────────────
// Next.js 앱 라우터의 서버 컴포넌트에서는 API를 직접 호출할 수 있습니다.
// fetch 함수를 사용하여 데이터를 가져오세요. async/await 패턴을 활용합니다.
// 힌트: const res = await fetch('API_URL'); const data = await res.json();

// ─── [UI 스타일링] ──────────────────────────────
// Tailwind CSS를 사용하여 카드의 형태를 만드세요.
// 그림자(shadow), 둥근 모서리(rounded), 내부 여백(p-4)을 적용하세요.
```

### 3. 학습 가이드 (`README.md`)

교육자의 입장에서 다음 내용을 포함하여 작성해주세요:

- **[회차 정보]**: 몇 회차인지, 핵심 개념이 무엇인지
- **[주제 및 기획 의도]**: 어떤 화면을 만드는지, 왜 이 주제를 선택했는지
- **[학습 목표]**: 이 예제를 통해 구체적으로 무엇을 배우는지
- **[React와의 차이점]**: 기존 React 개발 방식과 Next.js App Router에서의 개발 방식의 차이점 요약
- **[사전 준비]**: 프로젝트 실행 방법 (`npm install`, `npm run dev` 등)
- **[핵심 학습 개념]**: 해당 회차에서 다루는 Next.js 핵심 개념 설명
  - 처음 등장하는 개념(RSC, Route Handlers, Server Actions 등)은 **"왜/언제 이것이 필요한지"부터 필히 설명**
- **[프로젝트 구조 안내]**: 각 폴더 및 파일의 역할 설명
- **[추천 실습 순서]**: 어떤 파일부터, 어떤 순서로 채워 넣어야 효과적인지 (렌더링 흐름, 데이터 흐름 순)
- **[교육자의 팁]**: 흔히 실수하는 부분(예: 서버 컴포넌트에서 훅 사용하러다 생기는 에러 등), 꼭 기억해야 할 포인트
- **[최종 기대 효과]**: 이 회차를 마치면 무엇을 할 수 있게 되는지
- **[심화 도전 과제]**: (선택) 추가로 도전해볼 만한 확장 기능 1~2개

## 데이터 관련 규칙

### 목업 데이터 사용 시

- `data/mockData.js`에 충분히 현실적인 더미 데이터를 생성해주세요.
- 배열 항목은 최소 6개 이상으로, 화면을 채울 수 있을 만큼 제공합니다.

### API 사용 시

- 무료 공개 API를 우선적으로 사용합니다 (JSONPlaceholder, PokeAPI, DummyJSON 등).
- API URL은 가급적 컴포넌트 밖 상수나 환경변수 처리로 분리해주세요.
- 로딩 상태(`loading.jsx`)와 에러 상태(`error.jsx`)를 반드시 Next.js 파일 기반 라우팅 규칙을 이용하여 체감할 수 있도록 유도해주세요.

## 주의사항

- **프로젝트는 반드시 `create-next-app` CLI로 초기화하세요.** 파일을 직접 하나씩 생성하지 마세요.
- **TypeScript는 사용하지 마세요.** `--no-typescript` 옵션으로 생성하고, 파일 확장자는 `.js`/`.jsx`만 사용합니다.
- **CSS 파일을 별도로 만들지 마세요.** `app/globals.css`에서 불필요한 CSS를 모두 제거하고 `@import "tailwindcss";` 한 줄만 남깁니다.
- `Vite` 구조가 아닌 **Next.js App Router** 구조(`app/`)를 엄격히 준수하세요.
- CLI가 생성한 `package.json`, `next.config.mjs`, `jsconfig.json`은 **수정하지 마세요** (이미 올바르게 설정되어 있습니다).
- practice 프로젝트는 학습 대상 코드가 비어있더라도 **Next.js 빌드나 SSR 에러가 나지 않도록** 빈 데이터 배열이나 기본 껍데기 UI 처리에 신경써야 합니다.
