import type { Pokemon, PokeType } from "@/data/pokemon";
import { totalStats } from "@/data/pokemon";
import { ALL_TYPES, effectiveness } from "@/data/typeChart";
import { GYMS, type GymLeader, type Region } from "@/data/gyms";
import { ELITE_FOUR, type EliteMember } from "@/data/eliteFour";

export interface TypeCoverage {
  offensiveTypes: PokeType[];
  defensiveWeaknesses: PokeType[];
  uniqueTeamTypes: PokeType[];
  coverageScore: number;
}

export function analyzeCoverage(team: Pokemon[]): TypeCoverage {
  const teamTypes = new Set<PokeType>(team.flatMap((p) => p.types));

  const offensive: PokeType[] = [];
  for (const t of teamTypes) {
    let hits = 0;
    for (const def of ALL_TYPES) {
      if (effectiveness(t, [def]) > 1) hits++;
    }
    if (hits >= 3) offensive.push(t);
  }

  const weaknesses: PokeType[] = [];
  for (const atk of ALL_TYPES) {
    const allWeak = team.every((p) => effectiveness(atk, p.types) > 1);
    if (allWeak) weaknesses.push(atk);
  }

  const coverageScore = Math.round(
    Math.min(100, offensive.length * 8 + teamTypes.size * 4 - weaknesses.length * 6 + 20),
  );

  return {
    offensiveTypes: offensive,
    defensiveWeaknesses: weaknesses,
    uniqueTeamTypes: Array.from(teamTypes),
    coverageScore: Math.max(0, coverageScore),
  };
}

export interface BattleResult {
  win: boolean;
  matchupScore: number; // precise 0-100 win percentage
  bestPick: string;
}

interface OpponentMon {
  name: string;
  types: PokeType[];
  level: number;
  bst: number;
}

/**
 * Simulate a battle vs a roster.
 * - Player level scales modestly with opponent level (no extra advantage).
 * - For each enemy mon: every team member computes a duel score; the BEST
 *   team member fights. Score blends offense + defense, then is squashed
 *   into a 0..1 win-probability via a sigmoid for precise percentages.
 * - Difficulty knob makes higher-tier battles tougher (Elite Four > Gym).
 */
function simulateBattle(
  team: Pokemon[],
  opponentTeam: OpponentMon[],
  opponentSignatureType: PokeType,
  difficulty = 1.0,
): BattleResult {
  if (team.length === 0) {
    return { win: false, matchupScore: 0, bestPick: "—" };
  }

  const avgEnemyLevel = opponentTeam.reduce((s, e) => s + e.level, 0) / opponentTeam.length;
  // Player team is slightly UNDER the opponent for tougher fights.
  const playerLevel = avgEnemyLevel - 1;

  let totalWinProb = 0;
  const contributions = new Map<string, number>();

  for (const enemy of opponentTeam) {
    let bestScore = -Infinity;
    let bestName = "—";

    for (const mon of team) {
      const offMult = Math.max(...mon.types.map((t) => effectiveness(t, enemy.types)));
      const defMult = effectiveness(opponentSignatureType, mon.types);
      const monBst = totalStats(mon);

      const offense = (monBst / enemy.bst) * offMult * (playerLevel / enemy.level);
      const defense = (monBst / enemy.bst) / Math.max(0.25, defMult);

      const score = offense * 0.65 + defense * 0.35;
      if (score > bestScore) {
        bestScore = score;
        bestName = mon.name;
      }
    }

    // Sigmoid centered at 1.0 (even fight). Steepness 4 → smooth gradient.
    // Difficulty shifts the threshold up (harder fights need higher score).
    const threshold = difficulty;
    const winProb = 1 / (1 + Math.exp(-4 * (bestScore - threshold)));
    totalWinProb += winProb;
    contributions.set(bestName, (contributions.get(bestName) ?? 0) + winProb);
  }

  // Average win probability across the opponent's roster = match win %.
  const avgWinProb = totalWinProb / opponentTeam.length;
  const matchupScore = Math.round(avgWinProb * 100);
  const win = avgWinProb >= 0.5;

  const sorted = Array.from(contributions.entries()).sort((a, b) => b[1] - a[1]);
  const bestPick = sorted[0] && sorted[0][1] > 0.3 ? sorted[0][0] : "None";

  return { win, matchupScore, bestPick };
}

export interface GymResult {
  leader: GymLeader;
  win: boolean;
  matchupScore: number;
  bestPick: string;
}

export function simulateGym(team: Pokemon[], leader: GymLeader): GymResult {
  // Difficulty ramps with average opponent level (later gyms are tougher).
  const avgLvl = leader.team.reduce((s, e) => s + e.level, 0) / leader.team.length;
  const difficulty = 1.0 + Math.min(0.35, avgLvl / 200); // 1.0 → ~1.25
  const r = simulateBattle(team, leader.team, leader.type, difficulty);
  return { leader, ...r };
}

export interface EliteResult {
  member: EliteMember;
  win: boolean;
  matchupScore: number;
  bestPick: string;
}

export interface RegionalLeagueResult {
  region: Region;
  badgesWon: number;
  totalGyms: number;
  qualifiedForElite: boolean;
  eliteResults: EliteResult[];
  champion: boolean;
  gymResults: GymResult[];
}

export interface FullEvaluation {
  totalScore: number;
  rank: "S" | "A" | "B" | "C" | "D" | "F";
  coverage: TypeCoverage;
  gymResults: GymResult[];
  badgesWon: number;
  totalGyms: number;
  regionalResults: RegionalLeagueResult[];
  championships: number; // # of regional championships won
  statTotal: number;
}

/** Evaluate a single region using a single team (the team built for that region). */
export function evaluateRegion(team: Pokemon[], region: Region): RegionalLeagueResult {
  const regionGymResults = GYMS.filter((g) => g.region === region).map((g) =>
    simulateGym(team, g),
  );
  const regionBadges = regionGymResults.filter((r) => r.win).length;
  const totalRegionGyms = regionGymResults.length;
  const qualified = regionBadges === totalRegionGyms && totalRegionGyms > 0;

  const eliteData = ELITE_FOUR.find((e) => e.region === region);
  let eliteResults: EliteResult[] = [];
  let champion = false;

  if (qualified && eliteData) {
    eliteResults = eliteData.members.map((m) => {
      const isChampion = m.title === "Champion";
      const difficulty = isChampion ? 1.45 : 1.3;
      const r = simulateBattle(team, m.team, m.type, difficulty);
      return { member: m, ...r };
    });
    champion = eliteResults.every((r) => r.win);
  }

  return {
    region,
    badgesWon: regionBadges,
    totalGyms: totalRegionGyms,
    qualifiedForElite: qualified,
    eliteResults,
    champion,
    gymResults: regionGymResults,
  };
}

/** Evaluate the full multi-region run. Each region uses its own 6-mon team. */
export function evaluateRegionalRun(
  teamsByRegion: Partial<Record<Region, Pokemon[]>>,
): FullEvaluation {
  const regions: Region[] = ["Kanto", "Johto", "Hoenn", "Sinnoh"];
  const regionalResults: RegionalLeagueResult[] = regions
    .filter((r) => (teamsByRegion[r]?.length ?? 0) > 0)
    .map((r) => evaluateRegion(teamsByRegion[r]!, r));

  const gymResults = regionalResults.flatMap((r) => r.gymResults);
  const badgesWon = gymResults.filter((r) => r.win).length;
  const totalGyms = gymResults.length;

  // Aggregate coverage / stats across the union of every region's roster.
  const seen = new Set<number>();
  const allMons: Pokemon[] = [];
  for (const team of Object.values(teamsByRegion)) {
    if (!team) continue;
    for (const p of team) {
      if (!seen.has(p.id)) {
        seen.add(p.id);
        allMons.push(p);
      }
    }
  }
  const coverage = analyzeCoverage(allMons);
  const statTotal = allMons.reduce((sum, p) => sum + totalStats(p), 0);
  const championships = regionalResults.filter((r) => r.champion).length;

  const badgeRatio = totalGyms > 0 ? badgesWon / totalGyms : 0;
  const totalScore = Math.round(
    statTotal / 10 +
      coverage.coverageScore +
      badgeRatio * 500 +
      championships * 150,
  );

  let rank: FullEvaluation["rank"] = "F";
  if (championships >= 4 && totalScore >= 1100) rank = "S";
  else if (championships >= 2 && totalScore >= 900) rank = "A";
  else if (championships >= 1 || totalScore >= 700) rank = "B";
  else if (totalScore >= 550) rank = "C";
  else if (totalScore >= 400) rank = "D";

  return {
    totalScore,
    rank,
    coverage,
    gymResults,
    badgesWon,
    totalGyms,
    regionalResults,
    championships,
    statTotal,
  };
}

