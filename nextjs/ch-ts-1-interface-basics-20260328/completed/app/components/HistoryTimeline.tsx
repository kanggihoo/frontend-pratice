import type { HistoryItem } from "@/lib/types";

// ─── HistoryTimeline Props 타입 ───────────────────────────────────────────────
// 배열 타입은 두 가지 방식으로 표현할 수 있습니다:
//   방식 1: HistoryItem[]
//   방식 2: Array<HistoryItem>
// 두 표현은 완전히 동일합니다. 일반적으로 방식 1이 더 간결합니다.
interface HistoryTimelineProps {
  items: HistoryItem[]; // HistoryItem 배열
}

export default function HistoryTimeline({ items }: HistoryTimelineProps) {
  return (
    <ol className="relative border-l border-gray-200 ml-4">
      {items.map((item) => (
        <li key={item.year} className="mb-8 ml-6">
          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 ring-4 ring-white">
            <span className="h-2 w-2 rounded-full bg-indigo-600" />
          </span>
          <time className="text-sm font-semibold text-indigo-600">{item.year}년</time>
          <h3 className="mt-1 text-base font-semibold text-gray-900">{item.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
