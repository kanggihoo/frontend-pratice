export const filterOptions = [
  { label: "전체", value: "all" },
  { label: "진행 중", value: "active" },
  { label: "완료", value: "completed" },
];

export const categoryOptions = ["학습", "업무", "건강", "약속", "개인"];

export const priorityOptions = ["높음", "보통", "낮음"];

export const initialFormState = {
  title: "",
  category: "학습",
  priority: "보통",
  dueDate: "2026-03-12",
};

export const initialTodos = [
  {
    id: 101,
    title: "React useState 복습 노트 정리",
    category: "학습",
    priority: "높음",
    dueDate: "2026-03-09",
    completed: false,
  },
  {
    id: 102,
    title: "팀 스프린트 회의 안건 작성",
    category: "업무",
    priority: "높음",
    dueDate: "2026-03-10",
    completed: true,
  },
  {
    id: 103,
    title: "저녁 러닝 30분",
    category: "건강",
    priority: "보통",
    dueDate: "2026-03-10",
    completed: false,
  },
  {
    id: 104,
    title: "주말 약속 장소 예약 확인",
    category: "약속",
    priority: "보통",
    dueDate: "2026-03-11",
    completed: false,
  },
  {
    id: 105,
    title: "월간 지출 내역 정리",
    category: "개인",
    priority: "낮음",
    dueDate: "2026-03-13",
    completed: true,
  },
  {
    id: 106,
    title: "컴포넌트 분리 기준 메모 남기기",
    category: "학습",
    priority: "보통",
    dueDate: "2026-03-14",
    completed: false,
  },
];
