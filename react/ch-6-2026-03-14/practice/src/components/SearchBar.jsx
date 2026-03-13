export default function SearchBar({
  searchTerm,
  onSearchChange,
  resultCount,
  isSearching,
}) {
  return (
    // ─── [검색바 컨테이너] ───────────────────────────
    // Tailwind 클래스로 카드 스타일을 적용하세요.
    // 힌트: "bg-white rounded-xl shadow-sm border border-gray-200 p-5"
    <div className="">
      <div className="relative">
        {/* 검색 아이콘 (완성 제공) */}
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

        {/* ─── [검색 input] ───────────────────────────
            - value: searchTerm prop과 연결
            - onChange: onSearchChange에 e.target.value 전달
            - placeholder: "이름, 이메일, 회사명으로 검색..."
            - Tailwind 클래스:
              "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
               text-gray-700 placeholder-gray-400"
        */}
        <input
          type="text"
          placeholder="이름, 이메일, 회사명으로 검색..."
          className=""
        />

        {/* ─── [디바운스 로딩 스피너] ───────────────────────────
            isSearching이 true일 때만 표시되는 로딩 스피너입니다.
            조건부 렌더링으로 구현하세요.
            힌트: {isSearching && ( <div>...</div> )}
        */}
      </div>

      {/* ─── [검색 결과 정보] ───────────────────────────
          - searchTerm이 있으면: "검색 결과: {resultCount}명"
          - searchTerm이 없으면: "전체 유저 표시 중"
          - searchTerm이 있을 때 "검색 초기화" 버튼도 표시

          힌트: 삼항 연산자 사용
            {searchTerm ? `검색 결과: ${resultCount}명` : "전체 유저 표시 중"}
      */}
      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
        <span>전체 유저 표시 중</span>
      </div>
    </div>
  );
}
