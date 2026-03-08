import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function UserDetail({ userId, apiBaseUrl, onBack }) {
  // ─── [상태 선언] ───────────────────────────────────────
  // 4개의 상태를 선언하세요:
  // 1. user: 유저 상세 정보 객체 (초기값: null)
  // 2. posts: 유저의 게시물 배열 (초기값: [])
  // 3. loading: 로딩 여부 (초기값: true)
  // 4. error: 에러 메시지 (초기값: null)


  // ─── [useEffect: 유저 상세 + 게시물 동시 가져오기] ──────────
  // 이 useEffect에서는 두 가지 고급 패턴을 학습합니다:
  //
  // ★ 패턴 1: AbortController (cleanup에서 요청 취소)
  //   - const controller = new AbortController();
  //   - fetch(..., { signal: controller.signal })
  //   - cleanup: controller.abort();
  //   → 컴포넌트가 언마운트되거나 userId가 바뀌면 이전 요청을 취소합니다.
  //   → 이렇게 하지 않으면 이전 요청의 응답이 늦게 도착하여 잘못된 데이터가
  //     표시될 수 있습니다!
  //
  // ★ 패턴 2: Promise.all (여러 API 동시 호출)
  //   - const [userRes, postsRes] = await Promise.all([
  //       fetch(`${apiBaseUrl}/users/${userId}`, { signal: controller.signal }),
  //       fetch(`${apiBaseUrl}/users/${userId}/posts`, { signal: controller.signal }),
  //     ]);
  //   → 두 요청을 병렬로 보내서 응답 시간을 단축합니다.
  //
  // 전체 구조:
  //   useEffect(() => {
  //     const controller = new AbortController();
  //
  //     const fetchUserDetail = async () => {
  //       try {
  //         setLoading(true);
  //         setError(null);
  //         // Promise.all로 두 API 동시 호출
  //         // 응답 확인 (!userRes.ok || !postsRes.ok → throw Error)
  //         // JSON 파싱: const userData = await userRes.json();
  //         // 상태 업데이트: setUser(userData), setPosts(postsData)
  //       } catch (err) {
  //         // ★ AbortError는 무시해야 합니다! (정상적인 취소이므로)
  //         if (err.name !== "AbortError") {
  //           setError(err.message);
  //         }
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //
  //     fetchUserDetail();
  //
  //     // ★ cleanup 함수: 이전 요청 취소
  //     return () => { controller.abort(); };
  //   }, [userId, apiBaseUrl]);


  // ─── [조건부 반환] ──────────────────────────────────────
  // 상태에 따라 다른 컴포넌트를 반환하세요:
  // 1. loading이 true이면 → return <LoadingSpinner />;
  // 2. error가 있으면 → return <ErrorMessage message={error} />;
  // 3. user가 null이면 → return null;


  return (
    <div>
      {/* ─── [뒤로가기 버튼] ──────────────────────────────── */}
      {/* onClick에 onBack을 연결하세요                         */}
      {/* 클래스: flex items-center gap-2 text-slate-600        */}
      {/*   hover:text-indigo-600 mb-6 transition-colors       */}
      <button
        className=""
      >
        ← 목록으로 돌아가기
      </button>

      {/* ─── [유저 정보 카드] ──────────────────────────────── */}
      {/* 클래스: bg-white rounded-xl shadow-sm border           */}
      {/*   border-slate-100 p-6 mb-6                          */}
      <div className="">
        <div className="flex items-start gap-5">
          {/* 아바타: 이니셜 표시 (UserCard와 동일 로직) */}
          <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
            {/* ─── user.name에서 이니셜 추출 ─── */}
          </div>
          <div className="flex-1">
            {/* ─── [유저 이름 & 유저네임 표시] ─── */}
            {/* h2: user.name (text-xl font-bold text-slate-800) */}
            {/* p: @{user.username} (text-slate-500) */}
          </div>
        </div>

        {/* ─── [상세 정보 그리드] ──────────────────────────── */}
        {/* 아래 정보들을 표시하세요:                              */}
        {/* - 이메일: user.email.toLowerCase()                   */}
        {/* - 전화: user.phone                                  */}
        {/* - 웹사이트: user.website                             */}
        {/* - 회사: user.company.name                            */}
        {/* - 주소: user.address.street, suite, city 조합        */}
        {/* - 사업 분야: user.company.catchPhrase                */}
        {/*                                                    */}
        {/* 그리드 클래스: grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

        </div>
      </div>

      {/* ─── [게시물 목록] ─────────────────────────────────── */}
      {/* 1. 제목: "작성한 게시물 ({posts.length}개)"            */}
      {/* 2. posts.map()으로 각 게시물 렌더링:                   */}
      {/*    - key={post.id}                                   */}
      {/*    - post.title (capitalize 클래스로 첫 글자 대문자)   */}
      {/*    - post.body (line-clamp-2로 2줄 제한)              */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          {/* 작성한 게시물 ({posts.length}개) */}
        </h3>
        <div className="space-y-3">
          {/* ─── posts.map()으로 게시물 카드 렌더링 ─── */}
        </div>
      </div>
    </div>
  );
}
