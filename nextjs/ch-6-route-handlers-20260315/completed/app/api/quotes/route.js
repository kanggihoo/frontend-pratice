import { NextResponse } from "next/server";

// 환경변수에서 API URL과 키를 가져옵니다.
// 이 값들은 서버에서만 접근 가능하며, 클라이언트에 절대 노출되지 않습니다.
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
export async function GET(request) {
  try {
    // NextRequest의 nextUrl을 사용하여 쿼리 파라미터를 쉽게 추출합니다.
    const { searchParams } = request.nextUrl;
    const limit = searchParams.get("limit") || "6";

    // 서버에서 외부 API를 호출합니다.
    // 실제 서비스에서는 headers에 API Key를 포함시킵니다.
    const res = await fetch(`${API_URL}?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      // Next.js 15+에서는 기본적으로 캐시하지 않습니다.
      // 명시적으로 캐시 정책을 설정할 수 있습니다.
      next: { revalidate: 60 }, // 60초마다 재검증
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "외부 API 요청에 실패했습니다." },
        { status: res.status }
      );
    }

    const data = await res.json();

    // 외부 API 응답을 가공하여 필요한 데이터만 반환합니다.
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
      { status: 500 }
    );
  }
}
