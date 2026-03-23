// ─── [React.memo 적용 — 핵심!] ──────────────────────────
// 이 컴포넌트는 memo 적용의 효과가 가장 크게 체감되는 곳입니다.
// 200개의 상품 카드가 렌더링되는데, 검색어가 바뀌어도
// 이미 표시된 카드의 product 데이터는 변경되지 않습니다.
//
// memo를 적용하면?
// → product 객체의 참조가 같으면 리렌더링을 건너뜁니다.
// → 200개 중 대부분의 카드가 불필요한 리렌더링을 피할 수 있습니다.
//
// memo를 적용하지 않으면?
// → 부모(ProductList)가 리렌더링될 때마다 200개 카드 모두 리렌더링됩니다.
// → RenderCounter의 숫자가 빠르게 증가하는 것을 확인할 수 있습니다.

import RenderCounter from "./RenderCounter";

function ProductItem({ product }) {
  // ─── [props에서 필요한 데이터 추출] ──────────────────
  // product 객체에서 구조분해 할당으로 필요한 속성을 추출하세요.
  // 속성: name, category, brand, price, discountedPrice, discount,
  //       rating, reviewCount, stock
  //
  // 힌트: const { name, category, ... } = product;


  // ─── [가격 포맷팅] ────────────────────────────────────
  // 숫자를 한국 원화 형식으로 포맷팅하세요.
  // 예: 15000 → "15,000"
  // 힌트: price.toLocaleString("ko-KR")


  // ─── [별점 표시] ──────────────────────────────────────
  // rating 값을 기반으로 별점 문자열을 만드세요.
  // 예: rating이 4.2이면 → "★★★★☆"
  // 힌트: "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))


  return (
    <div className="">
      {/* ─── [카테고리 & 브랜드 뱃지] ────────────────────── */}
      {/* category와 brand를 작은 뱃지로 표시하세요. */}
      {/* RenderCounter도 이 영역에 배치하세요. */}
      <div className="mb-3 flex items-start justify-between">
        <div>

        </div>
        <RenderCounter label="Item" />
      </div>

      {/* ─── [상품명] ────────────────────────────────────── */}
      {/* product.name을 h3 태그로 표시하세요. */}


      {/* ─── [가격 표시] ─────────────────────────────────── */}
      {/* 할인이 있으면 (discount > 0): 할인율, 할인가, 원래 가격(취소선) 표시 */}
      {/* 할인이 없으면: 원래 가격만 표시 */}
      {/* 힌트: 조건부 렌더링 - {discount > 0 ? (...) : (...)} */}


      {/* ─── [별점 & 리뷰 수] ────────────────────────────── */}
      {/* 별점 문자열과 rating 숫자, 리뷰 수를 표시하세요. */}


      {/* ─── [재고 상태 & 장바구니 버튼] ─────────────────── */}
      {/* stock > 20이면 "재고 충분" (초록), 0보다 크면 "N개 남음" (주황), 0이면 "품절" (빨강) */}
      {/* 장바구니 버튼도 함께 배치하세요. */}

    </div>
  );
}

export default ProductItem;
