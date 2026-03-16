import { Geist } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Dashboard - Middleware & Auth",
  description: "Next.js 10회차 - Middleware 및 인증 연계 학습",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${geist.variable} font-sans bg-gray-50 min-h-screen antialiased`}
      >
        <Navigation />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
