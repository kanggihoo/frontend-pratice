import { useState, useEffect } from "react";

/**
 * useFetch - API 호출을 추상화하는 커스텀 훅
 *
 * 이 훅은 URL을 받아서 데이터를 가져오고,
 * 로딩 상태, 에러 상태, 재요청 함수를 함께 반환합니다.
 *
 * @param {string} url - 요청할 API URL
 * @param {object} options - fetch 옵션 (method, headers 등)
 * @returns {{ data, loading, error, refetch }}
 */
export default function useFetch(url, options = {}) {
  // ─── [상태 선언] ───────────────────────────────
  // 3개의 상태가 필요합니다:
  // 1. data: API에서 받아온 데이터 (초기값: null)
  // 2. loading: 로딩 중인지 여부 (초기값: false)
  // 3. error: 에러 메시지 (초기값: null)
  // 힌트: const [변수명, 세터함수] = useState(초기값);


  // ─── [데이터 가져오기 함수] ───────────────────────────
  // fetchData라는 async 함수를 작성하세요.
  // 이 함수는 fetchUrl을 매개변수로 받습니다.
  //
  // 구현 순서:
  // 1. fetchUrl이 없으면 early return
  // 2. loading을 true로, error를 null로 설정
  // 3. try-catch-finally 구조로 fetch 호출
  //    - try: fetch(fetchUrl, options) 호출 → response.ok 체크 → response.json() 파싱 → data 상태 업데이트
  //    - catch: 에러 메시지를 error 상태에 저장
  //    - finally: loading을 false로 설정
  //
  // 힌트: const response = await fetch(fetchUrl, options);
  // 힌트: if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);


  // ─── [useEffect로 자동 호출] ───────────────────────────
  // url이 변경될 때마다 fetchData를 호출하는 useEffect를 작성하세요.
  // 의존성 배열에 url을 넣어야 합니다.
  //
  // 힌트: useEffect(() => { fetchData(url); }, [url]);


  // ─── [refetch 함수] ───────────────────────────
  // 수동으로 데이터를 다시 가져올 수 있는 refetch 함수를 작성하세요.
  // fetchData(url)을 호출하면 됩니다.


  // ─── [반환값] ───────────────────────────
  // data, loading, error, refetch를 객체로 반환하세요.
  // 힌트: return { data, loading, error, refetch };
  return { data: null, loading: false, error: null, refetch: () => {} };
}
