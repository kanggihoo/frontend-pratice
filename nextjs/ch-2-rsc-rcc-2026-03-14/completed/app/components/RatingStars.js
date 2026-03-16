// ✅ 서버 컴포넌트 (기본값)
// 별점을 "표시"만 하므로 상호작용이 필요 없습니다.
// 서버에서 렌더링하여 불필요한 JS 번들을 줄입니다.

export default function RatingStars({ rating, reviewCount }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center" aria-label={`별점 ${rating}점`}>
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
