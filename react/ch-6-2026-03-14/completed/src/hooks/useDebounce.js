import { useState, useEffect } from "react";

/**
 * useDebounce - 값의 변경을 지연시키는 커스텀 훅
 *
 * 사용자가 타이핑을 멈춘 후 일정 시간이 지나야 값이 업데이트됩니다.
 * 검색 입력처럼 매 키 입력마다 API를 호출하면 낭비이므로,
 * 입력이 끝난 후에만 API를 호출하도록 최적화할 때 사용합니다.
 *
 * @param {any} value - 디바운스할 값
 * @param {number} delay - 지연 시간 (밀리초, 기본값 500ms)
 * @returns {any} 디바운스된 값
 */
export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup: 값이 변경되면 이전 타이머를 취소
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
