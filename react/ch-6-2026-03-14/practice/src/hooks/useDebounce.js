import { useState, useEffect } from "react";

/**
 * useDebounce - 값의 변경을 지연시키는 커스텀 훅
 *
 * 사용자가 타이핑을 멈춘 후 일정 시간이 지나야 값이 업데이트됩니다.
 * 검색 입력처럼 매 키 입력마다 API를 호출하면 낭비이므로,
 * 입력이 끝난 후에만 API를 호출하도록 최적화할 때 사용합니다.
 *
 * 예시:
 *   const [search, setSearch] = useState("");
 *   const debouncedSearch = useDebounce(search, 500);
 *   // search가 변할 때마다가 아니라, 500ms 동안 변경이 없을 때만 debouncedSearch가 업데이트됨
 *
 * @param {any} value - 디바운스할 값
 * @param {number} delay - 지연 시간 (밀리초, 기본값 500ms)
 * @returns {any} 디바운스된 값
 */
export default function useDebounce(value, delay = 500) {
  // ─── [디바운스된 값 상태] ───────────────────────────
  // debouncedValue라는 상태를 선언하세요.
  // 초기값은 매개변수로 받은 value입니다.
  //
  // 힌트: const [debouncedValue, setDebouncedValue] = useState(value);


  // ─── [useEffect로 타이머 설정] ───────────────────────────
  // value 또는 delay가 변경될 때마다 실행되는 useEffect를 작성하세요.
  //
  // 구현 순서:
  // 1. setTimeout으로 delay 시간 후에 debouncedValue를 value로 업데이트
  // 2. cleanup 함수에서 clearTimeout으로 이전 타이머를 취소
  //    (이것이 디바운스의 핵심! 새 값이 들어오면 이전 타이머가 취소됨)
  //
  // 힌트:
  //   const timer = setTimeout(() => {
  //     setDebouncedValue(value);
  //   }, delay);
  //
  //   return () => {
  //     clearTimeout(timer);
  //   };
  //
  // 의존성 배열: [value, delay]


  // ─── [반환값] ───────────────────────────
  // debouncedValue를 반환하세요.
  return value; // ← 이 줄을 debouncedValue로 변경하세요
}
