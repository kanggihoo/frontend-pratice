// 로그인 가능한 사용자 목록
export const users = [
  {
    id: 1,
    name: "김민수",
    email: "minsu@example.com",
    password: "1234",
    avatar: "🧑‍💻",
    role: "프론트엔드 개발자",
  },
  {
    id: 2,
    name: "이서연",
    email: "seoyeon@example.com",
    password: "1234",
    avatar: "👩‍🎨",
    role: "UI/UX 디자이너",
  },
  {
    id: 3,
    name: "박지훈",
    email: "jihun@example.com",
    password: "1234",
    avatar: "👨‍🔬",
    role: "백엔드 개발자",
  },
  {
    id: 4,
    name: "최유진",
    email: "yujin@example.com",
    password: "1234",
    avatar: "👩‍💼",
    role: "프로젝트 매니저",
  },
  {
    id: 5,
    name: "정도현",
    email: "dohyun@example.com",
    password: "1234",
    avatar: "🧑‍🏫",
    role: "풀스택 개발자",
  },
  {
    id: 6,
    name: "한소희",
    email: "sohee@example.com",
    password: "1234",
    avatar: "👩‍🚀",
    role: "DevOps 엔지니어",
  },
];

// 대시보드에 표시할 알림 데이터
export const notifications = [
  { id: 1, message: "새로운 프로젝트가 할당되었습니다.", time: "5분 전", read: false },
  { id: 2, message: "코드 리뷰 요청이 도착했습니다.", time: "15분 전", read: false },
  { id: 3, message: "배포가 성공적으로 완료되었습니다.", time: "1시간 전", read: true },
  { id: 4, message: "팀 미팅이 30분 후에 시작됩니다.", time: "2시간 전", read: true },
  { id: 5, message: "이슈 #42가 해결되었습니다.", time: "3시간 전", read: true },
  { id: 6, message: "주간 리포트가 생성되었습니다.", time: "어제", read: true },
];

// 대시보드 통계 카드 데이터
export const statsData = [
  { id: 1, label: "진행 중인 프로젝트", value: 5, icon: "📂", color: "blue" },
  { id: 2, label: "완료된 태스크", value: 128, icon: "✅", color: "green" },
  { id: 3, label: "팀원 수", value: 12, icon: "👥", color: "purple" },
  { id: 4, label: "읽지 않은 알림", value: 2, icon: "🔔", color: "orange" },
];
