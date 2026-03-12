# 회차 5 — useContext + 전역 상태 관리

## 주제 및 기획 의도

**다크모드 토글 + 인증 상태를 전역으로 관리하는 미니 대시보드**를 만듭니다.

이 주제를 선택한 이유는:
- 다크모드 → "모든 컴포넌트가 동일한 테마 정보를 공유"해야 하는 전형적인 전역 상태 사례
- 인증 상태 → "로그인 여부에 따라 화면이 바뀌는" 실무에서 가장 흔한 패턴
- 두 가지 Context를 동시에 사용하여 Provider 중첩 패턴을 자연스럽게 익힐 수 있습니다

## 학습 목표

이 예제를 완료하면 다음을 할 수 있게 됩니다:
1. `createContext()`로 Context 객체를 생성할 수 있다
2. `Provider` 컴포넌트를 만들어 하위 컴포넌트에 상태를 전달할 수 있다
3. `useContext()` 훅으로 어떤 깊이의 컴포넌트에서든 전역 상태를 읽을 수 있다
4. Context를 래핑하는 **커스텀 훅**(`useTheme`, `useAuth`)을 작성할 수 있다
5. **prop drilling 없이** 깊은 컴포넌트까지 데이터를 전달할 수 있다

## 사전 준비

```bash
# 1. completed(완성본) 실행해보기
cd completed
npm install
npm run dev

# 2. practice(실습용) 시작하기
cd ../practice
npm install
npm run dev
```

> 모든 테스트 계정 비밀번호는 `1234`입니다. (예: minsu@example.com / 1234)

## 핵심 학습 개념

### prop drilling이란?

부모 → 자식 → 손자 → 증손자... 로 props를 계속 전달해야 하는 문제입니다.

```
App → Layout → Header → UserInfo → Avatar
                                    ↑ user 데이터가 필요한데
                                      중간 컴포넌트들도 전부 props로 전달해야 함
```

### Context API가 해결하는 것

Context를 사용하면 **중간 컴포넌트를 거치지 않고** 직접 데이터에 접근할 수 있습니다.

```
ThemeProvider (테마 상태 보유)
├── Header → useTheme() 으로 직접 접근!
├── Dashboard → useTheme() 으로 직접 접근!
└── ProfileCard → useTheme() 으로 직접 접근!
```

### Context 사용 3단계

```jsx
// 1단계: Context 생성
const ThemeContext = createContext();

// 2단계: Provider 컴포넌트 작성
function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3단계: 커스텀 훅으로 사용
function useTheme() {
  return useContext(ThemeContext);
}
```

### Provider 중첩 패턴

여러 Context를 사용할 때는 Provider를 중첩합니다:

```jsx
<ThemeProvider>
  <AuthProvider>
    <App />
  </AuthProvider>
</ThemeProvider>
```

안쪽 컴포넌트에서는 두 Context 모두 사용 가능합니다.

## 프로젝트 구조 안내

```
src/
├── main.jsx              # 앱 진입점 (수정 불필요)
├── index.css             # Tailwind 설정 (수정 불필요)
├── App.jsx               # ⭐ Provider 중첩 + 조건부 렌더링
├── data/
│   └── mockData.js       # 목업 데이터 (수정 불필요)
└── components/
    ├── ThemeContext.jsx   # ⭐⭐ 핵심! 테마 Context (3단계 패턴)
    ├── AuthContext.jsx    # ⭐⭐ 핵심! 인증 Context (3단계 패턴)
    ├── Header.jsx         # ⭐ 두 Context 모두 사용
    ├── LoginForm.jsx      # ⭐ useAuth()로 로그인 처리
    ├── Dashboard.jsx      # Context에서 데이터 읽기
    ├── StatsCard.jsx      # useTheme()으로 테마 적용
    ├── NotificationList.jsx # useTheme() + 알림 읽음 처리
    └── ProfileCard.jsx    # useTheme() + useAuth() 사용
```

## 추천 실습 순서

### 1단계: ThemeContext.jsx (가장 중요!)
- `createContext()` → `ThemeProvider` → `useTheme()` 3단계를 직접 구현
- 이것이 이번 회차의 **핵심 패턴**입니다

### 2단계: AuthContext.jsx
- ThemeContext와 동일한 패턴을 반복 (반복이 학습입니다!)
- `login`, `logout` 함수를 Provider 안에서 정의

### 3단계: App.jsx
- ThemeProvider, AuthProvider로 AppContent를 감싸기
- currentUser 유무에 따른 조건부 렌더링

### 4단계: Header.jsx
- `useTheme()`과 `useAuth()` 두 Context를 동시에 사용
- 다크모드 토글 버튼과 로그아웃 버튼 연결

### 5단계: LoginForm.jsx
- `useAuth()`의 login 함수를 폼 제출에 연결
- input의 value/onChange 연결

### 6단계: 나머지 컴포넌트
- StatsCard, NotificationList, ProfileCard에서 Context 사용
- 비교적 간단한 작업이므로 빠르게 완성

## 교육자의 팁

1. **Provider 위치가 중요합니다!** — Provider 바깥에서 `useContext`를 호출하면 `undefined`가 됩니다. 그래서 App.jsx에서 `AppContent`를 별도 컴포넌트로 분리한 것입니다.

2. **커스텀 훅을 꼭 만드세요** — `useContext(ThemeContext)` 대신 `useTheme()`을 사용하면:
   - 코드가 간결해집니다
   - Provider 밖에서 사용하면 에러를 던져주므로 디버깅이 쉽습니다
   - import할 것이 줄어듭니다 (`createContext` 를 매번 import할 필요 없음)

3. **모든 것을 Context로 만들지 마세요** — Context는 "전역"으로 공유해야 할 때만 사용합니다. 한 컴포넌트 내부에서만 쓰이는 상태는 그냥 `useState`로 충분합니다.

4. **임시 반환값 패턴** — practice의 `useTheme()`과 `useAuth()`에는 임시 반환값이 있어서 에러 없이 실행됩니다. Context를 완성하면 이 임시 값을 삭제하세요.

## 최종 기대 효과

이 회차를 마치면:
- **prop drilling이 왜 문제인지** 체감하고, Context로 해결하는 방법을 알게 됩니다
- 다크모드, 인증 등 **실무에서 자주 쓰이는 전역 상태 패턴**을 구현할 수 있습니다
- 다음 회차(커스텀 훅)에서 더 복잡한 로직 분리를 배울 준비가 됩니다

## 심화 도전 과제

1. **언어 전환 Context**: ThemeContext처럼 `LanguageContext`를 만들어 한국어/영어 전환 기능을 추가해보세요.
2. **localStorage 연동**: 다크모드 설정을 `localStorage`에 저장하여 새로고침해도 유지되도록 만들어보세요. (`useEffect` + `localStorage.getItem/setItem`)
