import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "뉴스 피드 - 로딩 & 에러 UI 학습",
  description: "Next.js 로딩, 에러, Suspense 학습 예제",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} font-sans antialiased bg-gray-50 text-gray-900`}
      >
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-indigo-600">
              📰 NewsFeed
            </a>
            <nav className="flex gap-6 text-sm font-medium text-gray-600">
              <a href="/" className="hover:text-indigo-600 transition-colors">
                홈
              </a>
              <a
                href="/posts"
                className="hover:text-indigo-600 transition-colors"
              >
                게시글
              </a>
              <a
                href="/posts/999"
                className="hover:text-indigo-600 transition-colors"
              >
                없는 게시글
              </a>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
