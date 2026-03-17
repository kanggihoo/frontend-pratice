"use client";

// ─── [클라이언트 컴포넌트 선언] ──────────────────────────
// 이 컴포넌트는 useState, useEffect, 이벤트 핸들러를 사용하므로
// 클라이언트에서 실행되어야 합니다.
// ✅ "use client" 지시어가 파일 최상단에 선언되어 있습니다.


// ─── [React 훅 임포트] ──────────────────────────────────
// 힌트: import { useState, useEffect } from "react";


import { useState, useEffect } from "react";

export default function QuoteSection() {
  // ─── [상태 선언] ──────────────────────────────────────
  // quotes(명언 배열), loading(로딩 상태), error(에러 메시지) 상태를 선언하세요.
  // 힌트: const [quotes, setQuotes] = useState([]);
  // 힌트: const [loading, setLoading] = useState(true);
  // 힌트: const [error, setError] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ─── [데이터 페칭 함수] ────────────────────────────────
  // 우리가 만든 Route Handler(/api/quotes)를 호출하는 함수를 작성하세요.
  // 핵심: 외부 API URL이 아닌 우리의 내부 Route Handler URL을 호출합니다!
  // 이렇게 하면 외부 API의 URL과 API Key가 클라이언트에 노출되지 않습니다.
  const fetchQuotes = async () => {
    setLoading(true);
    setError(null);
    try {
      // ─── [Route Handler 호출] ──────────────────────
      // fetch()로 우리의 API 엔드포인트를 호출하세요.
      // 힌트: const res = await fetch("/api/quotes?limit=6");
      // 힌트: if (!res.ok) throw new Error("명언을 불러오지 못했습니다.");
      // 힌트: const json = await res.json();
      // 힌트: setQuotes(json.data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── [컴포넌트 마운트 시 데이터 로드] ──────────────────
  // 힌트: useEffect(() => { fetchQuotes(); }, []);
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
        {/* ─── [새로고침 버튼] ────────────────────────────── */}
        {/* onClick에 fetchQuotes를 연결하세요. loading 중에는 disabled 처리합니다. */}
        {/* 힌트: onClick={fetchQuotes}, disabled={loading} */}
        <button
          onClick={fetchQuotes}
          disabled={loading}
          className=""
        >
          {loading ? "로딩 중..." : "새로고침"}
        </button>
      </div>

      {/* ─── [에러 메시지 표시] ──────────────────────────── */}
      {error && (
        <div className="">
          ❌ {error}
        </div>
      )}

      {/* ─── [로딩 상태 / 데이터 렌더링] ──────────────────── */}
      {/* 힌트: loading이면 스켈레톤 UI, 아니면 quotes 배열을 map으로 렌더링 */}
      {loading ? (
        <div className="">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      ) : (
        <div className="">
          {/* ─── [명언 카드 렌더링] ───────────────────────── */}
          {/* quotes 배열을 map으로 순회하며 각 명언을 카드 형태로 표시하세요. */}
          {/* 각 quote 객체: { id, text, author } */}
          {/* 힌트: {quotes.map((quote) => (
            <div key={quote.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-700 italic mb-3">&ldquo;{quote.text}&rdquo;</p>
              <p className="text-sm font-semibold text-indigo-600">— {quote.author}</p>
            </div>
          ))} */}
          {quotes.map((quote) => (
            <div key={quote.id}>
              <p>{quote.text}</p>
              <p>{quote.author}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
