import Link from 'next/link';
import { mockPosts } from '@/data/mockData';
import PostCard from '@/app/components/PostCard';
import RefreshButton from '@/app/components/RefreshButton';

export default async function Home() {
  const posts = mockPosts;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">포스트 목록</h1>
          <p className="text-sm text-gray-500 mt-1">포스트를 클릭하면 댓글을 볼 수 있습니다.</p>
        </div>
        <RefreshButton />
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-10 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="font-semibold text-blue-700 mb-2">🔑 이번 회차 TypeScript 핵심</h2>
        <ul className="text-sm text-blue-600 space-y-1 list-disc list-inside">
          <li><code>revalidatePath()</code> / <code>revalidateTag()</code> → <code>void</code> 반환</li>
          <li>Server Action 반환 타입: <code>Promise&lt;void&gt;</code> vs <code>Promise&lt;ActionResult&gt;</code></li>
          <li><code>ActionResult</code> 공용 인터페이스로 성공/실패를 일관되게 처리</li>
          <li>FormData.get() → <code>string | File | null</code> → 타입 좁히기 필수</li>
        </ul>
      </div>
    </main>
  );
}
