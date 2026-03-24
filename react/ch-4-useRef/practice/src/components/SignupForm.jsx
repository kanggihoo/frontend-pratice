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
// 검사 순서:
// 1. required인데 빈 값이면 → messages.required 반환
// 2. minLength 미달이면 → messages.minLength 반환
// 3. maxLength 초과면 → messages.maxLength 반환
// 4. pattern 불일치면 → messages.pattern 반환
// 5. passwordConfirm 필드는 password 값과 비교 → messages.match 반환
// 6. 에러 없으면 빈 문자열 "" 반환
function validateField(name, value, formRef) {
  const rules = validationRules[name];
  if (!rules) return "";

  if (rules.required && !value.trim()) return rules.messages.required;

  if (rules.minLength && value.length < rules.minLength) {
    return rules.messages.minLength;
  }
  if (rules.maxLength && value.length > rules.maxLength) {
    return rules.messages.maxLength;
  }
  if (rules.pattern && value.trim() && !rules.pattern.test(value)) {
    return rules.messages.pattern;
  }
  if (name == "passwordConfirm") {
    const passwordValue = formRef.current.password?.value || "";
    if (value !== passwordValue) return rules.messages.match;
  }

  return "";
}

export default function SignupForm({ onSuccess }) {
  // ─── [상태 선언] ──────────────────────────────────
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
  // 1. fieldRefs: 각 입력 필드의 DOM 요소를 저장하는 ref
  //    초기값은 빈 객체 {}
  //    나중에 fieldRefs.current.username, fieldRefs.current.email 등으로
  //    각 input DOM 요소에 접근합니다.
  //
  // 2. formRef: 비제어 컴포넌트에서 값을 읽기 위한 ref
  //    초기값은 빈 객체 {}
  //    formRef.current.password?.value 등으로 값을 읽습니다.
  const fieldRefs = useRef({});
  const formRef = useRef({});

  // ─── [ref 콜백 함수] ─────────────────────────────
  // name을 받아서 함수를 반환하는 고차 함수(Higher-Order Function)입니다.
  // 반환된 함수는 DOM 요소(el)를 받아:
  //   fieldRefs.current[name] = el;
  //   formRef.current[name] = el;
  // 이렇게 두 ref 객체에 모두 저장합니다.
  const setFieldRef = (name) => (el) => {
    fieldRefs.current[name] = el;
    formRef.current[name] = el;
  };

  // ─── [블러 핸들러] ────────────────────────────────
  // 필드에서 포커스가 벗어날 때(blur) 유효성 검사를 실행합니다.
  // 1. fieldRefs.current[name]에서 현재 값(.value)을 읽습니다.
  //    ⚠️ 비제어 컴포넌트의 핵심: state가 아닌 ref에서 값을 읽습니다!
  // 2. validateField 함수로 검사합니다.
  // 3. setErrors로 해당 필드의 에러를 업데이트합니다.
  const handleBlur = (name) => () => {
    const value = fieldRefs.current[name]?.value || "";
    const error = validateField(name, value, formRef);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // ─── [변경 핸들러] ────────────────────────────────
  // 필드 값이 변경될 때 기존 에러를 제거합니다.
  //
  // 1. 해당 필드에 에러가 있으면 제거 (errors[name]이 truthy일 때)
  // 2. password 필드면 passwordValue 상태도 업데이트 (강도 표시용)
  //    → fieldRefs.current.password?.value를 읽어서 setPasswordValue
  // 3. submitError도 초기화
  const handleChange = (name) => () => {
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (name === "password") {
      setPasswordValue(fieldRefs.current.password?.value || "");
    }
    setSubmitError("");
  };

  // ─── [자기소개 변경 핸들러] ────────────────────────
  // textarea의 글자 수를 세어 bioCharCount 상태를 업데이트합니다.
  // 1. fieldRefs.current.bio?.value로 현재 값을 읽어
  // 2. setBioCharCount로 길이를 설정
  // 3. bio 에러가 있으면 제거 => 왜 에러가 있는데 제거 하는거지?
  const handleBioChange = () => {
    // 여기에 글자 수 카운트 로직을 작성하세요
    const value = fieldRefs.current.bio?.value || "";
    setBioCharCount(value.length);
    if (errors.bio) {
      setErrors((prev) => ({
        ...prev,
        bio: "",
      }));
    }
  };

  // ─── [전체 유효성 검사 + 자동 포커스] ──────────────
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

    // 1. fieldOrder를 순회하며 각 필드의 값을 ref에서 읽고 검사
    // 2. 필수 약관 체크 여부 확인
    // 3. setErrors(newErrors)
    // 4. 첫 번째 에러 필드에 focus() 호출
    for (const name of fieldOrder) {
      const value = fieldRefs.current[name]?.value || "";
      const error = validateField(name, value, formRef);
      if (error) newErrors[name] = error;
    }

    // 필수 약관검사
    const uncheckedRequired = agreements
      .filter((e) => e.required)
      .filter((e) => !fieldRefs.current[e.id]?.checked);

    if (uncheckedRequired.length > 0) {
      newErrors.agreements = "필수 약관에 모두 동의해주세요.";
    }

    setErrors(newErrors);

    // 에러 필드에 자동 포커스
    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = [...fieldOrder, "agreements"].find(
        (name) => newErrors[name],
      );
      if (firstErrorField && firstErrorField !== "agreements") {
        fieldRefs.current[firstErrorField]?.focus();
      } else if (firstErrorField == "agreements") {
        const firstUnchecked = uncheckedRequired[0];
        fieldRefs.current[firstUnchecked]?.focus();
      }
      return false;
    }
    return true;
  };

  // ─── [폼 제출 핸들러] ─────────────────────────────
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
    if (!validateAll()) return;
    setIsSubmitting(true);
    setSubmitError("");

    const formData = {
      username: fieldRefs.current.username?.value,
      email: fieldRefs.current.email?.value,
      password: fieldRefs.current.password?.value,
      phone: fieldRefs.current.phone?.value,
      bio: fieldRefs.current.bio?.value || "",
      agreements: agreements.reduce((acc, a) => {
        acc[a.id] = fieldRefs.current[a.id]?.checked || false;
        return acc;
      }, {}),
    };
    // 예시 API 호출
    try {
      const result = await simulateSignupAPI(formData);
      onSuccess(result.user);
    } catch (error) {
      setSubmitError(error.messages);
      if (error.messages.includes("사용자명")) {
        fieldRefs.current.username?.focus();
      } else if (error.messages.includes("이메일")) {
        fieldRefs.current.email?.focus();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* ─── [텍스트 입력 필드 렌더링] ──────────────── */}
      {formFields.map((field) => (
        <div key={field.name}>
          <FormField
            ref={setFieldRef(field.name)}
            label={field.label}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            error={errors[field.name]}
            onChange={handleChange(field.name)}
            onBlur={handleBlur(field.name)}
          />
          {field.name === "password" && (
            <PasswordStrength password={passwordValue} />
          )}
        </div>
      ))}

      {/* ─── [자기소개 필드] ─────────────────────────── */}
      <TextAreaField
        ref={setFieldRef("bio")}
        label="자기소개 (선택)"
        name="bio"
        placeholder="간단한 자기소개를 작성해주세요"
        maxLength={200}
        charCount={bioCharCount}
        error={errors.bio}
        onChange={handleBioChange}
        onBlur={handleBlur("bio")}
      />

      {/* ─── [약관 동의] ──────────────────────────────── */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-2">약관 동의</p>
        <div className="space-y-1">
          {agreements.map((agreement) => (
            <AgreementCheckbox
              key={agreement.id}
              ref={setFieldRef(agreement.id)}
              id={agreement.id}
              label={agreement.label}
              required={agreement.required}
              onChange={() =>
                errors.agreements &&
                setErrors((prev) => ({ ...prev, agreements: "" }))
              }
            />
          ))}
        </div>
      </div>

      {/* ─── [서버 에러 메시지] ───────────────────────── */}
      {submitError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {submitError}
        </div>
      )}

      {/* ─── [제출 버튼] ──────────────────────────────── */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            가입 처리 중...
          </span>
        ) : (
          "회원가입"
        )}
      </button>
    </form>
  );
}
