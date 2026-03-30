import { deleteEntry } from "@/lib/actions";
import type { GuestbookEntry } from "@/lib/types";

// ─── Props 타입 ────────────────────────────────────────────────────────────────

interface GuestbookListProps {
  entries: GuestbookEntry[];
}

// ─── GuestbookList (서버 컴포넌트) ─────────────────────────────────────────────

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

// ─── GuestbookCard Props 타입 ──────────────────────────────────────────────────

interface GuestbookCardProps {
  entry: GuestbookEntry;
}

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

        {/* 삭제 폼: formData에 id를 hidden으로 전달 */}
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
