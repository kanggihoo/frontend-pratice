import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "NovaTech Solutions - 혁신적인 IT 솔루션",
  description:
    "NovaTech Solutions는 최첨단 기술로 비즈니스의 디지털 전환을 이끄는 IT 솔루션 기업입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
