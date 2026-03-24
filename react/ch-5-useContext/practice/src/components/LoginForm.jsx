import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useTheme } from "./ThemeContext.jsx";

export default function LoginForm() {
  // ─── [상태 선언] ──────────────────────────────────────────────
  // email, password, error 세 가지 상태를 useState로 선언하세요.
  // 힌트: const [email, setEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ─── [Context 사용하기] ──────────────────────────────────────
  // useAuth()에서 login 함수를 가져오세요.
  // useTheme()에서 colors 객체를 가져오세요.

  // TODO: useAuth()에서 login 가져오기
  const { login } = useAuth();

  // TODO: useTheme()에서 colors 가져오기
  const { colors } = useTheme();

  // ─── [폼 제출 핸들러] ─────────────────────────────────────────
  // handleSubmit 함수를 작성하세요:
  //   1. e.preventDefault()로 기본 동작 방지
  //   2. error 상태 초기화
  //   3. email 또는 password가 비어있으면 에러 메시지 설정
  //   4. login(email, password) 호출
  //   5. result.success가 false이면 에러 메시지 설정
  const handleSubmit = (e) => {
    // TODO: 폼 제출 로직 작성
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

        {/* ─── [폼 작성] ──────────────────────────────────────── */}
        {/* onSubmit에 handleSubmit 함수를 연결하세요. */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-1.5 ${colors.text}`}
            >
              이메일
            </label>
            {/* ─── [이메일 입력] ──────────────────────────────── */}
            {/* value에 email 상태를, onChange에 setEmail을 연결하세요. */}
            {/* 힌트: onChange={(e) => setEmail(e.target.value)} */}
            <input
              id="email"
              type="email"
              value={/* TODO: email 상태 연결 */ ""}
              onChange={/* TODO: setEmail 연결 */ undefined}
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
            {/* ─── [비밀번호 입력] ────────────────────────────── */}
            {/* email 입력과 동일한 패턴으로 password 상태를 연결하세요. */}
            <input
              id="password"
              type="password"
              value={/* TODO: password 상태 연결 */ ""}
              onChange={/* TODO: setPassword 연결 */ undefined}
              placeholder="비밀번호 입력"
              className={`w-full px-4 py-2.5 rounded-lg border ${colors.inputBg} ${colors.inputBorder} ${colors.inputText} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
            />
          </div>

          {/* ─── [에러 메시지 표시] ────────────────────────────── */}
          {/* error 상태가 있을 때만 에러 메시지를 표시하세요. */}
          {/* 힌트: {error && <p>...</p>} */}
          {/* TODO: 조건부 렌더링으로 에러 메시지 표시 */}

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
