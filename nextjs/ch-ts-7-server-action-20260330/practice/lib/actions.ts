"use server";

import { revalidatePath } from "next/cache";
import { guestbookEntries } from "@/data/guestbook";
import type { ActionResult } from "@/lib/types";
// TODO: ActionResult를 lib/types.ts에 정의한 후 import 주석을 해제하세요.

// ─── [Server Action: 방명록 추가] ──────────────────────────────────────────────
//
//
// TypeScript 버전:
//   - 매개변수: formData: FormData
//   - 반환 타입: Promise<ActionResult>
//
// [FormData.get() 반환 타입]
//   FormData.get(name) → string | File | null
//   텍스트 필드는 string 또는 null을 반환합니다.
//
// [타입 좁히기 (Type Narrowing)]
//   typeof value === "string" 체크로 string 타입을 확정합니다.
//   이 체크를 통과하면 TypeScript는 해당 변수가 string임을 알게 됩니다.
//
// 힌트:
//   export async function addEntry(formData: FormData): Promise<ActionResult> {
//     const name = formData.get("name");           // string | File | null
//     if (typeof name !== "string" || ...) { ... } // 타입 좁히기
//     // 이 아래부터 name은 string 타입
//   }

// [useActionState와 함께 사용하는 Server Action 시그니처]
// useActionState의 액션 함수는 (prevState, payload) 형태입니다.
//   - 첫 번째 인자: 이전 상태 (prevState) — ActionResult | null
//   - 두 번째 인자: 폼 데이터 (formData) — FormData
//
// JavaScript 버전:
//   export async function addEntry(prevState, formData) { ... }
//
// TypeScript 버전:
//   export async function addEntry(
//     _prevState: ActionResult | null,   // _ 접두사: 사용하지 않는 매개변수
//     formData: FormData
//   ): Promise<ActionResult> { ... }
//
// 힌트: _prevState 앞의 _ 는 "이 변수를 사용하지 않는다"는 TypeScript 관례입니다.

// TODO: 매개변수와 반환 타입을 추가하세요.
export async function addEntry(
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const name = formData.get("name");
  const message = formData.get("message");

  // TODO: typeof 타입 좁히기를 사용해 유효성 검사를 완성하세요.
  if (typeof name !== "string" || name.trim() === "") {
    return { success: false, error: "이름을 입력해주세요." };
  }
  if (typeof message !== "string" || message.trim() === "") {
    return { success: false, error: "메시지를 입력해주세요." };
  }

  const newEntry = {
    id: Date.now().toString(),
    name: name.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  guestbookEntries.unshift(newEntry);
  revalidatePath("/");

  return { success: true, message: "방명록에 등록되었습니다!" };
}

// ─── [Server Action: 방명록 삭제] ──────────────────────────────────────────────
//
// [as 타입 단언]
//   확실히 string인 경우에만 사용합니다.
//   hidden input으로 전달된 id는 항상 string이므로 as string 사용이 적합합니다.
//   과용 주의 — 불확실한 경우엔 typeof 체크를 사용하세요.
//
// 힌트:
//   export async function deleteEntry(formData: FormData): Promise<void> {
//     const id = formData.get("id") as string;
//   }

// TODO: 매개변수와 반환 타입을 추가하세요.
export async function deleteEntry(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;

  const index = guestbookEntries.findIndex((entry) => entry.id === id);
  if (index !== -1) {
    guestbookEntries.splice(index, 1);
  }

  revalidatePath("/");
}
