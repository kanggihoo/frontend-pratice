import { useTheme } from "./ThemeContext.jsx";
import { useAuth } from "./AuthContext.jsx";

export default function Header() {
  // ─── [Context 사용하기] ──────────────────────────────────────
  // useTheme() 훅에서 isDarkMode, toggleTheme, colors를 가져오세요.
  // useAuth() 훅에서 currentUser, logout을 가져오세요.
  // 힌트: const { isDarkMode, toggleTheme, colors } = useTheme();
  // 힌트: const { currentUser, logout } = useAuth();

  // TODO: useTheme()에서 필요한 값 가져오기
  const { isDarkMode, toggleTheme, colors } = useTheme();

  // TODO: useAuth()에서 필요한 값 가져오기
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
        {/* ─── [다크모드 토글 버튼] ──────────────────────────────── */}
        {/* onClick에 toggleTheme 함수를 연결하세요. */}
        {/* isDarkMode 값에 따라 배경색과 아이콘 위치가 바뀝니다. */}
        {/* 힌트: isDarkMode ? "bg-indigo-600" : "bg-gray-300" */}
        {/* 힌트: isDarkMode ? "translate-x-7" : "translate-x-0" */}
        <button
          onClick={/* TODO: toggleTheme 연결 */ undefined}
          className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
            /* TODO: isDarkMode에 따른 배경색 */ "bg-gray-300"
          }`}
          aria-label="다크모드 토글"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-sm transition-transform duration-300 ${
              /* TODO: isDarkMode에 따른 위치 이동 */ "translate-x-0"
            }`}
          >
            {/* TODO: isDarkMode에 따라 🌙 또는 ☀️ 표시 */}
            ☀️
          </span>
        </button>

        {/* ─── [사용자 정보 & 로그아웃] ──────────────────────────── */}
        {/* currentUser가 존재할 때만 사용자 정보와 로그아웃 버튼을 표시하세요. */}
        {/* 힌트: {currentUser && ( ... )} */}

        {/* TODO: 조건부 렌더링으로 사용자 정보 표시 */}
        {/* currentUser.avatar, currentUser.name, currentUser.role 사용 */}
        {/* 로그아웃 버튼의 onClick에 logout 함수 연결 */}
      </div>
    </header>
  );
}
