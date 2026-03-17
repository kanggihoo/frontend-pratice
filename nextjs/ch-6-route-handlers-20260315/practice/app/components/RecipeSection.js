"use client";

// ─── [클라이언트 컴포넌트 선언] ──────────────────────────
// 이 컴포넌트는 검색 입력, 상태 관리, 이벤트 핸들러를 사용합니다.
// ✅ "use client" 지시어가 파일 최상단에 선언되어 있습니다.


// ─── [React 훅 임포트] ──────────────────────────────────
// 힌트: import { useState, useEffect } from "react";


import { useState, useEffect } from "react";

export default function RecipeSection() {
  // ─── [상태 선언] ──────────────────────────────────────
  // recipes(레시피 배열), loading, error, searchQuery(실제 검색어),
  // searchInput(입력 필드 값)을 선언하세요.
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // ─── [레시피 페칭 함수] ────────────────────────────────
  // 우리의 Route Handler(/api/recipes)를 호출합니다.
  // 검색어가 있으면 쿼리 파라미터로 전달합니다.
  const fetchRecipes = async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      // ─── [URLSearchParams로 쿼리 구성] ──────────────
      // 힌트: const params = new URLSearchParams({ limit: "6" });
      // 힌트: if (query) params.set("q", query);


      // ─── [Route Handler 호출] ──────────────────────
      // 힌트: const res = await fetch(`/api/recipes?${params.toString()}`);
      // 힌트: if (!res.ok) throw new Error("레시피를 불러오지 못했습니다.");
      // 힌트: const json = await res.json();
      // 힌트: setRecipes(json.data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── [검색어 변경 시 데이터 재로드] ────────────────────
  // searchQuery가 변경될 때마다 fetchRecipes를 호출합니다.
  // 힌트: useEffect(() => { fetchRecipes(searchQuery); }, [searchQuery]);
  useEffect(() => {
    fetchRecipes(searchQuery);
  }, [searchQuery]);

  // ─── [검색 폼 제출 핸들러] ─────────────────────────────
  // 폼 제출 시 searchInput 값을 searchQuery에 반영합니다.
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">🍳 레시피 검색</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          GET /api/recipes?q=검색어 → 외부 Recipes API 프록시
        </p>
      </div>

      {/* ─── [검색 폼] ───────────────────────────────────── */}
      {/* 힌트: onSubmit={handleSearch} */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="레시피를 검색하세요 (예: pizza, pasta)"
          className=""
        />
        {/* ─── [검색 버튼 스타일링] ──────────────────────── */}
        {/* 힌트: bg-orange-500, text-white, rounded-lg, hover:bg-orange-600 */}
        <button type="submit" disabled={loading} className="">
          검색
        </button>
      </form>

      {error && (
        <div className="">❌ {error}</div>
      )}

      {/* ─── [레시피 카드 렌더링] ─────────────────────────── */}
      {/* loading, 결과 없음, 결과 있음 세 가지 상태를 처리하세요. */}
      {/* 각 recipe 객체: { id, name, image, prepTimeMinutes, cookTimeMinutes, servings, difficulty, tags, rating } */}
      {loading ? (
        <p className="text-gray-500">로딩 중...</p>
      ) : recipes.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">검색 결과가 없습니다.</p>
          <p className="text-sm mt-1">다른 키워드로 검색해보세요.</p>
        </div>
      ) : (
        <div className="">
          {/* ─── [레시피 카드] ────────────────────────────── */}
          {/* 각 레시피를 카드로 표시하세요. 이미지, 이름, 조리시간, 인분, 평점을 포함합니다. */}
          {/* 힌트: {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl overflow-hidden shadow-sm border">
              <img src={recipe.image} alt={recipe.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold">{recipe.name}</h3>
                <div className="flex gap-3 text-sm text-gray-500">
                  <span>⏱ {recipe.prepTimeMinutes + recipe.cookTimeMinutes}분</span>
                  <span>👥 {recipe.servings}인분</span>
                  <span>⭐ {recipe.rating}</span>
                </div>
              </div>
            </div>
          ))} */}
          {recipes.map((recipe) => (
            <div key={recipe.id}>
              <p>{recipe.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
