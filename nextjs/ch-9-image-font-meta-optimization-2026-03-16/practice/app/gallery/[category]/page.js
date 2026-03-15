import {
  getImagesByCategory,
  getCategoryBySlug,
  categories,
} from "@/data/galleryData";
import GalleryGrid from "@/app/components/GalleryGrid";
import { notFound } from "next/navigation";

// ─── [generateMetadata: 동적 SEO 메타데이터] ────────────
// URL 파라미터에 따라 페이지마다 고유한 메타 태그를 생성합니다.
// 이를 통해 검색 엔진(Google 등)이 각 페이지를 고유하게 인식합니다.
//
// React에서는 react-helmet 같은 라이브러리가 필요했지만,
// Next.js에서는 이 함수만 export하면 자동으로 <head>에 주입됩니다.
//
// 힌트:
// export async function generateMetadata({ params }) {
//   const { category } = await params;
//   const categoryInfo = getCategoryBySlug(category);
//
//   if (!categoryInfo) {
//     return { title: "카테고리를 찾을 수 없습니다" };
//   }
//
//   return {
//     title: categoryInfo.name,        // layout.js의 template에 의해 "자연 풍경 | SnapGallery" 형태로 표시
//     description: categoryInfo.description,
//     openGraph: {                     // SNS 공유 시 미리보기 정보
//       title: `${categoryInfo.name} | SnapGallery`,
//       description: categoryInfo.description,
//     },
//   };
// }

// ─── [generateStaticParams: 빌드 타임 정적 경로 생성] ───
// 모든 카테고리 경로를 빌드 시점에 미리 생성합니다(SSG).
// 이를 통해 사용자가 접근하기 전에 이미 HTML이 준비되어 있어 빠릅니다.
//
// 힌트:
// export function generateStaticParams() {
//   return categories.map((cat) => ({ category: cat.slug }));
// }

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
        {/* ─── [제목 폰트 적용] ──────────────────────────────
         * 힌트: font-[family-name:var(--font-playfair)]를 추가하세요.
         * layout.js에서 설정한 폰트 CSS 변수를 여기서 사용합니다.
         */}
        <h1 className="text-4xl font-bold mb-3">{categoryInfo.name}</h1>
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
