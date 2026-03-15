import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-gray-900">
            Snap
          </span>
          <span className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-blue-600">
            Gallery
          </span>
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            홈
          </Link>
          <Link
            href="/gallery/nature"
            className="hover:text-gray-900 transition-colors"
          >
            자연
          </Link>
          <Link
            href="/gallery/architecture"
            className="hover:text-gray-900 transition-colors"
          >
            건축
          </Link>
          <Link
            href="/gallery/food"
            className="hover:text-gray-900 transition-colors"
          >
            음식
          </Link>
          <Link
            href="/gallery/travel"
            className="hover:text-gray-900 transition-colors"
          >
            여행
          </Link>
        </nav>
      </div>
    </header>
  );
}
