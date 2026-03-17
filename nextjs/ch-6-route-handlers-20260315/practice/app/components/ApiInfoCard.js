// ─── [서버 컴포넌트] ─────────────────────────────────────
// 이 컴포넌트는 정적인 정보를 표시하므로 서버 컴포넌트로 유지합니다.

export default function ApiInfoCard() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/quotes",
      description: "외부 명언 API를 프록시하여 안전하게 전달",
      params: "?limit=6",
      color: "bg-blue-500",
    },
    {
      method: "GET",
      path: "/api/recipes",
      description: "외부 레시피 API를 프록시 + 검색 기능",
      params: "?q=pizza&limit=6",
      color: "bg-orange-500",
    },
    {
      method: "POST",
      path: "/api/feedback",
      description: "사용자 피드백 수신 및 서버 측 검증",
      params: "Body: { name, email, message, rating }",
      color: "bg-emerald-500",
    },
  ];

  return (
    // ─── [카드 컨테이너 스타일링] ─────────────────────────
    <section className="bg-white, rounded-xl, p-6, shadow-sm, border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-1">
        📡 API 엔드포인트 목록
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        이 대시보드에서 사용하는 Route Handler 엔드포인트입니다. 브라우저 개발자
        도구(Network 탭)에서 요청을 확인해보세요!
      </p>

      {/* ─── [엔드포인트 목록 렌더링] ──────────────────── */}
      <div className="">
        {endpoints.map((endpoint) => (
          <div
            key={endpoint.path}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
          >
            <span
              className={`${endpoint.color} text-white text-xs font-bold px-2.5 py-1 rounded shrink-0`}
            >
              {endpoint.method}
            </span>
            <div>
              <code className="text-sm font-mono font-bold text-gray-800">
                {endpoint.path}
              </code>
              <p className="text-sm text-gray-600 mt-0.5">
                {endpoint.description}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 font-mono">
                {endpoint.params}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── [API Key 보안 안내 박스] ──────────────────── */}
      <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800 font-medium">
          🔑 API Key 보안 확인하기
        </p>
        <p className="text-sm text-amber-700 mt-1">
          브라우저 개발자 도구 → Network 탭 → 각 API 요청의 Headers를
          확인해보세요.
          <br />
          클라이언트에서는{" "}
          <code className="bg-amber-100 px-1 rounded">/api/quotes</code>만
          보이고, 실제 외부 API URL과 API Key는 보이지 않습니다!
        </p>
      </div>
    </section>
  );
}
