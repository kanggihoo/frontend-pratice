// ─── [next/image 임포트] ────────────────────────────────
// 힌트: import Image from "next/image";
// next/image는 <img> 태그의 최적화 버전입니다.
// 자동으로 WebP/AVIF 변환, lazy loading, CLS 방지를 적용합니다.

// ─── [next/link 임포트] ─────────────────────────────────
// 힌트: import Link from "next/link";

import { categories, getPicsumUrl } from "@/data/galleryData";

export default function HomePage() {
  return (
    <div>
      {/* ── 히어로 섹션 ── */}
      {/* ─── [next/image fill 모드] ──────────────────────────
       * 부모 요소를 꽉 채우는 배경 이미지를 만들 때 fill 속성을 사용합니다.
       *
       * 힌트: <Image
       *   src={getPicsumUrl(1015, 1920, 800)}
       *   alt="히어로 이미지 설명"
       *   fill                    // 부모 요소를 꽉 채움
       *   priority                // LCP(Largest Contentful Paint) 이미지에 적용 → lazy loading 비활성화
       *   className="object-cover" // 비율 유지하며 채움
       *   sizes="100vw"           // 뷰포트 너비 전체 사용
       * />
       *
       * 주의: fill 모드 사용 시 부모에 반드시 relative + 크기(h-[500px] 등)를 지정해야 합니다.
       */}
      <section className="relative h-[500px] overflow-hidden">
        {/* TODO: Image 컴포넌트로 히어로 배경 이미지를 추가하세요 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center">
            SnapGallery
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-xl text-center">
            Next.js 이미지 최적화로 구현한 초고속 반응형 사진 갤러리
          </p>
        </div>
      </section>

      {/* ── 카테고리 그리드 ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-2 text-center">카테고리 둘러보기</h2>
        <p className="text-gray-500 text-center mb-10">
          관심 있는 카테고리를 선택하여 아름다운 사진들을 감상하세요
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            // ─── [카테고리 카드 링크] ───────────────────────
            // 힌트: <Link href={`/gallery/${category.slug}`}>로 감싸세요.
            // 현재 <div>를 Link로 교체하면 클릭 시 해당 카테고리 페이지로 이동합니다.
            <div
              key={category.slug}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              {/* ─── [카테고리 카드 이미지] ─────────────────────
               * 힌트: <Image
               *   src={getPicsumUrl(category.coverImageId, 600, 400)}
               *   alt={`${category.name} 카테고리 대표 이미지`}
               *   fill
               *   className="object-cover group-hover:scale-105 transition-transform duration-500"
               *   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
               * />
               *
               * sizes 속성 설명:
               * - 모바일(~640px): 화면 전체 너비
               * - 태블릿(~1024px): 화면 50%
               * - 데스크톱: 화면 25% (4열 그리드)
               * → 불필요하게 큰 이미지를 다운로드하지 않아 성능 향상
               */}
              {/* TODO: Image 컴포넌트로 카테고리 이미지를 추가하세요 */}
              <div className="absolute inset-0 bg-gray-300" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-xl font-bold mb-1">
                  {category.name}
                </h3>
                <p className="text-white/70 text-sm">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 최적화 기술 안내 (이 섹션은 그대로 사용) ── */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          이 갤러리에 적용된 최적화 기술
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "next/image",
              desc: "자동 WebP/AVIF 변환, lazy loading, Layout Shift 방지",
            },
            {
              title: "next/font",
              desc: "Google 폰트 self-hosting으로 FOUT 방지 및 네트워크 요청 제거",
            },
            {
              title: "generateMetadata",
              desc: "페이지별 동적 SEO 메타 태그 자동 생성",
            },
            {
              title: "dynamic() import",
              desc: "SSR 미지원 컴포넌트를 클라이언트 전용으로 동적 로딩",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
