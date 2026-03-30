// TODO: User, Post, Todo 타입을 import하세요.
import type { User, Post, Todo } from "@/lib/types";
import { fetchData } from "@/lib/utils";
import UserCard from "@/app/components/UserCard";
import StatsBar from "@/app/components/StatsBar";

// ─── [제네릭 fetchData<T> 사용법] ─────────────────────────────────────────────
// JavaScript: const users = await fetch(url).then(r => r.json());
//             // 반환 타입을 알 수 없음
//
// TypeScript — 방법 1: 타입 단언 (as)
//   const users = await res.json() as User[];
//
// TypeScript — 방법 2: 제네릭 fetch 유틸 (권장)
//   const users = await fetchData<User[]>(url);
//   // <User[]>: T를 User[]로 지정 → 반환값이 User[]로 추론됨
//
// Promise.all로 여러 API를 병렬 호출할 때도 각 fetchData에 타입을 지정합니다:
//   const [users, posts, todos] = await Promise.all([
//     fetchData<User[]>(url1),   // ← T = User[]
//     fetchData<Post[]>(url2),   // ← T = Post[]
//     fetchData<Todo[]>(url3),   // ← T = Todo[]
//   ]);

const BASE_URL = "https://jsonplaceholder.typicode.com";

export default async function DashboardPage() {
  // TODO: fetchData 호출에 올바른 제네릭 타입을 지정하세요.
  // hint: fetchData<User[]>(...), fetchData<Post[]>(...), fetchData<Todo[]>(...)
  const [users, posts, todos] = await Promise.all([
    fetchData<User[]>(`${BASE_URL}/users`), // ← 제네릭 타입 없음 (에러 발생)
    fetchData<Post[]>(`${BASE_URL}/posts`), // ← 제네릭 타입 없음 (에러 발생)
    fetchData<Todo[]>(`${BASE_URL}/todos`), // ← 제네릭 타입 없음 (에러 발생)
  ]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">유저 대시보드</h1>
      <p className="text-sm text-gray-500 mb-8">JSONPlaceholder API 데이터</p>

      <section className="mb-10">
        <h2 className="text-base font-semibold text-gray-700 mb-3">통계</h2>
        <StatsBar
          userCount={users.length}
          postCount={posts.length}
          todoCount={todos.length}
        />
      </section>

      <section>
        <h2 className="text-base font-semibold text-gray-700 mb-4">
          유저 목록
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* TODO: map 콜백의 user 파라미터에 User 타입을 명시하세요. */}
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </main>
  );
}
