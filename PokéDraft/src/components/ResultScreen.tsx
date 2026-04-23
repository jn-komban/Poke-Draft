import { motion } from "framer-motion";
import type { Pokemon } from "@/data/pokemon";
import { spriteUrl } from "@/data/pokemon";
import type { FullEvaluation, RegionalLeagueResult } from "@/utils/evaluator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trophy, Shield, Swords, RotateCcw, Crown, Lock } from "lucide-react";

interface Props {
  /** Pre-computed evaluation across all played regions. */
  evaluation: FullEvaluation;
  /** Union of every Pokémon used across all regions (for the showcase). */
  allTeamMembers: Pokemon[];
  onReset: () => void;
}

const RANK_STYLES: Record<string, string> = {
  S: "from-amber-400 via-yellow-300 to-orange-500 text-amber-950",
  A: "from-fuchsia-500 via-purple-500 to-indigo-500 text-white",
  B: "from-blue-500 to-cyan-500 text-white",
  C: "from-emerald-500 to-teal-500 text-white",
  D: "from-slate-500 to-slate-700 text-white",
  F: "from-red-700 to-rose-900 text-white",
};

export function ResultScreen({ evaluation, allTeamMembers, onReset }: Props) {
  const evalResult = evaluation;
  const team = allTeamMembers;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-center"
      >
        <p className="text-display text-xs text-accent mb-2">League Evaluation</p>
        <div
          className={cn(
            "inline-flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br p-6 shadow-2xl",
            RANK_STYLES[evalResult.rank],
          )}
        >
          <div className="text-display text-xs opacity-80">Rank</div>
          <div className="text-display text-7xl font-black drop-shadow-lg">
            {evalResult.rank}
          </div>
          <div className="text-sm font-bold opacity-90">
            Score: {evalResult.totalScore}
          </div>
        </div>

        {evalResult.championships > 0 ? (
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 inline-flex items-center gap-2 text-lg font-bold"
            style={{ color: "var(--victory)" }}
          >
            <Crown className="h-5 w-5" />
            Champion of {evalResult.championships} region
            {evalResult.championships > 1 ? "s" : ""}!
          </motion.p>
        ) : (
          <p className="mt-4 text-muted-foreground">
            No regional championships yet. Sweep every gym in a region to challenge the Elite Four!
          </p>
        )}
      </motion.div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatTile
          icon={<Trophy className="h-5 w-5" />}
          label="Badges Won"
          value={`${evalResult.badgesWon} / ${evalResult.totalGyms}`}
          accent
        />
        <StatTile
          icon={<Crown className="h-5 w-5" />}
          label="Championships"
          value={`${evalResult.championships} / 4`}
        />
        <StatTile
          icon={<Swords className="h-5 w-5" />}
          label="Type Coverage"
          value={`${evalResult.coverage.coverageScore}%`}
        />
        <StatTile
          icon={<Shield className="h-5 w-5" />}
          label="Total Base Stats"
          value={evalResult.statTotal.toString()}
        />
      </div>

      {/* Region by region: gyms + elite four */}
      <div className="space-y-5">
        {evalResult.regionalResults.map((region) => (
          <RegionBlock key={region.region} region={region} />
        ))}
      </div>

      {/* Coverage detail */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-border/60 bg-card/60 p-5 backdrop-blur">
          <h3 className="text-display text-xs text-accent mb-3">Offensive Coverage</h3>
          {evalResult.coverage.offensiveTypes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No strong offensive types.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {evalResult.coverage.offensiveTypes.map((t) => (
                <span key={t} className={"type-" + t + " text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border-2 border-border/60 bg-card/60 p-5 backdrop-blur">
          <h3 className="text-display text-xs text-accent mb-3">Team Weaknesses</h3>
          {evalResult.coverage.defensiveWeaknesses.length === 0 ? (
            <p className="text-sm text-emerald-400">No universal weaknesses — solid defense!</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {evalResult.coverage.defensiveWeaknesses.map((t) => (
                <span key={t} className={"type-" + t + " text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Team showcase */}
      <div className="rounded-2xl border-2 border-border/60 bg-card/60 p-5 backdrop-blur">
        <h3 className="text-display text-xs text-accent mb-3">Final Roster</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {team.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="text-center"
            >
              <img src={spriteUrl(p.id)} alt={p.name} className="h-20 w-20 mx-auto object-contain" />
              <div className="mt-1 text-xs font-bold text-foreground">{p.name}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <Button onClick={onReset} size="lg" className="gap-2 text-base">
          <RotateCcw className="h-5 w-5" />
          Draft Again
        </Button>
      </div>
    </div>
  );
}

function RegionBlock({ region }: { region: RegionalLeagueResult }) {
  const regionGyms = region.gymResults;

  return (
    <div className="rounded-2xl border-2 border-border/60 bg-card/60 p-5 backdrop-blur">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-display text-sm text-accent">{region.region} League</h3>
        <div className="flex items-center gap-3 text-[11px] font-bold">
          <span className="text-muted-foreground">
            {region.badgesWon} / {region.totalGyms} badges
          </span>
          {region.champion && (
            <span className="inline-flex items-center gap-1 text-amber-400">
              <Crown className="h-3.5 w-3.5" /> CHAMPION
            </span>
          )}
        </div>
      </div>

      {/* Gyms */}
      <div className="grid gap-2 sm:grid-cols-2">
        {regionGyms.map((r, i) => (
          <motion.div
            key={r.leader.name}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            className={cn(
              "flex items-center justify-between rounded-lg border-l-4 px-3 py-2",
              r.win
                ? "border-l-emerald-400 bg-emerald-500/10"
                : "border-l-red-400 bg-red-500/10",
            )}
          >
            <div>
              <div className="text-sm font-bold text-foreground">{r.leader.name}</div>
              <div className="text-[11px] text-muted-foreground">
                {r.leader.city} ·{" "}
                <span
                  className={
                    "type-" + r.leader.type + " px-1.5 py-0.5 rounded text-[9px] uppercase font-bold"
                  }
                >
                  {r.leader.type}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div
                className={cn(
                  "text-xs font-bold",
                  r.win ? "text-emerald-400" : "text-red-400",
                )}
              >
                {r.win ? "WIN" : "LOSS"} {r.matchupScore}%
              </div>
              <div className="text-[10px] text-muted-foreground">
                {r.bestPick !== "None" ? `MVP: ${r.bestPick}` : "No favorable matchup"}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Elite Four */}
      <div className="mt-5 border-t border-border/60 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-display text-[11px] tracking-widest text-foreground/80">
            Elite Four & Champion
          </h4>
          {!region.qualifiedForElite && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
              <Lock className="h-3 w-3" /> Win all gyms to qualify
            </span>
          )}
        </div>

        {!region.qualifiedForElite ? (
          <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 p-4 text-center text-xs text-muted-foreground">
            You did not earn all {region.totalGyms} {region.region} badges. Elite Four entry denied.
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {region.eliteResults.map((r, i) => (
              <motion.div
                key={r.member.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  "flex items-center justify-between rounded-lg border-l-4 px-3 py-2",
                  r.member.title === "Champion"
                    ? r.win
                      ? "border-l-amber-400 bg-amber-500/15"
                      : "border-l-rose-500 bg-rose-500/15"
                    : r.win
                      ? "border-l-emerald-400 bg-emerald-500/10"
                      : "border-l-red-400 bg-red-500/10",
                )}
              >
                <div>
                  <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    {r.member.title === "Champion" && (
                      <Crown className="h-3.5 w-3.5 text-amber-400" />
                    )}
                    {r.member.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {r.member.title} ·{" "}
                    <span
                      className={
                        "type-" + r.member.type + " px-1.5 py-0.5 rounded text-[9px] uppercase font-bold"
                      }
                    >
                      {r.member.type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={cn(
                      "text-xs font-bold",
                      r.win ? "text-emerald-400" : "text-red-400",
                    )}
                  >
                    {r.win ? "WIN" : "LOSS"} {r.matchupScore}%
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {r.bestPick !== "None" ? `MVP: ${r.bestPick}` : "Outmatched"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border-2 p-4 backdrop-blur",
        accent ? "border-accent/60 bg-accent/10" : "border-border/60 bg-card/60",
      )}
    >
      <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider font-semibold">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-2xl font-black text-foreground">{value}</div>
    </div>
  );
}
