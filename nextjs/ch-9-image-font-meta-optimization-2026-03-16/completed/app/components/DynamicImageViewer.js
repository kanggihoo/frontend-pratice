"use client";

// ── dynamic() import: SSR 비활성화 ─────────────────────
// Next.js 16에서는 dynamic({ ssr: false })를 클라이언트 컴포넌트에서 사용해야 합니다.
// 이 래퍼 컴포넌트가 클라이언트 경계를 형성하고,
// ImageViewer를 동적으로 import합니다.

import dynamic from "next/dynamic";

const ImageViewer = dynamic(() => import("./ImageViewer"), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-64 mb-4"></div>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-16 bg-gray-200 rounded-full"></div>
          ))}
        </div>
        <div className="aspect-[4/3] bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  ),
});

export default function DynamicImageViewer({ src, alt }) {
  return <ImageViewer src={src} alt={alt} />;
}
