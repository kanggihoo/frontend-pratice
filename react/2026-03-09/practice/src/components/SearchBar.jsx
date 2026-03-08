export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="mb-6">
      <div className="relative">
        {/* 검색 아이콘 (이미 제공됨) */}
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
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

        {/* ─── [검색 입력 필드] ─────────────────────────────── */}
        {/* input 요소를 완성하세요:                                */}
        {/*                                                       */}
        {/* 1. type="text"                                         */}
        {/* 2. placeholder="이름, 이메일, 회사명으로 검색..."        */}
        {/* 3. value에 searchTerm을 바인딩하세요                    */}
        {/* 4. onChange 이벤트에서 onSearchChange(e.target.value)   */}
        {/*    를 호출하세요                                        */}
        {/* 5. 스타일 클래스:                                      */}
        {/*    w-full pl-10 pr-4 py-3 bg-white border              */}
        {/*    border-slate-200 rounded-xl shadow-sm               */}
        {/*    focus:outline-none focus:ring-2 focus:ring-indigo-500 */}
        {/*    focus:border-transparent text-slate-700              */}
        {/*    placeholder-slate-400                                */}
        {/*                                                       */}
        {/* 힌트: <input type="text" value={...}                   */}
        {/*         onChange={(e) => ...} className="..." />        */}


        {/* ─── [검색어 지우기 버튼] ──────────────────────────── */}
        {/* searchTerm이 있을 때만 X 버튼을 표시하세요              */}
        {/* 클릭 시 onSearchChange("")를 호출하여 검색어 초기화     */}
        {/*                                                       */}
        {/* 힌트: {searchTerm && (<button onClick={...}>...</button>)} */}

      </div>
    </div>
  );
}
