import { Geist } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
=======
import Link from "next/link";
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f

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
<<<<<<< HEAD
            <a href="/" className="text-xl font-bold text-indigo-600">
              📰 NewsFeed
            </a>
            <nav className="flex gap-6 text-sm font-medium text-gray-600">
              <a href="/" className="hover:text-indigo-600 transition-colors">
                홈
              </a>
              <a
=======
            <Link href="/" className="text-xl font-bold text-indigo-600">
              📰 NewsFeed
            </Link>
            <nav className="flex gap-6 text-sm font-medium text-gray-600">
              <Link
                href="/"
                className="hover:text-indigo-600 transition-colors"
              >
                홈
              </Link>
              <Link
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f
                href="/posts"
                className="hover:text-indigo-600 transition-colors"
              >
                게시글
<<<<<<< HEAD
              </a>
              <a
=======
              </Link>
              <Link
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f
                href="/posts/999"
                className="hover:text-indigo-600 transition-colors"
              >
                없는 게시글
<<<<<<< HEAD
              </a>
=======
              </Link>
>>>>>>> ac06ffee49136562bdd1cf983bf3e8416e10a53f
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
