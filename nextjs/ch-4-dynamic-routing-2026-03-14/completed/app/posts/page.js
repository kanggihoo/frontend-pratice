import PostCard from "../components/PostCard";

const API_URL = "https://jsonplaceholder.typicode.com";

export const metadata = {
  title: "포스트 목록 - DevBlog",
  description: "전체 블로그 포스트 목록을 확인하세요.",
};

export default async function PostsPage() {
  const res = await fetch(`${API_URL}/posts`);
  const posts = await res.json();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          전체 포스트
        </h1>
        <p className="text-gray-500">
          총 {posts.length}개의 포스트가 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
