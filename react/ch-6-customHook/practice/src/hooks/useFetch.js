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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ─── [데이터 가져오기 함수] ───────────────────────────
  // fetchData라는 async 함수를 작성하세요.
  // 1. fetchUrl이 없으면 early return
  // 2. loading을 true로, error를 null로 설정
  // 3. try-catch-finally 구조로 fetch 호출
  //    - try: fetch(fetchUrl, options) 호출 → response.ok 체크 → response.json() 파싱 → data 상태 업데이트
  //    - catch: 에러 메시지를 error 상태에 저장
  //    - finally: loading을 false로 설정
  //
  const fetchData = async (fetchUrl) => {
    if (!fetchUrl) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(fetchUrl, options);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── [useEffect로 자동 호출] ───────────────────────────
  // url이 변경될 때마다 fetchData를 호출하는 useEffect를 작성하세요.
  useEffect(() => {
    fetchData(url);
  }, [url]);

  const refetch = () => {
    fetchData(url);
  };

  // ─── [반환값] ───────────────────────────
  return { data: data, loading: loading, error: error, refetch: refetch };
}
