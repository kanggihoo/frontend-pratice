import type { User, Post, Todo } from "@/lib/types";
import { fetchData } from "@/lib/utils";
import UserCard from "@/app/components/UserCard";
import StatsBar from "@/app/components/StatsBar";

// ─── async 서버 컴포넌트 ────────────────────────────────────────────────────────
// async 서버 컴포넌트는 Promise<JSX.Element>를 반환합니다.
// 반환 타입을 명시하지 않아도 TypeScript가 자동으로 추론합니다.
//
// fetchData<T>: 제네릭 타입 파라미터로 응답 타입을 지정합니다.
//   - fetchData<User[]>  → 반환값이 User[] 로 추론됨
//   - fetchData<Post[]>  → 반환값이 Post[] 로 추론됨
//   - fetchData<Todo[]>  → 반환값이 Todo[] 로 추론됨

const BASE_URL = "https://jsonplaceholder.typicode.com";

export default async function DashboardPage() {
  // Promise.all로 세 API를 병렬 호출합니다.
  // 각 fetchData 호출에 제네릭 타입을 지정해 반환값 타입을 명확히 합니다.
  const [users, posts, todos] = await Promise.all([
    fetchData<User[]>(`${BASE_URL}/users`),
    fetchData<Post[]>(`${BASE_URL}/posts`),
    fetchData<Todo[]>(`${BASE_URL}/todos`),
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
        <h2 className="text-base font-semibold text-gray-700 mb-4">유저 목록</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user: User) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </main>
  );
}
