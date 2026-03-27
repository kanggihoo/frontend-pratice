import { useQuery } from "@tanstack/react-query";
import { fetchPokemonSpecies } from "../data/api";

const TYPE_COLORS = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-amber-600",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  steel: "bg-gray-400",
  fairy: "bg-pink-300",
};

export default function PokemonCard({ name, id, onClick }) {
  // 포켓몬 한글 이름을 가져오기 위해 species 쿼리 사용
  // enabled 옵션으로 id가 있을 때만 실행
  const { data: species } = useQuery({
    queryKey: ["pokemon-species", id],
    queryFn: () => fetchPokemonSpecies(id),
    enabled: !!id,
  });

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const displayName = species?.koreanName || name;

  return (
    <button
      onClick={onClick}
      className="group bg-slate-800/60 backdrop-blur-sm border border-purple-500/10 rounded-2xl p-4 hover:border-purple-400/40 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer text-left"
    >
      {/* 포켓몬 번호 */}
      <span className="text-xs text-purple-400/60 font-mono">
        #{String(id).padStart(3, "0")}
      </span>

      {/* 포켓몬 이미지 */}
      <div className="relative w-full aspect-square mb-2 flex items-center justify-center">
        <div className="absolute inset-0 bg-purple-500/5 rounded-full scale-75 group-hover:scale-90 transition-transform duration-300" />
        <img
          src={imageUrl}
          alt={displayName}
          className="relative w-4/5 h-4/5 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* 포켓몬 이름 */}
      <p className="text-white text-sm font-medium text-center truncate">
        {displayName}
      </p>
    </button>
  );
}

export { TYPE_COLORS };
