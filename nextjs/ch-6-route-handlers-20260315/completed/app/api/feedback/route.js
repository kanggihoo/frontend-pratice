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
export async function POST(request) {
  try {
    // request.json()으로 요청 본문을 파싱합니다.
    const body = await request.json();
    const { name, email, message, rating } = body;

    // 서버 측 유효성 검증
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "이름, 이메일, 메시지는 필수 항목입니다." },
        { status: 400 }
      );
    }

    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: "평점은 1에서 5 사이여야 합니다." },
        { status: 400 }
      );
    }

    // 실제로는 여기서 DB 저장, 이메일 전송 등을 수행합니다.
    // 지금은 받은 데이터를 로그로 출력하고 성공 응답을 반환합니다.
    console.log("📩 피드백 수신:", { name, email, message, rating });

    return NextResponse.json(
      {
        success: true,
        message: `${name}님, 소중한 피드백 감사합니다!`,
        receivedAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Feedback API Error:", error);
    return NextResponse.json(
      { error: "피드백 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
