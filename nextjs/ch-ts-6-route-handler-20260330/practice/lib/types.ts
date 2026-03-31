// practice/lib/types.ts
// ─── [타입 정의 파일] ──────────────────────────────────────────
// 이 파일에 앱에서 사용하는 모든 공용 타입을 직접 정의하세요.
// completed/lib/types.ts를 참고해서 작성해보세요.

// TODO: User 인터페이스를 정의하세요.
// JSONPlaceholder /users 응답의 구조를 보고 작성합니다.
// interface User {
//   id: number;
//   name: string;
//   email: string;
//   ...
// }

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

// TODO: ApiResponse<T> 제네릭 인터페이스를 정의하세요.
// 힌트: 제네릭 <T>를 사용하면 data 필드의 타입을 호출 시점에 결정할 수 있습니다.
// interface ApiResponse<T> {
//   success: boolean;
//   data?: T;
//   error?: string;
// }

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}
