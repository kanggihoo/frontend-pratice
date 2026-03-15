// ─── [클라이언트 컴포넌트 선언] ──────────────────────────
// 이 컴포넌트는 useRef 훅과 사용자 인터랙션(alert)을 사용하므로
// 클라이언트에서 실행되어야 합니다.
// 힌트: 파일 최상단에 "use client"; 지시어를 추가하세요.


// ─── [React 훅 import] ─────────────────────────────────
// 힌트: useRef를 import하세요. 폼 초기화에 사용됩니다.
// import { useRef } from "react";

// ─── [Server Action import] ─────────────────────────────
// 힌트: lib/actions.js에서 addGuestbookEntry를 import하세요.
// 이 함수는 서버에서 실행되지만, 클라이언트 컴포넌트에서 호출할 수 있습니다!
// import { addGuestbookEntry } from "@/lib/actions";

export default function GuestbookForm() {
  // ─── [폼 참조 생성] ──────────────────────────────────
  // 힌트: useRef(null)로 폼 요소의 참조를 만드세요.
  // 제출 성공 후 formRef.current?.reset()으로 폼을 초기화합니다.
  // const formRef = useRef(null);

  // ─── [폼 제출 핸들러] ─────────────────────────────────
  // Server Action을 래핑하여 결과에 따라 에러 표시 또는 폼 초기화를 합니다.
  // 힌트:
  // async function handleSubmit(formData) {
  //   const result = await addGuestbookEntry(formData);
  //   if (result?.error) { alert(result.error); return; }
  //   formRef.current?.reset();
  // }

  return (
    // ─── [폼 요소] ──────────────────────────────────────
    // 핵심! <form>의 action 속성에 Server Action 함수를 전달합니다.
    // 이것이 Next.js Server Actions의 핵심 패턴입니다!
    //
    // React에서는: <form onSubmit={handleSubmit}> + e.preventDefault() + fetch(...)
    // Next.js에서는: <form action={handleSubmit}> → 서버 함수가 직접 실행!
    //
    // 힌트: <form ref={formRef} action={handleSubmit} className="...">
    <form className="">{/* TODO: ref, action 속성 추가, 카드 스타일 적용 */}
      <h3 className="">{/* TODO: 소제목 스타일 */}
        글 남기기
      </h3>

      {/* ─── [이름 입력 필드] ────────────────────────── */}
      <div>
        <label
          htmlFor="name"
          className=""
        >{/* TODO: 레이블 스타일 */}
          이름
        </label>
        {/* 힌트: name="name" 속성이 Server Action에서 formData.get("name")으로 접근됩니다 */}
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={20}
          placeholder="이름을 입력하세요"
          className=""
        />{/* TODO: 입력 필드 스타일 */}
      </div>

      {/* ─── [메시지 입력 필드] ──────────────────────── */}
      <div>
        <label
          htmlFor="message"
          className=""
        >{/* TODO: 레이블 스타일 */}
          메시지
        </label>
        {/* 힌트: name="message" 속성이 Server Action에서 formData.get("message")으로 접근됩니다 */}
        <textarea
          id="message"
          name="message"
          required
          maxLength={200}
          rows={3}
          placeholder="방명록에 남길 메시지를 작성하세요"
          className=""
        />{/* TODO: 텍스트영역 스타일 */}
      </div>

      {/* ─── [제출 버튼] ────────────────────────────── */}
      <button
        type="submit"
        className=""
      >{/* TODO: 버튼 스타일 (인디고 계열 배경색) */}
        글 남기기
      </button>
    </form>
  );
}
