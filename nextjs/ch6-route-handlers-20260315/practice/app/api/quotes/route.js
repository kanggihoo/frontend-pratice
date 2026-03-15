// ─── [Route Handler 임포트] ─────────────────────────────
// Next.js에서 API 응답을 생성할 때 사용하는 NextResponse를 임포트합니다.
// NextResponse.json()으로 JSON 응답을 생성할 수 있습니다.
import { NextResponse } from "next/server";


// ─── [환경변수 읽기] ──────────────────────────────────────
// .env.local에 정의된 API URL과 API Key를 process.env로 가져옵니다.
// NEXT_PUBLIC_ 접두사가 없는 환경변수는 서버에서만 접근 가능합니다.
// 힌트: const API_URL = process.env.QUOTES_API_URL;
// 힌트: const API_KEY = process.env.QUOTES_API_KEY;


/**
 * GET /api/quotes
 *
 * 외부 명언 API를 프록시하여 클라이언트에 전달합니다.
 * - 외부 API의 URL과 API Key가 클라이언트에 노출되지 않습니다.
 * - 서버에서 데이터를 가공하여 필요한 필드만 반환합니다.
 *
 * 쿼리 파라미터:
 *   - limit: 가져올 명언 개수 (기본값: 6)
 */

// ─── [GET 핸들러 함수 작성] ──────────────────────────────
// Route Handler에서는 HTTP 메서드 이름(GET, POST 등)으로 함수를 export합니다.
// 이 함수는 request 객체를 매개변수로 받습니다.
// 힌트: export async function GET(request) { ... }

export async function GET(request) {
  try {
    // ─── [쿼리 파라미터 추출] ────────────────────────────
    // request.nextUrl.searchParams를 사용하여 URL의 쿼리 파라미터를 추출하세요.
    // limit 파라미터가 없으면 기본값 "6"을 사용합니다.
    // 힌트: const { searchParams } = request.nextUrl;
    // 힌트: const limit = searchParams.get("limit") || "6";


    // ─── [외부 API 호출] ────────────────────────────────
    // fetch()를 사용하여 외부 API를 호출하세요.
    // 실제 서비스에서는 headers에 API Key를 포함합니다.
    // 힌트: const res = await fetch(`${API_URL}?limit=${limit}`, {
    //   headers: { Authorization: `Bearer ${API_KEY}` },
    //   next: { revalidate: 60 },
    // });


    // ─── [에러 처리] ────────────────────────────────────
    // 외부 API 응답이 실패(res.ok === false)하면 에러 응답을 반환하세요.
    // 힌트: if (!res.ok) {
    //   return NextResponse.json(
    //     { error: "외부 API 요청에 실패했습니다." },
    //     { status: res.status }
    //   );
    // }


    // ─── [데이터 가공 및 응답] ───────────────────────────
    // 외부 API 응답을 JSON으로 파싱하고, 필요한 필드만 추출하여 반환하세요.
    // DummyJSON의 quotes 응답 구조: { quotes: [{ id, quote, author }] }
    // 힌트: const data = await res.json();
    // 힌트: const quotes = data.quotes.map((quote) => ({
    //   id: quote.id,
    //   text: quote.quote,
    //   author: quote.author,
    // }));
    // 힌트: return NextResponse.json({ success: true, data: quotes, total: quotes.length });


    // 임시 응답 (위의 로직을 구현한 후 이 줄을 삭제하세요)
    return NextResponse.json({ success: true, data: [], total: 0 });
  } catch (error) {
    console.error("Quotes API Error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
