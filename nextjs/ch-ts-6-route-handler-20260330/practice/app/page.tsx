// practice/app/page.tsx
// ─── [API 응답 타입 적용] ─────────────────────────────────────
// JavaScript: const json = await res.json(); // 타입을 모름
// TypeScript: API 응답의 구조를 interface로 정의하고 명시합니다.
//
// 방법 1 — 타입 단언 (as):
//   const json = await res.json() as ApiResponse<User[]>;
//
// 방법 2 — 변수에 타입 명시:
//   const json: ApiResponse<User[]> = await res.json();
//
// 주의: getUsers()의 반환 타입도 명시하세요.
//   async function getUsers(): Promise<User[]> { ... }

// TODO: User, ApiResponse 타입을 @/lib/types에서 import하세요.
import UserCard from './components/UserCard';

// TODO: 반환 타입 Promise<User[]>를 추가하세요.
async function getUsers() {  // ← 반환 타입 없음
  const res = await fetch('http://localhost:3000/api/users?limit=6', {
    cache: 'no-store',
  });

  if (!res.ok) return [];

  // TODO: res.json()에 ApiResponse<User[]> 타입을 명시하세요.
  const json = await res.json();  // ← 타입 없음
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
