import type { Post } from '@/lib/types';

async function getPosts(shouldError: boolean): Promise<Post[]> {
  // 의도적 딜레이 — loading.tsx 확인용
  await new Promise<void>((resolve) => setTimeout(resolve, 1500));

  if (shouldError) {
    throw new Error('피드 데이터를 불러오지 못했습니다.');
  }

  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json() as Promise<Post[]>;
}

interface FeedListProps {
  shouldError?: boolean;
}

export default async function FeedList({ shouldError = false }: FeedListProps) {
  const posts = await getPosts(shouldError);

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id} className="bg-white rounded-lg p-4 shadow border border-gray-200">
          <h3 className="font-semibold text-gray-900 capitalize">{post.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
