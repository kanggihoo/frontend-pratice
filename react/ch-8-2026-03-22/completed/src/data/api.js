// PokeAPI 기본 URL
const BASE_URL = "https://pokeapi.co/api/v2";

// 한 페이지당 표시할 포켓몬 수
const PAGE_SIZE = 12;

/**
 * 포켓몬 목록 조회 (페이지네이션)
 * @param {number} page - 현재 페이지 (0부터 시작)
 * @returns {{ results: Array, totalCount: number, hasNextPage: boolean, hasPrevPage: boolean }}
 */
export async function fetchPokemonList(page = 0) {
  const offset = page * PAGE_SIZE;
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error("포켓몬 목록을 불러오는데 실패했습니다.");
  }

  const data = await response.json();

  return {
    results: data.results,
    totalCount: data.count,
    hasNextPage: data.next !== null,
    hasPrevPage: data.previous !== null,
  };
}

/**
 * 포켓몬 상세 정보 조회
 * @param {string|number} nameOrId - 포켓몬 이름 또는 ID
 * @returns {Object} 포켓몬 상세 정보
 */
export async function fetchPokemonDetail(nameOrId) {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);

  if (!response.ok) {
    throw new Error(`포켓몬 "${nameOrId}" 정보를 불러오는데 실패했습니다.`);
  }

  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    image:
      data.sprites.other?.["official-artwork"]?.front_default ||
      data.sprites.front_default,
    sprite: data.sprites.front_default,
    types: data.types.map((t) => t.type.name),
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    height: data.height / 10, // dm → m
    weight: data.weight / 10, // hg → kg
    abilities: data.abilities.map((a) => a.ability.name),
  };
}

/**
 * 포켓몬 종(species) 정보 조회 (한글 이름 포함)
 * @param {number} id - 포켓몬 ID
 * @returns {Object} 종 정보
 */
export async function fetchPokemonSpecies(id) {
  const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);

  if (!response.ok) {
    throw new Error("포켓몬 종 정보를 불러오는데 실패했습니다.");
  }

  const data = await response.json();

  const koreanName = data.names.find((n) => n.language.name === "ko");
  const koreanGenus = data.genera.find((g) => g.language.name === "ko");
  const koreanFlavorText = data.flavor_text_entries.find(
    (f) => f.language.name === "ko"
  );

  return {
    id: data.id,
    koreanName: koreanName?.name || data.name,
    genus: koreanGenus?.genus || "",
    flavorText: koreanFlavorText?.flavor_text?.replace(/\n|\f/g, " ") || "",
    color: data.color.name,
    generation: data.generation.name,
  };
}

export { PAGE_SIZE };
