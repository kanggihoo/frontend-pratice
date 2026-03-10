// ─── [임포트] ──────────────────────────────────────
// React에서 useRef와 useState를 임포트하세요.
// 힌트: import { useRef, useState } from "react";
import { useRef, useState } from "react";
import FormField from "./FormField";
import TextAreaField from "./TextAreaField";
import AgreementCheckbox from "./AgreementCheckbox";
import PasswordStrength from "./PasswordStrength";
import {
  validationRules,
  formFields,
  agreements,
  simulateSignupAPI,
} from "../data/mockData";

// ─── [유효성 검사 함수] ─────────────────────────────
// 필드명(name)과 값(value)을 받아 에러 메시지를 반환하는 함수입니다.
// formRef는 비밀번호 확인 시 비밀번호 값을 비교하기 위해 필요합니다.
//
// 검사 순서:
// 1. required인데 빈 값이면 → messages.required 반환
// 2. minLength 미달이면 → messages.minLength 반환
// 3. maxLength 초과면 → messages.maxLength 반환
// 4. pattern 불일치면 → messages.pattern 반환
// 5. passwordConfirm 필드는 password 값과 비교 → messages.match 반환
// 6. 에러 없으면 빈 문자열 "" 반환
//
// 힌트: validationRules[name]에서 해당 필드의 규칙을 가져올 수 있습니다.
// 힌트: formRef.current.password?.value로 비밀번호 필드의 값을 읽을 수 있습니다.
function validateField(name, value, formRef) {
  const rules = validationRules[name];
  if (!rules) return "";

  // 여기에 유효성 검사 로직을 작성하세요

  return "";
}

export default function SignupForm({ onSuccess }) {
  // ─── [상태 선언] ──────────────────────────────────
  // useState로 다음 상태들을 선언하세요:
  // 1. errors: 필드별 에러 메시지를 저장하는 객체 (초기값: {})
  // 2. isSubmitting: 제출 중인지 여부 (초기값: false)
  // 3. submitError: 서버 에러 메시지 (초기값: "")
  // 4. bioCharCount: 자기소개 글자 수 (초기값: 0)
  // 5. passwordValue: 비밀번호 강도 표시용 (초기값: "")
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [bioCharCount, setBioCharCount] = useState(0);
  const [passwordValue, setPasswordValue] = useState("");

  // ─── [useRef 선언] ────────────────────────────────
  // useRef를 사용하여 두 개의 ref를 만드세요:
  //
  // 1. fieldRefs: 각 입력 필드의 DOM 요소를 저장하는 ref
  //    초기값은 빈 객체 {}
  //    나중에 fieldRefs.current.username, fieldRefs.current.email 등으로
  //    각 input DOM 요소에 접근합니다.
  //
  // 2. formRef: 비제어 컴포넌트에서 값을 읽기 위한 ref
  //    초기값은 빈 객체 {}
  //    formRef.current.password?.value 등으로 값을 읽습니다.
  //
  // 힌트: const 변수명 = useRef(초기값);
  // ⚠️ useRef는 리렌더링 없이 값을 유지하는 것이 핵심입니다!

  // ─── [ref 콜백 함수] ─────────────────────────────
  // 각 입력 필드에 ref를 연결하기 위한 콜백 함수입니다.
  // name을 받아서 함수를 반환하는 고차 함수(Higher-Order Function)입니다.
  //
  // 반환된 함수는 DOM 요소(el)를 받아:
  //   fieldRefs.current[name] = el;
  //   formRef.current[name] = el;
  // 이렇게 두 ref 객체에 모두 저장합니다.
  //
  // 사용 예: <input ref={setFieldRef("username")} />
  // → 해당 input DOM이 fieldRefs.current.username에 저장됩니다.
  //
  // 힌트: const setFieldRef = (name) => (el) => { ... };
  const setFieldRef = (name) => (el) => {
    // 여기에 ref 저장 로직을 작성하세요
  };

  // ─── [블러 핸들러] ────────────────────────────────
  // 필드에서 포커스가 벗어날 때(blur) 유효성 검사를 실행합니다.
  //
  // 1. fieldRefs.current[name]에서 현재 값(.value)을 읽습니다.
  //    ⚠️ 비제어 컴포넌트의 핵심: state가 아닌 ref에서 값을 읽습니다!
  // 2. validateField 함수로 검사합니다.
  // 3. setErrors로 해당 필드의 에러를 업데이트합니다.
  //
  // 힌트: 이전 errors를 spread로 복사 + 해당 필드만 덮어쓰기
  //   setErrors((prev) => ({ ...prev, [name]: error }));
  const handleBlur = (name) => () => {
    // 여기에 블러 시 유효성 검사 로직을 작성하세요
  };

  // ─── [변경 핸들러] ────────────────────────────────
  // 필드 값이 변경될 때 기존 에러를 제거합니다.
  //
  // 1. 해당 필드에 에러가 있으면 제거 (errors[name]이 truthy일 때)
  // 2. password 필드면 passwordValue 상태도 업데이트 (강도 표시용)
  //    → fieldRefs.current.password?.value를 읽어서 setPasswordValue
  // 3. submitError도 초기화
  //
  // 힌트: setErrors((prev) => ({ ...prev, [name]: "" }));
  const handleChange = (name) => () => {
    // 여기에 변경 시 에러 제거 로직을 작성하세요
  };

  // ─── [자기소개 변경 핸들러] ────────────────────────
  // textarea의 글자 수를 세어 bioCharCount 상태를 업데이트합니다.
  // 1. fieldRefs.current.bio?.value로 현재 값을 읽어
  // 2. setBioCharCount로 길이를 설정
  // 3. bio 에러가 있으면 제거
  const handleBioChange = () => {
    // 여기에 글자 수 카운트 로직을 작성하세요
  };

  // ─── [전체 유효성 검사 + 자동 포커스] ──────────────
  // 폼 제출 전에 모든 필드를 검사하고, 첫 번째 에러 필드에 포커스합니다.
  //
  // 1. 모든 텍스트 필드를 순회하며 validateField 실행
  // 2. 필수 약관 체크 여부 확인
  //    → fieldRefs.current[agreement.id]?.checked
  // 3. 에러가 있으면:
  //    → 첫 번째 에러 필드를 찾아 fieldRefs.current[필드명]?.focus() 호출
  //    ⚠️ 이것이 이번 회차의 핵심! useRef로 DOM에 직접 접근하여 포커스를 이동합니다!
  //    → return false
  // 4. 에러가 없으면 return true
  const validateAll = () => {
    const newErrors = {};
    const fieldOrder = [...formFields.map((f) => f.name), "bio"];

    // 여기에 전체 유효성 검사 로직을 작성하세요
    // 1. fieldOrder를 순회하며 각 필드의 값을 ref에서 읽고 검사
    // 2. 필수 약관 체크 여부 확인
    // 3. setErrors(newErrors)
    // 4. 첫 번째 에러 필드에 focus() 호출

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // ─── [자동 포커스] ────────────────────────────
      // 첫 번째 에러가 발생한 필드를 찾아 포커스를 이동하세요.
      // fieldRefs.current[필드명]?.focus() 를 사용합니다.
      //
      // 힌트: [...fieldOrder, "agreements"].find((name) => newErrors[name])
      // 으로 첫 번째 에러 필드를 찾을 수 있습니다.

      return false;
    }

    return true;
  };

  // ─── [폼 제출 핸들러] ─────────────────────────────
  // async 함수로, 폼 제출을 처리합니다.
  //
  // 1. e.preventDefault()로 기본 제출 동작 방지
  // 2. validateAll()이 false면 조기 반환
  // 3. isSubmitting을 true로 설정
  // 4. ⚠️ 비제어 컴포넌트의 핵심:
  //    ref에서 직접 값을 읽어 formData 객체를 만듭니다!
  //    fieldRefs.current.username?.value
  //    fieldRefs.current[agreement.id]?.checked
  // 5. simulateSignupAPI(formData) 호출 (await)
  // 6. 성공 시 onSuccess(result.user) 호출
  // 7. 실패 시 setSubmitError(err.message) + 관련 필드에 focus()
  // 8. finally에서 isSubmitting을 false로 설정
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 여기에 폼 제출 로직을 작성하세요
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* ─── [텍스트 입력 필드 렌더링] ──────────────── */}
      {/* formFields 배열을 map으로 순회하며 FormField 컴포넌트를 렌더링하세요. */}
      {/* 각 FormField에 ref={setFieldRef(field.name)}를 전달합니다. */}
      {/* password 필드 아래에는 PasswordStrength 컴포넌트를 추가하세요. */}
      {/**/}
      {/* 힌트: */}
      {/* {formFields.map((field) => ( */}
      {/*   <div key={field.name}> */}
      {/*     <FormField ref={setFieldRef(field.name)} ... /> */}
      {/*     {field.name === "password" && <PasswordStrength password={passwordValue} />} */}
      {/*   </div> */}
      {/* ))} */}

      {/* ─── [자기소개 필드] ─────────────────────────── */}
      {/* TextAreaField 컴포넌트를 렌더링하세요. */}
      {/* ref={setFieldRef("bio")}를 전달합니다. */}

      {/* ─── [약관 동의] ──────────────────────────────── */}
      {/* agreements 배열을 map으로 순회하며 AgreementCheckbox를 렌더링하세요. */}
      {/* 각 체크박스에 ref={setFieldRef(agreement.id)}를 전달합니다. */}
      {/* errors.agreements가 있으면 에러 메시지도 표시하세요. */}

      {/* ─── [서버 에러 메시지] ───────────────────────── */}
      {/* submitError가 있으면 에러 메시지를 표시하세요. */}
      {/* Tailwind: "mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600" */}

      {/* ─── [제출 버튼] ──────────────────────────────── */}
      {/* type="submit", disabled={isSubmitting} */}
      {/* isSubmitting이면 로딩 스피너 + "가입 처리 중..." 표시 */}
      {/* 아니면 "회원가입" 텍스트 표시 */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {isSubmitting ? "가입 처리 중..." : "회원가입"}
      </button>
    </form>
  );
}
