// ─── [React.memo 적용] ──────────────────────────────────
// 이 컴포넌트도 memo로 감싸서, categories / selectedCategory / onCategoryChange가
// 변경되지 않으면 리렌더링을 건너뛰도록 최적화하세요.
//
// 왜 memo가 필요할까?
// - App 컴포넌트에서 검색어(searchTerm)가 바뀌면 App이 리렌더링됩니다.
// - 그러면 CategoryFilter도 리렌더링되는데, 카테고리가 바뀌지 않았다면 불필요합니다.
// - memo를 적용하면 props가 같을 때 리렌더링을 건너뜁니다.
//
// 힌트: import { memo } from "react";

import RenderCounter from "./RenderCounter";

function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div>
      <RenderCounter label="CategoryFilter" />

      {/* ─── [카테고리 버튼 렌더링] ─────────────────────── */}
      {/* 1. "전체" 버튼을 먼저 렌더링하세요. */}
      {/*    - 클릭 시 onCategoryChange("전체") 호출 */}
      {/*    - selectedCategory === "전체"이면 활성화 스타일 적용 */}
      {/*    - 활성: "bg-blue-500 text-white" / 비활성: "bg-gray-100 text-gray-600" */}
      {/* */}
      {/* 2. categories 배열을 map()으로 순회하며 나머지 버튼을 렌더링하세요. */}
      {/*    - key prop에 category 값을 전달 */}
      {/*    - 선택된 카테고리면 활성 스타일 적용 */}
      {/* */}
      {/* 힌트: */}
      {/*   <button */}
      {/*     onClick={() => onCategoryChange(카테고리)} */}
      {/*     className={`... ${조건 ? "활성스타일" : "비활성스타일"}`} */}
      {/*   > */}
      {/*     {카테고리} */}
      {/*   </button> */}
      <div className="mt-2 flex flex-wrap gap-2">

      </div>
    </div>
  );
}

export default CategoryFilter;
