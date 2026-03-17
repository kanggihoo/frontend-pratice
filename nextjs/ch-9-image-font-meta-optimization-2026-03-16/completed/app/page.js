import Image from "next/image";
import Link from "next/link";
import { categories, getPicsumUrl } from "@/data/galleryData";

export default function HomePage() {
  return (
    <div>
      {/* ── 히어로 섹션: next/image로 최적화된 대형 배너 ── */}
      <section className="relative h-[500px] overflow-hidden">
        <Image
          src={getPicsumUrl(1015, 1920, 800)}
          alt="SnapGallery 히어로 이미지 - 드넓은 강과 산이 어우러진 풍경"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-playfair)] font-bold mb-4 text-center">
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
            <Link
              key={category.slug}
              href={`/gallery/${category.slug}`}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* next/image: 카테고리 카드 이미지 */}
              <Image
                src={getPicsumUrl(category.coverImageId, 600, 400)}
                alt={`${category.name} 카테고리 대표 이미지`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-xl font-bold mb-1">
                  {category.name}
                </h3>
                <p className="text-white/70 text-sm">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── next/image 최적화 포인트 안내 ── */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          이 갤러리에 적용된 최적화 기술
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "next/image",
              desc: "자동 WebP/AVIF 변환, lazy loading, Layout Shift 방지",
              icon: "🖼️",
            },
            {
              title: "next/font",
              desc: "Google 폰트 self-hosting으로 FOUT 방지 및 네트워크 요청 제거",
              icon: "🔤",
            },
            {
              title: "generateMetadata",
              desc: "페이지별 동적 SEO 메타 태그 자동 생성",
              icon: "🔍",
            },
            {
              title: "dynamic() import",
              desc: "SSR 미지원 컴포넌트를 클라이언트 전용으로 동적 로딩",
              icon: "⚡",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
