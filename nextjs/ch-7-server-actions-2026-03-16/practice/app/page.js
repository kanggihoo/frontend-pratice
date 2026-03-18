// ─── [서버 컴포넌트에서 데이터 가져오기] ─────────────────
// 힌트: lib/actions.js에서 getGuestbookEntries 함수를 import하세요.
// import { getGuestbookEntries } from "@/lib/actions";

// ─── [컴포넌트 import] ─────────────────────────────────
// 힌트: 아래 두 컴포넌트를 ./components/ 에서 import하세요.
// import GuestbookForm from "./components/GuestbookForm";
// import GuestbookList from "./components/GuestbookList";

// ─── [서버 컴포넌트 + 데이터 페칭] ─────────────────────
// 이 페이지는 서버 컴포넌트입니다.
// async 함수로 선언하여 서버에서 데이터를 직접 가져올 수 있습니다.
// 힌트: export default async function Home() { ... }
export default function Home() {
  // TODO: 아래 줄의 주석을 해제하고 async 키워드를 함수에 추가하세요.
  // const entries = await getGuestbookEntries();
  const entries = []; // ← 이 줄을 위 주석의 실제 호출로 교체하세요

  return (
    // ─── [UI 스타일링] ──────────────────────────────────
    // Tailwind CSS로 배경 그라데이션과 레이아웃을 구성하세요.
    // 힌트: min-h-screen, bg-linear-to-br, from-indigo-50, via-white, to-purple-50 등
    <div className="">{/* TODO: 배경 스타일 적용 */}
      <div className="">{/* TODO: 컨텐츠 중앙 정렬 max-w-2xl mx-auto */}

        {/* ─── 헤더 ─────────────────────────────────── */}
        <header className="">{/* TODO: 중앙 정렬, 하단 여백 */}
          <h1 className="">{/* TODO: 제목 스타일 */}
            방명록
          </h1>
          <p className="">{/* TODO: 부제목 스타일 */}
            Server Actions로 구현된 방명록입니다.
          </p>
        </header>

        {/* ─── [방명록 작성 폼] ────────────────────────── */}
        {/* 힌트: <GuestbookForm /> 컴포넌트를 렌더링하세요 */}
        <section className="">{/* TODO: 하단 여백 mb-10 */}
          {/* TODO: <GuestbookForm /> */}
          <p className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-200 rounded-2xl">
            GuestbookForm 컴포넌트를 여기에 렌더링하세요
          </p>
        </section>

        {/* ─── [방명록 목록] ───────────────────────────── */}
        {/* 힌트: <GuestbookList entries={entries} /> 컴포넌트를 렌더링하세요 */}
        <section>
          <h2 className="">{/* TODO: 소제목 스타일 */}
            남겨진 글 ({entries.length}개)
          </h2>
          {/* TODO: <GuestbookList entries={entries} /> */}
          <p className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-200 rounded-2xl">
            GuestbookList 컴포넌트를 여기에 렌더링하세요
          </p>
        </section>

      </div>
    </div>
  );
}
