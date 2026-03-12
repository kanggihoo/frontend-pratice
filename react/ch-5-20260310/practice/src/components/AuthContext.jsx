// 이 파일은 "로그인 인증 상태"를 전역으로 관리하는 Context를 만드는 파일입니다.
// ThemeContext.jsx와 동일한 패턴(Context 생성 → Provider → 커스텀 훅)을 따릅니다.

import { createContext, useContext, useState } from "react";
import { users } from "../data/mockData.js";

// ─── [1단계: Context 생성] ─────────────────────────────────────
const AuthContext = createContext();

// ─── [2단계: AuthProvider 컴포넌트] ──────────────────────────────
// 이 컴포넌트는:
//   - currentUser 상태를 useState로 관리 (초기값: null → 로그인 전)
//   - login(email, password) 함수:
//       1. users 배열에서 email과 password가 일치하는 사용자를 찾습니다
//       2. 찾으면 setCurrentUser로 상태 업데이트 후 { success: true } 반환
//       3. 못 찾으면 { success: false, message: "에러메시지" } 반환
//   - logout() 함수: setCurrentUser(null) 호출
//   - AuthContext.Provider의 value로 { currentUser, login, logout } 전달

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    const found = users.find(
      (user) => user.email === email && user.password === password,
    );
    if (found) {
      setCurrentUser(found);
      return { success: true };
    }
    return {
      success: false,
      message: "이메일 또는 비밀번호가 올바르지 않습니다.",
    };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // TODO: AuthContext.Provider로 children을 감싸서 반환

  return (
    <AuthContext value={{ ...currentUser, login, logout }}>
      {children}
    </AuthContext>
  );
}

// ─── [3단계: 커스텀 훅] ──────────────────────────────────────────
export function useAuth() {
  // TODO: useContext로 AuthContext 값 가져오기
  const context = useContext(AuthContext);
  if (!context) {
    return new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }

  return context;
}
