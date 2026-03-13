import { useState, useEffect } from "react";

/**
 * useLocalStorage - localStorage와 동기화되는 상태를 관리하는 커스텀 훅
 *
 * useState처럼 사용하되, 값이 localStorage에 자동 저장/복원됩니다.
 * 브라우저를 새로고침해도 데이터가 유지됩니다.
 *
 * 예시:
 *   const [favorites, setFavorites, resetFavorites] = useLocalStorage("my-favorites", []);
 *   // favorites: 저장된 값 (없으면 빈 배열)
 *   // setFavorites: useState의 setter와 동일
 *   // resetFavorites: 초기값으로 되돌리고 localStorage에서도 삭제
 *
 * @param {string} key - localStorage에 저장할 키
 * @param {any} initialValue - 초기값 (저장된 값이 없을 때 사용)
 * @returns {[any, Function, Function]} [저장된 값, 세터 함수, 초기화 함수]
 */
export default function useLocalStorage(key, initialValue) {
  // ─── [상태 초기화 (lazy initialization)] ───────────────────────────
  // useState에 함수를 전달하면 최초 렌더링 시에만 실행됩니다 (성능 최적화).
  // 이 함수 안에서:
  // 1. window.localStorage.getItem(key)로 저장된 값을 읽기
  // 2. 값이 있으면 JSON.parse()로 파싱하여 반환
  // 3. 값이 없으면 initialValue를 반환
  // 4. try-catch로 에러를 처리 (JSON 파싱 실패 등)
  //
  // 힌트:
  //   const [storedValue, setStoredValue] = useState(() => {
  //     try {
  //       const item = window.localStorage.getItem(key);
  //       return item ? JSON.parse(item) : initialValue;
  //     } catch (error) {
  //       console.error("읽기 오류:", error);
  //       return initialValue;
  //     }
  //   });


  // ─── [localStorage에 자동 저장] ───────────────────────────
  // storedValue가 변경될 때마다 localStorage에 저장하는 useEffect를 작성하세요.
  //
  // 구현:
  // 1. window.localStorage.setItem(key, JSON.stringify(storedValue))
  // 2. try-catch로 에러를 처리 (localStorage 용량 초과 등)
  //
  // 의존성 배열: [key, storedValue]


  // ─── [초기화 함수] ───────────────────────────
  // reset이라는 함수를 작성하세요.
  // 1. storedValue를 initialValue로 되돌리기
  // 2. localStorage에서 해당 키 삭제 (window.localStorage.removeItem(key))


  // ─── [반환값] ───────────────────────────
  // 배열로 [storedValue, setStoredValue, reset]을 반환하세요.
  // useState와 비슷한 패턴이지만, reset 함수가 추가됩니다.
  //
  // 힌트: return [storedValue, setStoredValue, reset];
  return [initialValue, () => {}, () => {}];
}
