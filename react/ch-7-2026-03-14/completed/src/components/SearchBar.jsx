import { memo } from "react";
import RenderCounter from "./RenderCounter";

// memo로 감싸서 props가 변경되지 않으면 리렌더링을 방지
const SearchBar = memo(function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative">
      <RenderCounter label="SearchBar" />
      <div className="mt-2 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-shadow focus-within:border-blue-400 focus-within:shadow-md">
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
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="상품명, 브랜드, 카테고리로 검색..."
          className="w-full bg-transparent text-gray-700 outline-none placeholder:text-gray-400"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});

export default SearchBar;
