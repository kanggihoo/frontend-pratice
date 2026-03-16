import { NextResponse } from "next/server";

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
    const { searchParams } = request.nextUrl;
    const query = searchParams.get("q") || "";
    const limit = searchParams.get("limit") || "6";

    // 검색어가 있으면 검색 API를, 없으면 전체 목록 API를 호출합니다.
    let apiUrl;
    if (query) {
      apiUrl = `${API_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}`;
    } else {
      apiUrl = `${API_URL}?limit=${limit}`;
    }

    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "레시피 데이터를 가져오는데 실패했습니다." },
        { status: res.status }
      );
    }

    const data = await res.json();

    // 외부 API 응답을 정제하여 클라이언트에 필요한 필드만 반환합니다.
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
      { status: 500 }
    );
  }
}
