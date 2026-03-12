// ─── [AuthContext.jsx] ───────────────────────────────────────────
// 이 파일은 "로그인 인증 상태"를 전역으로 관리하는 Context를 만드는 파일입니다.
// ThemeContext.jsx와 동일한 패턴(Context 생성 → Provider → 커스텀 훅)을 따릅니다.

import { createContext, useContext, useState } from "react";
import { users } from "../data/mockData.js";

// ─── [1단계: Context 생성] ─────────────────────────────────────
// createContext()를 호출하여 AuthContext를 생성하세요.
// 힌트: const AuthContext = createContext();


// ─── [2단계: AuthProvider 컴포넌트] ──────────────────────────────
// AuthProvider 컴포넌트를 작성하세요.
// 이 컴포넌트는:
//   - currentUser 상태를 useState로 관리 (초기값: null → 로그인 전)
//   - login(email, password) 함수:
//       1. users 배열에서 email과 password가 일치하는 사용자를 찾습니다
//       2. 찾으면 setCurrentUser로 상태 업데이트 후 { success: true } 반환
//       3. 못 찾으면 { success: false, message: "에러메시지" } 반환
//       힌트: users.find(u => u.email === email && u.password === password)
//   - logout() 함수: setCurrentUser(null) 호출
//   - AuthContext.Provider의 value로 { currentUser, login, logout } 전달

export function AuthProvider({ children }) {
  // TODO: currentUser 상태 선언 (초기값: null)


  // TODO: login 함수 작성
  // 힌트:
  // const login = (email, password) => {
  //   const found = users.find(u => u.email === email && u.password === password);
  //   if (found) {
  //     setCurrentUser(found);
  //     return { success: true };
  //   }
  //   return { success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." };
  // };


  // TODO: logout 함수 작성


  // TODO: AuthContext.Provider로 children을 감싸서 반환
  // value에 { currentUser, login, logout }을 전달하세요
  return <>{children}</>;
}

// ─── [3단계: 커스텀 훅] ──────────────────────────────────────────
// useAuth 커스텀 훅을 작성하세요. (useTheme과 동일한 패턴)
// 힌트: useContext(AuthContext)를 사용하고, context 유효성 검사 후 반환

export function useAuth() {
  // TODO: useContext로 AuthContext 값 가져오기

  // TODO: context 유효성 검사

  // 임시 반환값 (구현 후 삭제하세요)
  return {
    currentUser: null,
    login: () => ({ success: false, message: "아직 구현되지 않았습니다." }),
    logout: () => {},
  };
}
