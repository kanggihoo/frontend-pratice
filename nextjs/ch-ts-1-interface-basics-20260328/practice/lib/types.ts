// practice/lib/types.ts
// ─── [타입 정의 파일] ──────────────────────────────────────────────────────────
// 이 파일에 앱에서 사용하는 모든 공용 타입을 정의하세요.

// TODO: CompanyInfo 인터페이스를 정의하세요.
// 필요한 속성: name(string), tagline(string), description(string), founded(number), employeeCount(number)
export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  founded: number;
  employeeCount: number;
}

// TODO: TeamMember 인터페이스를 정의하세요.
// 필요한 속성: id(number), name(string), role(string), bio(string), imageUrl(선택적 string)
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
}

// TODO: Service 인터페이스를 정의하세요.
// 필요한 속성: id(number), title(string), description(string), icon(string)
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// TODO: HistoryItem 인터페이스를 정의하세요.
// 필요한 속성: year(number), title(string), description(string)
// 회사 연혁
export interface HistoryItem {
  year: number;
  title: string;
  description: string;
}
