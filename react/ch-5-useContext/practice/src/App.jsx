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
function AppContent() {
  // ─── [Context 사용하기] ──────────────────────────────────────
  // useAuth()에서 currentUser를 가져오세요.
  const { currentUser } = useAuth();
  const { colors } = useTheme();

  // currentUser가 없으면 (null) → LoginForm을 보여줍니다.
  // currentUser가 있으면 → Header와 Dashboard를 보여줍니다.
  return !currentUser ? (
    <LoginForm />
  ) : (
    <div
      className={`min-h-screen flex flex-col ${colors.bg} transition-colors duration-300`}
    >
      <Header />
      <Dashboard />
    </div>
  );
}

// ─── [App 컴포넌트 (Provider 설정)] ─────────────────────────────
// App 컴포넌트에서 ThemeProvider와 AuthProvider로 AppContent를 감싸세요.
// Provider를 중첩하는 순서는 상관없지만, 보통 더 범용적인 것을 바깥에 둡니다.

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
