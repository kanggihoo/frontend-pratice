// ─── [타입 정의] ───────────────────────────────
// 할 일(Todo)의 구조를 나타내는 타입을 정의하세요.
// 속성: id(문자열), text(문자열), completed(불리언), createdAt(숫자)
// 힌트: export interface Todo { ... }
export interface Todo {
  id: string; // id, text, completed, createdAt의 타입만 지정해주세요! 실제 실습에서는 이 부분만 비워두면 좋을 수도 있지만, 규칙에 따라 주석 처리합니다.
  
}

// ─── [필터 타입 정의] ───────────────────────────
// 필터의 상태를 나타내는 유니온 타입을 정의하세요.
// 'all', 'active', 'completed' 중 하나의 문자열 리터럴을 가집니다.
// 힌트: export type FilterType = ...
export type FilterType = string; // TODO: 여기를 수정하세요
