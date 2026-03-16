import Header from "./components/Header";
import ApiInfoCard from "./components/ApiInfoCard";
import QuoteSection from "./components/QuoteSection";
import RecipeSection from "./components/RecipeSection";
import FeedbackForm from "./components/FeedbackForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* API 엔드포인트 정보 (서버 컴포넌트) */}
        <ApiInfoCard />

        {/* 명언 섹션 (클라이언트 컴포넌트 - GET 요청) */}
        <QuoteSection />

        {/* 레시피 검색 섹션 (클라이언트 컴포넌트 - GET + 쿼리 파라미터) */}
        <RecipeSection />

        {/* 피드백 폼 (클라이언트 컴포넌트 - POST 요청) */}
        <FeedbackForm />
      </main>

      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        Next.js Route Handlers 학습 예제 — 6회차
      </footer>
    </div>
  );
}
