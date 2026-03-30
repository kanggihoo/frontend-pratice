// ─── [제네릭 fetch 유틸] ───────────────────────────────────────────────────────
// 이 함수는 어떤 타입의 데이터든 fetch할 수 있는 제네릭 함수입니다.
//
// JavaScript 버전:
//   async function fetchData(url) {
//     const res = await fetch(url, { cache: 'no-store' });
//     if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
//     return res.json();
//   }
//
// TypeScript 버전 — 두 곳에 타입을 추가해야 합니다:
//   1. 제네릭 타입 파라미터 <T> (함수 이름 뒤)
//   2. 반환 타입 Promise<T> (매개변수 목록 뒤)
//

export async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

  return res.json() as Promise<T>;
}
