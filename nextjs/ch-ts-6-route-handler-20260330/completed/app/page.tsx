import type { User, ApiResponse } from '@/lib/types';
import UserCard from './components/UserCard';

async function getUsers(): Promise<User[]> {
  const res = await fetch('http://localhost:3000/api/users?limit=6', {
    cache: 'no-store',
  });

  if (!res.ok) return [];

  const json: ApiResponse<User[]> = await res.json();
  return json.data ?? [];
}

export default async function Home() {
  const users = await getUsers();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">유저 디렉토리</h1>
        <p className="text-gray-500 mb-8">
          <code className="bg-gray-100 px-2 py-1 rounded text-sm">/api/users</code> Route Handler를 통해 가져온 데이터
        </p>

        {users.length === 0 ? (
          <p className="text-red-500">유저를 불러오지 못했습니다.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
