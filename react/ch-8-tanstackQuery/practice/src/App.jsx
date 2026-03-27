import { useState } from "react";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";

export default function App() {
  // ─── [선택된 포켓몬 상태] ──────────────────────────────
  // 현재 선택된 포켓몬의 이름을 저장하는 상태를 선언하세요.
  // 초기값은 null (아무것도 선택하지 않은 상태)
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      {/* 헤더 */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-full border-2 border-white shadow-lg shadow-red-500/30 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              포켓몬 도감
            </h1>
            <p className="text-sm text-purple-300">
              TanStack Query로 만드는 포켓몬 백과사전
            </p>
          </div>
        </div>
      </header>

      {/* ─── [조건부 렌더링] ──────────────────────────────── */}
      {/* selectedPokemon이 있으면 PokemonDetail을,                */}
      {/* 없으면 PokemonList를 렌더링하세요.                        */}
      {/*                                                          */}
      {/* PokemonDetail에 전달할 props:                             */}
      {/*   - name: 선택된 포켓몬 이름                              */}
      {/*   - onBack: 선택을 초기화하는 함수 (null로 설정)          */}
      {/*                                                          */}
      {/* PokemonList에 전달할 props:                               */}
      {/*   - onSelect: 포켓몬을 선택하는 함수 (setSelectedPokemon) */}
      {/*                                                          */}
      {/* 힌트:                                                    */}
      {/* {selectedPokemon ? (                                     */}
      {/*   <PokemonDetail name={...} onBack={() => ...} />        */}
      {/* ) : (                                                    */}
      {/*   <PokemonList onSelect={...} />                         */}
      {/* )}                                                       */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-purple-300 text-center">
          {selectedPokemon ? (
            <PokemonDetail
              name={selectedPokemon}
              onBack={() => setSelectedPokemon(null)}
            />
          ) : (
            <PokemonList onSelect={setSelectedPokemon} />
          )}
        </p>
      </main>
    </div>
  );
}
