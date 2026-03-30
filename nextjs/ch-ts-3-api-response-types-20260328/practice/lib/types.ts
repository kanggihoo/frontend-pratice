// ─── [타입 정의 파일] ──────────────────────────────────────────────────────────
// 이 파일에 앱에서 사용하는 모든 공용 타입을 정의하세요.

// 핵심 원칙: 객체 구조(shape)는 interface, 유니언/교차 타입은 type
//

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
