"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/admin", label: "대시보드", icon: "📊" },
  { href: "/admin/users", label: "사용자 관리", icon: "👥" },
  { href: "/admin/settings", label: "설정", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-fit">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
        관리자 메뉴
      </h2>
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
