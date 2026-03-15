// ─── [스켈레톤 UI — 게시글 목록] ─────────────────────
// 스켈레톤 UI는 데이터가 로딩되는 동안 표시되는 "뼈대" UI입니다.
// 실제 콘텐츠와 비슷한 형태의 회색 상자를 배치하여
// 사용자에게 "곧 콘텐츠가 표시될 것"이라는 시각적 피드백을 제공합니다.
//
// Tailwind 핵심 클래스:
// - animate-pulse: 부드럽게 깜빡이는 애니메이션
// - bg-gray-200 / bg-gray-100: 회색 배경으로 텍스트 자리 표시
// - rounded: 둥근 모서리
// ─────────────────────────────────────────────────────

export default function PostListSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* ─── [스켈레톤 카드 12개 생성] ─────────────────
       * Array.from({ length: 12 })로 12개의 스켈레톤 카드를 생성하세요.
       * 각 카드 안에는 실제 PostList의 카드와 비슷한 형태의
       * 회색 div 블록들을 배치합니다.
       *
       * 힌트:
       * {Array.from({ length: 12 }).map((_, i) => (
       *   <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 animate-pulse">
       *     <div className="h-6 w-10 bg-gray-200 rounded-full mb-3" />
       *     <div className="h-5 bg-gray-200 rounded w-full mb-2" />
       *     <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
       *     <div className="h-4 bg-gray-100 rounded w-full mb-1.5" />
       *     <div className="h-4 bg-gray-100 rounded w-5/6 mb-1.5" />
       *     <div className="h-4 bg-gray-100 rounded w-2/3" />
       *     <div className="h-4 w-24 bg-gray-100 rounded mt-3" />
       *   </div>
       * ))}
       * ─────────────────────────────────────────────── */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
        >
          {/* 여기에 animate-pulse와 회색 블록들을 추가하세요 */}
          <div className="h-20 flex items-center justify-center text-gray-300">
            스켈레톤
          </div>
        </div>
      ))}
    </div>
  );
}
