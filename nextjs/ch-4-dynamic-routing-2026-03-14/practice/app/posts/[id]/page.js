// ─── [포스트 상세 페이지 — 동적 라우팅의 핵심] ─────────────
// 이 파일은 app/posts/[id]/page.js 위치에 있습니다.
// [id] 폴더명의 대괄호는 Next.js에서 "동적 세그먼트"를 의미합니다.
//
// 📌 핵심 개념:
// 1. 동적 라우팅: [id] 폴더가 URL 파라미터를 캡처합니다.
// 2. params 비동기 객체: Next.js 15+에서는 params가 Promise이므로 await 필요
// 3. generateStaticParams: 빌드 시 미리 생성할 정적 페이지 목록 정의 (SSG)
// 4. generateMetadata: 각 페이지마다 다른 메타데이터(SEO) 동적 생성
// 5. Promise.all을 통한 병렬 데이터 페칭

import Link from "next/link";
import CommentList from "../../components/CommentList";

const API_URL = "https://jsonplaceholder.typicode.com";

// ─── [generateStaticParams — 정적 페이지 사전 생성] ──────────
// 이 함수는 빌드(build) 시점에 호출되어, 미리 HTML로 만들어둘 페이지 목록을 반환합니다.
// 반환하는 배열의 각 객체는 동적 세그먼트([id])에 대응하는 값을 가집니다.
//
// 왜 필요한가?
// - 빌드 시 미리 생성(SSG)하면 사용자 요청 시 서버 연산 없이 즉시 응답 가능
// - 자주 방문되는 페이지(인기 포스트 등)를 미리 준비하는 최적화 전략
export async function generateStaticParams() {
  const res = await fetch(`${API_URL}/posts?_limit=10`);
  const posts = await res.json();
  return posts.map((post) => ({
    id: String(post.id),
  }));
}

// ─── [generateMetadata — 동적 메타데이터 생성] ──────────────
// 각 포스트마다 고유한 title과 description을 설정합니다.
// 이를 통해 검색 엔진(SEO)에서 각 페이지가 개별적으로 인식됩니다.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await fetch(`${API_URL}/posts/${id}`);
  const post = await res.json();
  return {
    title: `${post.title} - DevBlog`,
    description: post.body?.slice(0, 100),
  };
}

// ─── [페이지 컴포넌트] ──────────────────────────────────
// 힌트: async 함수로 선언하고, params를 인자로 받습니다.
export default async function PostDetailPage({ params }) {
  // ─── [params에서 id 추출] ────────────────────────────────
  // Next.js 15+에서 params는 비동기 객체(Promise)입니다.
  // 반드시 await로 풀어야 id 값을 사용할 수 있습니다.
  //
  // ⚠️ React에서의 useParams()와 다른 점:
  // - React Router: const { id } = useParams();  (클라이언트에서 실행)
  // - Next.js 15+:  const { id } = await params;  (서버에서 실행, 비동기)
  const { id } = await params;

  const [postRes, commentsRes] = await Promise.all([
    fetch(`${API_URL}/posts/${id}`),
    fetch(`${API_URL}/posts/${id}/comments`),
  ]);
  const post = await postRes.json();
  const comments = await commentsRes.json();

  console.log(post);

  if (!post.id) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-400 mb-4">
          포스트를 찾을 수 없습니다
        </h1>
        <Link
          href="/posts"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        href="/posts"
        className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        ← 포스트 목록으로
      </Link>

      {/* 포스트 헤더 */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            포스트 #{id}
          </span>
          <span className="text-sm text-gray-400">
            작성자: User {post.userId}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 capitalize leading-tight">
          {post.title}
        </h1>
      </header>

      {/* 포스트 본문 */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
          {post.body}
        </p>
      </div>

      {/* ─── [이전/다음 포스트 네비게이션] ─────────────────────
          📌 핵심: 동적 경로 Link 활용!
          - 이전 포스트: /posts/${Number(id) - 1}
          - 다음 포스트: /posts/${Number(id) + 1}

          힌트: 아래 <a> 태그들을 <Link>로 교체하세요.
          Number(id)를 사용하여 id를 숫자로 변환한 뒤 계산합니다.
      */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        {Number(id) > 1 ? (
          <Link
            href={`/posts/${Number(id) - 1}`}
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            ← 이전 포스트
          </Link>
        ) : (
          <span />
        )}
        {Number(id) < 100 ? (
          <Link
            href={`/posts/${Number(id) + 1}`}
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            다음 포스트 →
          </Link>
        ) : (
          <span />
        )}
      </div>

      {/* 댓글 목록 */}
      <CommentList comments={comments} />
    </article>
  );
}
