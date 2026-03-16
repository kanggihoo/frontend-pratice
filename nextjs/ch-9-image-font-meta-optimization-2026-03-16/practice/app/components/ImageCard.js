// ─── [next/image 임포트] ────────────────────────────────
// 힌트: import Image from "next/image";

// ─── [next/link 임포트] ─────────────────────────────────
// 힌트: import Link from "next/link";

import { getPicsumUrl } from "@/data/galleryData";

export default function ImageCard({ image }) {
  return (
    // ─── [카드를 Link로 감싸기] ─────────────────────────
    // 힌트: <Link href={`/gallery/${image.category}/${image.id}`}>
    // 카드 클릭 시 이미지 상세 페이지로 이동합니다.
    <div className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white cursor-pointer">
      {/* ─── [next/image 핵심 사용] ──────────────────────────
       *
       * <img> 태그 vs <Image> 컴포넌트 비교:
       * ┌─────────────────┬──────────────────────────────────┐
       * │ <img>           │ <Image>                          │
       * ├─────────────────┼──────────────────────────────────┤
       * │ 원본 크기 그대로│ 뷰포트에 맞게 자동 리사이징      │
       * │ 항상 즉시 로드  │ lazy loading (뷰포트 진입 시)    │
       * │ PNG/JPG 그대로  │ WebP/AVIF 자동 변환              │
       * │ CLS 발생 가능   │ width/height로 CLS 방지          │
       * └─────────────────┴──────────────────────────────────┘
       *
       * 힌트:
       * <Image
       *   src={getPicsumUrl(image.picsumId, 800, 600)}
       *   alt={image.title}
       *   width={800}          // 원본 이미지 너비 (비율 계산용)
       *   height={600}         // 원본 이미지 높이 (비율 계산용)
       *   className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
       *   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
       * />
       */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* TODO: Image 컴포넌트로 이미지를 렌더링하세요 */}
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
          이미지 영역
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">
          {image.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2">
          {image.description}
        </p>
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
          <span>{image.photographer}</span>
        </div>
      </div>
    </div>
  );
}
