// ─── [App.jsx] ──────────────────────────────────────────────────
// 앱의 루트 컴포넌트입니다.
// 이 파일에서 Provider 패턴의 핵심을 체험합니다:
//   - ThemeProvider와 AuthProvider로 앱 전체를 감싸기
//   - useAuth()로 로그인 상태에 따라 다른 화면 보여주기

import { ThemeProvider, useTheme } from "./components/ThemeContext.jsx";
import { AuthProvider, useAuth } from "./components/AuthContext.jsx";
import Header from "./components/Header.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Dashboard from "./components/Dashboard.jsx";

// ─── [AppContent 컴포넌트] ───────────────────────────────────────
// 이 컴포넌트는 Provider 내부에서 Context를 사용합니다.
// (Provider 바깥에서는 Context를 사용할 수 없기 때문에 별도 컴포넌트로 분리)
function AppContent() {
  // ─── [Context 사용하기] ──────────────────────────────────────
  // useAuth()에서 currentUser를 가져오세요.
  // useTheme()에서 colors를 가져오세요.

  // TODO: useAuth()에서 currentUser 가져오기
  const { currentUser } = useAuth();

  // TODO: useTheme()에서 colors 가져오기
  const { colors } = useTheme();

  // ─── [조건부 렌더링] ──────────────────────────────────────────
  // currentUser가 없으면 (null) → LoginForm을 보여줍니다.
  // currentUser가 있으면 → Header와 Dashboard를 보여줍니다.
  // 힌트:
  //   if (!currentUser) return <LoginForm />;
  //   return (
  //     <div className={`min-h-screen flex flex-col ${colors.bg} ...`}>
  //       <Header />
  //       <Dashboard />
  //     </div>
  //   );

  // TODO: 조건부 렌더링 구현
  return <LoginForm />;
}

// ─── [App 컴포넌트 (Provider 설정)] ─────────────────────────────
// App 컴포넌트에서 ThemeProvider와 AuthProvider로 AppContent를 감싸세요.
// Provider를 중첩하는 순서는 상관없지만, 보통 더 범용적인 것을 바깥에 둡니다.
//
// 힌트:
// <ThemeProvider>
//   <AuthProvider>
//     <AppContent />
//   </AuthProvider>
// </ThemeProvider>

export default function App() {
  // TODO: Provider로 AppContent를 감싸서 반환
  return <AppContent />;
}
