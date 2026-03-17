// ─── [Google 폰트 임포트] ──────────────────────────────
// next/font/google에서 사용할 폰트를 import하세요.
// 힌트: import { 폰트이름 } from "next/font/google";
// 이 프로젝트에서는 두 가지 폰트를 사용합니다:
//   1. Noto_Sans_KR — 본문용 한글 폰트
//   2. Playfair_Display — 제목용 영문 세리프 폰트

import "./globals.css";
import Header from "./components/Header";

// ─── [next/font 인스턴스 생성] ──────────────────────────
// next/font는 빌드 타임에 폰트 파일을 다운로드하여 self-hosting합니다.
// 이를 통해:
//   1. 외부 네트워크 요청 없이 폰트를 로딩 (성능 향상)
//   2. FOUT(Flash of Unstyled Text) 방지
//   3. CLS(Cumulative Layout Shift) 방지
//
// 힌트: 아래와 같이 폰트 인스턴스를 생성하세요.
// const 변수명 = 폰트이름({
//   subsets: ["latin"],          // 사용할 글리프 서브셋
//   weight: ["300", "400", "500", "700"],  // 사용할 폰트 두께
//   variable: "--font-css변수명",  // CSS 변수로 연결
//   display: "swap",             // 폰트 로딩 전략 (swap = 기본 폰트 먼저 보여주고 교체)
// });

// ─── [정적 메타데이터 설정] ─────────────────────────────
// Root Layout에서 사이트 전체의 기본 메타데이터를 설정합니다.
// 하위 페이지에서 generateMetadata()로 동적으로 덮어쓸 수 있습니다.
//
// 힌트: export const metadata = {
//   title: {
//     default: "기본 타이틀",       // 타이틀이 없는 페이지에서 사용
//     template: "%s | 사이트명",    // 하위 페이지 타이틀 포맷 (%s = 페이지 타이틀)
//   },
//   description: "사이트 설명",
//   keywords: ["키워드1", "키워드2"],
//   openGraph: { ... },           // SNS 공유 시 미리보기
// };
export const metadata = {
  title: "SnapGallery",
  description: "Next.js 성능 최적화 학습 예제",
};

export default function RootLayout({ children }) {
  return (
    // ─── [html lang 속성] ────────────────────────────────
    // 힌트: 한국어 사이트이므로 lang="ko"를 설정하세요.
    <html lang="ko">
      <body
        // ─── [폰트 CSS 변수 적용] ──────────────────────────
        // 폰트 인스턴스의 .variable 속성을 className에 추가하면
        // 해당 CSS 변수가 body 전체에서 사용 가능합니다.
        //
        // 힌트: className={`${폰트1.variable} ${폰트2.variable} font-[family-name:var(--font-본문폰트)] bg-gray-50 text-gray-900 antialiased`}
        className="bg-gray-50 text-gray-900 antialiased"
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
