import type { Post } from "@/lib/types";

// ─── [제네릭 Promise 반환 타입] ────────────────────────────────────

// TODO: 함수 매개변수와 반환 타입을 추가하세요.
async function getPosts(shouldError: boolean): Promise<Post[]> {
  // ← 타입 없음 (에러 발생)
  await new Promise<void>((resolve) => setTimeout(resolve, 1500));

  if (shouldError) {
    throw new Error("피드 데이터를 불러오지 못했습니다.");
  }

  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=6",
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json() as Promise<Post[]>;
}

// ─── [Props 타입 정의] ─────────────────────────────────────────────
// 이 컴포넌트가 받을 Props의 타입을 정의하세요.
// 힌트: interface FeedListProps { shouldError?: boolean; }
//       ? 는 선택적 속성 — 없어도 되는 props

// TODO: Props 타입을 정의하세요.
interface FeedListProps {
  shouldError?: boolean;
}
// TODO: 함수 매개변수에 타입 어노테이션을 추가하세요.
export default async function FeedList({ shouldError = false }: FeedListProps) {
  const posts = await getPosts(shouldError);

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li
          key={post.id}
          className="bg-white rounded-lg p-4 shadow border border-gray-200"
        >
          <h3 className="font-semibold text-gray-900 capitalize">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm mt-1">{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
