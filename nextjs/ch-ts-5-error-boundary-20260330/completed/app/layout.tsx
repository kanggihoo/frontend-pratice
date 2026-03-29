import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Session 5 — Error & Loading Types',
  description: 'Next.js TypeScript: ErrorBoundary props, intersection types',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
