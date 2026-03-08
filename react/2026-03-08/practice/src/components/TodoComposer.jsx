// ─── [Props 받기] ────────────────────────────────
// 부모(App)에서 아래 props를 내려줍니다.
// - form: 입력 폼 객체 { title, category, priority, dueDate }
// - categoryOptions: 카테고리 배열
// - priorityOptions: 우선순위 배열
// - onFieldChange: 입력값 변경 함수
// - onSubmit: 폼 제출 함수

export default function TodoComposer() {
  return (
    // ─── [섹션 박스 스타일링] ────────────────────────
    // rounded-[28px] bg-slate-900 p-6 text-white shadow-xl shadow-slate-900/10
    <section>
      {/* ─── [제목 영역] ─────────────────────────────── */}
      {/* 소제목, 큰 제목, 설명 문장을 배치하세요. */}
      <div>
        <p>Add Todo</p>
        <h2>새로운 할 일을 추가해 보세요</h2>
        <p>폼 객체 상태를 한 번에 관리하는 컴포넌트입니다.</p>
      </div>

      {/* ─── [폼 구성] ──────────────────────────────── */}
      {/* <form onSubmit={onSubmit}> 형태로 구성하세요.
          추천 레이아웃:
          grid gap-4 lg:grid-cols-[2fr_1fr_1fr_auto]
      */}
      <form>
        {/* ─── [제목 input] ─────────────────────────── */}
        {/* value={form.title}
            onChange={(event) => onFieldChange("title", event.target.value)}
            placeholder="예: 컴포넌트 분리 기준 정리하기"
        */}
        <label>
          <span>할 일 제목</span>
          <input type="text" placeholder="제목 입력 로직을 연결하세요" />
        </label>

        {/* ─── [카테고리 select] ────────────────────── */}
        {/* categoryOptions 배열을 map()으로 순회하며 option을 렌더링하세요.
            value와 onChange를 form.category에 연결합니다. */}
        <label>
          <span>카테고리</span>
          <select>
            <option>카테고리 옵션을 map()으로 렌더링하세요</option>
          </select>
        </label>

        {/* ─── [우선순위 / 마감일] ───────────────────── */}
        {/* priorityOptions 배열도 map()으로 option을 만드세요.
            dueDate는 type="date" input으로 연결합니다. */}
        <div>
          <label>
            <span>우선순위</span>
            <select>
              <option>우선순위 옵션을 렌더링하세요</option>
            </select>
          </label>

          <label>
            <span>마감일</span>
            <input type="date" />
          </label>
        </div>

        {/* ─── [제출 버튼] ──────────────────────────── */}
        {/* type="submit" 버튼을 추가하고, 시각적으로 눈에 띄게 스타일링하세요. */}
        <button type="submit">할 일 추가</button>
      </form>
    </section>
  );
}
