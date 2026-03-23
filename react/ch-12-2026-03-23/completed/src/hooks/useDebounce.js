import { useState, useEffect } from "react";

// [아키텍처 결정] 검색 입력에 디바운스를 적용하여
// 매 키 입력마다 API를 호출하지 않도록 합니다.
// 이 커스텀 훅은 어떤 값이든 디바운스할 수 있도록 범용적으로 설계했습니다.

export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup: 값이 바뀌면 이전 타이머를 취소
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
