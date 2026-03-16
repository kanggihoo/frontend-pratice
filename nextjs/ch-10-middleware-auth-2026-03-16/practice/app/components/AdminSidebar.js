// ─── [클라이언트 컴포넌트 선언] ──────────────────────
// 이 컴포넌트는 usePathname 훅을 사용하여 현재 경로에 따라
// 활성 메뉴를 표시합니다.
// ✅ "use client" 지시어가 이미 적용되어 있습니다 — 왜 필요한지 이해해보세요.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── [메뉴 아이템 정의] ──────────────────────────
const menuItems = [
  { href: "/admin", label: "대시보드", icon: "📊" },
  { href: "/admin/users", label: "사용자 관리", icon: "👥" },
  { href: "/admin/settings", label: "설정", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="">
      {/* TODO: 사이드바 스타일링 (w-56, bg-white, rounded-xl, shadow-sm, border, p-4) */}

      <h2 className="">
        {/* TODO: 제목 스타일링 (text-xs, font-semibold, uppercase, tracking-wider) */}
        관리자 메뉴
      </h2>

      <nav className="space-y-1">
        {/* ─── [메뉴 아이템 렌더링] ──────────────────── */}
        {/* 힌트:
            menuItems.map()으로 각 아이템을 렌더링하세요.
            현재 경로(pathname)와 메뉴 href를 비교하여 활성 스타일을 적용합니다.

            const isActive = pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            활성 상태: "bg-indigo-50 text-indigo-700"
            비활성 상태: "text-gray-600 hover:bg-gray-50"
        */}
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className=""
          >
            {/* TODO: 아이콘과 라벨을 표시하고, 활성 상태에 따라 스타일 변경 */}
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
