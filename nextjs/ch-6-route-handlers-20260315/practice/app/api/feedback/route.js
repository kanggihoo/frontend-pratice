// ─── [Route Handler 임포트] ─────────────────────────────
import { NextResponse } from "next/server";

/**
 * POST /api/feedback
 *
 * 사용자 피드백을 받아 처리하는 Route Handler입니다.
 * 실제 서비스에서는 DB에 저장하거나, 슬랙/이메일로 전송합니다.
 *
 * 요청 본문 (JSON):
 *   - name: 이름
 *   - email: 이메일
 *   - message: 메시지
 *   - rating: 평점 (1~5)
 */

// ─── [POST 핸들러 함수 작성] ─────────────────────────────
// GET이 아닌 POST 메서드를 export합니다.
// POST 요청은 주로 데이터 생성(Create)이나 폼 제출에 사용됩니다.
// 힌트: export async function POST(request) { ... }

export async function POST(request) {
  try {
    // ─── [요청 본문 파싱] ────────────────────────────────

    const body = await request.json();
    const { name, email, message, rating } = body;

    // 서버 측 유효성 검증
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "이름, 이메일, 메시지는 필수 항목입니다." },
        { status: 400 },
      );
    }

    // ─── [서버 측 유효성 검증] ───────────────────────────
    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: "평점은 1에서 5 사이여야 합니다." },
        { status: 400 },
      );
    }

    // 평점 범위도 검증하세요. (1~5)
    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: "평점은 1에서 5 사이여야 합니다." },
        { status: 400 },
      );
    }
    // ─── [데이터 처리 및 성공 응답] ──────────────────────
    // 실제로는 여기서 DB 저장, 이메일 전송 등을 수행합니다.
    // .env.local에 설정된 가짜 웹훅(Webhook) 또는 테스트용 엔드포인트로 데이터를 전송해봅니다.
    console.log("📩 피드백 수신 로컬 로그:", { name, email, message, rating });

    if (process.env.FEEDBACK_API_URL) {
      try {
        const externalRes = await fetch(process.env.FEEDBACK_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.FEEDBACK_API_KEY || "test-key"}`,
          },
          body: JSON.stringify({ name, email, message, rating }),
        });

        if (!externalRes.ok) {
          console.warn("⚠️ 외부 테스트 API 전달 실패:", externalRes.status);
        } else {
          console.log("✅ 외부 테스트 API로 성공적으로 전송 완료");
        }
      } catch (err) {
        console.error("⚠️ 외부 테스트 API 전송 중 오류:", err.message);
      }
    }
    return NextResponse.json(
      {
        success: true,
        message: `${name}님, 소중한 피드백 감사합니다!`,
        receivedAt: new Date().toISOString(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Feedback API Error:", error);
    return NextResponse.json(
      { error: "피드백 처리 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
