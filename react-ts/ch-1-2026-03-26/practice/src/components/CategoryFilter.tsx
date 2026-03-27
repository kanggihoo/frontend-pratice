import React from "react";
import type { Category } from "../types";

// ─── [Props 선언] ──────────────────────────────
// categories (상류에서 전체 유니온 카테고리값 배열 전달)
// selectedCategory (현재 선택된 카테고리)
// onSelectCategory (클릭시 상태를 변경해줄 함수)
// 타입을 정확히 정의해보세요.
interface CategoryFilterProps {
  catetgories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  catetgories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {/* ─── [리스트 렌더링 - map] ─────────────────────── */}
      {/* 배열 categories를 순회(map)하며 필터 버튼들을 생성하세요. */}
      {catetgories.map((category) => (
        <button
          // ─── [이벤트 바인딩] ─────────────────────────
          // onClick 이벤트에 onSelectCategory 함수와 해당 category를 연결하세요.
          onClick={() => onSelectCategory(category)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
            selectedCategory === category
              ? "bg-primary-600 text-white shadow-md"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
