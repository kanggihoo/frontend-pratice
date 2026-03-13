import { useMemo } from "react";
import RenderCounter from "./RenderCounter";

// useMemo를 활용하여 무거운 통계 연산을 최적화하는 컴포넌트
// products 배열이 변경될 때만 통계를 재계산합니다.
export default function StatsPanel({ products }) {
  // useMemo: products가 변경될 때만 통계를 재계산
  // 200개 상품의 평균, 합계 등 연산은 비용이 크므로 메모이제이션이 효과적
  const stats = useMemo(() => {
    // 의도적으로 무거운 연산을 시뮬레이션
    // 실제로는 이 정도 데이터에서 체감이 어렵지만, 학습 목적으로 포함
    let totalPrice = 0;
    let totalDiscount = 0;
    let totalRating = 0;
    let totalReviews = 0;
    let outOfStock = 0;
    let onSale = 0;

    for (const product of products) {
      totalPrice += product.price;
      totalDiscount += product.price - product.discountedPrice;
      totalRating += product.rating;
      totalReviews += product.reviewCount;
      if (product.stock === 0) outOfStock++;
      if (product.discount > 0) onSale++;
    }

    const avgPrice = products.length > 0 ? Math.round(totalPrice / products.length) : 0;
    const avgRating =
      products.length > 0 ? Math.round((totalRating / products.length) * 10) / 10 : 0;

    return {
      count: products.length,
      avgPrice,
      avgRating,
      totalReviews,
      totalDiscount: Math.round(totalDiscount),
      outOfStock,
      onSale,
    };
  }, [products]);

  const statItems = [
    {
      label: "상품 수",
      value: `${stats.count}개`,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "평균 가격",
      value: `${stats.avgPrice.toLocaleString()}원`,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "평균 평점",
      value: `★ ${stats.avgRating}`,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      label: "총 리뷰",
      value: `${stats.totalReviews.toLocaleString()}개`,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "할인 상품",
      value: `${stats.onSale}개`,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "품절",
      value: `${stats.outOfStock}개`,
      color: "text-gray-600",
      bg: "bg-gray-50",
    },
  ];

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">📊 상품 통계</h2>
        <RenderCounter label="StatsPanel" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {statItems.map((item) => (
          <div key={item.label} className={`rounded-lg ${item.bg} p-3 text-center`}>
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className={`mt-1 text-sm font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
