import type { User } from '@/lib/types';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
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
