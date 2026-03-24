export default function SearchBar({
  searchTerm,
  onSearchChange,
  resultCount,
  isSearching,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
          placeholder="이름, 이메일, 회사명으로 검색..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     text-gray-700 placeholder-gray-400"
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
        <span>
          {searchTerm ? `검색 결과: ${resultCount}명` : `전체 유저 표시 중`}
        </span>
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            검색 초기화
          </button>
        )}
      </div>
    </div>
  );
}
