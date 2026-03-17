import Image from "next/image";
import Link from "next/link";
import {
  getImageById,
  getCategoryBySlug,
  getImagesByCategory,
  getPicsumUrl,
} from "@/data/galleryData";
import LikeButton from "@/app/components/LikeButton";
import DynamicImageViewer from "@/app/components/DynamicImageViewer";
import { notFound } from "next/navigation";

// ── dynamic() import 설명 ──────────────────────────────
// ImageViewer는 Canvas API(브라우저 전용)를 사용하므로 서버에서 렌더링 불가.
// Next.js 16에서는 dynamic({ ssr: false })를 반드시 클라이언트 컴포넌트에서 호출해야 합니다.
// 따라서 DynamicImageViewer라는 "use client" 래퍼 컴포넌트를 만들어
// 그 안에서 dynamic()으로 ImageViewer를 import합니다.

// ── generateMetadata: 개별 이미지 동적 메타데이터 ──────
// 각 이미지의 제목, 설명, 사진작가 정보를 메타 태그로 생성합니다.
// SNS 공유 시 풍부한 미리보기를 제공합니다.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const image = getImageById(id);

  if (!image) {
    return { title: "이미지를 찾을 수 없습니다" };
  }

  return {
    title: image.title,
    description: image.description,
    authors: [{ name: image.photographer }],
    openGraph: {
      title: image.title,
      description: image.description,
      images: [
        {
          url: getPicsumUrl(image.picsumId, 1200, 630),
          width: 1200,
          height: 630,
          alt: image.title,
        },
      ],
    },
  };
}

// ── generateStaticParams: 모든 이미지 경로 사전 생성 ───
export function generateStaticParams() {
  const allParams = [];
  const categoryList = ["nature", "architecture", "food", "travel"];

  categoryList.forEach((cat) => {
    const images = getImagesByCategory(cat);
    images.forEach((img) => {
      allParams.push({ category: cat, id: String(img.id) });
    });
  });

  return allParams;
}

export default async function ImageDetailPage({ params }) {
  const { category, id } = await params;
  const image = getImageById(id);

  if (!image) {
    notFound();
  }

  const categoryInfo = getCategoryBySlug(category);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* 브레드크럼 네비게이션 */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600 transition-colors">
          홈
        </Link>
        <span>/</span>
        <Link
          href={`/gallery/${category}`}
          className="hover:text-gray-600 transition-colors"
        >
          {categoryInfo?.name || category}
        </Link>
        <span>/</span>
        <span className="text-gray-700">{image.title}</span>
      </nav>

      {/* 메인 이미지: next/image + priority로 LCP 최적화 */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl mb-8">
        <Image
          src={getPicsumUrl(image.picsumId, 1200, 900)}
          alt={image.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>

      {/* 이미지 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-4">
            {image.title}
          </h1>
          <p className="text-gray-600 leading-relaxed mb-6">
            {image.description}
          </p>

          {/* 태그 */}
          <div className="flex flex-wrap gap-2">
            {image.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 사이드 정보 */}
        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              사진작가
            </p>
            <p className="font-medium">{image.photographer}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              카테고리
            </p>
            <p className="font-medium">{categoryInfo?.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              해상도
            </p>
            <p className="font-medium">
              {image.width} x {image.height}
            </p>
          </div>
          <div className="pt-2">
            <LikeButton />
          </div>
        </div>
      </div>

      {/* ── dynamic() import 시연: Canvas 기반 이미지 뷰어 ── */}
      <DynamicImageViewer
        src={getPicsumUrl(image.picsumId, 800, 600)}
        alt={image.title}
      />
    </div>
  );
}
