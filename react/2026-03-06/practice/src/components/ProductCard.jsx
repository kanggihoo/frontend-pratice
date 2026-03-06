// ─── [Props 받기] ────────────────────────────────
// 이 컴포넌트는 부모(ProductList)로부터 하나의 prop을 받습니다:
//   - product: 상품 객체 (id, name, category, price, rating, image, description, inStock)
// 힌트: function ProductCard({ product })

export default function ProductCard() {
  // ─── [구조 분해 할당] ──────────────────────────────
  // product 객체에서 필요한 속성들을 꺼내세요.
  // 힌트: const { name, category, price, rating, image, description, inStock } = product;


  // ─── [이벤트 핸들러] ──────────────────────────────
  // "담기" 버튼을 클릭하면 alert로 메시지를 표시하는 함수를 만드세요.
  // 예시: alert(`"${name}" 상품이 장바구니에 추가되었습니다!`);
  // 힌트: const handleAddToCart = () => { ... };


  return (
    // ─── [카드 컨테이너] ─────────────────────────────
    // 최상위 div에 다음 Tailwind 클래스를 적용하세요:
    //   bg-white rounded-2xl shadow-sm hover:shadow-lg
    //   transition-shadow duration-300 overflow-hidden
    //   flex flex-col
    <div>
      {/* ─── [이미지 영역] ──────────────────────────── */}
      {/* 이모지를 크게 표시하는 영역입니다.              */}
      {/* Tailwind: bg-gray-100 h-48 flex items-center  */}
      {/*   justify-center text-7xl                      */}
      {/* 힌트: <div className="...">{image}</div>       */}
      <div>
        {/* 여기에 image(이모지)를 표시하세요 */}
      </div>

      {/* ─── [카드 본문] ────────────────────────────── */}
      {/* Tailwind: p-5 flex flex-col flex-1             */}
      <div>
        {/* ─── [카테고리 + 평점] ──────────────────── */}
        {/* 카테고리 뱃지와 평점을 한 줄에 배치하세요   */}
        {/* 힌트: flex items-center justify-between mb-2 */}
        {/*                                             */}
        {/* 카테고리 뱃지:                               */}
        {/*   <span> 태그에 category 텍스트              */}
        {/*   Tailwind: text-xs font-medium text-indigo-600 */}
        {/*     bg-indigo-50 px-2 py-1 rounded-full     */}
        {/*                                             */}
        {/* 평점:                                        */}
        {/*   <span> 태그에 "⭐ {rating}" 텍스트         */}
        {/*   Tailwind: text-sm text-yellow-500 font-medium */}

        {/* ─── [상품명] ──────────────────────────────  */}
        {/* <h3> 태그에 name 표시                        */}
        {/* Tailwind: text-lg font-semibold text-gray-800 mb-1 */}

        {/* ─── [설명] ────────────────────────────────  */}
        {/* <p> 태그에 description 표시                  */}
        {/* Tailwind: text-sm text-gray-500 mb-4 flex-1 */}

        {/* ─── [가격 + 담기 버튼] ───────────────────── */}
        {/* 가격과 버튼을 한 줄에 배치하세요              */}
        {/* 힌트: flex items-center justify-between mt-auto */}
        {/*                                              */}
        {/* 가격:                                        */}
        {/*   price.toLocaleString() + "원"으로 표시     */}
        {/*   Tailwind: text-xl font-bold text-gray-900  */}
        {/*                                              */}
        {/* 담기 버튼:                                   */}
        {/*   - onClick에 handleAddToCart 연결            */}
        {/*   - disabled={!inStock} 으로 품절 시 비활성화 */}
        {/*   - inStock이면 텍스트 "담기", 아니면 "품절"  */}
        {/*   - 조건부 스타일링:                          */}
        {/*     재고 있음: bg-indigo-600 text-white       */}
        {/*       hover:bg-indigo-700 active:bg-indigo-800 */}
        {/*     품절: bg-gray-200 text-gray-400           */}
        {/*       cursor-not-allowed                      */}
        {/*   - 공통: px-4 py-2 rounded-lg text-sm       */}
        {/*     font-medium transition-colors duration-200 */}
        {/*     cursor-pointer                            */}

        <p>카드 내용을 여기에 구현하세요</p>
      </div>
    </div>
  );
}
