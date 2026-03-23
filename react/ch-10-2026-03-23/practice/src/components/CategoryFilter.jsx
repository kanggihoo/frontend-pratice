import { categories } from "../data/mockData";

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {/* ─── [카테고리 버튼 리스트 렌더링] ────────────────── */}
      {/* categories 배열을 map()으로 순회하며 버튼을 렌더링하세요. */}
      {/* 1. 각 버튼의 key에 category를 전달하세요 */}
      {/* 2. onClick에서 onSelectCategory(category)를 호출하세요 */}
      {/* 3. selectedCategory === category이면 활성화 스타일 적용 */}
      {/*    - 활성: "bg-indigo-600 text-white" */}
      {/*    - 비활성: "bg-gray-100 text-gray-700 hover:bg-gray-200" */}
      {/*
      힌트:
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            selectedCategory === category
              ? "활성 스타일"
              : "비활성 스타일"
          }`}
        >
          {category}
        </button>
      ))}
      */}
    </div>
  );
}
