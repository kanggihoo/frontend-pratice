// ─── [Route Handler 임포트] ─────────────────────────────
import { NextResponse } from "next/server";

// ─── [환경변수 읽기] ──────────────────────────────────────

const API_URL = process.env.RECIPES_API_URL;
const API_KEY = process.env.RECIPES_API_KEY;

/**
 * GET /api/recipes
 *
 * 외부 레시피 API를 프록시하여 클라이언트에 전달합니다.
 *
 * 쿼리 파라미터:
 *   - q: 검색어 (선택)
 *   - limit: 가져올 개수 (기본값: 6)
 */

export async function GET(request) {
  try {
    // ─── [쿼리 파라미터 추출] ────────────────────────────
    // request.nextUrl.searchParams에서 q(검색어)와 limit를 추출하세요.
    const { searchParams } = request.nextUrl;
    const query = searchParams.get("q") || "";
    const limit = searchParams.get("limit") || "6";

    // ─── [조건부 API URL 구성] ───────────────────────────
    // 검색어(query)가 있으면 검색 API 엔드포인트를, 없으면 전체 목록 엔드포인트를 사용하세요.
    // DummyJSON 검색 API: ${API_URL}/search?q=검색어&limit=6
    // DummyJSON 전체 목록: ${API_URL}?limit=6
    let apiUrl;
    if (query) {
      apiUrl = `${API_URL}/search?q=${encodeURIComponent(query)}`;
    } else {
      apiUrl = `${API_URL}?limit=${limit}`;
    }

    // ─── [외부 API 호출] ────────────────────────────────
    // fetch()로 외부 API를 호출하세요. headers에 API Key를 포함합니다.
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "레시피 데이터를 가져오는데 실패했습니다." },
        { status: res.status },
      );
    }
    const data = await res.json();

    // ─── [데이터 가공 및 응답] ───────────────────────────
    // 외부 API 응답에서 필요한 필드만 추출하여 반환하세요.
    const recipes = data.recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      prepTimeMinutes: recipe.prepTimeMinutes,
      cookTimeMinutes: recipe.cookTimeMinutes,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      cuisine: recipe.cuisine,
      tags: recipe.tags,
      rating: recipe.rating,
    }));
    return NextResponse.json({
      success: true,
      data: recipes,
      total: data.total,
      query: query || null,
    });
  } catch (error) {
    console.error("Recipes API Error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
