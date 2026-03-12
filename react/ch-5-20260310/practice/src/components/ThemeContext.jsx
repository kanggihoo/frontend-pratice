// ─── [ThemeContext.jsx] ──────────────────────────────────────────
// 이 파일은 "다크모드 테마"를 전역으로 관리하는 Context를 만드는 파일입니다.
// Context API의 핵심 3단계를 직접 구현해보세요:
//   1. createContext()로 Context 객체 생성
//   2. Provider 컴포넌트 작성 (상태를 가지고 children에게 전달)
//   3. useContext()를 래핑하는 커스텀 훅 작성

import { createContext, useContext, useState } from "react";

// ─── [1단계: Context 생성] ─────────────────────────────────────
// createContext()를 호출하여 ThemeContext를 생성하세요.
// 힌트: const 컨텍스트변수 = createContext();


// ─── [2단계: Provider 컴포넌트] ──────────────────────────────────
// ThemeProvider 컴포넌트를 작성하세요.
// 이 컴포넌트는:
//   - isDarkMode 상태를 useState로 관리 (초기값: false)
//   - toggleTheme 함수를 만들어 isDarkMode를 토글
//   - theme 객체를 만들어 isDarkMode, toggleTheme, colors를 포함
//   - ThemeContext.Provider의 value로 theme 객체를 전달
//   - children을 Provider로 감싸서 반환
//
// colors 객체는 isDarkMode 값에 따라 다른 Tailwind 클래스를 반환합니다.
// 아래 colors 객체를 참고하세요:
//
// 다크모드일 때:
//   bg: "bg-gray-900", bgSecondary: "bg-gray-800", bgCard: "bg-gray-800",
//   text: "text-gray-100", textSecondary: "text-gray-400",
//   border: "border-gray-700", accent: "bg-indigo-600",
//   accentHover: "hover:bg-indigo-500", inputBg: "bg-gray-700",
//   inputBorder: "border-gray-600", inputText: "text-gray-100"
//
// 라이트모드일 때:
//   bg: "bg-gray-50", bgSecondary: "bg-white", bgCard: "bg-white",
//   text: "text-gray-900", textSecondary: "text-gray-500",
//   border: "border-gray-200", accent: "bg-indigo-600",
//   accentHover: "hover:bg-indigo-700", inputBg: "bg-white",
//   inputBorder: "border-gray-300", inputText: "text-gray-900"

export function ThemeProvider({ children }) {
  // TODO: isDarkMode 상태 선언


  // TODO: toggleTheme 함수 작성


  // TODO: theme 객체 생성 (isDarkMode, toggleTheme, colors 포함)


  // TODO: ThemeContext.Provider로 children을 감싸서 반환
  // 힌트: <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  return <>{children}</>;
}

// ─── [3단계: 커스텀 훅] ──────────────────────────────────────────
// useTheme 커스텀 훅을 작성하세요.
// 이 훅은:
//   - useContext(ThemeContext)로 context 값을 가져옵니다
//   - context가 없으면 에러를 throw합니다 (Provider 밖에서 사용 방지)
//   - context를 반환합니다
//
// 힌트:
//   const context = useContext(ThemeContext);
//   if (!context) throw new Error("...");
//   return context;

export function useTheme() {
  // TODO: useContext로 ThemeContext 값 가져오기

  // TODO: context 유효성 검사

  // 임시 반환값 (구현 후 삭제하세요)
  return {
    isDarkMode: false,
    toggleTheme: () => {},
    colors: {
      bg: "bg-gray-50",
      bgSecondary: "bg-white",
      bgCard: "bg-white",
      text: "text-gray-900",
      textSecondary: "text-gray-500",
      border: "border-gray-200",
      accent: "bg-indigo-600",
      accentHover: "hover:bg-indigo-700",
      inputBg: "bg-white",
      inputBorder: "border-gray-300",
      inputText: "text-gray-900",
    },
  };
}
