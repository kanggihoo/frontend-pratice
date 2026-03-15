"use client";

import { useState, useEffect } from "react";

export default function RecipeSection() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchRecipes = async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: "6" });
      if (query) params.set("q", query);

      // 우리 Route Handler를 통해 외부 API에 접근합니다.
      const res = await fetch(`/api/recipes?${params.toString()}`);
      if (!res.ok) throw new Error("레시피를 불러오지 못했습니다.");
      const json = await res.json();
      setRecipes(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const difficultyColor = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">🍳 레시피 검색</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          GET /api/recipes?q=검색어 → 외부 Recipes API 프록시
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="레시피를 검색하세요 (예: pizza, pasta)"
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors cursor-pointer"
        >
          검색
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          ❌ {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="h-40 bg-gray-200" />
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">검색 결과가 없습니다.</p>
          <p className="text-sm mt-1">다른 키워드로 검색해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="relative h-40">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColor[recipe.difficulty] || "bg-gray-100 text-gray-700"}`}
                >
                  {recipe.difficulty}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2">{recipe.name}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>⏱ {recipe.prepTimeMinutes + recipe.cookTimeMinutes}분</span>
                  <span>👥 {recipe.servings}인분</span>
                  <span>⭐ {recipe.rating}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {recipe.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
