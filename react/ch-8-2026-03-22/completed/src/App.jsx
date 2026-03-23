import { useState } from "react";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";

export default function App() {
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

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {selectedPokemon ? (
          <PokemonDetail
            name={selectedPokemon}
            onBack={() => setSelectedPokemon(null)}
          />
        ) : (
          <PokemonList onSelect={setSelectedPokemon} />
        )}
      </main>
    </div>
  );
}
