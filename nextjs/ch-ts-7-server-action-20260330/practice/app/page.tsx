import { guestbookEntries } from "@/data/guestbook";
import GuestbookForm from "@/app/components/GuestbookForm";
import GuestbookList from "@/app/components/GuestbookList";

export default function HomePage() {
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
