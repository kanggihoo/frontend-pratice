import { useTheme } from "./ThemeContext.jsx";
import { useAuth } from "./AuthContext.jsx";

export default function Header() {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const { currentUser, logout } = useAuth();

  return (
    <header
      className={`${colors.bgSecondary} ${colors.border} border-b px-6 py-4 flex items-center justify-between shadow-sm transition-colors duration-300`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">⚛️</span>
        <h1 className={`text-xl font-bold ${colors.text}`}>My Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* 다크모드 토글 버튼 */}
        <button
          onClick={toggleTheme}
          className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
            isDarkMode ? "bg-indigo-600" : "bg-gray-300"
          }`}
          aria-label="다크모드 토글"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-sm transition-transform duration-300 ${
              isDarkMode ? "translate-x-7" : "translate-x-0"
            }`}
          >
            {isDarkMode ? "🌙" : "☀️"}
          </span>
        </button>

        {/* 사용자 정보 & 로그아웃 */}
        {currentUser && (
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentUser.avatar}</span>
            <div className="hidden sm:block">
              <p className={`text-sm font-semibold ${colors.text}`}>
                {currentUser.name}
              </p>
              <p className={`text-xs ${colors.textSecondary}`}>
                {currentUser.role}
              </p>
            </div>
            <button
              onClick={logout}
              className="ml-2 px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
