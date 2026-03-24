import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useTheme } from "./ThemeContext.jsx";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { colors } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    const result = login(email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className={`min-h-screen ${colors.bg} flex items-center justify-center p-4 transition-colors duration-300`}>
      <div className={`${colors.bgCard} ${colors.border} border rounded-2xl shadow-xl p-8 w-full max-w-md`}>
        <div className="text-center mb-8">
          <span className="text-5xl">⚛️</span>
          <h2 className={`text-2xl font-bold mt-4 ${colors.text}`}>
            로그인
          </h2>
          <p className={`mt-2 ${colors.textSecondary}`}>
            대시보드에 접속하려면 로그인하세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-1.5 ${colors.text}`}
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className={`w-full px-4 py-2.5 rounded-lg border ${colors.inputBg} ${colors.inputBorder} ${colors.inputText} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-medium mb-1.5 ${colors.text}`}
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className={`w-full px-4 py-2.5 rounded-lg border ${colors.inputBg} ${colors.inputBorder} ${colors.inputText} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            className={`w-full py-2.5 ${colors.accent} ${colors.accentHover} text-white font-semibold rounded-lg transition-colors`}
          >
            로그인
          </button>
        </form>

        <div className={`mt-6 p-4 rounded-lg ${colors.bg}`}>
          <p className={`text-xs font-semibold mb-2 ${colors.textSecondary}`}>
            테스트 계정 정보
          </p>
          <p className={`text-xs ${colors.textSecondary}`}>
            이메일: <span className={`font-mono ${colors.text}`}>minsu@example.com</span>
          </p>
          <p className={`text-xs ${colors.textSecondary}`}>
            비밀번호: <span className={`font-mono ${colors.text}`}>1234</span>
          </p>
        </div>
      </div>
    </div>
  );
}
