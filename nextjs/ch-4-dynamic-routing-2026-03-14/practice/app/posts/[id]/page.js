// ─── [포스트 상세 페이지 — 동적 라우팅의 핵심] ─────────────
// 이 파일은 app/posts/[id]/page.js 위치에 있습니다.
// [id] 폴더명의 대괄호는 Next.js에서 "동적 세그먼트"를 의미합니다.
// 예: /posts/1, /posts/42 등 어떤 숫자든 이 페이지로 라우팅됩니다.
//
// 📌 핵심 개념:
// 1. 동적 라우팅: [id] 폴더가 URL 파라미터를 캡처합니다.
// 2. params 비동기 객체: Next.js 15+에서는 params가 Promise이므로 await 필요
// 3. generateStaticParams: 빌드 시 미리 생성할 정적 페이지 목록 정의 (SSG)
// 4. generateMetadata: 각 페이지마다 다른 메타데이터(SEO) 동적 생성
// 5. Promise.all을 통한 병렬 데이터 페칭

// ─── [Link 임포트] ─────────────────────────────────────
// 힌트: next/link에서 Link를 임포트하세요.
// import ??? from "???";

import CommentList from "../../components/CommentList";

const API_URL = "https://jsonplaceholder.typicode.com";

// ─── [generateStaticParams — 정적 페이지 사전 생성] ──────────
// 이 함수는 빌드(build) 시점에 호출되어, 미리 HTML로 만들어둘 페이지 목록을 반환합니다.
// 반환하는 배열의 각 객체는 동적 세그먼트([id])에 대응하는 값을 가집니다.
//
// 왜 필요한가?
// - 빌드 시 미리 생성(SSG)하면 사용자 요청 시 서버 연산 없이 즉시 응답 가능
// - 자주 방문되는 페이지(인기 포스트 등)를 미리 준비하는 최적화 전략
//
// 힌트:
// export async function generateStaticParams() {
//   const res = await fetch(`${API_URL}/posts?_limit=10`);
//   const posts = await res.json();
//
//   // 각 포스트의 id를 문자열로 변환하여 반환합니다.
//   // ⚠️ 주의: id는 반드시 문자열(String)이어야 합니다!
//   return posts.map((post) => ({
//     id: String(post.id),
//   }));
// }

// ─── [generateMetadata — 동적 메타데이터 생성] ──────────────
// 각 포스트마다 고유한 title과 description을 설정합니다.
// 이를 통해 검색 엔진(SEO)에서 각 페이지가 개별적으로 인식됩니다.
//
// 힌트:
// export async function generateMetadata({ params }) {
//   const { id } = await params;  // ← Next.js 15+에서는 await 필수!
//   const res = await fetch(`${API_URL}/posts/${id}`);
//   const post = await res.json();
//
//   return {
//     title: `${post.title} - DevBlog`,
//     description: post.body?.slice(0, 100),
//   };
// }

// ─── [페이지 컴포넌트] ──────────────────────────────────
// 힌트: async 함수로 선언하고, params를 인자로 받습니다.
// export default async function PostDetailPage({ params }) {
export default function PostDetailPage() {

  // ─── [params에서 id 추출] ────────────────────────────────
  // Next.js 15+에서 params는 비동기 객체(Promise)입니다.
  // 반드시 await로 풀어야 id 값을 사용할 수 있습니다.
  //
  // ⚠️ React에서의 useParams()와 다른 점:
  // - React Router: const { id } = useParams();  (클라이언트에서 실행)
  // - Next.js 15+:  const { id } = await params;  (서버에서 실행, 비동기)
  //
  // 힌트: const { id } = await params;
  const id = "1"; // ← 이 줄을 위의 코드로 교체하세요

  // ─── [병렬 데이터 페칭] ──────────────────────────────────
  // 포스트 데이터와 댓글 데이터를 동시에 가져옵니다.
  // Promise.all을 사용하면 두 요청이 동시에 실행되어 더 빠릅니다.
  //
  // 힌트:
  // const [postRes, commentsRes] = await Promise.all([
  //   fetch(`${API_URL}/posts/${id}`),
  //   fetch(`${API_URL}/posts/${id}/comments`),
  // ]);
  // const post = await postRes.json();
  // const comments = await commentsRes.json();
  const post = { id: 1, userId: 1, title: "포스트 제목", body: "포스트 내용" };
  const comments = []; // ← 위의 fetch 코드로 교체하세요

  if (!post.id) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-400 mb-4">
          포스트를 찾을 수 없습니다
        </h1>
        {/* 힌트: <a>를 <Link>로 교체하세요 */}
        <a
          href="/posts"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          ← 목록으로 돌아가기
        </a>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* ─── [뒤로 가기 네비게이션] ─────────────────────────
          힌트: <a>를 <Link>로 교체하세요. href="/posts"
      */}
      <a
        href="/posts"
        className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        ← 포스트 목록으로
      </a>

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
        <h1 className="" /* ─── [제목 스타일링] ──────────────────
          힌트: text-3xl font-bold text-gray-900 capitalize leading-tight
        */ >
          {post.title}
        </h1>
      </header>

      {/* 포스트 본문 */}
      <div className="" /* ─── [본문 카드 스타일링] ───────────────
        힌트: bg-white rounded-xl border border-gray-200 p-8
      */ >
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
          <a
            href={`/posts/${Number(id) - 1}`}
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            ← 이전 포스트
          </a>
        ) : (
          <span />
        )}
        {Number(id) < 100 ? (
          <a
            href={`/posts/${Number(id) + 1}`}
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            다음 포스트 →
          </a>
        ) : (
          <span />
        )}
      </div>

      {/* 댓글 목록 */}
      <CommentList comments={comments} />
    </article>
  );
}
