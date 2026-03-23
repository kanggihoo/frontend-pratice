import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../data/api";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function PokemonList({ onSelect }) {
  const [page, setPage] = useState(0);

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["pokemon-list", page],
    queryFn: () => fetchPokemonList(page),
    placeholderData: (previousData) => previousData, // 페이지 전환 시 이전 데이터 유지
  });

  if (isLoading) {
    return <LoadingSpinner message="포켓몬 목록을 불러오는 중..." />;
  }

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div>
      {/* 상단 정보 */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-purple-300 text-sm">
          총 <span className="text-white font-bold">{data.totalCount}</span>마리의 포켓몬
        </p>
        {isFetching && (
          <span className="text-xs text-purple-400 animate-pulse">
            업데이트 중...
          </span>
        )}
      </div>

      {/* 포켓몬 카드 그리드 */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 transition-opacity duration-200 ${
          isPlaceholderData ? "opacity-60" : "opacity-100"
        }`}
      >
        {data.results.map((pokemon) => {
          const id = extractIdFromUrl(pokemon.url);
          return (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              id={id}
              onClick={() => onSelect(pokemon.name)}
            />
          );
        })}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        page={page}
        hasNextPage={data.hasNextPage && !isPlaceholderData}
        hasPrevPage={data.hasPrevPage}
        onPageChange={setPage}
        isFetching={isFetching}
      />
    </div>
  );
}

// URL에서 포켓몬 ID 추출: "https://pokeapi.co/api/v2/pokemon/25/" → 25
function extractIdFromUrl(url) {
  const segments = url.replace(/\/$/, "").split("/");
  return Number(segments[segments.length - 1]);
}
