// ─── [React.memo 적용] ──────────────────────────────────
// 이 컴포넌트도 memo로 감싸서, sortOption / onSortChange가
// 변경되지 않으면 리렌더링을 건너뛰도록 최적화하세요.
//
// 힌트: SearchBar, CategoryFilter와 동일한 패턴입니다.

import RenderCounter from "./RenderCounter";

function SortControls({ sortOption, onSortChange }) {
  // ─── [정렬 옵션 데이터] ──────────────────────────────
  // 아래 배열을 사용하여 <select>의 <option>을 렌더링하세요.
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

      {/* ─── [select 요소] ────────────────────────────────── */}
      {/* <select> 요소를 작성하세요. */}
      {/* 1. value에 sortOption을 바인딩 */}
      {/* 2. onChange에서 onSortChange(e.target.value) 호출 */}
      {/* 3. sortOptions 배열을 map()으로 순회하며 <option> 렌더링 */}
      {/* */}
      {/* 힌트: */}
      {/*   <select value={...} onChange={(e) => ...}> */}
      {/*     {sortOptions.map((option) => ( */}
      {/*       <option key={option.value} value={option.value}> */}
      {/*         {option.label} */}
      {/*       </option> */}
      {/*     ))} */}
      {/*   </select> */}

    </div>
  );
}

export default SortControls;
