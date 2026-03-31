import FeedList from "@/app/components/FeedList";

interface FeedPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function FeedPage({ searchParams }: FeedPageProps) {
  const { error } = await searchParams;
  const shouldError = error === "true";

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">
        {shouldError ? "⚠️ 에러 피드" : "📋 피드"}
      </h1>
      <FeedList shouldError={shouldError} />
    </main>
  );
}
