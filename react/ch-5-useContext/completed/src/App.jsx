import { ThemeProvider, useTheme } from "./components/ThemeContext.jsx";
import { AuthProvider, useAuth } from "./components/AuthContext.jsx";
import Header from "./components/Header.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Dashboard from "./components/Dashboard.jsx";

function AppContent() {
  const { currentUser } = useAuth();
  const { colors } = useTheme();

  if (!currentUser) {
    return <LoginForm />;
  }

  return (
    <div className={`min-h-screen flex flex-col ${colors.bg} transition-colors duration-300`}>
      <Header />
      <Dashboard />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
