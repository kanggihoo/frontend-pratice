import type { User } from "@/lib/types";

// ─── Props 타입 정의 ────────────────────────────────────────────────────────────
// User 인터페이스를 import해서 Props의 타입으로 사용합니다.
// import type: 런타임에 필요 없는 타입만 import할 때 사용 (번들 최적화)

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
          {user.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
          <p className="text-xs text-gray-500">@{user.username}</p>
        </div>
      </div>
      <div className="mt-1 space-y-1 text-xs text-gray-600">
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p className="text-indigo-600">{user.website}</p>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
        <p className="font-medium text-gray-700">{user.company.name}</p>
        <p className="italic">&quot;{user.company.catchPhrase}&quot;</p>
      </div>
    </div>
  );
}
