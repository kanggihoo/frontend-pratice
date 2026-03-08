export default function UserCard({ user, onSelect }) {
  // ─── [이니셜 생성] ──────────────────────────────────────
  // user.name에서 이니셜(첫 글자)을 추출하세요.
  // 예: "Leanne Graham" → "LG"
  //
  // 1. user.name.split(" ")으로 단어 배열 생성
  // 2. .map((n) => n[0])으로 각 단어의 첫 글자 추출
  // 3. .join("")으로 합치기
  // 4. .toUpperCase()로 대문자 변환
  // 5. .slice(0, 2)로 최대 2글자
  const initials = "";

  // 아바타 배경색 (제공됨 — 수정 불필요)
  const colors = [
    "bg-indigo-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500",
    "bg-cyan-500", "bg-violet-500", "bg-pink-500", "bg-teal-500",
    "bg-orange-500", "bg-sky-500",
  ];
  const bgColor = colors[user.id % colors.length];

  return (
    // ─── [카드 컨테이너] ─────────────────────────────────────
    // 1. onClick에 () => onSelect(user.id) 연결
    // 2. 스타일 클래스:
    //    bg-white rounded-xl p-5 shadow-sm border border-slate-100
    //    hover:shadow-md hover:border-indigo-200 transition-all
    //    cursor-pointer group
    <div
      className=""
    >
      <div className="flex items-center gap-4 mb-3">
        {/* ─── [아바타] ──────────────────────────────────── */}
        {/* 원형 아바타에 이니셜을 표시하세요                    */}
        {/* 클래스: w-12 h-12 ${bgColor} rounded-full        */}
        {/*   flex items-center justify-center                */}
        {/*   text-white font-bold text-sm                    */}
        {/* 내용: {initials}                                  */}
        {/*                                                  */}
        {/* 힌트: className에 템플릿 리터럴을 사용하세요        */}
        {/* className={`w-12 h-12 ${bgColor} ...`}            */}
        <div className="">

        </div>

        <div className="flex-1 min-w-0">
          {/* ─── [유저 이름 & 유저네임] ─────────────────── */}
          {/* h3: user.name 표시                              */}
          {/*   클래스: font-semibold text-slate-800 truncate  */}
          {/*   group-hover:text-indigo-600 transition-colors */}
          {/* p: @{user.username} 표시                        */}
          {/*   클래스: text-sm text-slate-500 truncate       */}
          <h3 className="">{user.name}</h3>
          <p className="">@{user.username}</p>
        </div>
      </div>

      {/* ─── [유저 정보 목록] ──────────────────────────────── */}
      {/* 아래 3가지 정보를 표시하세요:                           */}
      {/* 1. 이메일: user.email.toLowerCase()                   */}
      {/* 2. 회사: user.company.name                            */}
      {/* 3. 도시: user.address.city                            */}
      {/*                                                      */}
      {/* 각 항목의 구조:                                       */}
      {/* <div className="flex items-center gap-2">             */}
      {/*   <svg ...아이콘... />                                */}
      {/*   <span className="truncate">{값}</span>             */}
      {/* </div>                                               */}
      {/*                                                      */}
      {/* 아이콘은 생략해도 됩니다. 텍스트만 표시해도 OK!        */}
      <div className="space-y-2 text-sm text-slate-600">

      </div>
    </div>
  );
}
