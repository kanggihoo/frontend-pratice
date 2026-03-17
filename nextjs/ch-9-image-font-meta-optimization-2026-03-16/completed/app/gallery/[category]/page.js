import {
  getImagesByCategory,
  getCategoryBySlug,
  categories,
} from "@/data/galleryData";
import GalleryGrid from "@/app/components/GalleryGrid";
import { notFound } from "next/navigation";

// ── generateMetadata: 동적 SEO 메타데이터 ──────────────
// URL 파라미터(category)에 따라 페이지 제목, 설명, OG 태그를 동적으로 생성합니다.
// 이를 통해 각 카테고리 페이지가 검색 엔진에서 고유하게 인식됩니다.
export async function generateMetadata({ params }) {
  const { category } = await params;
  const categoryInfo = getCategoryBySlug(category);

  if (!categoryInfo) {
    return { title: "카테고리를 찾을 수 없습니다" };
  }

  return {
    title: categoryInfo.name,
    description: categoryInfo.description,
    openGraph: {
      title: `${categoryInfo.name} | SnapGallery`,
      description: categoryInfo.description,
    },
  };
}

// ── generateStaticParams: 빌드 타임 정적 경로 생성 ─────
// 모든 카테고리 경로를 빌드 시점에 미리 생성하여 SSG 처리합니다.
export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const categoryInfo = getCategoryBySlug(category);
  if (!categoryInfo) {
    notFound();
  }

  const images = getImagesByCategory(category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* 카테고리 헤더 */}
      <div className="mb-10">
        <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-3">
          {categoryInfo.name}
        </h1>
        <p className="text-gray-500 text-lg">{categoryInfo.description}</p>
        <div className="mt-2 text-sm text-gray-400">
          총 {images.length}장의 사진
        </div>
      </div>

      {/* 이미지 그리드 */}
      <GalleryGrid images={images} />
    </div>
  );
}
