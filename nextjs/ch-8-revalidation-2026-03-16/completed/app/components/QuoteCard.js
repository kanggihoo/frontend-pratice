import { revalidateQuoteAction } from "@/lib/actions";

export default async function QuoteCard() {
  let quote = null;
  const fetchedAt = new Date().toLocaleTimeString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

  try {
    // ★★★ 핵심 1: 시간 기반 재검증 (Time-based Revalidation / ISR) ★★★
    // next.revalidate: 30 → 이 fetch 결과는 30초 동안 캐시됩니다.
    // 30초가 지난 후 첫 번째 요청이 들어오면:
    //   1) 일단 캐시된 (stale) 데이터를 즉시 반환하고
    //   2) 백그라운드에서 새 데이터를 가져와 캐시를 갱신합니다.
    //   3) 그 다음 요청부터 새 데이터가 반환됩니다. (stale-while-revalidate)
    //
    // ★★★ 핵심 2: 태그 기반 캐싱 (Tag-based Caching) ★★★
    // next.tags: ['quote'] → 이 캐시에 'quote'라는 태그를 부착합니다.
    // revalidateTag('quote')를 호출하면 이 태그가 붙은 캐시만 선택적으로 무효화됩니다.
    // → 30초를 기다리지 않고도 즉시 새 데이터를 가져올 수 있습니다!
    const res = await fetch("https://dummyjson.com/quotes/random", {
      next: { revalidate: 30, tags: ["quote"] },
    });

    if (!res.ok) throw new Error("API 응답 오류");
    quote = await res.json();
  } catch {
    quote = {
      quote: "실패는 성공의 어머니이다.",
      author: "토마스 에디슨",
    };
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">💡</span>
        <h2 className="text-lg font-bold text-amber-900">오늘의 명언</h2>
        <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-mono">
          revalidate: 30초
        </span>
      </div>

      <blockquote className="text-gray-700 text-lg italic mb-2 pl-4 border-l-4 border-amber-300">
        &ldquo;{quote.quote}&rdquo;
      </blockquote>
      <p className="text-right text-sm text-gray-500 mb-4">
        — {quote.author}
      </p>

      <div className="border-t border-amber-200 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-xs text-amber-700 space-y-1">
          <p>
            📡 데이터 페칭 시각:{" "}
            <span className="font-mono">{fetchedAt}</span>
          </p>
          <p>
            ⏱️ 30초마다 자동 갱신 (ISR) ·{" "}
            <code className="bg-amber-100 px-1 rounded">
              tags: [&apos;quote&apos;]
            </code>
          </p>
        </div>

        {/* ★ revalidateTag 데모: 태그 재검증으로 즉시 갱신 */}
        <form action={revalidateQuoteAction}>
          <button
            type="submit"
            className="bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors cursor-pointer"
          >
            🔄 명언 새로고침 (revalidateTag)
          </button>
        </form>
      </div>
    </div>
  );
}
