// ─── [클라이언트 컴포넌트 선언] ──────────────────────────
// 이 컴포넌트는 useState, useRef, useEffect를 사용하며
// Canvas API(브라우저 전용)에 의존합니다.
// 힌트: "use client"; 지시어를 추가하세요.

// ─── [React 훅 임포트] ─────────────────────────────────
// 힌트: import { useState, useRef, useEffect } from "react";

// ── SSR에서 실행 불가능한 클라이언트 전용 컴포넌트 ──
// Canvas API는 브라우저의 window, document 객체가 필요합니다.
// 서버(Node.js)에는 이 객체들이 존재하지 않으므로
// 이 컴포넌트를 일반적으로 import하면 SSR 시 에러가 발생합니다.
//
// 해결: "use client" 래퍼 컴포넌트(DynamicImageViewer.js)를 만들어
// 그 안에서 dynamic(() => import("./ImageViewer"), { ssr: false })로 import합니다.
// Next.js 16에서는 dynamic({ ssr: false })를 서버 컴포넌트에서 직접 사용할 수 없습니다.

const FILTERS = [
  { name: "원본", filter: "none" },
  { name: "흑백", filter: "grayscale(100%)" },
  { name: "세피아", filter: "sepia(100%)" },
  { name: "고대비", filter: "contrast(150%)" },
  { name: "블러", filter: "blur(3px)" },
  { name: "밝게", filter: "brightness(130%)" },
];

export default function ImageViewer({ src, alt }) {
  // ─── [상태 및 Ref 선언] ──────────────────────────────
  // 힌트:
  // const [selectedFilter, setSelectedFilter] = useState("none");
  // const canvasRef = useRef(null);
  // const [canvasReady, setCanvasReady] = useState(false);

  // ─── [useEffect로 Canvas에 이미지 그리기] ─────────────
  // Canvas API를 사용하여 이미지를 로드하고 필터를 적용합니다.
  //
  // 힌트:
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //
  //   const ctx = canvas.getContext("2d");
  //   const img = new window.Image();     // ← window 객체 사용 (브라우저 전용!)
  //   img.crossOrigin = "anonymous";
  //   img.src = src;
  //
  //   img.onload = () => {
  //     canvas.width = img.width;
  //     canvas.height = img.height;
  //     ctx.filter = selectedFilter;
  //     ctx.drawImage(img, 0, 0);
  //     setCanvasReady(true);
  //   };
  // }, [src, selectedFilter]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold mb-4">이미지 필터 뷰어</h3>
      <p className="text-sm text-gray-500 mb-4">
        Canvas API를 사용하는 클라이언트 전용 컴포넌트입니다. (SSR 불가 →{" "}
        <code className="bg-gray-100 px-1 rounded">dynamic()</code>으로 로딩)
      </p>

      {/* ─── [필터 버튼 목록] ──────────────────────────────
       * 힌트: FILTERS.map으로 버튼들을 렌더링하고,
       * onClick에서 setSelectedFilter(f.filter)를 호출하세요.
       * selectedFilter === f.filter 일 때 활성 스타일을 적용하세요.
       */}
      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.filter}
            className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* ─── [Canvas 렌더링 영역] ──────────────────────────
       * 힌트: <canvas ref={canvasRef} ... /> 로 Canvas 요소를 렌더링하세요.
       * canvasReady가 false일 때는 로딩 메시지를 보여주세요.
       */}
      <div className="relative rounded-xl overflow-hidden bg-gray-100">
        <div className="aspect-[4/3] flex items-center justify-center text-gray-400">
          Canvas 영역 (구현 필요)
        </div>
      </div>
    </div>
  );
}
