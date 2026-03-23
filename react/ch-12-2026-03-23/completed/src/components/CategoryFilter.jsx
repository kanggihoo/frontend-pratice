import { useMemo } from "react";
import { useCategories } from "../hooks/useProductQueries";
import useUiStore from "../store/uiStore";

export default function CategoryFilter() {
  const { data: categories, isLoading } = useCategories();
  const selectedCategory = useUiStore((state) => state.selectedCategory);
  const setSelectedCategory = useUiStore((state) => state.setSelectedCategory);

  // [성능 최적화] useMemo로 카테고리 이름 정렬을 캐싱합니다.
  const sortedCategories = useMemo(() => {
    if (!categories) return [];
    return [...categories].sort((a, b) => a.name.localeCompare(b.name));
  }, [categories]);

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse shrink-0"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => setSelectedCategory(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
          selectedCategory === null
            ? "bg-indigo-600 text-white shadow-md"
            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        전체
      </button>
      {sortedCategories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => setSelectedCategory(cat.slug)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selectedCategory === cat.slug
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
