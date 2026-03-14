// ─── [서버 컴포넌트 vs 클라이언트 컴포넌트 결정하기] ───────
// 질문: 이 RatingStars 컴포넌트에 "use client"가 필요할까요?
//
// 생각해보세요:
// - 별점을 "표시"만 합니다. 클릭해서 별점을 변경하는 기능은 없습니다.
// - useState나 이벤트 핸들러가 없습니다.
// - 결론: 서버 컴포넌트로 유지! → 불필요한 JS 번들을 줄일 수 있습니다.

export default function RatingStars({ rating, reviewCount }) {
  // ─── [별점 계산 로직] ──────────────────────────────────
  // 힌트: rating 값(예: 4.8)에서 꽉 찬 별과 반 별을 계산하세요.
  // const fullStars = Math.floor(rating);       // 예: 4
  // const hasHalfStar = rating % 1 >= 0.5;      // 예: true (0.8 >= 0.5)

  return (
    // ─── [별점 UI 구현] ──────────────────────────────────
    // 힌트: 5개의 별을 map으로 렌더링하세요.
    // - i < fullStars → 노란 별 (text-yellow-400)
    // - i === fullStars && hasHalfStar → 연한 노란 별 (text-yellow-300)
    // - 나머지 → 회색 별 (text-gray-200)
    //
    // 별 문자: ★
    // 리뷰 수 표시: {rating} ({reviewCount})
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {/* 여기에 별 5개를 렌더링하세요 */}
        {/* 힌트: {[...Array(5)].map((_, i) => (...))} */}
        <span className="text-sm text-gray-200">★★★★★</span>
      </div>
      <span className="text-xs text-gray-400">
        {/* 힌트: rating과 reviewCount를 표시하세요 */}
        {/* 예시 출력: 4.8 (324) */}
      </span>
    </div>
  );
}
