import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode
      ? {
          bg: "bg-gray-900",
          bgSecondary: "bg-gray-800",
          bgCard: "bg-gray-800",
          text: "text-gray-100",
          textSecondary: "text-gray-400",
          border: "border-gray-700",
          accent: "bg-indigo-600",
          accentHover: "hover:bg-indigo-500",
          inputBg: "bg-gray-700",
          inputBorder: "border-gray-600",
          inputText: "text-gray-100",
        }
      : {
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

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme은 ThemeProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
}
