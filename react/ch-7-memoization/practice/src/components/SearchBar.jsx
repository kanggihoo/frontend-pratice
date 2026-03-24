// ─── [React.memo 적용] ──────────────────────────────────
// 이 컴포넌트를 React.memo로 감싸서, props(searchTerm, onSearchChange)가
// 변경되지 않으면 리렌더링을 건너뛰도록 최적화하세요.
//
// React.memo란?
// - 컴포넌트를 메모이제이션하는 고차 컴포넌트(HOC)입니다.
// - 이전 props와 새 props를 얕은 비교(shallow comparison)하여,
//   변경이 없으면 리렌더링을 건너뜁니다.
//
// 사용법:
//   import { memo } from "react";
//   const MyComponent = memo(function MyComponent(props) { ... });
//
// 힌트: memo를 import하고, 함수 선언을 memo()로 감싸세요.

import RenderCounter from "./RenderCounter";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative">
      <RenderCounter label="SearchBar" />

      {/* ─── [검색 입력 UI] ─────────────────────────────── */}
      {/* 아래 div에 Tailwind 클래스를 추가하여 스타일링하세요. */}
      {/* 힌트: flex 레이아웃, 둥근 모서리, 테두리, 그림자, 포커스 효과 등 */}
      <div className="">
        {/* 검색 아이콘 (SVG) */}
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* ─── [검색 input] ───────────────────────────────── */}
        {/* input 요소를 작성하세요. */}
        {/* 1. value에 searchTerm을 바인딩 */}
        {/* 2. onChange에서 onSearchChange(e.target.value) 호출 */}
        {/* 3. placeholder: "상품명, 브랜드, 카테고리로 검색..." */}
        {/* 힌트: <input type="text" value={...} onChange={(e) => ...} /> */}


        {/* ─── [초기화 버튼] ──────────────────────────────── */}
        {/* searchTerm이 있을 때만 X 버튼을 보여주세요. */}
        {/* 클릭 시 onSearchChange("")로 검색어를 초기화합니다. */}
        {/* 힌트: {searchTerm && ( <button>...</button> )} */}

      </div>
    </div>
  );
}

export default SearchBar;
