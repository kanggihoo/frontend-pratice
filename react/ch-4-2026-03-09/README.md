# 회차 4 — useRef + 비제어 컴포넌트

## 회차 정보

- **회차**: 4회차 (중급)
- **핵심 개념**: `useRef`, `forwardRef`, DOM 직접 접근(포커스, 스크롤), 제어 vs 비제어 컴포넌트
- **날짜**: 2026-03-09

## 주제 및 기획 의도

**회원가입 폼** — 유효성 검사 + 에러 시 해당 필드로 자동 포커스

회원가입 폼은 웹 개발에서 가장 흔하게 만나는 UI 중 하나입니다. 이 예제를 통해 **"왜 DOM에 직접 접근해야 하는 상황이 있는지"**를 체감할 수 있습니다. 특히 유효성 검사 후 첫 번째 에러 필드에 자동으로 포커스를 이동하는 기능은 `useRef` 없이는 구현할 수 없습니다.

## 학습 목표

이 예제를 완료하면 다음을 할 수 있게 됩니다:

1. **useRef**로 DOM 요소에 직접 접근하는 방법 이해
2. **forwardRef**로 자식 컴포넌트의 DOM 요소에 ref를 전달하는 패턴 습득
3. **비제어 컴포넌트** 패턴 — state 대신 ref로 폼 값을 읽는 방식 이해
4. **ref 콜백 패턴** — 여러 ref를 동적으로 관리하는 방법 학습
5. 유효성 검사 실패 시 **자동 포커스 이동** 구현

## 사전 준비

```bash
# 완성본 실행 (먼저 결과를 확인하세요!)
cd completed
npm install
npm run dev

# 실습용 프로젝트 실행
cd practice
npm install
npm run dev
```

## 핵심 학습 개념

### 1. useRef란?

`useRef`는 **리렌더링 없이 값을 유지**하는 React 훅입니다.

```jsx
const inputRef = useRef(null);
// inputRef.current → DOM 요소에 접근
// inputRef.current.value → input의 현재 값
// inputRef.current.focus() → input에 포커스
```

**useState와의 차이:**
| 특징 | useState | useRef |
|------|----------|--------|
| 값 변경 시 리렌더링 | O | X |
| 용도 | 화면에 표시되는 데이터 | DOM 접근, 값 보존 |
| 접근 방법 | `state` | `ref.current` |

### 2. forwardRef란?

부모 컴포넌트가 자식 컴포넌트 **내부의 DOM 요소**에 접근해야 할 때 사용합니다.

```jsx
// 자식 컴포넌트
const MyInput = forwardRef(function MyInput(props, ref) {
  return <input ref={ref} {...props} />;
});

// 부모 컴포넌트
function Parent() {
  const inputRef = useRef(null);
  return <MyInput ref={inputRef} />;
  // inputRef.current → MyInput 내부의 <input> DOM 요소
}
```

### 3. 제어 vs 비제어 컴포넌트

| | 제어 컴포넌트 | 비제어 컴포넌트 |
|---|---|---|
| 값 관리 | `useState`로 관리 | DOM이 직접 관리 |
| 값 읽기 | `state` 변수 | `ref.current.value` |
| 특징 | 매 입력마다 리렌더링 | 리렌더링 없음 |
| 적합한 경우 | 실시간 유효성 검사, 조건부 UI | 폼 제출 시에만 값 필요 |

이 예제에서는 **비제어 컴포넌트** 방식을 사용합니다. 입력할 때마다 state를 업데이트하지 않고, 제출 시에만 ref에서 값을 읽어옵니다.

### 4. ref 콜백 패턴

여러 개의 동적 ref를 관리해야 할 때 사용하는 패턴입니다:

```jsx
const fieldRefs = useRef({});

// ref 콜백: DOM 요소를 객체에 저장
const setFieldRef = (name) => (el) => {
  fieldRefs.current[name] = el;
};

// 사용
<input ref={setFieldRef("username")} />
<input ref={setFieldRef("email")} />

// 접근
fieldRefs.current.username.focus();
fieldRefs.current.email.value;
```

## 프로젝트 구조 안내

```
src/
├── main.jsx              # 엔트리 포인트 (수정 불필요)
├── index.css             # Tailwind 설정 (수정 불필요)
├── App.jsx               # 메인 레이아웃 + 성공 모달 상태 관리
├── data/
│   └── mockData.js       # 유효성 규칙, 폼 필드 설정, API 시뮬레이션 (수정 불필요)
└── components/
    ├── SignupForm.jsx     # ⭐ 핵심 — useRef, 유효성 검사, 자동 포커스
    ├── FormField.jsx      # ⭐ 핵심 — forwardRef로 ref 전달
    ├── TextAreaField.jsx  # forwardRef 패턴 반복 연습
    ├── AgreementCheckbox.jsx  # forwardRef + 체크박스
    ├── PasswordStrength.jsx   # 비밀번호 강도 표시 (순수 로직)
    └── SuccessModal.jsx       # 성공 모달 (Tailwind 연습)
```

## 추천 실습 순서

### Step 1: FormField.jsx (forwardRef 기초)

- `forwardRef`로 컴포넌트를 감싸는 법을 익히세요
- `ref={ref}`를 input에 연결하는 것이 핵심입니다
- 에러 상태에 따른 조건부 스타일링도 연습합니다

### Step 2: TextAreaField.jsx, AgreementCheckbox.jsx

- FormField와 동일한 `forwardRef` 패턴을 반복 연습합니다
- textarea의 글자 수 표시, checkbox의 체크 상태 등 약간의 변형을 다룹니다

### Step 3: PasswordStrength.jsx

- 순수 JavaScript 로직 연습 (정규식, 점수 계산)
- useRef와는 관련 없지만, UI 컴포넌트 구현 연습

### Step 4: SignupForm.jsx (핵심!)

- `useRef`로 여러 필드의 ref를 관리하는 방법
- ref 콜백 패턴 (`setFieldRef`)
- 비제어 컴포넌트에서 ref로 값을 읽는 방법
- **유효성 검사 실패 시 자동 포커스** — 이번 회차의 하이라이트!

### Step 5: App.jsx

- 조건부 렌더링으로 성공 모달 표시
- 전체 흐름을 완성합니다

### Step 6: SuccessModal.jsx

- Tailwind CSS 스타일링 연습
- 가장 간단한 컴포넌트이므로 마지막에 완성합니다

## 교육자의 팁

### 흔히 실수하는 부분

1. **forwardRef를 빼먹는 실수**: 자식 컴포넌트에 `ref`를 전달하려면 반드시 `forwardRef`로 감싸야 합니다. 안 그러면 ref가 `undefined`가 됩니다.

2. **ref.current를 렌더링에 사용하는 실수**: `ref.current` 값이 바뀌어도 리렌더링이 일어나지 않으므로, 화면에 표시해야 하는 값은 반드시 `useState`를 사용하세요. (이 예제에서는 `passwordValue`와 `bioCharCount`가 그런 경우입니다)

3. **비제어 컴포넌트에서 value prop 전달하는 실수**: `<input value={state} />`는 제어 컴포넌트입니다. 비제어 컴포넌트에서는 `value` prop을 사용하지 않습니다.

### 꼭 기억해야 할 포인트

- **useRef는 `.current` 프로퍼티에 값을 저장합니다** — 직접 ref에 값을 넣지 마세요!
- **ref 콜백 패턴**은 동적으로 여러 ref를 관리할 때 매우 유용합니다
- **비제어 컴포넌트**는 폼 제출 시에만 값을 읽으므로 성능상 유리하지만, 실시간 검증이 필요한 경우에는 제어 컴포넌트가 더 적합합니다

## 최종 기대 효과

이 회차를 마치면 다음을 할 수 있게 됩니다:

- DOM 요소에 프로그래밍적으로 **포커스를 이동**시킬 수 있습니다
- 자식 컴포넌트의 DOM에 `forwardRef`로 **안전하게 접근**할 수 있습니다
- **제어 컴포넌트와 비제어 컴포넌트의 차이**를 명확히 설명할 수 있습니다
- 실무에서 회원가입/로그인 폼을 구현할 때 적절한 패턴을 **선택**할 수 있습니다

## 심화 도전 과제

1. **실시간 중복 검사**: 사용자명이나 이메일 입력 시 debounce를 적용하여, 일정 시간 후 API로 중복 여부를 검사하는 기능을 추가해보세요. (힌트: `setTimeout` + `useRef`로 타이머 ID 관리)

2. **비밀번호 표시/숨기기 토글**: 비밀번호 필드 옆에 눈 아이콘 버튼을 추가하여 `type`을 `"password"`/`"text"`로 전환하는 기능을 구현해보세요. (힌트: `useRef`로 input의 `type` 속성을 직접 변경)
