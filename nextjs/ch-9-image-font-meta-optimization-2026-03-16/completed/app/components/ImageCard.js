import Image from "next/image";
import Link from "next/link";
import { getPicsumUrl } from "@/data/galleryData";

export default function ImageCard({ image }) {
  return (
    <Link
      href={`/gallery/${image.category}/${image.id}`}
      className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white"
    >
      {/* ── next/image 핵심 사용 ──
       * - width/height: 원본 비율 지정으로 CLS(Cumulative Layout Shift) 방지
       * - sizes: 뷰포트에 따른 적절한 이미지 크기 힌트 (불필요한 대용량 이미지 다운로드 방지)
       * - className: object-cover로 컨테이너에 맞춤
       * - next/image는 자동으로 WebP/AVIF로 변환하고, lazy loading을 적용합니다.
       */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={getPicsumUrl(image.picsumId, 800, 600)}
          alt={image.title}
          width={800}
          height={600}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">
          {image.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2">
          {image.description}
        </p>
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
          <span>📸 {image.photographer}</span>
        </div>
      </div>
    </Link>
  );
}
