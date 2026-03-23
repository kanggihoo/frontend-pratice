import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetail, fetchPokemonSpecies } from "../data/api";
import { TYPE_COLORS } from "./PokemonCard";
import StatBar from "./StatBar";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function PokemonDetail({ name, onBack }) {
  // 포켓몬 기본 정보 쿼리
  const {
    data: pokemon,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
    error: errorDetail,
  } = useQuery({
    queryKey: ["pokemon-detail", name],
    queryFn: () => fetchPokemonDetail(name),
  });

  // 포켓몬 종 정보 쿼리 (한글 이름, 설명 등)
  // pokemon 데이터가 로드된 후에만 실행 (enabled 옵션)
  const {
    data: species,
    isLoading: isLoadingSpecies,
  } = useQuery({
    queryKey: ["pokemon-species", pokemon?.id],
    queryFn: () => fetchPokemonSpecies(pokemon.id),
    enabled: !!pokemon?.id, // pokemon 데이터가 있을 때만 실행
  });

  if (isLoadingDetail) {
    return <LoadingSpinner message="포켓몬 정보를 불러오는 중..." />;
  }

  if (isErrorDetail) {
    return (
      <div>
        <ErrorMessage message={errorDetail.message} />
        <button
          onClick={onBack}
          className="mt-4 text-purple-400 hover:text-purple-300 cursor-pointer"
        >
          &larr; 목록으로
        </button>
      </div>
    );
  }

  const displayName = species?.koreanName || pokemon.name;

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

      {/* 상세 카드 */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-purple-500/20 rounded-3xl overflow-hidden">
        {/* 상단: 이미지 + 기본 정보 */}
        <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* 포켓몬 이미지 */}
            <div className="relative">
              <div className="w-48 h-48 bg-purple-500/10 rounded-full flex items-center justify-center">
                <img
                  src={pokemon.image}
                  alt={displayName}
                  className="w-40 h-40 object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* 기본 정보 */}
            <div className="text-center sm:text-left">
              <span className="text-purple-400 font-mono text-sm">
                #{String(pokemon.id).padStart(3, "0")}
              </span>
              <h2 className="text-3xl font-bold text-white mt-1">
                {displayName}
              </h2>
              {isLoadingSpecies ? (
                <p className="text-purple-400 text-sm mt-1 animate-pulse">
                  정보 로딩 중...
                </p>
              ) : (
                species?.genus && (
                  <p className="text-purple-300 text-sm mt-1">{species.genus}</p>
                )
              )}

              {/* 타입 배지 */}
              <div className="flex gap-2 mt-3 justify-center sm:justify-start">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={`${TYPE_COLORS[type] || "bg-gray-500"} text-white text-xs font-medium px-3 py-1 rounded-full capitalize`}
                  >
                    {type}
                  </span>
                ))}
              </div>

              {/* 신체 정보 */}
              <div className="flex gap-6 mt-4 text-sm justify-center sm:justify-start">
                <div>
                  <span className="text-purple-400">키</span>
                  <span className="text-white ml-2">{pokemon.height}m</span>
                </div>
                <div>
                  <span className="text-purple-400">몸무게</span>
                  <span className="text-white ml-2">{pokemon.weight}kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단: 상세 정보 */}
        <div className="p-8 space-y-8">
          {/* 설명 */}
          {species?.flavorText && (
            <div>
              <h3 className="text-purple-400 text-sm font-semibold uppercase tracking-wider mb-2">
                설명
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {species.flavorText}
              </p>
            </div>
          )}

          {/* 특성 */}
          <div>
            <h3 className="text-purple-400 text-sm font-semibold uppercase tracking-wider mb-2">
              특성
            </h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) => (
                <span
                  key={ability}
                  className="bg-slate-700/50 text-gray-300 text-sm px-3 py-1 rounded-lg capitalize"
                >
                  {ability}
                </span>
              ))}
            </div>
          </div>

          {/* 능력치 */}
          <div>
            <h3 className="text-purple-400 text-sm font-semibold uppercase tracking-wider mb-3">
              능력치
            </h3>
            <div className="space-y-3">
              {pokemon.stats.map((stat) => (
                <StatBar
                  key={stat.name}
                  name={stat.name}
                  value={stat.value}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
