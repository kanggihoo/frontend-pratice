import { deleteEntry } from "@/lib/actions";
// TODO: GuestbookEntry를 lib/types.ts에 정의한 후 import 주석을 해제하세요.
// import type { GuestbookEntry } from "@/lib/types";

// ─── [Props 타입 정의] ─────────────────────────────────────────────────────────
//
// JavaScript 버전:
//   function GuestbookList({ entries }) { ... }
//
// TypeScript 버전:
//   interface GuestbookListProps {
//     entries: GuestbookEntry[];   // GuestbookEntry 배열
//   }
//   function GuestbookList({ entries }: GuestbookListProps) { ... }
//
// 힌트: GuestbookEntry[]는 "방명록 항목의 배열"을 뜻합니다.
//       GuestbookEntry 타입을 lib/types.ts에 먼저 정의해야 합니다.

// TODO: GuestbookListProps 인터페이스를 정의하세요.
import type { GuestbookEntry } from "@/lib/types";
interface GuestbookListProps {
  entries: GuestbookEntry[];
}
// TODO: 함수 매개변수에 타입 어노테이션을 추가하세요.
export default function GuestbookList({ entries }: GuestbookListProps) {
  if (entries.length === 0) {
    return (
      <p className="text-center text-gray-400 py-8">
        아직 방명록이 없습니다. 첫 번째로 남겨보세요!
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {entries.map((entry) => (
        <GuestbookCard key={entry.id} entry={entry} />
      ))}
    </ul>
  );
}
interface GuestbookCardProps {
  entry: GuestbookEntry;
}
// TODO: 함수 매개변수에 타입 어노테이션을 추가하세요.
function GuestbookCard({ entry }: GuestbookCardProps) {
  const formattedDate = new Date(entry.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <li className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-800 text-sm">
              {entry.name}
            </span>
            <span className="text-xs text-gray-400">{formattedDate}</span>
          </div>
          <p className="text-gray-600 text-sm break-words">{entry.message}</p>
        </div>

        <form action={deleteEntry}>
          <input type="hidden" name="id" value={entry.id} />
          <button
            type="submit"
            className="text-xs text-gray-400 hover:text-red-500 transition-colors shrink-0"
          >
            삭제
          </button>
        </form>
      </div>
    </li>
  );
}
