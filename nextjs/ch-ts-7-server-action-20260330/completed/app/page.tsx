import { guestbookEntries } from "@/data/guestbook";
import GuestbookForm from "@/app/components/GuestbookForm";
import GuestbookList from "@/app/components/GuestbookList";

// 서버 컴포넌트 — 반환 타입은 자동 추론 (명시 불필요)
export default function HomePage() {
  // guestbookEntries는 GuestbookEntry[] 타입 — lib/types.ts에서 정의
  const entries = [...guestbookEntries];

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">방명록</h1>
        <p className="text-sm text-gray-500 mt-1">
          TypeScript 7회차 — Server Action 타입 &amp; FormData 처리
        </p>
      </div>

      <div className="space-y-6">
        <GuestbookForm />

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            방명록 목록{" "}
            <span className="text-sm font-normal text-gray-400">
              ({entries.length}개)
            </span>
          </h2>
          <GuestbookList entries={entries} />
        </section>
      </div>
    </main>
  );
}
