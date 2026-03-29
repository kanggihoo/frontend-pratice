# 회차 3 — API 응답 타입: `interface`, 제네릭 `fetchData<T>`

> **Next.js TypeScript 학습 커리큘럼 3회차**
> Next.js App Router + Tailwind CSS v4 + TypeScript

---

## 학습 목표

이번 회차에서 익히는 TypeScript 패턴:

1. **API 응답 구조를 `interface`로 정의하기** — 외부 API가 어떤 데이터를 돌려주는지 타입으로 표현
2. **제네릭 `fetchData<T>` 함수 작성하기** — 어떤 타입이든 처리할 수 있는 재사용 가능한 fetch 유틸
3. **`interface` vs `type` 선택 기준** — 언제 무엇을 쓰는지 이해하기
4. **`import type`의 의미** — 런타임 번들에서 타입만 제거하는 최적화

---

## JS → TS 변환 가이드

### 1. API 응답 데이터에 타입 붙이기

**JavaScript** — 타입이 없어서 `data`가 뭔지 알 수 없음:
```js
const res = await fetch('https://jsonplaceholder.typicode.com/users');
const data = await res.json();  // data: any
console.log(data[0].name);      // 자동완성 없음, 오타가 있어도 에러 안 남
```

**TypeScript — 방법 1: 타입 단언 (`as`)**
```ts
const res = await fetch('https://jsonplaceholder.typicode.com/users');
const data = await res.json() as User[];  // 반환값을 User[]로 단언
console.log(data[0].name);               // 자동완성 작동
```

**TypeScript — 방법 2: 제네릭 fetch 유틸 (권장)**
```ts
const data = await fetchData<User[]>('https://jsonplaceholder.typicode.com/users');
// fetchData<T>가 내부에서 타입 처리를 해줌
console.log(data[0].name);  // User[] 타입으로 자동완성 작동
```

---

### 2. `interface`로 API 응답 구조 정의하기

**JavaScript** — 구조를 코드 어디서도 명시하지 않음:
```js
// user가 어떤 필드를 가지는지 코드만 봐서는 알 수 없음
function showUser(user) {
  console.log(user.name, user.email);
}
```

**TypeScript** — `interface`로 구조를 명확히 정의:
```ts
interface User {
  id: number;       // 숫자
  name: string;     // 문자열
  email: string;
  address: Address; // 다른 interface를 타입으로 사용
}

function showUser(user: User) {
  console.log(user.name, user.email);
  // user.typo  ← 없는 필드 접근 시 즉시 에러
}
```

---

### 3. 제네릭 함수 `<T>` 이해하기

**JavaScript** — 반환값의 타입을 알 수 없음:
```js
async function fetchData(url) {
  const res = await fetch(url);
  return res.json();  // 반환 타입: unknown
}

const users = await fetchData('...');  // users 타입: unknown
```

**TypeScript** — 제네릭 `<T>`로 호출 시점에 타입을 결정:
```ts
async function fetchData<T>(url: string): Promise<T> {
  //                    ^^^ 타입 파라미터: 호출할 때 결정됨
  const res = await fetch(url);
  return res.json() as Promise<T>;
}

const users = await fetchData<User[]>('...');
//                            ^^^^^^ 여기서 T = User[]로 결정
// users 타입: User[]  ← 자동완성, 타입 체크 모두 작동
```

**같은 함수를 여러 타입에 재사용:**
```ts
const users = await fetchData<User[]>(usersUrl);   // T = User[]
const posts = await fetchData<Post[]>(postsUrl);   // T = Post[]
const todos = await fetchData<Todo[]>(todosUrl);   // T = Todo[]
```

---

### 4. `interface` vs `type` 선택 기준

```ts
// ✅ interface: 객체 구조(shape)를 정의할 때
interface User {
  id: number;
  name: string;
}

// ✅ type: 유니언, 교차, 리터럴 타입 조합할 때
type Status = 'pending' | 'completed' | 'failed';   // 유니언
type AdminUser = User & { role: string };             // 교차 타입

// 이번 회차에서는 API 응답 구조 정의이므로 모두 interface 사용
```

---

### 5. `import type` 사용법

```ts
// ✅ 권장: 타입만 import — 런타임 번들에 포함되지 않음
import type { User } from '@/lib/types';

// 일반 import: 런타임에도 포함됨 (타입은 빌드 후 제거되지만 명시적으로 구분하는 게 좋음)
import { User } from '@/lib/types';
```

---

## 주요 타입 설명

### `lib/types.ts`에 정의한 타입들

| 타입 | 설명 | 사용 위치 |
|------|------|-----------|
| `Address` | 주소 정보 객체 | `User.address`의 타입 |
| `Company` | 회사 정보 객체 | `User.company`의 타입 |
| `User` | JSONPlaceholder 유저 | `UserCard` Props, `fetchData<User[]>` |
| `Post` | 게시글 | `fetchData<Post[]>` |
| `Todo` | 할 일 항목 | `fetchData<Todo[]>` |
| `DashboardData` | 대시보드 전체 데이터 | 여러 타입을 묶어 전달할 때 |

### `lib/utils.ts`의 제네릭 함수

```ts
// T: 타입 파라미터 — 호출할 때 구체적인 타입으로 교체됨
async function fetchData<T>(url: string): Promise<T>
```

---

## 자주 하는 실수

### 실수 1: `any` 타입 사용

```ts
// ❌ 나쁜 예: any를 쓰면 TypeScript의 장점이 사라짐
const data = await res.json() as any;
data.noneExistentField;  // 에러가 안 남

// ✅ 좋은 예: 정확한 타입 사용
const data = await fetchData<User[]>(url);
data[0].noneExistentField;  // 즉시 타입 에러 발생
```

### 실수 2: 제네릭 생략

```ts
// ❌ 제네릭 없이 fetchData 호출
const users = await fetchData(url);
// users 타입: unknown → 이후 users.map() 등에서 에러 발생

// ✅ 제네릭 타입 명시
const users = await fetchData<User[]>(url);
// users 타입: User[] → 정상 작동
```

### 실수 3: 중첩 객체 타입 빠뜨리기

```ts
// ❌ 중첩 객체를 any로 처리
interface User {
  address: any;  // address 내부 필드에 타입 없음
}

// ✅ 중첩 객체도 별도 interface로 정의
interface Address {
  street: string;
  city: string;
}
interface User {
  address: Address;  // 구체적인 타입 사용
}
```

### 실수 4: `as` 타입 단언 남용

```ts
// ⚠️ 타입 단언은 TypeScript를 속이는 것 — 실제 타입이 다르면 런타임 에러
const data = await res.json() as SomeWrongType;

// ✅ 제네릭 fetch 유틸을 사용하면 타입이 올바르게 흐름
const data = await fetchData<User[]>(url);
```

---

## 실습 순서

1. **`practice/lib/types.ts`** — 6개 interface 작성 (`Address`, `Company`, `User`, `Post`, `Todo`, `DashboardData`)
2. **`practice/lib/utils.ts`** — `fetchData` 함수에 제네릭 `<T>`와 반환 타입 `Promise<T>` 추가
3. **`practice/app/components/StatsBar.tsx`** — `StatsBarProps`, `StatItemProps` interface 정의 + 매개변수에 타입 적용
4. **`practice/app/components/UserCard.tsx`** — `User` import + `UserCardProps` 정의 + 매개변수에 타입 적용
5. **`practice/app/page.tsx`** — `User`, `Post`, `Todo` import + `fetchData<T>` 제네릭 타입 지정

---

## 사전 준비

```bash
# completed 실행
cd completed && npm install && npm run dev
# → http://localhost:3000

# practice 실행 (다른 터미널)
cd practice && npm install && npm run dev
# → http://localhost:3001
```

---

## 심화 도전

1. `fetchData` 함수에 에러 응답을 처리하는 커스텀 에러 타입을 추가해보세요:
   ```ts
   class FetchError extends Error {
     constructor(public status: number, message: string) {
       super(message);
     }
   }
   ```

2. `User`에서 특정 필드만 필요한 `UserSummary` 타입을 `Pick`으로 만들어보세요:
   ```ts
   type UserSummary = Pick<User, 'id' | 'name' | 'email'>;
   ```
   (이 패턴은 12회차 유틸리티 타입에서 정식으로 다룹니다)
