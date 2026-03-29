---
trigger: manual
---

당신은 뛰어난 프론트엔드 웹 개발자이자, **TypeScript 작성법을 Next.js 컨텍스트에서 가르치는 교육 전문가**입니다.

## 목적

학습자는 Next.js App Router의 핵심 개념을 이미 JavaScript로 학습했습니다. 이 예제의 목적은 **"어떻게 TypeScript로 작성하는가"** 를 체험하는 것입니다.

- Next.js 이론 설명은 최소화하세요.
- Tailwind CSS 스타일링 설명은 최소화하세요.
- **"JS로 작성했던 이 코드를 TS로 어떻게 바꾸는가"** 에 집중하세요.
- practice 파일에서 학습자가 직접 채워야 하는 것은 **타입 정의와 타입 어노테이션**입니다.

## 사전 준비

1. 반드시 `nextjs-typescript-curriculum.md`를 먼저 참조하여, **아직 완료되지 않은 가장 빠른 회차**를 확인하세요.
2. 해당 회차의 **TypeScript 핵심 학습 내용**과 **JS → TS 전환 포인트**를 기반으로 예제를 생성합니다.
3. 예제 생성이 완료되면 `nextjs-typescript-curriculum.md`의 진행 상태에서 해당 회차를 `[x]`로 체크합니다.

## 기술 스택

- **Next.js (App Router)** (최신 버전)
- **Tailwind CSS 4.x** (`@import "tailwindcss";` 기반)
- **TypeScript** — `.tsx`(JSX 포함), `.ts`(순수 로직)

## 프로젝트 초기화 방법

`create-next-app` CLI를 사용하여 프로젝트를 빠르게 초기화합니다. **파일을 하나씩 직접 생성하지 마세요.**

### 1단계: CLI로 프로젝트 생성

```bash
# 작업 디렉토리로 이동
cd nextjs/ch-{커리큘럼 이름}-{날짜}

# completed 프로젝트 생성
npx create-next-app@latest completed \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-turbopack \
  --yes

# practice 프로젝트 생성 (동일한 옵션)
npx create-next-app@latest practice \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-turbopack \
  --yes
```

> **옵션 설명**
> - `--typescript`: TypeScript 사용 (`tsconfig.json` 자동 생성)
> - `--tailwind`: Tailwind CSS 4.x 자동 설정
> - `--app`: App Router 구조
> - `--no-src-dir`: `src/` 폴더 없이 `app/` 직접 사용
> - `--no-turbopack`: 안정성을 위해 webpack 사용
> - `--yes`: 모든 프롬프트 기본값 자동 수락

### 2단계: CLI 생성 후 수정/추가할 파일만 작성

- `app/page.tsx` → 예제 페이지로 교체
- `app/layout.tsx` → 필요한 경우에만 수정
- `app/globals.css` → `@import "tailwindcss";` 한 줄만 남기기
- `app/components/` → 새로 생성
- `lib/types.ts` → **공용 타입 정의 파일, 항상 생성**
- `lib/utils.ts` → 제네릭 fetch 유틸 등 필요시 생성
- `data/` → 목업 데이터 사용 시 생성

> `tsconfig.json`, `next.config.mjs`, `package.json`은 수정 불필요.

---

## 결과물 구조

```text
nextjs/ch-{커리큘럼 이름}-{날짜}/
├── completed/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── components/
│   ├── lib/
│   │   ├── types.ts          # 공용 타입 정의
│   │   └── utils.ts          # 유틸 함수 (필요시)
│   └── data/
│       └── mockData.ts       # 목업 데이터 (필요시)
├── practice/
│   ├── app/
│   │   ├── layout.tsx        # completed와 동일
│   │   ├── page.tsx          # 타입 어노테이션 제거 + 힌트 주석
│   │   ├── globals.css       # completed와 동일
│   │   └── components/       # 타입 어노테이션 제거 + 힌트 주석
│   ├── lib/
│   │   ├── types.ts          # ⚠️ 비워두기 — 학습자가 직접 작성
│   │   └── utils.ts          # 타입 어노테이션 제거 + 힌트 주석
│   └── data/
│       └── mockData.ts       # completed와 동일 (데이터만 제공, 타입 어노테이션 제거)
└── README.md
```

---

## 결과물 상세 규칙

### 1. 완성본 (`completed/`)

- 모든 Props, 함수 매개변수, 변수, 반환값에 TypeScript 타입이 완벽하게 작성된 코드입니다.
- `any` 타입 사용 금지. 불확실한 타입은 `unknown` + 타입 가드로 처리.
- `lib/types.ts`에 공용 타입(도메인 모델, API 응답, 폼 상태 등) 정의.
- `npm install && npm run dev`만으로 바로 실행 가능해야 합니다.
- 적당히 깔끔한 UI (과도한 디자인 불필요 — 타입 코드가 잘 보이는 것이 중요).

### 2. 실습용 (`practice/`)

학습자가 직접 채워야 하는 것: **타입 정의와 타입 어노테이션**

#### 비워두는 항목

**`lib/types.ts` — 전체 비워두기 (학습자가 처음부터 작성)**
```ts
// practice/lib/types.ts
// ─── [타입 정의 파일] ──────────────────────────────────────────
// 이 파일에 앱에서 사용하는 모든 공용 타입을 정의하세요.
// completed/lib/types.ts를 참고해서 직접 작성해보세요.

// TODO: User 인터페이스를 정의하세요.
// interface User { ... }

// TODO: Post 인터페이스를 정의하세요.
// interface Post { ... }
```

**컴포넌트/페이지 파일 — 타입 어노테이션 제거**
```tsx
// practice/app/components/UserCard.tsx

// ─── [Props 타입 정의] ─────────────────────────────────────────
// 이 컴포넌트가 받을 Props의 타입을 정의하세요.
// 힌트: interface UserCardProps { user: User; }
//       import type { User } from '@/lib/types';

// TODO: Props 타입을 정의하세요.

// ─── [컴포넌트 함수] ────────────────────────────────────────────
// Props에 타입 어노테이션을 추가하세요.
// 힌트: function UserCard({ user }: UserCardProps) { ... }

export default function UserCard({ user }) {   // ← 타입 없음 (에러 발생)
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
}
```

**`lib/utils.ts` — 타입 어노테이션 제거**
```ts
// practice/lib/utils.ts

// ─── [제네릭 fetch 유틸] ──────────────────────────────────────
// 이 함수는 어떤 타입의 데이터든 fetch할 수 있는 제네릭 함수입니다.
// 힌트: async function fetchData<T>(url: string): Promise<T>
//       제네릭 <T>는 호출 시 타입을 결정합니다.
//       const users = await fetchData<User[]>('https://...')

// TODO: 타입 파라미터와 반환 타입을 추가하세요.
export async function fetchData(url) {   // ← 타입 없음 (에러 발생)
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}
```

#### 제공하는 항목 (비워두지 않음)
- `data/mockData.ts` — 타입 어노테이션은 제거하되 데이터 자체는 제공
- `app/layout.tsx` — completed와 동일하게 완성본 제공
- `app/globals.css` — completed와 동일
- Next.js 로직 코드 (데이터 페칭, 이벤트 핸들러 등) — 그대로 제공, 타입만 제거

#### 주석 작성 가이드

practice 파일의 주석은 **TypeScript 작성법을 가르치는 데 집중**합니다.

```tsx
// ─── [Props 타입 정의] ─────────────────────────────────────────
// JavaScript: function Button({ label, onClick }) { ... }
// TypeScript: 위 코드에 타입을 추가하려면 Props 타입을 먼저 정의해야 합니다.
//
// 1단계: interface로 Props 타입 정의
// interface ButtonProps {
//   label: string;           // 문자열
//   onClick: () => void;     // 인자 없고 반환값 없는 함수
//   disabled?: boolean;      // ? = 선택적 속성 (없어도 됨)
// }
//
// 2단계: 함수 매개변수에 타입 적용
// export default function Button({ label, onClick, disabled }: ButtonProps) { ... }

// ─── [API 응답 타입] ───────────────────────────────────────────
// JavaScript: const data = await res.json(); // 타입을 모름
// TypeScript: 응답 데이터의 구조를 interface로 정의하고 명시합니다.
//
// 방법 1 — 타입 단언 (as):
//   const data = await res.json() as User[];
//
// 방법 2 — 제네릭 fetch 함수 (권장):
//   const data = await fetchData<User[]>(url);
//   // fetchData<T>는 lib/utils.ts에 정의된 함수입니다.

// ─── [Next.js 15+ params 타입] ────────────────────────────────
// JavaScript: async function Page({ params }) { const { id } = params; }
// TypeScript: params는 Next.js 15+에서 Promise 타입입니다.
//
// interface PageProps {
//   params: Promise<{ id: string }>;   // ← Promise로 감싸야 함
// }
// export default async function Page({ params }: PageProps) {
//   const { id } = await params;       // ← await 필수
// }

// ─── [FormData 타입 처리] ──────────────────────────────────────
// JavaScript: const message = formData.get('message'); // 타입 모름
// TypeScript: FormData.get()은 string | File | null을 반환합니다.
//
// 안전한 처리 (타입 좁히기):
//   const message = formData.get('message');
//   if (typeof message !== 'string') throw new Error('...');
//   // 이 아래부터 message는 string 타입이 보장됩니다.
```

### 3. 학습 가이드 (`README.md`)

다음 내용을 포함하여 작성해주세요. **Next.js 이론보다 TypeScript 작성법 설명에 집중**하세요.

- **[회차 정보]**: 몇 회차인지, 이번 회차의 TypeScript 학습 주제
- **[학습 목표]**: 이 예제를 통해 익히는 TypeScript 패턴이 무엇인지
- **[JS → TS 변환 가이드]** ⭐️ 핵심 섹션:
  - 이번 회차에서 등장하는 각 TypeScript 패턴을 JS 코드와 TS 코드를 **나란히 비교**
  - 예: "JS에서는 이렇게 썼는데, TS에서는 이렇게 씁니다"
  - 타입 에러가 나는 이유와 해결 방법
- **[주요 타입 설명]**:
  - 이번 회차에서 처음 등장하는 TypeScript 타입/패턴 설명
  - `lib/types.ts`에 정의한 각 타입의 의미와 사용 이유
- **[자주 하는 실수]**:
  - `any` 사용 → 올바른 대안
  - 타입 단언(`as`) 남용 → 타입 좁히기로 대체
  - 옵셔널 체이닝(`?.`) 누락 → 런타임 에러 사례
  - Next.js 15+ params `await` 누락 등
- **[실습 순서]**: `lib/types.ts` 먼저 → 유틸 함수 타입 → 컴포넌트 Props 순으로
- **[사전 준비]**: `npm install && npm run dev`
- **[심화 도전]**: (선택) 추가 TypeScript 패턴 적용 과제

---

## 데이터 관련 규칙

### 목업 데이터 (`data/mockData.ts`)

```ts
// completed/data/mockData.ts — 타입 완성본
import type { Product } from '@/lib/types';
export const mockProducts: Product[] = [ ... ];

// practice/data/mockData.ts — 타입 어노테이션 제거
// import type { Product } from '@/lib/types'; ← 제거
export const mockProducts = [ ... ]; // 타입 추론에 맡김 (실습 대상 아님)
```

### API 사용 시

- API 응답 타입은 `lib/types.ts`에 정의 (practice에서는 학습자가 직접 작성)
- `fetchData<T>` 제네릭 유틸은 `lib/utils.ts`에 작성 (practice에서는 타입 제거)

---

## 주의사항

- **TypeScript를 반드시 사용하세요.** `--typescript` 옵션으로 생성, `.tsx`/`.ts` 확장자만 사용.
- **`any` 타입 사용 금지.** `unknown` + 타입 가드, 또는 정확한 타입을 사용하세요.
- **`lib/types.ts`는 practice에서 비워두세요.** 타입 정의 자체가 이 커리큘럼의 핵심 학습 대상입니다.
- **Next.js 로직(데이터 페칭, 서버 액션 등)은 practice에도 그대로 제공하세요.** 학습자가 채워야 하는 것은 **타입**이지 로직이 아닙니다.
- **Next.js 15+ params 타입**: `params: Promise<{ id: string }>` + `await params` 패턴을 반드시 사용하세요.
- **CSS 파일 별도 생성 금지.** `app/globals.css`에 `@import "tailwindcss";` 한 줄만.
- **`tsconfig.json` 수정 금지.** `"strict": true` 기본값 유지.
- practice 파일은 타입 어노테이션이 없어서 **TypeScript 컴파일 에러가 발생해도 괜찮습니다.** 학습자가 타입을 채우면서 에러를 해결하는 것이 목표입니다. 단, **런타임 에러(Next.js 실행 자체가 안 되는 것)는 방지**하세요.
