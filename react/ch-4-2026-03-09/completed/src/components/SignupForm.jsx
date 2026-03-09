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

function validateField(name, value, formRef) {
  const rules = validationRules[name];
  if (!rules) return "";

  if (rules.required && !value.trim()) {
    return rules.messages.required;
  }
  if (rules.minLength && value.length < rules.minLength) {
    return rules.messages.minLength;
  }
  if (rules.maxLength && value.length > rules.maxLength) {
    return rules.messages.maxLength;
  }
  if (rules.pattern && value.trim() && !rules.pattern.test(value)) {
    return rules.messages.pattern;
  }
  if (name === "passwordConfirm") {
    const passwordValue = formRef.current.password?.value || "";
    if (value !== passwordValue) {
      return rules.messages.match;
    }
  }

  return "";
}

export default function SignupForm({ onSuccess }) {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [bioCharCount, setBioCharCount] = useState(0);
  const [passwordValue, setPasswordValue] = useState("");

  // useRef로 각 필드에 대한 참조를 저장하는 객체
  const fieldRefs = useRef({});

  // 폼 전체에 대한 ref (비제어 컴포넌트에서 값을 읽기 위해)
  const formRef = useRef({});

  // ref 콜백 함수 — 각 필드의 DOM 요소를 fieldRefs에 저장
  const setFieldRef = (name) => (el) => {
    fieldRefs.current[name] = el;
    formRef.current[name] = el;
  };

  // 개별 필드 블러 시 유효성 검사
  const handleBlur = (name) => () => {
    const value = fieldRefs.current[name]?.value || "";
    const error = validateField(name, value, formRef);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // 필드 변경 시 기존 에러 제거
  const handleChange = (name) => () => {
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (name === "password") {
      setPasswordValue(fieldRefs.current.password?.value || "");
    }
    setSubmitError("");
  };

  // 자기소개 글자 수 카운트
  const handleBioChange = () => {
    const value = fieldRefs.current.bio?.value || "";
    setBioCharCount(value.length);
    if (errors.bio) {
      setErrors((prev) => ({ ...prev, bio: "" }));
    }
  };

  // 폼 전체 유효성 검사 — 첫 번째 에러 필드에 포커스
  const validateAll = () => {
    const newErrors = {};
    const fieldOrder = [...formFields.map((f) => f.name), "bio"];

    for (const name of fieldOrder) {
      const value = fieldRefs.current[name]?.value || "";
      const error = validateField(name, value, formRef);
      if (error) {
        newErrors[name] = error;
      }
    }

    // 필수 약관 검사
    const uncheckedRequired = agreements
      .filter((a) => a.required)
      .filter((a) => !fieldRefs.current[a.id]?.checked);

    if (uncheckedRequired.length > 0) {
      newErrors.agreements = "필수 약관에 모두 동의해주세요.";
    }

    setErrors(newErrors);

    // 첫 번째 에러 필드에 자동 포커스
    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = [...fieldOrder, "agreements"].find(
        (name) => newErrors[name]
      );
      if (firstErrorField && firstErrorField !== "agreements") {
        fieldRefs.current[firstErrorField]?.focus();
      } else if (firstErrorField === "agreements") {
        const firstUnchecked = uncheckedRequired[0];
        if (firstUnchecked) {
          fieldRefs.current[firstUnchecked.id]?.focus();
        }
      }
      return false;
    }

    return true;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    setIsSubmitting(true);
    setSubmitError("");

    // 비제어 컴포넌트에서 ref를 통해 값을 직접 읽음
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

    try {
      const result = await simulateSignupAPI(formData);
      onSuccess(result.user);
    } catch (err) {
      setSubmitError(err.message);
      // 에러에 해당하는 필드에 포커스
      if (err.message.includes("사용자명")) {
        fieldRefs.current.username?.focus();
      } else if (err.message.includes("이메일")) {
        fieldRefs.current.email?.focus();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* 텍스트 입력 필드들 */}
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

      {/* 자기소개 (선택) */}
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

      {/* 약관 동의 */}
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
        {errors.agreements && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <span>&#9888;</span> {errors.agreements}
          </p>
        )}
      </div>

      {/* 서버 에러 메시지 */}
      {submitError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {submitError}
        </div>
      )}

      {/* 제출 버튼 */}
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
