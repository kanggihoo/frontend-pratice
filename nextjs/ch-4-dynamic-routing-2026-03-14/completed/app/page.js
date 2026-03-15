import Link from "next/link";

const API_URL = "https://jsonplaceholder.typicode.com";

export default async function HomePage() {
  const res = await fetch(`${API_URL}/posts?_limit=6`);
  const posts = await res.json();

  return (
    <div>
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          DevBlog
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Next.js App Router의 동적 라우팅을 활용한 블로그입니다.
          <br />
          포스트를 클릭하여 상세 페이지로 이동해보세요.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">최신 포스트</h2>
          <Link
            href="/posts"
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <article className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-indigo-200 transition-all duration-200 cursor-pointer group h-full">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                  #{post.id}
                </span>
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors mt-3 mb-2 capitalize line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {post.body}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
