# 회차 2 — useState 심화 + 컴포넌트 분리

## 회차 정보

- **핵심 개념**: `useState`로 배열/객체 상태 관리, 불변 업데이트, 부모-자식 상태 흐름, 컴포넌트 분리
- **예제 주제**: Todo 플래너

## 주제 및 기획 의도

이번 회차에서는 가장 전형적인 React 입문 주제인 Todo 앱을 다룹니다. 다만 단순히 항목을 나열하는 수준이 아니라, `추가`, `완료 토글`, `삭제`, `필터 전환`까지 포함해서 "상태가 바뀌면 UI가 어떻게 다시 그려지는지"를 분명하게 느낄 수 있도록 설계했습니다.bg-gray-200 text-gray-400 cursor-not-allowed

이 주제를 선택한 이유는 다음과 같습니다.

- 배열 상태를 `map`, `filter`로 다루는 연습에 가장 적합합니다.
- 입력 폼을 객체 상태로 묶으면 `useState` 심화 패턴을 자연스럽게 익힐 수 있습니다.
- 부모(`App`)가 상태를 가지고 자식 컴포넌트로 데이터와 함수를 내려주는 흐름을 학습하기 좋습니다.

## 학습 목표

이 예제를 마치면 다음을 할 수 있어야 합니다.

1. `useState`로 배열 상태와 객체 상태를 각각 선언하고 관리한다.
2. spread 문법을 사용해 불변성을 지키며 상태를 업데이트한다.
3. 부모 컴포넌트에 상태를 두고, 자식 컴포넌트에는 props로 데이터를 전달한다.
4. 자식 컴포넌트에서 이벤트가 발생했을 때 부모의 상태 변경 함수를 호출한다.
5. `filter`, `map`을 활용해 조건에 맞는 항목만 렌더링한다.
6. 컴포넌트를 역할별로 분리해 읽기 쉬운 구조를 만든다.

## 사전 준비

### 완성본 실행

```bash
cd react/2026-03-08/completed
npm install
npm run dev
```

### 실습용 실행

```bash
cd react/2026-03-08/practice
npm install
npm run dev
```

`practice` 프로젝트는 에러 없이 실행되지만, 핵심 로직은 직접 채워 넣어야 합니다.

## 핵심 학습 개념

### 1. 배열 상태 업데이트

Todo 목록은 여러 개의 항목이 들어 있는 배열입니다. 새 항목을 추가할 때는 기존 배열을 직접 수정하지 않고 새 배열을 만들어야 합니다.

```jsx
setTodos((prev) => [newTodo, ...prev]);
```

삭제할 때는 `filter()`, 수정할 때는 `map()`이 가장 자주 사용됩니다.

### 2. 객체 상태 업데이트

입력 폼은 `title`, `category`, `priority`, `dueDate`처럼 관련된 값이 함께 움직입니다. 이런 경우 각각을 따로 상태로 두기보다 하나의 객체로 묶으면 관리가 쉬워집니다.

```jsx
setForm((prev) => ({
  ...prev,
  [name]: value,
}));
```

여기서 `...prev`를 빼먹으면 기존 필드가 사라지는 실수를 하게 됩니다.

### 3. 부모-자식 상태 흐름

실제 상태는 `App.jsx`에 있습니다. 하지만 입력창, 필터 버튼, 리스트 아이템은 각각 다른 컴포넌트 안에 있습니다. 그래서 부모가 상태와 함수를 들고 있고, 자식은 props를 받아 화면과 이벤트를 담당하는 구조를 사용합니다.

- 부모: `todos`, `form`, `currentFilter` 상태 보유
- 자식: 화면 표시 + 클릭/입력 이벤트 발생
- 이벤트 발생 시: 부모가 내려준 함수 호출

이 패턴을 흔히 **lifting state up**이라고 부릅니다.

## 프로젝트 구조 안내

```text
react/2026-03-08/
├── completed/
│   └── src/
│       ├── App.jsx
│       ├── data/mockData.js
│       └── components/
│           ├── Header.jsx
│           ├── TodoComposer.jsx
│           ├── TodoFilters.jsx
│           ├── TodoList.jsx
│           └── TodoItem.jsx
└── practice/
    └── src/
        ├── App.jsx
        ├── data/mockData.js
        └── components/
            ├── Header.jsx
            ├── TodoComposer.jsx
            ├── TodoFilters.jsx
            ├── TodoList.jsx
            └── TodoItem.jsx
```

각 파일의 역할은 다음과 같습니다.

- `App.jsx`: 전체 상태 관리, 필터링, 이벤트 핸들러 정의
- `Header.jsx`: 회차 소개와 통계 카드 출력
- `TodoComposer.jsx`: 새 할 일 입력 폼
- `TodoFilters.jsx`: 전체/진행 중/완료 필터 전환, 완료 항목 일괄 삭제
- `TodoList.jsx`: 빈 상태 처리와 리스트 렌더링
- `TodoItem.jsx`: 개별 항목의 완료 토글/삭제 UI
- `data/mockData.js`: 초기 할 일 데이터와 옵션 목록

## 추천 실습 순서

1. `App.jsx`부터 시작하세요. 상태 3개(`todos`, `currentFilter`, `form`)를 먼저 선언해야 전체 흐름이 보입니다.
2. `TodoComposer.jsx`를 구현하세요. 객체 상태를 변경하는 연습이 가장 많이 들어 있습니다.
3. `TodoFilters.jsx`를 구현하세요. 현재 필터 값에 따라 버튼 스타일이 달라지는 조건부 스타일링을 연습할 수 있습니다.
4. `TodoList.jsx`와 `TodoItem.jsx`를 연결하세요. `map`, `key`, 이벤트 핸들러 전달을 한 번에 정리할 수 있습니다.
5. 마지막으로 `Header.jsx`에서 통계 값을 예쁘게 표현해 보세요.

## 교육자의 팁

- `setTodos(todos.push(...))`처럼 기존 배열을 직접 수정하지 마세요. React 상태는 새 참조값으로 바꾸는 것이 핵심입니다.
- 객체 상태를 바꿀 때는 `...prev`를 먼저 복사한 뒤 필요한 필드만 덮어쓰세요.
- `onClick={handleDeleteTodo(todo.id)}`처럼 바로 호출하면 렌더링 중에 실행됩니다. `onClick={() => handleDeleteTodo(todo.id)}`처럼 함수로 감싸야 합니다.
- `map()`으로 리스트를 렌더링할 때는 반드시 `key={todo.id}`를 넣으세요.
- `trim()`을 사용하지 않으면 공백만 입력한 Todo도 추가될 수 있습니다.

## 최종 기대 효과

이 회차를 마치면 단순한 정적 UI가 아니라, 사용자 입력에 따라 상태가 바뀌고 화면이 함께 갱신되는 React 앱의 기본 구조를 직접 만들 수 있게 됩니다. 이후 `useEffect`, `Context`, 커스텀 훅으로 넘어갈 때도 "상태를 어디에 두고 어떻게 흘려보내는가"를 기준으로 코드를 읽을 수 있게 됩니다.

## 심화 도전 과제

1. Todo 수정 기능을 추가해서 진짜 CRUD 형태로 확장해 보세요.
2. `localStorage`에 저장해서 새로고침 후에도 목록이 유지되도록 만들어 보세요.
