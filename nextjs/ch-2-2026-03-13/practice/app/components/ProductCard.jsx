// ─── [서버 컴포넌트 확인] ──────────────────────────────
// 이 파일에는 "use client" 선언이 없습니다 → 서버 컴포넌트(RSC)입니다.
//
// 💡 핵심 패턴: 이 카드 컴포넌트는 상품 정보를 "표시만" 합니다.
// 사용자 상호작용이 필요한 수량 조절(QuantityControl)은
// 별도의 클라이언트 컴포넌트로 분리하여 이 서버 컴포넌트 안에 주입합니다.
//
// 이렇게 하면:
// - 카드 껍데기(이미지, 텍스트 등)는 서버에서 HTML로 렌더링 → JS 번들 미포함
// - 수량 조절 UI만 클라이언트 JS로 동작 → 번들 크기 최소화
// ─────────────────────────────────────────────────────

// ─── [컴포넌트 임포트] ──────────────────────────────────
// QuantityControl 클라이언트 컴포넌트를 임포트하세요.
// 힌트: import QuantityControl from "./QuantityControl";
// ─────────────────────────────────────────────────────

export default function ProductCard({ product }) {
  return (
    <div className="">
      {/* ─── [카드 컨테이너 스타일링] ──────────────────────
          카드 형태를 만드세요.
          힌트: bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden
                hover:shadow-lg hover:-translate-y-1 transition-all duration-300
          ──────────────────────────────────────────────── */}

      {/* 이미지 영역 */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {/* ─── [카테고리 뱃지 스타일링] ──────────────────────
            절대 위치(absolute)로 이미지 위에 뱃지를 띄우세요.
            힌트: absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm
                  rounded-full text-xs font-medium text-gray-700
            ──────────────────────────────────────────── */}
        <span className="">{product.category}</span>
      </div>

      {/* 상품 정보 영역 */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          {/* ─── [상품명 스타일링] ────────────────────────
              힌트: font-bold text-gray-900 text-lg leading-tight
              ──────────────────────────────────────── */}
          <h3 className="">{product.name}</h3>

          {/* ─── [평점 표시] ──────────────────────────────
              별 아이콘(★)과 rating 값을 표시하세요.
              힌트: flex items-center gap-1 shrink-0 ml-2
              ──────────────────────────────────────── */}
          <div className="">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-sm font-medium text-gray-600">
              {product.rating}
            </span>
          </div>
        </div>

        {/* ─── [상품 설명 스타일링] ────────────────────────
            힌트: text-sm text-gray-500 mb-4 line-clamp-2
            ──────────────────────────────────────────── */}
        <p className="">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          {/* ─── [가격 표시] ──────────────────────────────
              product.price를 toLocaleString()으로 포맷하여 표시하세요.
              힌트: text-xl font-bold text-indigo-600
              ──────────────────────────────────────── */}
          <span className="">{product.price}원</span>

          <span className="text-xs text-gray-400">
            재고 {product.stock}개
          </span>
        </div>

        {/* ─── [QuantityControl 컴포넌트 삽입] ────────────
            임포트한 QuantityControl 컴포넌트를 여기에 렌더링하세요.
            stock prop으로 product.stock을 전달하세요.

            힌트: <QuantityControl stock={product.stock} />

            💡 이것이 RSC/RCC 분리의 핵심입니다!
            서버 컴포넌트(이 파일) 안에 클라이언트 컴포넌트(QuantityControl)를
            children이나 props로 주입하는 패턴입니다.
            ──────────────────────────────────────────── */}
      </div>
    </div>
  );
}
