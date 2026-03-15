"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      // POST 요청을 우리의 Route Handler로 보냅니다.
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        setResult({ type: "error", message: json.error });
        return;
      }

      setResult({ type: "success", message: json.message });
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

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                이름 *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                placeholder="홍길동"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                이메일 *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                placeholder="example@email.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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
                  className="text-2xl transition-transform hover:scale-110 cursor-pointer"
                >
                  {star <= formData.rating ? "⭐" : "☆"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              메시지 *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm resize-none"
              placeholder="피드백을 남겨주세요..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {submitting ? "전송 중..." : "피드백 보내기"}
          </button>
        </form>

        {result && (
          <div
            className={`mt-4 px-4 py-3 rounded-lg text-sm font-medium ${
              result.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {result.type === "success" ? "✅" : "❌"} {result.message}
          </div>
        )}
      </div>
    </section>
  );
}
