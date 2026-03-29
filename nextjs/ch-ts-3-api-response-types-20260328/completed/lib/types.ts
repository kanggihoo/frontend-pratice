// ─── 공용 타입 정의 ────────────────────────────────────────────────────────────
// JSONPlaceholder API 응답 구조를 interface로 정의합니다.
//
// interface vs type 선택 원칙:
//   - 객체 구조(shape)를 정의할 때 → interface
//   - 유니언(|), 교차(&), 리터럴 타입 등을 조합할 때 → type

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

// API 요청 결과를 담는 통합 타입 — 여러 데이터 종류를 함께 반환할 때 사용
export interface DashboardData {
  users: User[];
  posts: Post[];
  todos: Todo[];
}
