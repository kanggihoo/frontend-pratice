import { Noto_Sans_KR, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

// ── next/font: Google 폰트 최적화 ──────────────────────
// next/font는 빌드 타임에 폰트를 다운로드하여 self-hosting 합니다.
// 이를 통해 외부 네트워크 요청 없이 FOUT(Flash of Unstyled Text)를 방지합니다.

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

// ── 정적 메타데이터 (Root Layout) ──────────────────────
// Root Layout에서 기본 메타데이터를 설정합니다.
// 하위 페이지에서 generateMetadata로 동적으로 덮어쓸 수 있습니다.
export const metadata = {
  title: {
    default: "SnapGallery | 초고속 반응형 갤러리",
    template: "%s | SnapGallery",
  },
  description:
    "Next.js Image, Font, Metadata 최적화를 적용한 고성능 사진 갤러리입니다.",
  keywords: ["갤러리", "사진", "Next.js", "최적화", "포트폴리오"],
  openGraph: {
    title: "SnapGallery",
    description: "초고속 반응형 사진 갤러리",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKR.variable} ${playfair.variable} font-[family-name:var(--font-noto-sans)] bg-gray-50 text-gray-900 antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm">
              &copy; 2026 SnapGallery. Next.js 성능 최적화 학습 예제
            </p>
            <p className="text-xs mt-2 text-gray-500">
              이미지 제공: picsum.photos | 폰트: Google Fonts (Noto Sans KR,
              Playfair Display)
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
