// ─── [홈 페이지 — 서버 컴포넌트] ──────────────────────────
// 이 페이지는 서버 컴포넌트로, 최신 포스트 6개를 서버에서 가져와 보여줍니다.
//
// 📌 핵심 개념 복습:
// 1. 서버 컴포넌트에서의 데이터 페칭 (3회차 복습)
// 2. next/link를 활용한 페이지 이동 (이번 회차 핵심)
// 3. 동적 경로 활용: /posts/${post.id} 형태의 링크

// ─── [Link 임포트] ─────────────────────────────────────
// 힌트: next/link에서 Link를 임포트하세요.
// import ??? from "???";

const API_URL = "https://jsonplaceholder.typicode.com";

// ─── [async 서버 컴포넌트] ────────────────────────────────
// 힌트: 서버 컴포넌트에서 데이터를 가져오려면 함수를 async로 선언해야 합니다.
// export default async function HomePage() {
export default function HomePage() {

  // ─── [서버사이드 데이터 페칭] ──────────────────────────────
  // 힌트: fetch를 사용하여 최신 포스트 6개를 가져오세요.
  // const res = await fetch(`${API_URL}/posts?_limit=6`);
  // const posts = await res.json();
  const posts = []; // ← 이 줄을 위의 fetch 코드로 교체하세요

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
          {/* ─── [전체 보기 링크] ──────────────────────────
              힌트: <a> 태그를 <Link>로 교체하고 href="/posts"를 설정하세요.
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          */}
          <a href="/posts" className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
            전체 보기 →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            // ─── [포스트 카드 + 동적 링크] ─────────────────────
            // 힌트: 아래 <div>를 <Link>로 감싸세요.
            // href에 동적 경로를 사용합니다: /posts/${post.id}
            // 예: <Link key={post.id} href={`/posts/${post.id}`}>
            <div key={post.id}>
              <article className="" /* ─── [카드 스타일링] ──────────────
                힌트: bg-white rounded-xl border border-gray-200 p-5
                      hover:shadow-lg hover:border-indigo-200
                      transition-all duration-200 cursor-pointer group h-full
              */ >
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                  #{post.id}
                </span>
                <h3 className="" /* ─── [제목 스타일링] ──────────────
                  힌트: text-base font-semibold text-gray-800
                        group-hover:text-indigo-600 transition-colors
                        mt-3 mb-2 capitalize line-clamp-2
                */ >
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {post.body}
                </p>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
