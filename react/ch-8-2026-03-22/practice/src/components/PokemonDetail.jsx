// ─── [useQuery 임포트] ──────────────────────────────────
// @tanstack/react-query에서 useQuery를 import하세요.

import { fetchPokemonDetail, fetchPokemonSpecies } from "../data/api";
import { TYPE_COLORS } from "./PokemonCard";
import StatBar from "./StatBar";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function PokemonDetail({ name, onBack }) {
  // ─── [포켓몬 기본 정보 쿼리] ──────────────────────────
  // useQuery를 사용하여 포켓몬의 기본 정보를 가져오세요.
  //
  // queryKey: ["pokemon-detail", name]
  //   → name이 바뀌면 다른 포켓몬의 데이터를 가져옵니다.
  //
  // 필요한 반환 값:
  //   - data (pokemon으로 이름 변경): 포켓몬 기본 정보
  //   - isLoading (isLoadingDetail로 이름 변경): 로딩 상태
  //   - isError (isErrorDetail로 이름 변경): 에러 여부
  //   - error (errorDetail로 이름 변경): 에러 객체
  //
  // 힌트:
  // const {
  //   data: pokemon,
  //   isLoading: isLoadingDetail,
  //   isError: isErrorDetail,
  //   error: errorDetail,
  // } = useQuery({
  //   queryKey: ["pokemon-detail", name],
  //   queryFn: () => fetchPokemonDetail(name),
  // });


  // ─── [포켓몬 종 정보 쿼리 (의존적 쿼리)] ─────────────
  // 이 쿼리는 위의 pokemon 데이터가 로드된 후에만 실행되어야 합니다!
  //
  // "의존적 쿼리(Dependent Query)" 패턴:
  //   첫 번째 쿼리의 결과를 두 번째 쿼리에서 사용할 때,
  //   enabled 옵션으로 실행 시점을 제어합니다.
  //
  //   enabled: !!pokemon?.id
  //   → pokemon 데이터가 있고, id가 존재할 때만 이 쿼리를 실행합니다.
  //
  // 힌트:
  // const {
  //   data: species,
  //   isLoading: isLoadingSpecies,
  // } = useQuery({
  //   queryKey: ["pokemon-species", pokemon?.id],
  //   queryFn: () => fetchPokemonSpecies(pokemon.id),
  //   enabled: !!pokemon?.id,
  // });


  // ─── [로딩 상태 처리] ─────────────────────────────────
  // isLoadingDetail이 true이면 LoadingSpinner를 반환하세요.


  // ─── [에러 상태 처리] ─────────────────────────────────
  // isErrorDetail이 true이면 ErrorMessage와 뒤로가기 버튼을 반환하세요.


  // 아래 임시 코드는 useQuery를 구현한 후 삭제하세요.
  return (
    <div className="max-w-2xl mx-auto">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
      >
        <span>&larr;</span>
        <span>목록으로 돌아가기</span>
      </button>

      {/* ─── [상세 카드] ─────────────────────────────────── */}
      {/* useQuery 구현 후, 아래 placeholder를 실제 데이터로    */}
      {/* 교체하세요. completed 코드를 참고하세요.              */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-purple-500/20 rounded-3xl overflow-hidden">
        {/* 상단: 이미지 + 기본 정보 */}
        <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* ─── [포켓몬 이미지] ─────────────────────────── */}
            {/* pokemon.image를 src로 사용하세요.                 */}
            <div className="relative">
              <div className="w-48 h-48 bg-purple-500/10 rounded-full flex items-center justify-center">
                <p className="text-purple-400 text-sm">이미지</p>
              </div>
            </div>

            {/* ─── [기본 정보 영역] ────────────────────────── */}
            {/* pokemon.id, displayName, species?.genus,          */}
            {/* pokemon.types, pokemon.height, pokemon.weight을   */}
            {/* 표시하세요.                                       */}
            <div className="text-center sm:text-left">
              <span className="text-purple-400 font-mono text-sm">#???</span>
              <h2 className="text-3xl font-bold text-white mt-1">???</h2>

              {/* ─── [타입 배지] ───────────────────────────── */}
              {/* pokemon.types를 map으로 순회하며 타입 배지를 표시하세요. */}
              {/* TYPE_COLORS 객체를 사용하여 타입별 색상을 적용합니다.    */}
              <div className="flex gap-2 mt-3 justify-center sm:justify-start">
                <span className="text-purple-400 text-sm">타입을 표시하세요</span>
              </div>

              {/* 신체 정보 */}
              <div className="flex gap-6 mt-4 text-sm justify-center sm:justify-start">
                <div>
                  <span className="text-purple-400">키</span>
                  <span className="text-white ml-2">?m</span>
                </div>
                <div>
                  <span className="text-purple-400">몸무게</span>
                  <span className="text-white ml-2">?kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단: 상세 정보 */}
        <div className="p-8 space-y-8">
          {/* ─── [설명 (species 데이터)] ──────────────────── */}
          {/* species?.flavorText가 있으면 표시하세요.             */}

          {/* ─── [특성] ──────────────────────────────────── */}
          {/* pokemon.abilities를 map으로 순회하며 표시하세요.     */}
          <div>
            <h3 className="text-purple-400 text-sm font-semibold uppercase tracking-wider mb-2">
              특성
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-400 text-sm">특성을 표시하세요</span>
            </div>
          </div>

          {/* ─── [능력치] ────────────────────────────────── */}
          {/* pokemon.stats를 map으로 순회하며 StatBar 컴포넌트를   */}
          {/* 렌더링하세요.                                         */}
          {/* StatBar props: name(stat.name), value(stat.value)     */}
          <div>
            <h3 className="text-purple-400 text-sm font-semibold uppercase tracking-wider mb-3">
              능력치
            </h3>
            <div className="space-y-3">
              <p className="text-gray-400 text-sm">능력치 바를 표시하세요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
