"use client";

// ─── [클라이언트 컴포넌트 선언] ──────────────────────────
// 이 컴포넌트는 폼 상태, 이벤트 핸들러를 사용합니다.
// ✅ "use client" 지시어가 파일 최상단에 선언되어 있습니다.


// ─── [React 훅 임포트] ──────────────────────────────────
// 힌트: import { useState } from "react";


import { useState } from "react";

export default function FeedbackForm() {
  // ─── [폼 상태 선언] ───────────────────────────────────
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // ─── [입력 변경 핸들러] ────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  // ─── [폼 제출 핸들러] ─────────────────────────────────
  // POST 요청을 Route Handler(/api/feedback)로 보냅니다.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      // ─── [POST 요청 보내기] ────────────────────────
      // fetch()로 POST 요청을 보내세요.
      // method, headers(Content-Type), body(JSON.stringify)를 설정합니다.
      // 힌트: const res = await fetch("/api/feedback", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });


      // ─── [응답 처리] ──────────────────────────────
      // 응답을 JSON으로 파싱하고, 성공/실패에 따라 result 상태를 설정하세요.
      // 힌트: const json = await res.json();
      // 힌트: if (!res.ok) {
      //   setResult({ type: "error", message: json.error });
      //   return;
      // }
      // 힌트: setResult({ type: "success", message: json.message });
      // 힌트: setFormData({ name: "", email: "", message: "", rating: 5 });


      // 임시 성공 처리 (위의 로직을 구현한 후 이 부분을 삭제하세요)
      setResult({ type: "success", message: "피드백이 접수되었습니다." });
      setFormData({ name: "", email: "", message: "", rating: 5 });
    } catch (err) {
      setResult({ type: "error", message: "전송에 실패했습니다." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">📮 피드백 보내기</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          POST /api/feedback → 서버에서 데이터 검증 및 처리
        </p>
      </div>

      {/* ─── [폼 카드 컨테이너] ───────────────────────────── */}
      {/* 힌트: bg-white, rounded-xl, p-6, shadow-sm, border */}
      <div className="">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ─── [이름 / 이메일 입력 필드] ──────────────── */}
          {/* 힌트: grid grid-cols-1 md:grid-cols-2 gap-4 로 2열 레이아웃 */}
          <div className="">
            <div>
              <label htmlFor="name" className="">이름 *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className=""
                placeholder="홍길동"
              />
            </div>
            <div>
              <label htmlFor="email" className="">이메일 *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className=""
                placeholder="example@email.com"
              />
            </div>
          </div>

          {/* ─── [평점 선택] ──────────────────────────────── */}
          <div>
            <label htmlFor="rating" className="">
              평점: {formData.rating}점
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, rating: star }))
                  }
                  className="text-2xl cursor-pointer"
                >
                  {star <= formData.rating ? "⭐" : "☆"}
                </button>
              ))}
            </div>
          </div>

          {/* ─── [메시지 입력] ────────────────────────────── */}
          <div>
            <label htmlFor="message" className="">메시지 *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className=""
              placeholder="피드백을 남겨주세요..."
            />
          </div>

          {/* ─── [제출 버튼 스타일링] ──────────────────────── */}
          {/* 힌트: w-full, py-3, bg-emerald-600, text-white, rounded-lg, hover:bg-emerald-700 */}
          <button type="submit" disabled={submitting} className="">
            {submitting ? "전송 중..." : "피드백 보내기"}
          </button>
        </form>

        {/* ─── [결과 메시지 표시] ─────────────────────────── */}
        {/* result 상태에 따라 성공/에러 메시지를 표시하세요. */}
        {/* 힌트: result.type이 "success"이면 초록색, "error"이면 빨간색 배경 */}
        {result && (
          <div className="">
            {result.type === "success" ? "✅" : "❌"} {result.message}
          </div>
        )}
      </div>
    </section>
  );
}
