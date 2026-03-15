"use client";

// ── SSR에서 실행 불가능한 클라이언트 전용 컴포넌트 ──
// 이 컴포넌트는 Canvas API (브라우저 전용)를 사용하여
// 이미지에 필터 효과를 적용합니다.
// dynamic() import 시 { ssr: false } 옵션으로 불러와야 합니다.

import { useState, useRef, useEffect } from "react";

const FILTERS = [
  { name: "원본", filter: "none" },
  { name: "흑백", filter: "grayscale(100%)" },
  { name: "세피아", filter: "sepia(100%)" },
  { name: "고대비", filter: "contrast(150%)" },
  { name: "블러", filter: "blur(3px)" },
  { name: "밝게", filter: "brightness(130%)" },
];

export default function ImageViewer({ src, alt }) {
  const [selectedFilter, setSelectedFilter] = useState("none");
  const canvasRef = useRef(null);
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    // Canvas API는 브라우저에서만 사용 가능 (window, document 객체 필요)
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = selectedFilter;
      ctx.drawImage(img, 0, 0);
      setCanvasReady(true);
    };
  }, [src, selectedFilter]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold mb-4">이미지 필터 뷰어</h3>
      <p className="text-sm text-gray-500 mb-4">
        Canvas API를 사용하는 클라이언트 전용 컴포넌트입니다. (SSR 불가 →{" "}
        <code className="bg-gray-100 px-1 rounded">dynamic()</code>으로 로딩)
      </p>

      {/* 필터 버튼 목록 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.filter}
            onClick={() => setSelectedFilter(f.filter)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              selectedFilter === f.filter
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* Canvas 렌더링 영역 */}
      <div className="relative rounded-xl overflow-hidden bg-gray-100">
        {!canvasReady && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            필터 적용 중...
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-auto rounded-xl"
          aria-label={`${alt} - 필터 적용된 이미지`}
        />
      </div>
    </div>
  );
}
