import { useMemo } from "react";
import { useCategories } from "../hooks/useProductQueries";
import useUiStore from "../store/uiStore";

// ─── [CategoryFilter 컴포넌트] ────────────────────────────
// 카테고리 버튼 목록을 가로 스크롤로 표시합니다.
// "전체" 버튼 + API에서 가져온 카테고리 버튼들

export default function CategoryFilter() {
  // ─── [TanStack Query로 카테고리 데이터 가져오기] ────────
  // useCategories() 훅을 호출하여 data와 isLoading을 받습니다
  // 힌트: const { data: categories, isLoading } = useCategories();


  // ─── [Zustand 스토어 구독] ─────────────────────────────
  // selectedCategory와 setSelectedCategory를 구독합니다
  // 힌트:
  //   const selectedCategory = useUiStore((state) => state.selectedCategory);
  //   const setSelectedCategory = useUiStore((state) => state.setSelectedCategory);


  // ─── [useMemo로 카테고리 정렬] ─────────────────────────
  // categories 배열을 이름순으로 정렬합니다.
  // categories가 바뀔 때만 재계산되도록 useMemo로 감쌉니다.
  // 힌트:
  //   const sortedCategories = useMemo(() => {
  //     if (!categories) return [];
  //     return [...categories].sort((a, b) => a.name.localeCompare(b.name));
  //   }, [categories]);


  // ─── [로딩 상태 UI] ───────────────────────────────────
  // isLoading이면 스켈레톤 UI를 보여줍니다 (animate-pulse)


  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {/* ─── ["전체" 버튼] ────────────────────────────────── */}
      {/* onClick에서 setSelectedCategory(null)을 호출합니다 */}
      {/* selectedCategory === null이면 활성 스타일 적용: */}
      {/*   활성: bg-indigo-600 text-white shadow-md */}
      {/*   비활성: bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 */}
      <button className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap bg-indigo-600 text-white">
        전체
      </button>

      {/* ─── [카테고리 버튼 목록] ──────────────────────────── */}
      {/* sortedCategories.map()으로 각 카테고리 버튼을 렌더링하세요 */}
      {/* key는 cat.slug를 사용합니다 */}
      {/* onClick에서 setSelectedCategory(cat.slug)를 호출합니다 */}
      {/* selectedCategory === cat.slug이면 활성 스타일 적용 */}
    </div>
  );
}
