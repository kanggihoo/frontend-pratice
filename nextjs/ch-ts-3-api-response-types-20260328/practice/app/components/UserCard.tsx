// ─── [Props 타입 정의] ─────────────────────────────────────────────────────────
// JavaScript: function UserCard({ user }) { ... }
// TypeScript: Props의 타입을 interface로 정의하고, 매개변수에 적용합니다.
//
// 1단계: lib/types.ts에서 User 타입을 import하세요.
//   import type { User } from '@/lib/types';
//   // import type: 런타임에 필요 없는 타입만 import (번들 최적화)
//
// 2단계: Props interface를 정의하세요.
//   interface UserCardProps {
//     user: User;
//   }
//
// 3단계: 함수 매개변수에 타입을 적용하세요.
//   export default function UserCard({ user }: UserCardProps) { ... }

// TODO: User 타입을 import하세요.

// TODO: UserCardProps 인터페이스를 정의하세요.

// TODO: Props에 타입 어노테이션을 추가하세요.
export default function UserCard({ user }) {  // ← 타입 없음 (에러 발생)
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
