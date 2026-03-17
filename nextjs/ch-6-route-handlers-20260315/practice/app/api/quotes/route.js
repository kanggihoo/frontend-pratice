// ─── [Route Handler 임포트] ─────────────────────────────
// Next.js에서 API 응답을 생성할 때 사용하는 NextResponse를 임포트합니다.
// NextResponse.json()으로 JSON 응답을 생성할 수 있습니다.
import { NextResponse } from "next/server";

// ─── [환경변수 읽기] ──────────────────────────────────────
// .env.local에 정의된 API URL과 API Key를 process.env로 가져옵니다.
// NEXT_PUBLIC_ 접두사가 없는 환경변수는 서버에서만 접근 가능합니다.
const API_URL = process.env.QUOTES_API_URL;
const API_KEY = process.env.QUOTES_API_KEY;

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

export async function GET(request) {
  try {
    const { searchParams } = request.nextUrl;
    const limit = searchParams.get("limit") || 6;

    // ─── [외부 API 호출] ────────────────────────────────
    const res = await fetch(`${API_URL}?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      next: { revalidate: 60 }, // 60초마다 재검증
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "외부 API 요청에 실패했습니다." },
        { status: res.status },
      );
    }

    const data = await res.json();
    const quotes = data.quotes.map((quote) => ({
      id: quote.id,
      text: quote.quote,
      author: quote.author,
    }));

    return NextResponse.json({
      success: true,
      data: quotes,
      total: quotes.length,
    });
  } catch (error) {
    console.error("Quotes API Error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
