// ─── [서버 컴포넌트 확인] ──────────────────────────────
// 이 page.jsx는 서버 컴포넌트(RSC)입니다. "use client" 선언이 없으므로
// Next.js가 이 파일을 서버에서 렌더링합니다.
//
// 서버 컴포넌트에서는:
// ✅ 다른 서버 컴포넌트를 import하여 사용 가능
// ✅ 클라이언트 컴포넌트를 import하여 사용 가능 (자식으로 배치)
// ❌ useState, useEffect 등 훅 사용 불가
// ❌ onClick 등 이벤트 핸들러 사용 불가
// ─────────────────────────────────────────────────────

// ─── [컴포넌트 임포트] ──────────────────────────────────
// 1. Header 서버 컴포넌트를 임포트하세요.
// 2. ProductGrid 컴포넌트를 임포트하세요.
//
// 힌트:
// import Header from "./components/Header";
// import ProductGrid from "./components/ProductGrid";
// ─────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ─── [Header 컴포넌트] ─────────────────────────
          임포트한 Header 컴포넌트를 렌더링하세요.
          힌트: <Header />
          ──────────────────────────────────────────── */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 페이지 타이틀 영역 */}
        <div className="mb-8">
          {/* ─── [타이틀 스타일링] ──────────────────────────
              h2: text-3xl font-bold text-gray-900 mb-2
              p: text-gray-500
              ──────────────────────────────────────── */}
          <h2 className="">인기 상품</h2>
          <p className="">마음에 드는 상품의 수량을 선택해 보세요.</p>
        </div>

        {/* ─── [ProductGrid 컴포넌트] ──────────────────
            임포트한 ProductGrid 컴포넌트를 렌더링하세요.
            힌트: <ProductGrid />
            ──────────────────────────────────────────── */}
      </div>
    </>
  );
}
