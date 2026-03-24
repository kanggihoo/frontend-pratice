// ─── [useMemo 핵심 실습] ─────────────────────────────────
// 이 컴포넌트는 useMemo를 활용하여 무거운 통계 연산을 최적화합니다.
// products 배열이 변경될 때만 통계를 재계산하도록 메모이제이션하세요.
//
// useMemo란?
// - 계산 비용이 큰 값을 메모이제이션하는 훅입니다.
// - 의존성 배열의 값이 변경될 때만 재계산합니다.
// - 사용법: const result = useMemo(() => 계산함수(), [의존성]);

import RenderCounter from "./RenderCounter";

export default function StatsPanel({ products }) {
  // ─── [useMemo로 통계 계산] ────────────────────────────
  // useMemo를 사용하여 아래 통계를 계산하세요.
  // 의존성 배열: [products]
  //
  // 계산할 통계:
  // 1. count: 상품 수 (products.length)
  // 2. avgPrice: 평균 가격 (총 가격 / 상품 수)
  // 3. avgRating: 평균 평점 (총 평점 / 상품 수, 소수점 1자리)
  // 4. totalReviews: 총 리뷰 수
  // 5. onSale: 할인 상품 수 (discount > 0인 것)
  // 6. outOfStock: 품절 상품 수 (stock === 0인 것)
  //
  // 힌트:
  //   const stats = useMemo(() => {
  //     let totalPrice = 0;
  //     // ... products를 순회하며 합산 ...
  //     return { count, avgPrice, avgRating, totalReviews, onSale, outOfStock };
  //   }, [products]);
  //
  // ⚠️ useMemo를 import하는 것을 잊지 마세요!
  //    import { useMemo } from "react";

  const stats = {
    count: 0,
    avgPrice: 0,
    avgRating: 0,
    totalReviews: 0,
    onSale: 0,
    outOfStock: 0,
  };

  // ─── [통계 표시 데이터] ───────────────────────────────
  // 아래 배열은 완성되어 있습니다. stats 값이 올바르게 계산되면 자동으로 표시됩니다.
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
