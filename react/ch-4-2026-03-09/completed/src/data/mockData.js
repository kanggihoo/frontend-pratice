// 유효성 검사 규칙 정의
export const validationRules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
    messages: {
      required: "사용자명을 입력해주세요.",
      minLength: "사용자명은 최소 3자 이상이어야 합니다.",
      maxLength: "사용자명은 최대 20자까지 가능합니다.",
      pattern: "사용자명은 영문, 숫자, 밑줄(_)만 사용 가능합니다.",
    },
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    messages: {
      required: "이메일을 입력해주세요.",
      pattern: "올바른 이메일 형식을 입력해주세요.",
    },
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
    messages: {
      required: "비밀번호를 입력해주세요.",
      minLength: "비밀번호는 최소 8자 이상이어야 합니다.",
      pattern:
        "비밀번호는 대문자, 소문자, 숫자, 특수문자(!@#$%^&*)를 각각 1개 이상 포함해야 합니다.",
    },
  },
  passwordConfirm: {
    required: true,
    messages: {
      required: "비밀번호 확인을 입력해주세요.",
      match: "비밀번호가 일치하지 않습니다.",
    },
  },
  phone: {
    required: true,
    pattern: /^01[0-9]-\d{3,4}-\d{4}$/,
    messages: {
      required: "전화번호를 입력해주세요.",
      pattern: "올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)",
    },
  },
  bio: {
    required: false,
    maxLength: 200,
    messages: {
      maxLength: "자기소개는 최대 200자까지 가능합니다.",
    },
  },
};

// 폼 필드 설정 (렌더링용)
export const formFields = [
  {
    name: "username",
    label: "사용자명",
    type: "text",
    placeholder: "영문, 숫자, 밑줄(_) 3~20자",
    autoComplete: "username",
  },
  {
    name: "email",
    label: "이메일",
    type: "email",
    placeholder: "example@email.com",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "대소문자, 숫자, 특수문자 포함 8자 이상",
    autoComplete: "new-password",
  },
  {
    name: "passwordConfirm",
    label: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호를 다시 입력해주세요",
    autoComplete: "new-password",
  },
  {
    name: "phone",
    label: "전화번호",
    type: "tel",
    placeholder: "010-1234-5678",
    autoComplete: "tel",
  },
];

// 약관 목록
export const agreements = [
  { id: "terms", label: "이용약관 동의 (필수)", required: true },
  { id: "privacy", label: "개인정보 처리방침 동의 (필수)", required: true },
  { id: "marketing", label: "마케팅 정보 수신 동의 (선택)", required: false },
];

// API 시뮬레이션 함수
export function simulateSignupAPI(formData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formData.username === "admin") {
        reject(new Error("이미 사용 중인 사용자명입니다."));
        return;
      }
      if (formData.email === "test@test.com") {
        reject(new Error("이미 가입된 이메일입니다."));
        return;
      }
      resolve({
        success: true,
        message: "회원가입이 완료되었습니다!",
        user: {
          id: Date.now(),
          username: formData.username,
          email: formData.email,
        },
      });
    }, 1500);
  });
}
