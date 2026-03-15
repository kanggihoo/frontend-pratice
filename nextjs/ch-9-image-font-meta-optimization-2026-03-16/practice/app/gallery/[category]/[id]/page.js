// ─── [next/image 임포트] ────────────────────────────────
// 힌트: import Image from "next/image";

// ─── [next/link 임포트] ─────────────────────────────────
// 힌트: import Link from "next/link";

// ─── [dynamic import — 클라이언트 래퍼 패턴] ────────────
// next/dynamic은 컴포넌트를 동적으로 import하는 함수입니다.
// { ssr: false } 옵션으로 서버 렌더링을 비활성화할 수 있습니다.
//
// ⚠️ 중요 (Next.js 16):
// dynamic({ ssr: false })는 반드시 "use client" 컴포넌트 안에서 호출해야 합니다!
// 이 페이지(page.js)는 서버 컴포넌트이므로 직접 사용할 수 없습니다.
//
// 해결 방법: "use client" 래퍼 컴포넌트를 만들어 그 안에서 dynamic()을 사용합니다.
//
// ── DynamicImageViewer.js (새 파일 생성) ──
// "use client";
// import dynamic from "next/dynamic";
// const ImageViewer = dynamic(() => import("./ImageViewer"), {
//   ssr: false,
//   loading: () => <div className="animate-pulse ...">로딩 중...</div>,
// });
// export default function DynamicImageViewer({ src, alt }) {
//   return <ImageViewer src={src} alt={alt} />;
// }
//
// 그 다음 이 파일에서:
// import DynamicImageViewer from "@/app/components/DynamicImageViewer";

import {
  getImageById,
  getCategoryBySlug,
  getImagesByCategory,
  getPicsumUrl,
} from "@/data/galleryData";
import LikeButton from "@/app/components/LikeButton";
import { notFound } from "next/navigation";

// ─── [generateMetadata: 개별 이미지 동적 메타데이터] ────
// 각 이미지 상세 페이지에 고유한 메타 태그를 생성합니다.
// SNS에 링크를 공유하면 이미지 제목, 설명, 미리보기 이미지가 표시됩니다.
//
// 힌트:
// export async function generateMetadata({ params }) {
//   const { id } = await params;
//   const image = getImageById(id);
//
//   if (!image) {
//     return { title: "이미지를 찾을 수 없습니다" };
//   }
//
//   return {
//     title: image.title,
//     description: image.description,
//     authors: [{ name: image.photographer }],
//     openGraph: {
//       title: image.title,
//       description: image.description,
//       images: [{                      // SNS 미리보기 이미지
//         url: getPicsumUrl(image.picsumId, 1200, 630),
//         width: 1200,
//         height: 630,
//         alt: image.title,
//       }],
//     },
//   };
// }

// ─── [generateStaticParams] ─────────────────────────────
// 힌트: 모든 카테고리의 모든 이미지에 대해
// { category: "nature", id: "1" } 형태의 배열을 반환하세요.

export default async function ImageDetailPage({ params }) {
  const { category, id } = await params;
  const image = getImageById(id);

  if (!image) {
    notFound();
  }

  const categoryInfo = getCategoryBySlug(category);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* ─── [브레드크럼 네비게이션] ──────────────────────
       * 힌트: Link 컴포넌트로 홈, 카테고리 경로를 연결하세요.
       * 홈 → /gallery/{category} → 현재 이미지
       */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <span className="hover:text-gray-600 transition-colors cursor-pointer">
          홈
        </span>
        <span>/</span>
        <span className="hover:text-gray-600 transition-colors cursor-pointer">
          {categoryInfo?.name || category}
        </span>
        <span>/</span>
        <span className="text-gray-700">{image.title}</span>
      </nav>

      {/* ─── [메인 이미지: next/image fill + priority] ─────
       * 이 이미지는 페이지의 LCP(Largest Contentful Paint) 요소입니다.
       * priority 속성을 추가하면 lazy loading이 비활성화되어
       * 페이지 로드 시 즉시 다운로드됩니다.
       *
       * 힌트:
       * <Image
       *   src={getPicsumUrl(image.picsumId, 1200, 900)}
       *   alt={image.title}
       *   fill
       *   priority          // ← LCP 이미지에 반드시 추가!
       *   className="object-cover"
       *   sizes="(max-width: 1024px) 100vw, 1024px"
       * />
       */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl mb-8">
        {/* TODO: Image 컴포넌트로 메인 이미지를 추가하세요 */}
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg">
          메인 이미지 영역
        </div>
      </div>

      {/* 이미지 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{image.title}</h1>
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

      {/* ─── [dynamic() import 시연: Canvas 기반 이미지 뷰어] ──
       * 위에서 dynamic()으로 불러온 ImageViewer 컴포넌트를 렌더링하세요.
       *
       * 힌트:
       * <ImageViewer
       *   src={getPicsumUrl(image.picsumId, 800, 600)}
       *   alt={image.title}
       * />
       *
       * dynamic()을 설정하지 않으면 이 부분이 렌더링되지 않습니다.
       * 먼저 파일 상단에서 dynamic import를 완성하세요.
       */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4">이미지 필터 뷰어</h3>
        <p className="text-sm text-gray-500">
          dynamic() import를 구현하면 여기에 Canvas 기반 필터 뷰어가 나타납니다.
        </p>
      </div>
    </div>
  );
}
