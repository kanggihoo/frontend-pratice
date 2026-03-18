// ─── [클라이언트 컴포넌트 선언] ──────────────────────────
// 이 컴포넌트는 confirm() 등 브라우저 API를 사용하므로
// 클라이언트에서 실행되어야 합니다.
"use client";

// ─── [Server Action import] ─────────────────────────────
import { deleteGuestbookEntry } from "@/lib/actions";

export default function DeleteButton({ id }) {
  // ─── [삭제 핸들러] ──────────────────────────────────
  async function handleDelete(formData) {
    const confirmed = confirm("정말 이 글을 삭제하시겠습니까?");
    if (!confirmed) return;

    const result = await deleteGuestbookEntry(formData);
    if (result?.error) {
      alert(result.error);
    }
  }

  return (
    // ─── [삭제 폼] ──────────────────────────────────────
    // 핵심 패턴: <form action={handleDelete}> 안에 hidden input으로 id를 전달합니다.
    // 이렇게 하면 Server Action에서 formData.get("id")로 값을 받을 수 있습니다.
    <form action={handleDelete}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-sm text-gray-400 hover:text-red-500 transition cursor-pointer"
        title="삭제"
      >
        삭제
      </button>
    </form>
  );
}
