// ─── 공용 타입 정의 파일 ────────────────────────────────────────────────────
// 앱 전체에서 재사용하는 도메인 타입을 이곳에 모아 관리합니다.

// 회사 기본 정보
export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  founded: number;
  employeeCount: number;
}

// 팀 멤버
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string; // ? = 선택적 속성 (없어도 됨)
}

// 제공 서비스
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// 회사 연혁
export interface HistoryItem {
  year: number;
  title: string;
  description: string;
}
