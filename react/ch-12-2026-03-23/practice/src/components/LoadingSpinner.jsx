// ─── [LoadingSpinner 컴포넌트] ────────────────────────────
// 로딩 상태를 표시하는 스피너 컴포넌트입니다.
// props로 size ("sm" | "md" | "lg")를 받아 크기를 결정합니다.
//
// Tailwind CSS로 회전 애니메이션을 만들려면:
// - animate-spin 클래스로 회전
// - border + border-t-{color} 조합으로 스피너 모양
// - rounded-full로 원형

export default function LoadingSpinner({ size = "md" }) {
  // ─── [크기별 클래스 매핑] ──────────────────────────────
  // size prop에 따라 다른 width/height 클래스를 적용합니다
  // 힌트: { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" }


  return (
    <div className="flex justify-center items-center py-8">
      {/* ─── [스피너 요소] ────────────────────────────────── */}
      {/* border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin */}
      {/* dark 모드: dark:border-gray-700 dark:border-t-indigo-400 */}
      <div className="w-8 h-8" />
    </div>
  );
}
