import { useState, useEffect } from "react";

/**
 * useLocalStorage - localStorage와 동기화되는 상태를 관리하는 커스텀 훅
 *
 * useState처럼 사용하되, 값이 localStorage에 자동 저장/복원됩니다.
 * 브라우저를 새로고침해도 데이터가 유지됩니다.
 *
 * @param {string} key - localStorage에 저장할 키
 * @param {any} initialValue - 초기값 (저장된 값이 없을 때 사용)
 * @returns {[any, Function, Function]} [저장된 값, 세터 함수, 초기화 함수]
 */
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`useLocalStorage 읽기 오류 (key: ${key}):`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`useLocalStorage 저장 오류 (key: ${key}):`, error);
    }
  }, [key, storedValue]);

  const reset = () => {
    setStoredValue(initialValue);
    window.localStorage.removeItem(key);
  };

  return [storedValue, setStoredValue, reset];
}
