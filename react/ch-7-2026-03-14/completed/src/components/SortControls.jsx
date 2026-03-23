import { memo } from "react";
import RenderCounter from "./RenderCounter";

// memo로 감싸서 sortOption / onSortChange가 바뀌지 않으면 리렌더링 방지
const SortControls = memo(function SortControls({ sortOption, onSortChange }) {
  const sortOptions = [
    { value: "default", label: "기본 정렬" },
    { value: "price-asc", label: "가격 낮은순" },
    { value: "price-desc", label: "가격 높은순" },
    { value: "rating-desc", label: "평점 높은순" },
    { value: "review-desc", label: "리뷰 많은순" },
    { value: "discount-desc", label: "할인율 높은순" },
  ];

  return (
    <div>
      <RenderCounter label="SortControls" />
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="mt-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition-shadow focus:border-blue-400 focus:shadow-md"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SortControls;
