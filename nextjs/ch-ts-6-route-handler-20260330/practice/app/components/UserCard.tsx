// practice/app/components/UserCard.tsx
// ─── [Props 타입 정의] ─────────────────────────────────────────
// JavaScript: function UserCard({ user }) { ... }
// TypeScript: 컴포넌트가 받는 Props의 타입을 먼저 정의해야 합니다.
//
// 1단계: interface로 Props 타입 정의
// interface UserCardProps {
//   user: User;   ← lib/types.ts에서 import한 User 타입 사용
// }
//
// 2단계: 함수 매개변수에 타입 적용
// export default function UserCard({ user }: UserCardProps) { ... }

// TODO: User 타입을 @/lib/types에서 import하세요.

// TODO: UserCardProps interface를 정의하세요.

// TODO: 함수 매개변수에 UserCardProps 타입을 추가하세요.
export default function UserCard({ user }) {  // ← 타입 없음 (에러 발생)
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p className="text-blue-500">{user.website}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Company</p>
        <p className="text-sm font-medium text-gray-700">{user.company.name}</p>
      </div>
    </div>
  );
}
