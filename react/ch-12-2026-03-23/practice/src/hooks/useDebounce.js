import { useState, useEffect } from "react";

// ─── [디바운스 커스텀 훅] ─────────────────────────────────
// 검색 입력 시 매 키 입력마다 API를 호출하면 비효율적입니다.
// 이 훅은 value가 변경된 후 delay(ms)만큼 기다린 뒤에야 값을 반환합니다.
//
// 사용법: const debouncedSearch = useDebounce(searchQuery, 400);
// → searchQuery가 바뀔 때마다 400ms 후에 debouncedSearch가 업데이트됩니다.

export default function useDebounce(value, delay = 300) {
  // ─── [상태 선언] ──────────────────────────────────────
  // useState로 디바운스된 값을 관리하는 상태를 선언하세요.
  // 초기값은 전달받은 value입니다.
  // 힌트: const [debouncedValue, setDebouncedValue] = useState(value);


  // ─── [useEffect로 타이머 설정] ─────────────────────────
  // 1. setTimeout으로 delay 후에 setDebouncedValue(value)를 호출합니다
  // 2. cleanup 함수에서 clearTimeout으로 이전 타이머를 취소합니다
  //    → 이렇게 하면 value가 빠르게 변경될 때 마지막 값만 반영됩니다
  // 3. 의존성 배열에 [value, delay]를 넣습니다
  //
  // 힌트:
  //   useEffect(() => {
  //     const timer = setTimeout(() => { setDebouncedValue(value); }, delay);
  //     return () => clearTimeout(timer);
  //   }, [value, delay]);


  // ─── [디바운스된 값 반환] ──────────────────────────────
  // return debouncedValue;
  return value; // 임시로 원본 값 반환 (위 로직을 완성하면 debouncedValue로 변경)
}
