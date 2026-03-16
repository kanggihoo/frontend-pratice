// ─── [컴포넌트 임포트] ──────────────────────────────────
// 각 컴포넌트를 임포트하세요.
// 힌트: import Header from "./components/Header";
// 힌트: import ApiInfoCard from "./components/ApiInfoCard";
// 힌트: import QuoteSection from "./components/QuoteSection";
// 힌트: import RecipeSection from "./components/RecipeSection";
// 힌트: import FeedbackForm from "./components/FeedbackForm";
import Header from "./components/Header";
import ApiInfoCard from "./components/ApiInfoCard";
import QuoteSection from "./components/QuoteSection";
import RecipeSection from "./components/RecipeSection";
import FeedbackForm from "./components/FeedbackForm";

// ─── [서버 컴포넌트 페이지] ─────────────────────────────
// page.js는 기본적으로 서버 컴포넌트입니다.
// 클라이언트 컴포넌트(QuoteSection, RecipeSection, FeedbackForm)를
// 서버 컴포넌트 내부에서 조합하는 패턴입니다.
export default function Home() {
  return (
    // ─── [전체 레이아웃 스타일링] ─────────────────────────
    // 힌트: min-h-screen, bg-gray-50
    <div className="">
      <Header />

      {/* ─── [메인 컨텐츠 영역] ──────────────────────────── */}
      {/* 힌트: max-w-6xl, mx-auto, px-4, py-8, space-y-10 */}
      <main className="">
        {/* API 엔드포인트 정보 (서버 컴포넌트) */}
        <ApiInfoCard />

        {/* 명언 섹션 (클라이언트 컴포넌트 - GET 요청) */}
        <QuoteSection />

        {/* 레시피 검색 섹션 (클라이언트 컴포넌트 - GET + 쿼리 파라미터) */}
        <RecipeSection />

        {/* 피드백 폼 (클라이언트 컴포넌트 - POST 요청) */}
        <FeedbackForm />
      </main>

      <footer className="">
        Next.js Route Handlers 학습 예제 — 6회차
      </footer>
    </div>
  );
}
