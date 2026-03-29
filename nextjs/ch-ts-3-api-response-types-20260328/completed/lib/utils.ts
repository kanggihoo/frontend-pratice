// ─── 제네릭 fetch 유틸 ─────────────────────────────────────────────────────────
// 제네릭 <T>: 함수를 호출할 때 타입을 결정합니다.
//
// 호출 예시:
//   const users = await fetchData<User[]>('https://jsonplaceholder.typicode.com/users');
//   const posts = await fetchData<Post[]>('https://jsonplaceholder.typicode.com/posts');
//
// <T>가 없다면 반환값이 unknown이 되어, 이후 코드에서 타입을 알 수 없습니다.

export async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json() as Promise<T>;
}
