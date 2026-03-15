// ─── [Server Action 임포트] ──────────────────────────
// 명언 새로고침 버튼이 호출할 Server Action을 import하세요.
// 힌트: import { revalidateQuoteAction } from "@/lib/actions";

export default async function QuoteCard() {
  let quote = null;
  const fetchedAt = new Date().toLocaleTimeString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

  try {
    // ─── [시간 기반 + 태그 기반 재검증 fetch] ──────────────
    //
    // 1) 시간 기반 재검증 (Time-based Revalidation / ISR):
    //    next.revalidate에 초 단위 숫자를 지정하면
    //    해당 시간 동안 캐시된 데이터를 사용하고,
    //    시간이 지나면 백그라운드에서 새 데이터를 가져옵니다.
    //
    // 2) 태그 기반 캐싱 (Tag-based Caching):
    //    next.tags에 태그 이름 배열을 지정하면
    //    revalidateTag('태그이름')으로 이 캐시만 선택적으로 무효화할 수 있습니다.
    //
    // 힌트: fetch(url, { next: { revalidate: 초, tags: ['태그이름'] } })
    //
    // 아래 fetch에 적절한 캐싱 옵션을 추가하세요:
    // - 30초마다 자동 갱신
    // - 'quote' 태그 부착
    const res = await fetch("https://dummyjson.com/quotes/random"
      // ─── [fetch 캐싱 옵션 추가] ──────────────────────
      // 힌트: 두 번째 인자로 { next: { revalidate: ???, tags: [???] } }를 전달하세요.
    );

    if (!res.ok) throw new Error("API 응답 오류");
    quote = await res.json();
  } catch {
    quote = {
      quote: "실패는 성공의 어머니이다.",
      author: "토마스 에디슨",
    };
  }

  return (
    // ─── [UI 스타일링] ──────────────────────────────
    // Tailwind CSS로 명언 카드를 꾸며보세요.
    // 힌트: bg-gradient-to-r from-amber-50 to-orange-50, border, rounded-2xl, p-6, mb-8
    <div className="mb-8 p-6 border rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-bold">오늘의 명언</h2>
        <span className="ml-auto text-xs px-2 py-1 rounded-full font-mono">
          revalidate: 30초
        </span>
      </div>

      <blockquote className="text-gray-700 text-lg italic mb-2 pl-4 border-l-4 border-amber-300">
        &ldquo;{quote.quote}&rdquo;
      </blockquote>
      <p className="text-right text-sm text-gray-500 mb-4">
        — {quote.author}
      </p>

      <div className="border-t pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-xs space-y-1">
          <p>데이터 페칭 시각: <span className="font-mono">{fetchedAt}</span></p>
          <p>30초마다 자동 갱신 (ISR)</p>
        </div>

        {/* ─── [revalidateTag 데모: 태그 재검증 폼] ──────────
            Server Action을 form의 action으로 연결하여
            버튼 클릭 시 'quote' 태그의 캐시를 무효화하세요.

            힌트:
            <form action={revalidateQuoteAction}>
              <button type="submit">명언 새로고침</button>
            </form>
        ──────────────────────────────────────────────── */}
        <div>
          <button
            type="button"
            disabled
            className="bg-gray-300 text-white text-sm font-medium px-4 py-2 rounded-lg"
          >
            명언 새로고침 (revalidateTag) - 미구현
          </button>
        </div>
      </div>
    </div>
  );
}
