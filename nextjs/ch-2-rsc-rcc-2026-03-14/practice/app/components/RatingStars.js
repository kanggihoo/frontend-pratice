// ─── [서버 컴포넌트 vs 클라이언트 컴포넌트 결정하기] ───────
// 질문: 이 RatingStars 컴포넌트에 "use client"가 필요할까요?
// 생각해보세요:
// - 별점을 "표시"만 합니다. 클릭해서 별점을 변경하는 기능은 없습니다.
// - useState나 이벤트 핸들러가 없습니다.
// - 결론: 서버 컴포넌트로 유지! → 불필요한 JS 번들을 줄일 수 있습니다.

export default function RatingStars({ rating, reviewCount }) {
  // ─── [별점 계산 로직] ──────────────────────────────────
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    // ─── [별점 UI 구현] ──────────────────────────────────
    // 별 문자: ★
    // 리뷰 수 표시: {rating} ({reviewCount})
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < fullStars
                ? "text-yellow-400"
                : i === fullStars && hasHalfStar
                  ? "text-yellow-300"
                  : "text-gray-200"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-400">
        {rating} ({reviewCount})
      </span>
    </div>
  );
}
