import { POKEMON, type Pokemon } from "@/data/pokemon";
import type { Region } from "@/data/gyms";

const TIER_WEIGHTS: Record<Pokemon["tier"], number> = {
  Common: 60,
  Rare: 30,
  Epic: 9,
  Legendary: 1,
};

export function generationOf(id: number): 1 | 2 | 3 | 4 {
  if (id <= 151) return 1;
  if (id <= 251) return 2;
  if (id <= 386) return 3;
  return 4;
}

export const REGION_TO_GEN: Record<Region, 1 | 2 | 3 | 4> = {
  Kanto: 1,
  Johto: 2,
  Hoenn: 3,
  Sinnoh: 4,
};

export function pokemonForRegion(region: Region): Pokemon[] {
  const gen = REGION_TO_GEN[region];
  return POKEMON.filter((p) => generationOf(p.id) === gen);
}

function weightedPick(pool: Pokemon[]): Pokemon {
  const weights = pool.map((p) => TIER_WEIGHTS[p.tier]);
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

/**
 * Draw `count` random Pokémon from a given pool, excluding given ids.
 */
export function getRandomChoicesFromPool(
  pool: Pokemon[],
  exclude: number[] = [],
  count = 3,
): Pokemon[] {
  const filtered = pool.filter((p) => !exclude.includes(p.id));
  const picks: Pokemon[] = [];
  const used = new Set<number>();
  let safety = 0;
  while (picks.length < count && safety < 200) {
    const remaining = filtered.filter((p) => !used.has(p.id));
    if (remaining.length === 0) break;
    const candidate = weightedPick(remaining);
    used.add(candidate.id);
    picks.push(candidate);
    safety++;
  }
  return picks;
}

/** Legacy: any-region pool. Kept for backwards compatibility. */
export function getRandomChoices(exclude: number[] = [], count = 3): Pokemon[] {
  return getRandomChoicesFromPool(POKEMON, exclude, count);
}
