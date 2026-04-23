import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Pokemon } from "@/data/pokemon";
import type { Region } from "@/data/gyms";
import { DraftBoard } from "@/components/DraftBoard";
import { TeamDisplay } from "@/components/TeamDisplay";
import { ResultScreen } from "@/components/ResultScreen";
import { CarryOverScreen } from "@/components/CarryOverScreen";
import { Button } from "@/components/ui/button";
import { pokemonForRegion } from "@/utils/randomizer";
import { evaluateRegion, evaluateRegionalRun } from "@/utils/evaluator";
import jnLogo from "@/assets/jn-komban-logo.png";
import { Crown, ArrowRight } from "lucide-react";

const TEAM_SIZE = 6;
const REGIONS: Region[] = ["Kanto", "Johto", "Hoenn", "Sinnoh"];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "PokéDraft — Build a 6-Mon Team & Conquer Every Region" },
      {
        name: "description",
        content:
          "Draft a 6-Pokémon team for each region (Kanto → Johto → Hoenn → Sinnoh). Carry favorites forward and battle every gym + Elite Four.",
      },
      { property: "og:title", content: "PokéDraft — Roguelike Pokémon Team Builder" },
      {
        property: "og:description",
        content: "Per-region drafts. Carry forward your champions. Win all four leagues.",
      },
    ],
  }),
});

type Phase = "intro" | "carry" | "drafting" | "regionResult" | "finalResult";

function Index() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [regionIndex, setRegionIndex] = useState(0);
  // The team being built / used for the CURRENT region.
  const [team, setTeam] = useState<Pokemon[]>([]);
  // Map of completed teams per region (used at the very end to score everything).
  const [teamsByRegion, setTeamsByRegion] = useState<Partial<Record<Region, Pokemon[]>>>({});
  // Pool of Pokémon the player has owned across previous regions (for carry-over).
  const [carryPool, setCarryPool] = useState<Pokemon[]>([]);

  const currentRegion = REGIONS[regionIndex];
  const regionPool = useMemo(() => pokemonForRegion(currentRegion), [currentRegion]);

  function startRun() {
    setRegionIndex(0);
    setTeam([]);
    setTeamsByRegion({});
    setCarryPool([]);
    setPhase("drafting");
  }

  function handlePick(p: Pokemon) {
    const next = [...team, p];
    setTeam(next);
    if (next.length >= TEAM_SIZE) {
      // Lock in this region's team and score it.
      setTeamsByRegion((prev) => ({ ...prev, [currentRegion]: next }));
      setTimeout(() => setPhase("regionResult"), 500);
    }
  }

  function continueAfterRegion() {
    const isLast = regionIndex >= REGIONS.length - 1;
    if (isLast) {
      setPhase("finalResult");
      return;
    }
    // Update carry-pool with the current team's Pokémon, dedup by id.
    setCarryPool((prev) => {
      const seen = new Set(prev.map((p) => p.id));
      const merged = [...prev];
      for (const p of team) {
        if (!seen.has(p.id)) {
          merged.push(p);
          seen.add(p.id);
        }
      }
      return merged;
    });
    setRegionIndex((i) => i + 1);
    setTeam([]);
    setPhase("carry");
  }

  function handleCarryConfirm(carried: Pokemon[]) {
    setTeam(carried);
    if (carried.length >= TEAM_SIZE) {
      // Edge case — full carry, no drafting needed.
      setTeamsByRegion((prev) => ({ ...prev, [currentRegion]: carried }));
      setTimeout(() => setPhase("regionResult"), 300);
    } else {
      setPhase("drafting");
    }
  }

  function reset() {
    setTeam([]);
    setTeamsByRegion({});
    setCarryPool([]);
    setRegionIndex(0);
    setPhase("intro");
  }

  // Final evaluation across every played region.
  const finalEvaluation = useMemo(() => {
    if (phase !== "finalResult") return null;
    return evaluateRegionalRun(teamsByRegion);
  }, [phase, teamsByRegion]);

  const allTeamMembers = useMemo(() => {
    const seen = new Set<number>();
    const out: Pokemon[] = [];
    for (const t of Object.values(teamsByRegion)) {
      if (!t) continue;
      for (const p of t) {
        if (!seen.has(p.id)) {
          seen.add(p.id);
          out.push(p);
        }
      }
    }
    return out;
  }, [teamsByRegion]);

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full pokeball-bg shadow-lg" />
            <div>
              <h1 className="text-display text-base sm:text-lg text-foreground">
                Poké<span className="text-accent">Draft</span>
              </h1>
              <p className="text-[11px] text-muted-foreground">
                Per-region drafts · 4 leagues
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {phase !== "intro" && (
              <Button variant="ghost" size="sm" onClick={reset}>
                Restart
              </Button>
            )}
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 backdrop-blur">
              <img
                src={jnLogo}
                alt="JN Komban logo"
                width={32}
                height={32}
                loading="lazy"
                className="h-8 w-8 object-contain"
              />
              <div className="leading-tight">
                <div className="text-display text-[10px] text-muted-foreground">by</div>
                <div className="text-display text-xs text-foreground">JN Komban</div>
              </div>
            </div>
          </div>
        </header>

        {/* Region progress bar */}
        {phase !== "intro" && phase !== "finalResult" && (
          <RegionProgress currentRegion={currentRegion} />
        )}

        {phase === "intro" && <Intro onStart={startRun} />}

        {phase === "carry" && (
          <CarryOverScreen
            previousPokemon={carryPool}
            nextRegion={currentRegion}
            maxCarry={TEAM_SIZE}
            onConfirm={handleCarryConfirm}
          />
        )}

        {phase === "drafting" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <TeamDisplay team={team} maxSize={TEAM_SIZE} />
            {team.length < TEAM_SIZE && (
              <DraftBoard
                team={team}
                maxSize={TEAM_SIZE}
                pool={regionPool}
                regionLabel={currentRegion}
                picksMade={team.length}
                picksNeeded={TEAM_SIZE}
                onPick={handlePick}
              />
            )}
          </motion.div>
        )}

        {phase === "regionResult" && (
          <RegionResult
            team={team}
            region={currentRegion}
            isLast={regionIndex >= REGIONS.length - 1}
            onContinue={continueAfterRegion}
          />
        )}

        {phase === "finalResult" && finalEvaluation && (
          <ResultScreen
            evaluation={finalEvaluation}
            allTeamMembers={allTeamMembers}
            onReset={reset}
          />
        )}

        <footer className="mt-16 text-center text-[11px] text-muted-foreground">
          Built with TanStack Start · Sprites © Nintendo / Game Freak
        </footer>
      </div>
    </main>
  );
}

function RegionProgress({ currentRegion }: { currentRegion: Region }) {
  const currentIdx = REGIONS.indexOf(currentRegion);
  return (
    <div className="mb-6 flex items-center justify-center gap-1.5 sm:gap-3 text-[11px] sm:text-xs">
      {REGIONS.map((r, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={r} className="flex items-center gap-1.5 sm:gap-3">
            <span
              className={
                "px-2.5 py-1 rounded-full font-bold tracking-wide " +
                (active
                  ? "bg-accent text-accent-foreground"
                  : done
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-card/60 text-muted-foreground border border-border/60")
              }
            >
              {r}
            </span>
            {i < REGIONS.length - 1 && (
              <ArrowRight className="h-3 w-3 text-muted-foreground/60" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function RegionResult({
  team,
  region,
  isLast,
  onContinue,
}: {
  team: Pokemon[];
  region: Region;
  isLast: boolean;
  onContinue: () => void;
}) {
  const result = useMemo(() => evaluateRegion(team, region), [team, region]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <p className="text-display text-xs text-accent mb-2">{region} League Results</p>
        <h2 className="text-display text-2xl sm:text-3xl text-foreground">
          {result.champion ? (
            <span className="inline-flex items-center gap-2 text-amber-400">
              <Crown className="h-7 w-7" /> {region} Champion!
            </span>
          ) : result.qualifiedForElite ? (
            <>Elite Four Run Complete</>
          ) : (
            <>{result.badgesWon} / {result.totalGyms} Badges</>
          )}
        </h2>
      </div>

      <div className="rounded-2xl border-2 border-border/60 bg-card/60 p-5 backdrop-blur">
        <h3 className="text-display text-xs text-accent mb-3">{region} Gym Battles</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {result.gymResults.map((r) => (
            <div
              key={r.leader.name}
              className={
                "flex items-center justify-between rounded-lg border-l-4 px-3 py-2 " +
                (r.win
                  ? "border-l-emerald-400 bg-emerald-500/10"
                  : "border-l-red-400 bg-red-500/10")
              }
            >
              <div>
                <div className="text-sm font-bold text-foreground">{r.leader.name}</div>
                <div className="text-[11px] text-muted-foreground">
                  {r.leader.city} ·{" "}
                  <span
                    className={
                      "type-" +
                      r.leader.type +
                      " px-1.5 py-0.5 rounded text-[9px] uppercase font-bold"
                    }
                  >
                    {r.leader.type}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={
                    "text-xs font-bold " +
                    (r.win ? "text-emerald-400" : "text-red-400")
                  }
                >
                  {r.win ? "WIN" : "LOSS"} {r.matchupScore}%
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {r.bestPick !== "None" ? `MVP: ${r.bestPick}` : "Outmatched"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {result.qualifiedForElite && (
          <div className="mt-5 border-t border-border/60 pt-4">
            <h4 className="text-display text-[11px] tracking-widest text-foreground/80 mb-3">
              Elite Four & Champion
            </h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {result.eliteResults.map((r) => (
                <div
                  key={r.member.name}
                  className={
                    "flex items-center justify-between rounded-lg border-l-4 px-3 py-2 " +
                    (r.member.title === "Champion"
                      ? r.win
                        ? "border-l-amber-400 bg-amber-500/15"
                        : "border-l-rose-500 bg-rose-500/15"
                      : r.win
                        ? "border-l-emerald-400 bg-emerald-500/10"
                        : "border-l-red-400 bg-red-500/10")
                  }
                >
                  <div>
                    <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      {r.member.title === "Champion" && (
                        <Crown className="h-3.5 w-3.5 text-amber-400" />
                      )}
                      {r.member.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {r.member.title}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={
                        "text-xs font-bold " +
                        (r.win ? "text-emerald-400" : "text-red-400")
                      }
                    >
                      {r.win ? "WIN" : "LOSS"} {r.matchupScore}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!result.qualifiedForElite && (
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Did not sweep all {result.totalGyms} {region} gyms — Elite Four entry denied.
          </p>
        )}
      </div>

      <div className="flex justify-center">
        <Button onClick={onContinue} size="lg" className="gap-2">
          {isLast ? "See Final Verdict" : `Continue to ${REGIONS[REGIONS.indexOf(region) + 1]}`}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl py-12 text-center"
    >
      <motion.div
        animate={{ rotate: [0, -8, 8, -8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        className="mx-auto mb-6 h-24 w-24 rounded-full pokeball-bg shadow-2xl"
      />
      <h2 className="text-display text-2xl sm:text-4xl text-foreground leading-relaxed">
        Conquer <span className="text-accent">Four Regions</span>
      </h2>
      <p className="mt-6 text-base text-muted-foreground leading-relaxed">
        Draft a fresh <strong className="text-foreground">6-Pokémon team</strong> for each
        region. Between leagues, carry favorites forward and fill the rest from the new
        region's natives.
      </p>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
        {REGIONS.map((r) => (
          <div
            key={r}
            className="rounded-xl border border-border/60 bg-card/60 p-3 backdrop-blur"
          >
            <div className="text-display text-[10px] text-accent">{r}</div>
            <div className="mt-1 text-xs text-muted-foreground">6-mon draft</div>
          </div>
        ))}
      </div>

      <Button onClick={onStart} size="lg" className="mt-10 text-base px-8 py-6">
        Start in Kanto →
      </Button>
    </motion.div>
  );
}
