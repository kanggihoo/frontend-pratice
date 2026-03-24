import { useState, useEffect } from "react";

/**
 * useFetch - API 호출을 추상화하는 커스텀 훅
 *
 * @param {string} url - 요청할 API URL
 * @param {object} options - fetch 옵션 (method, headers 등)
 * @returns {{ data, loading, error, refetch }}
 */
export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (fetchUrl) => {
    if (!fetchUrl) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(fetchUrl, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  const refetch = () => {
    fetchData(url);
  };

  return { data, loading, error, refetch };
}
