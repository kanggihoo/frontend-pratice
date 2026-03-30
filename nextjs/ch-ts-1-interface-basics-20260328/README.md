# 회차 1 — TypeScript 기초: `interface`, `tsconfig`, `React.ReactNode`

> Next.js App Router + Tailwind CSS v4 + TypeScript
> 예제 주제: 회사 소개 사이트 (정적 데이터)

---

## 학습 목표

이 예제를 통해 익히는 TypeScript 패턴:

1. **`interface`로 Props 타입 정의** — 컴포넌트가 받는 Props를 명확히 선언하는 법
2. **선택적 속성 `?`** — 없어도 되는 Props를 `subtitle?: string` 형태로 표현하는 법
3. **`children: React.ReactNode`** — layout/wrapper 컴포넌트에서 children을 받는 법
4. **`import type`** — 타입만 가져올 때 쓰는 import 방식
5. **배열 타입 `T[]`** — `HistoryItem[]` 처럼 배열 Props를 표현하는 법

---

## JS → TS 변환 가이드

### 1. Props 타입 정의

**JavaScript**

```js
// 타입 정보가 전혀 없음 — bar가 뭔지, 있어야 하는지 알 수 없음
function Foo({ bar }) {
  return <p>{bar}</p>;
}
```

**TypeScript**

```tsx
// 1단계: interface로 Props 구조를 명시한다
interface FooProps {
  bar: string;
}

// 2단계: 함수 매개변수에 타입을 붙인다
function Foo({ bar }: FooProps) {
  return <p>{bar}</p>;
}
```

> **왜?** TypeScript는 Props의 타입을 알아야 잘못된 값을 전달할 때 컴파일 에러를 냅니다.
> `<Foo bar={123} />`처럼 잘못 쓰면 즉시 에러가 발생합니다.

---

### 2. 선택적 속성 `?`

**JavaScript**

```js
// subtitle가 있을 수도 없을 수도 — 코드를 읽기 전엔 모름
function Card({ title, subtitle }) { ... }
```

**TypeScript**

```tsx
interface CardProps {
  title: string;    // 필수 — 없으면 에러
  subtitle?: string; // 선택적 — 없어도 됨 (undefined가 됨)
}

function Card({ title, subtitle }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>} {/* subtitle이 있을 때만 렌더링 */}
    </div>
  );
}

// 두 방식 모두 유효
<Card title="제목" subtitle="부제목" />
<Card title="제목" />               // subtitle 생략 가능
```

---

### 3. `children: React.ReactNode`

**JavaScript**

```js
// children을 받는다는 사실을 타입으로 알 수 없음
function Layout({ children }) {
  return <main>{children}</main>;
}
```

**TypeScript**

```tsx
interface LayoutProps {
  children: React.ReactNode; // JSX, string, number, null, undefined 모두 허용
}

function Layout({ children }: LayoutProps) {
  return <main>{children}</main>;
}
```

**`React.ReactNode`가 허용하는 값:**
| 타입 | 예시 |
|------|------|
| JSX Element | `<div>Hello</div>` |
| string | `"안녕하세요"` |
| number | `42` |
| null / undefined | `null`, `undefined` |
| boolean | `false` (렌더링 안 됨) |
| 위 타입들의 배열 | `[<div/>, <span/>]` |

1. React.ReactNode란 무엇인가요?
   React.ReactNode는 React가 화면에 그릴 수 있는(렌더링할 수 있는) 모든 것을 의미하는 가장 포괄적인 타입입니다.

이 타입에는 다음과 같은 것들이 포함됩니다:

JSX 요소: <div>, <MyComponent /> 등
원시 타입: 문자열(string), 숫자(number), 불리언(boolean)
특수 값: null, undefined (화면에 아무것도 안 나타남)
Fragment: <>...</>
배열: 위 항목들의 배열 (리스트 렌더링 시 사용)
그래서 보통 layout.tsx나 고차 컴포넌트(HOC)에서 children 속성을 정의할 때 가장 많이 사용합니다. "어떤 형태의 자식이라도 다 받을 수 있다"는 뜻이죠.

---

### 4. `import type`

**JavaScript**

```js
import { companyInfo } from "@/data/mockData";
```

**TypeScript**

```ts
// 타입만 import할 때는 import type을 사용합니다
import type { CompanyInfo } from "@/lib/types";
// 런타임 번들에 포함되지 않아 번들 크기를 줄입니다
```

> **규칙:** 타입/인터페이스만 가져올 때는 `import type`을 사용하세요.

---

### 5. 배열 타입

**JavaScript**

```js
function Timeline({ items }) { ... }
```

**TypeScript**

```tsx
import type { HistoryItem } from "@/lib/types";

interface TimelineProps {
  items: HistoryItem[]; // 방식 1: 더 간결 (권장)
  // items: Array<HistoryItem>; // 방식 2: 동일한 의미
}

function Timeline({ items }: TimelineProps) {
  return items.map((item) => <li key={item.year}>{item.title}</li>);
}
```

---

## 주요 타입 설명

### `lib/types.ts`에 정의한 타입들

```ts
// 회사 기본 정보 — page.tsx에서 HeroSection에 전달
interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  founded: number;
  employeeCount: number;
}

// 팀 멤버 — TeamCard 컴포넌트의 member prop 타입
interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string; // 없어도 되는 속성
}

// 서비스 — ServiceCard 컴포넌트의 service prop 타입
interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// 연혁 — HistoryTimeline 컴포넌트의 items 배열 요소 타입
interface HistoryItem {
  year: number;
  title: string;
  description: string;
}
```

---

## 자주 하는 실수

### 1. `any` 사용 — 절대 금지

```tsx
// ❌ 잘못된 방법 — any는 TypeScript를 쓰는 의미가 없어집니다
function Card({ member }: { member: any }) { ... }

// ✅ 올바른 방법 — 정확한 타입을 정의합니다
interface CardProps {
  member: TeamMember;
}
function Card({ member }: CardProps) { ... }
```

### 2. Props에 타입 없이 사용

```tsx
// ❌ 에러: Parameter 'member' implicitly has an 'any' type
function TeamCard({ member }) { ... }

// ✅ interface를 정의하고 타입을 붙입니다
function TeamCard({ member }: TeamCardProps) { ... }
```

### 3. 선택적 속성을 무조건 렌더링

```tsx
// ❌ subtitle이 undefined일 때 런타임 에러 가능
function Card({ title, subtitle }: CardProps) {
  return <p>{subtitle.toUpperCase()}</p>; // subtitle이 없으면 에러!
}

// ✅ 옵셔널 체이닝(?.) 또는 조건부 렌더링 사용
function Card({ title, subtitle }: CardProps) {
  return <p>{subtitle?.toUpperCase()}</p>;
  // 또는
  return subtitle ? <p>{subtitle}</p> : null;
}
```

---

## 실습 순서

```
1. practice/lib/types.ts     → 4개의 interface 직접 작성
2. practice/app/layout.tsx   → RootLayoutProps interface + children 타입
3. practice/app/components/SectionWrapper.tsx → subtitle?(선택적) + children: ReactNode
4. practice/app/components/HeroSection.tsx    → CompanyInfo import + Props 타입
5. practice/app/components/TeamCard.tsx       → TeamMember import + Props 타입
6. practice/app/components/ServiceCard.tsx    → Service import + Props 타입
7. practice/app/components/HistoryTimeline.tsx → HistoryItem[] 배열 타입
```

> **팁**: `lib/types.ts`를 먼저 완성해야 나머지 파일의 `import type`이 동작합니다.

---

## 사전 준비

```bash
# completed 실행 (완성본 확인)
cd completed && npm install && npm run dev

# practice 실행 (실습)
cd practice && npm install && npm run dev
```

> practice는 타입 어노테이션이 없어서 TypeScript 에러가 발생합니다.
> 에러를 하나씩 해결하면서 타입을 채워나가는 것이 목표입니다.

---

## tsconfig 이해

`tsconfig.json`은 수정하지 않아도 됩니다. 기본 설정에서 중요한 옵션:

```json
{
  "compilerOptions": {
    "strict": true, // 엄격한 타입 검사 — 타입 없으면 에러
    "paths": {
      "@/*": ["./*"] // @/lib/types → ./lib/types로 해석
    }
  }
}
```

- **`"strict": true`**: `any` 암묵적 사용을 금지합니다. Props에 타입이 없으면 에러가 납니다.
- **`"@/*"` alias**: `import { X } from '@/lib/types'`처럼 절대 경로로 import할 수 있습니다.

---

## 심화 도전 (선택)

타입을 모두 채운 후 추가로 도전해보세요:

1. **`Readonly<T>` 적용**: Props를 읽기 전용으로 만들어보세요.

   ```tsx
   function TeamCard({ member }: Readonly<TeamCardProps>) { ... }
   ```

2. **`data/mockData.ts`에 타입 명시**: `import type`으로 가져와 변수에 타입을 붙여보세요.

   ```ts
   import type { CompanyInfo } from '@/lib/types';
   export const companyInfo: CompanyInfo = { ... };
   ```

3. **새 컴포넌트 추가**: `ContactSection` 컴포넌트를 직접 만들고 Props interface를 정의해보세요.
