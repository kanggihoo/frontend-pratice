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
    // 힌트: bg-white, rounded-xl, p-6, shadow-sm, border border-gray-100
    <section className="">
      <h2 className="">📡 API 엔드포인트 목록</h2>
      <p className="">
        이 대시보드에서 사용하는 Route Handler 엔드포인트입니다.
        브라우저 개발자 도구(Network 탭)에서 요청을 확인해보세요!
      </p>

      {/* ─── [엔드포인트 목록 렌더링] ──────────────────── */}
      {/* endpoints 배열을 map으로 순회하며 각 엔드포인트 정보를 표시하세요. */}
      {/* 힌트: HTTP 메서드 배지 + 경로 + 설명 + 파라미터 구조 */}
      <div className="">
        {endpoints.map((endpoint) => (
          <div key={endpoint.path} className="">
            {/* ─── [HTTP 메서드 배지] ──────────────────── */}
            {/* 힌트: endpoint.color로 배경색, text-white, text-xs, font-bold, px-2.5, py-1, rounded */}
            <span className="">
              {endpoint.method}
            </span>
            <div>
              <code className="">{endpoint.path}</code>
              <p className="">{endpoint.description}</p>
              <p className="">{endpoint.params}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── [API Key 보안 안내 박스] ──────────────────── */}
      {/* 힌트: bg-amber-50, border border-amber-200, rounded-lg, p-4 */}
      <div className="">
        <p className="">🔑 API Key 보안 확인하기</p>
        <p className="">
          브라우저 개발자 도구 → Network 탭 → 각 API 요청의 Headers를 확인해보세요.
          클라이언트에서는 /api/quotes만 보이고,
          실제 외부 API URL과 API Key는 보이지 않습니다!
        </p>
      </div>
    </section>
  );
}
