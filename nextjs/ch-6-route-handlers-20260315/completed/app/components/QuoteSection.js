"use client";

import { useState, useEffect } from "react";

export default function QuoteSection() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuotes = async () => {
    setLoading(true);
    setError(null);
    try {
      // 우리가 만든 Route Handler를 호출합니다.
      // 외부 API URL이나 API Key가 노출되지 않습니다!
      const res = await fetch("/api/quotes?limit=6");
      if (!res.ok) throw new Error("명언을 불러오지 못했습니다.");
      const json = await res.json();
      setQuotes(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">💬 오늘의 명언</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            GET /api/quotes → 외부 Quotes API 프록시
          </p>
        </div>
        <button
          onClick={fetchQuotes}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {loading ? "로딩 중..." : "새로고침"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          ❌ {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-full mb-3" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-3 bg-gray-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <p className="text-gray-700 leading-relaxed italic mb-3">
                &ldquo;{quote.text}&rdquo;
              </p>
              <p className="text-sm font-semibold text-indigo-600">
                — {quote.author}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
