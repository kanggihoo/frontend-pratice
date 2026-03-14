// ─── [포스트 카드 컴포넌트] ─────────────────────────────
// 포스트 목록에서 각 포스트를 카드 형태로 보여주는 컴포넌트입니다.
// 카드를 클릭하면 해당 포스트의 상세 페이지(/posts/[id])로 이동해야 합니다.
//
// 📌 핵심 개념: 동적 경로와 Link
// - Next.js에서 동적 경로는 대괄호([])를 사용합니다. 예: /posts/[id]
// - <Link> 컴포넌트의 href에 백틱(`)을 사용한 템플릿 리터럴로 동적 경로를 만듭니다.
// - 예: href={`/posts/${post.id}`}

// ─── [Link 임포트] ─────────────────────────────────────
// 힌트: next/link에서 Link 컴포넌트를 임포트하세요.
// import ??? from "???";

export default function PostCard({ post }) {
  return (
    // ─── [카드를 Link로 감싸기] ──────────────────────────
    // 힌트: 이 <div>를 <Link> 컴포넌트로 교체하세요.
    // href 속성에 동적 경로를 설정합니다: /posts/{포스트 ID}
    // 예: href={`/posts/${post.id}`}
    <div>
      <article className="" /* ─── [카드 스타일링] ────────────────────────────
        힌트: Tailwind CSS로 카드 스타일을 완성하세요.
        - 배경: bg-white
        - 둥근 모서리: rounded-xl
        - 테두리: border border-gray-200
        - 내부 여백: p-6
        - 호버 효과: hover:shadow-lg hover:border-indigo-200
        - 전환 효과: transition-all duration-200
        - 커서: cursor-pointer
        - 그룹: group (자식 요소의 호버 효과 연동)
      */ >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
            #{post.id}
          </span>
          <span className="text-xs text-gray-400">
            User {post.userId}
          </span>
        </div>
        <h2 className="" /* ─── [제목 스타일링] ────────────────────────────
          힌트: 제목에 스타일을 적용하세요.
          - 글자 크기: text-lg
          - 굵기: font-semibold
          - 색상: text-gray-800
          - 호버 색상 변경: group-hover:text-indigo-600 (부모의 group과 연동)
          - 전환 효과: transition-colors
          - 줄 수 제한: line-clamp-2
          - 첫 글자 대문자: capitalize
        */ >
          {post.title}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-2">
          {post.body}
        </p>
        <div className="mt-4 text-indigo-600 text-sm font-medium">
          자세히 보기 →
        </div>
      </article>
    </div>
  );
}
