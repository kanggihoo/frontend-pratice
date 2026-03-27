# [2회차] React + TypeScript: useState 제네릭, 배열/객체 상태 타입, 불변성

## 📚 회차 정보
- **회차**: 2회차
- **주제**: Todo 앱 (CRUD) - 추가, 삭제, 완료 토글, 필터(전체/완료/미완료)
- **핵심 개념**: `useState<T>()`, 배열/객체 상태 타입, 불변성 유지, spread 연산자 적용, lifting state up

## 🎯 주제 및 기획 의도
1회차에서는 기본적인 Props와 이벤트의 타입을 다루었다면, 2회차에서는 애플리케이션의 핵심인 **"상태(State)"를 TypeScript로 안전하게 다루는 방법**을 학습합니다.
웹 개발의 기본인 Todo 앱(CRUD)을 통해서 상태의 추가, 수정, 삭제 시 필수적인 불변성(Immutability) 원칙을 지키면서 어떻게 제네릭 타입을 설정해야 하는지 직접 연습해봅니다.

## 🏆 학습 목표
- 제네릭(`<T>`)을 사용하여 `useState`의 상태 타입을 명확히 선언할 수 있다.
- 자바스크립트의 Spread 연산자(`...`)와 내장 메서드(`map`, `filter`)를 활용하여 상태의 불변성을 유지할 수 있다.
- 상위 컴포넌트에서 선언된 상태와 변경 함수를 하위 컴포넌트의 Props로 전달(Lifting state up)하며 타입을 지정할 수 있다.
- 조건부 렌더링을 활용해 배열이 비었을 때와 아닐 때의 UI를 분기할 수 있다.

## ⚙️ 사전 준비
터미널을 열고 `practice` 폴더로 이동하여 패키지 설치 후 개발 서버를 실행하세요.

```bash
cd ch-2-2026-03-26/practice
npm install
npm run dev
```

> **참고**: 완성된 코드가 궁금하다면 `completed` 폴더에서 동일한 명령어를 실행하여 완성본을 확인해보세요.

## 📖 핵심 학습 개념

### 1. `useState`와 제네릭(Generic) `<T>`
React에서 상태 초기값이 빈 배열 `[]`이거나 나중에 값이 할당되는 객체인 경우, TypeScript는 해당 상태가 어떤 타입의 값을 가질지 추론하지 못해 `never[]` 타입 오류를 발생시킵니다.
이때 **제네릭**을 사용하여 상태가 어떤 모양인지 명확하게 알려주어야 합니다.

```tsx
// ❌ TypeScript가 어떤 타입의 배열인지 알 수 없음 (never[])
const [todos, setTodos] = useState([]);

// ⭕ 제네릭을 통해 Todo 객체의 배열임을 명시
const [todos, setTodos] = useState<Todo[]>([]);
```

### 2. 불변성(Immutability)과 배열 업데이트
React에서 상태 업데이트 시 기존 배열을 직접 수정(push, splice 등)하면 안 됩니다. 기존의 데이터는 그대로 두고(불변) **새로운 복사본을 만들어** 교체해야 React가 변경을 감지하고 리렌더링을 수행합니다.

- **추가**: Spread 연산자(`...`) 사용  `[newItem, ...prev]`
- **수정**: `map()` 메서드 사용  `prev.map(item => item.id === id ? { ...item, completed: true } : item)`
- **삭제**: `filter()` 메서드 사용  `prev.filter(item => item.id !== id)`

### 3. 유니온 타입과 리터럴 타입의 활용
문자열 타입을 단순히 `string`으로 제한하는 것보다, `"all" | "active" | "completed"`처럼 **특정 문자열 리터럴의 유니온 타입**으로 제한하면 오타를 방지하고 안전성을 극대화할 수 있습니다.

## 📂 프로젝트 구조 안내

```text
src/
├── types/
│   └── index.ts          # Todo 및 FilterType 등 핵심 도메인 타입 정의
├── data/
│   └── mockData.ts       # 초기 렌더링에 사용될 목업 데이터
├── components/
│   ├── TodoHeader.tsx    # 전체 진행률과 알림을 보여주는 UI 컴포넌트
│   ├── TodoInput.tsx     # 새로운 할 일을 입력하는 폼 컴포넌트
│   ├── TodoFilter.tsx    # 보기 옵션을 선택하는 필터 컴포넌트
│   ├── TodoList.tsx      # TodoItem을 순회하며 렌더링하는 배열 컨테이너
│   └── TodoItem.tsx      # 개별 할 일 항목의 상태 토글 및 삭제를 담당하는 컴포넌트
└── App.tsx               # 최상위 컴포넌트 (상태 관리 및 Props 전달)
```

## 📝 추천 실습 순서

1. **`src/types/index.ts`**
   - 애플리케이션에서 사용할 `Todo` 인터페이스와 `FilterType` 유니온 타입을 완성하세요.
2. **`src/App.tsx` (상태 선언)**
   - `[]` 또는 `any`로 비워진 `useState` 구문에 제네릭 타입을 추가하세요.
3. **`src/components/TodoInput.tsx`**
   - Form 이벤트의 타입을 지정하고 데이터의 흐름을 구현하세요.
4. **`src/App.tsx` (로직 작성)**
   - `addTodo`, `toggleTodo`, `deleteTodo` 등 불변성을 유지하는 상태 변경 로직을 완성하세요.
5. **`src/components/TodoItem.tsx` & `TodoList.tsx`**
   - Props의 타입을 정의하고 배열 데이터를 `map()`을 이용해 리스트 렌더링하세요.
6. **스타일링 (Tailwind CSS)**
   - 주석의 힌트를 참고하여 각 컴포넌트의 빈 `className` 값들을 채워넣으세요. 완성본과 비슷한 형태를 그려보세요.

## 💡 교육자의 팁
- **타입 에러를 두려워하지 마세요!** 화면이 나오지 않고 붉은색 에러가 뜨더라도, TypeScript가 당신의 실수를 런타임 이전에 감지해준 '친절한 가이드'라고 생각하세요.
- **제네릭 문법(`<T>`)**은 처음에는 어색할 수 있습니다. "이 훅/함수가 사용할 **미리 정해지지 않은 타입**을 괄호 기호 안에서 인자처럼 전달한다"고 이해해보세요.
- 상태 변화 로직을 작성할 때는 `console.log(prev)`를 찍어보며 데이터의 형태가 어떻게 달라지는지 먼저 확인해 보는 것이 가장 효과적인 디버깅 방법입니다.

## 🚀 최종 기대 효과
- 불변성을 해치지 않으면서 배열 데이터를 조작하는 리액트 상태 업데이트 패턴이 손에 익게 됩니다.
- 상위 컴포넌트에 상태를 모아두고(Lifting state up) 필요한 하위 컴포넌트에 넘겨주는 컴포넌트 트리 설계 능력을 키울 수 있습니다.
- 제네릭과 유니온 타입을 실무적으로 어떻게 사용하는지 체득합니다.
