import { useState } from "react";
// ─── [useQuery 임포트] ──────────────────────────────────
// @tanstack/react-query에서 useQuery 훅을 import하세요.
// 힌트: import { useQuery } from "@tanstack/react-query";

import { fetchPokemonList } from "../data/api";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function PokemonList({ onSelect }) {
  // ─── [페이지 상태] ────────────────────────────────────
  // 현재 페이지 번호를 관리하는 상태를 선언하세요.
  // 초기값은 0 (첫 번째 페이지)
  // 힌트: const [page, setPage] = useState(0);


  // ─── [useQuery로 포켓몬 목록 조회] ────────────────────
  // useQuery 훅을 사용하여 포켓몬 목록 데이터를 가져오세요.
  //
  // useQuery의 핵심 옵션:
  //   - queryKey: 이 쿼리를 식별하는 고유한 키 (배열 형태)
  //     → page가 바뀌면 다른 쿼리로 인식하므로 키에 page를 포함합니다.
  //     → 예: ["pokemon-list", page]
  //
  //   - queryFn: 실제 데이터를 가져오는 비동기 함수
  //     → 예: () => fetchPokemonList(page)
  //
  //   - placeholderData: 새 데이터를 로드하는 동안 보여줄 임시 데이터
  //     → (previousData) => previousData 로 설정하면
  //       페이지 전환 시 이전 데이터를 유지하여 깜빡임을 방지합니다.
  //
  // useQuery가 반환하는 값들:
  //   - data: 성공적으로 가져온 데이터
  //   - isLoading: 처음 로딩 중인지 (캐시 없음 + 로딩 중)
  //   - isError: 에러 발생 여부
  //   - error: 에러 객체
  //   - isFetching: 백그라운드에서 데이터를 가져오는 중인지
  //   - isPlaceholderData: 현재 보여주는 데이터가 placeholderData인지
  //
  // 힌트:
  // const {
  //   data,
  //   isLoading,
  //   isError,
  //   error,
  //   isFetching,
  //   isPlaceholderData,
  // } = useQuery({
  //   queryKey: ["pokemon-list", page],
  //   queryFn: () => fetchPokemonList(page),
  //   placeholderData: (previousData) => previousData,
  // });


  // ─── [로딩 상태 처리] ─────────────────────────────────
  // isLoading이 true이면 LoadingSpinner를 보여주세요.
  // 힌트: if (isLoading) return <LoadingSpinner message="..." />;


  // ─── [에러 상태 처리] ─────────────────────────────────
  // isError가 true이면 ErrorMessage를 보여주세요.
  // 힌트: if (isError) return <ErrorMessage message={error.message} />;


  return (
    <div>
      {/* ─── [상단 정보] ─────────────────────────────────── */}
      {/* 총 포켓몬 수(data.totalCount)와                        */}
      {/* isFetching 중이면 "업데이트 중..." 텍스트를 표시하세요. */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-purple-300 text-sm">
          총 <span className="text-white font-bold">???</span>마리의 포켓몬
        </p>
      </div>

      {/* ─── [포켓몬 카드 그리드] ────────────────────────── */}
      {/* data.results를 map으로 순회하며 PokemonCard를 렌더링하세요.  */}
      {/*                                                             */}
      {/* 각 pokemon 객체에는 name과 url이 있습니다.                   */}
      {/* url에서 포켓몬 ID를 추출하는 함수(extractIdFromUrl)를        */}
      {/* 아래에 구현해야 합니다.                                      */}
      {/*                                                             */}
      {/* isPlaceholderData일 때 opacity를 낮추면                     */}
      {/* 페이지 전환 중임을 시각적으로 알려줄 수 있습니다.            */}
      {/*                                                             */}
      {/* PokemonCard에 전달할 props:                                  */}
      {/*   - key: pokemon.name                                        */}
      {/*   - name: pokemon.name                                       */}
      {/*   - id: extractIdFromUrl(pokemon.url)                        */}
      {/*   - onClick: () => onSelect(pokemon.name)                    */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <p className="text-purple-300 col-span-full text-center py-10">
          여기에 포켓몬 카드 리스트를 렌더링하세요.
        </p>
      </div>

      {/* ─── [페이지네이션] ──────────────────────────────── */}
      {/* Pagination 컴포넌트를 렌더링하세요.                     */}
      {/* props: page, hasNextPage, hasPrevPage, onPageChange,    */}
      {/*        isFetching                                       */}
      {/* 힌트: hasNextPage에는 data.hasNextPage && !isPlaceholderData */}
      {/*       를 전달하면 placeholderData 상태에서 페이지 이동을     */}
      {/*       막을 수 있습니다.                                      */}
    </div>
  );
}

// ─── [URL에서 ID 추출 함수] ──────────────────────────────
// PokeAPI의 URL 형식: "https://pokeapi.co/api/v2/pokemon/25/"
// 이 URL에서 마지막 숫자(ID)를 추출하는 함수를 작성하세요.
//
// 힌트:
// function extractIdFromUrl(url) {
//   const segments = url.replace(/\/$/, "").split("/");
//   return Number(segments[segments.length - 1]);
// }
