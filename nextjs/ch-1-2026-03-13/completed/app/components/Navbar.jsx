import Link from "next/link";

const navLinks = [
  { href: "/", label: "홈" },
  { href: "/about", label: "회사 소개" },
  { href: "/contact", label: "문의하기" },
];

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-700">
          NovaTech
        </Link>
        <ul className="flex gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-600 hover:text-blue-700 font-medium transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
