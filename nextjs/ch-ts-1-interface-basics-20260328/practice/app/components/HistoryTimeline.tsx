// practice/app/components/HistoryTimeline.tsx
//
// ─── [Props 타입 정의] ─────────────────────────────────────────────────────
// 배열 타입은 두 가지 방식으로 표현합니다:
//   방식 1: HistoryItem[]          (권장 — 더 간결)
//   방식 2: Array<HistoryItem>     (제네릭 표현)
//
// import type { HistoryItem } from '@/lib/types';
//
// interface HistoryTimelineProps {
//   items: HistoryItem[];  // HistoryItem의 배열
// }

// TODO: 1. import type { HistoryItem } from '@/lib/types'; 를 추가하세요.
// TODO: 2. HistoryTimelineProps interface를 정의하세요.
import type { HistoryItem } from "@/lib/types";
interface HistoryTimelineProps {
  items: HistoryItem[];
}
export default function HistoryTimeline({ items }: HistoryTimelineProps) {
  // ← 타입 없음 (에러 발생)
  return (
    <ol className="relative border-l border-gray-200 ml-4">
      {items.map((item) => (
        <li key={item.year} className="mb-8 ml-6">
          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 ring-4 ring-white">
            <span className="h-2 w-2 rounded-full bg-indigo-600" />
          </span>
          <time className="text-sm font-semibold text-indigo-600">
            {item.year}년
          </time>
          <h3 className="mt-1 text-base font-semibold text-gray-900">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
