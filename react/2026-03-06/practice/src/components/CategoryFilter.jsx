// ─── [Props 받기] ────────────────────────────────
// 이 컴포넌트는 부모(App)로부터 세 개의 props를 받습니다:
//   - categories: 카테고리 이름 배열 (예: ["전체", "전자기기", ...])
//   - selectedCategory: 현재 선택된 카테고리 (문자열)
//   - onCategoryChange: 카테고리가 변경될 때 호출하는 함수
// 힌트: function CategoryFilter({ categories, selectedCategory, onCategoryChange })

export default function CategoryFilter() {
  return (
    // ─── [컨테이너 스타일링] ─────────────────────────
    // 최상위 div에 다음 Tailwind 클래스를 적용하세요:
    //   flex flex-wrap gap-2 mb-6
    <div>
      {/* ─── [리스트 렌더링] ───────────────────────────── */}
      {/* categories 배열을 map()으로 순회하며              */}
      {/* 각 카테고리를 <button>으로 렌더링하세요.           */}
      {/*                                                   */}
      {/* 각 버튼의 요구사항:                                */}
      {/*   1. key prop에 category 값을 전달                */}
      {/*   2. onClick에서 onCategoryChange(category) 호출  */}
      {/*   3. 버튼 텍스트는 category 값                    */}
      {/*                                                   */}
      {/* ─── [조건부 스타일링] ────────────────────────── */}
      {/* selectedCategory와 현재 category가 같으면:        */}
      {/*   → "bg-indigo-600 text-white shadow-md"          */}
      {/* 다르면:                                           */}
      {/*   → "bg-white text-gray-600 border border-gray-200 */}
      {/*      hover:bg-indigo-50 hover:text-indigo-600     */}
      {/*      hover:border-indigo-200"                     */}
      {/*                                                   */}
      {/* 공통 클래스:                                      */}
      {/*   "px-4 py-2 rounded-full text-sm font-medium    */}
      {/*    transition-all duration-200 cursor-pointer"    */}
      {/*                                                   */}
      {/* 힌트: 삼항 연산자를 사용하세요                     */}
      {/* className={`공통클래스 ${조건 ? 활성 : 비활성}`}  */}

      <p className="text-gray-400">카테고리 필터 버튼을 여기에 렌더링하세요</p>
    </div>
  );
}
