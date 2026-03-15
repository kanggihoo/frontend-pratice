"use client";

import { deleteGuestbookEntry } from "@/lib/actions";

export default function DeleteButton({ id }) {
  async function handleDelete(formData) {
    const confirmed = confirm("정말 이 글을 삭제하시겠습니까?");
    if (!confirmed) return;

    const result = await deleteGuestbookEntry(formData);
    if (result?.error) {
      alert(result.error);
    }
  }

  return (
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
