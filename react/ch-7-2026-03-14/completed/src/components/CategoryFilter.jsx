import { memo } from "react";
import RenderCounter from "./RenderCounter";

// memo로 감싸서 category / onCategoryChange가 바뀌지 않으면 리렌더링 방지
const CategoryFilter = memo(function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div>
      <RenderCounter label="CategoryFilter" />
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange("전체")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selectedCategory === "전체"
              ? "bg-blue-500 text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          전체
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
});

export default CategoryFilter;
