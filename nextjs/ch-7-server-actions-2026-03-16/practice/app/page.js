import { getGuestbookEntries } from "@/lib/actions";
import GuestbookForm from "./components/GuestbookForm";
import GuestbookList from "./components/GuestbookList";

// ─── [서버 컴포넌트 + 데이터 페칭] ─────────────────────
export default async function Home() {
  // TODO: 아래 줄의 주석을 해제하고 async 키워드를 함수에 추가하세요.
  // const entries = await getGuestbookEntries();
  const entries = await getGuestbookEntries();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      {/* TODO: 배경 스타일 적용 */}
      <div className="max-w-2xl mx-auto">
        {/* ─── 헤더 ─────────────────────────────────── */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">방명록</h1>
          <p className="text-gray-500 text-lg">
            Server Actions로 구현된 방명록입니다.
            <br />
            <span className="text-sm text-indigo-500 font-medium">
              브라우저 JavaScript가 꺼져 있어도 동작합니다!
            </span>
          </p>
        </header>

        {/* ─── [방명록 작성 폼] ────────────────────────── */}
        {/* 방명록 작성 폼 */}
        <section className="mb-10">
          <GuestbookForm />
        </section>

        {/* ─── [방명록 목록] ───────────────────────────── */}
        {/* 방명록 목록 */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            남겨진 글 ({entries.length}개)
          </h2>
          <GuestbookList entries={entries} />
        </section>
      </div>
    </div>
  );
}
