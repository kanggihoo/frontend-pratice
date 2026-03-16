// ─── [서버 컴포넌트] ──────────────────────────────────
// 이 컴포넌트는 "use client" 지시어가 없으므로 서버 컴포넌트입니다.
// 서버에서 렌더링되므로 데이터를 안전하게 표시할 수 있습니다.
// 단, 삭제 버튼은 사용자 인터랙션이 필요하므로 별도 클라이언트 컴포넌트로 분리합니다.

// ─── [DeleteButton 컴포넌트 import] ────────────────────
// 힌트: import DeleteButton from "./DeleteButton";

export default function GuestbookList({ entries }) {
  // ─── [빈 목록 처리] ──────────────────────────────────
  if (entries.length === 0) {
    return (
      <div className="">{/* TODO: 중앙 정렬, 상하 패딩, 회색 텍스트 */}
        <p>아직 남겨진 글이 없습니다.</p>
        <p>첫 번째 글을 남겨보세요!</p>
      </div>
    );
  }

  return (
    // ─── [방명록 목록 렌더링] ──────────────────────────
    // 힌트: <ul> 안에 entries.map()으로 각 글을 <li>로 렌더링하세요.
    <ul className="">{/* TODO: 리스트 간격 space-y-4 */}
      {entries.map((entry) => (
        <li
          key={entry.id}
          className=""
        >{/* TODO: 카드 스타일 (bg-white, rounded-2xl, shadow-sm 등) */}
          <div className="">{/* TODO: flex 레이아웃 */}
            <div className="">
              {/* ─── [작성자 이름 영역] ──────────────── */}
              <div className="">{/* TODO: 이름, 아바타, 날짜 가로 배치 */}
                {/* 힌트: 이름 첫 글자를 동그란 아바타로 표시 */}
                {/* entry.name.charAt(0) 으로 첫 글자 추출 */}
                <span className="">{/* TODO: 아바타 스타일 */}
                  {entry.name.charAt(0)}
                </span>
                <span className="">{/* TODO: 이름 스타일 */}
                  {entry.name}
                </span>
                {/* ─── [작성 시간] ────────────────────── */}
                {/* 힌트: new Date(entry.createdAt).toLocaleDateString("ko-KR", { ... }) */}
                <time className="">{/* TODO: 시간 스타일 */}
                  {new Date(entry.createdAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>

              {/* ─── [메시지 내용] ────────────────────── */}
              <p className="">{/* TODO: 메시지 스타일 */}
                {entry.message}
              </p>
            </div>

            {/* ─── [삭제 버튼] ────────────────────────── */}
            {/* 힌트: <DeleteButton id={entry.id} /> */}
            {/* TODO: DeleteButton 컴포넌트 렌더링 */}
          </div>
        </li>
      ))}
    </ul>
  );
}
