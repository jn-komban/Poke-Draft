import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Pokemon } from "@/data/pokemon";
import { getRandomChoicesFromPool } from "@/utils/randomizer";
import { PokemonCard } from "./PokemonCard";
import { Button } from "@/components/ui/button";
import { Shuffle, Sparkles } from "lucide-react";

interface Props {
  /** Already picked Pokémon for the current team (used to exclude duplicates). */
  team: Pokemon[];
  /** Total target team size (typically 6). */
  maxSize: number;
  /** Pool of Pokémon to draft from (region-filtered). */
  pool: Pokemon[];
  /** Label for the current region/league (e.g. "Kanto"). */
  regionLabel: string;
  /** Number of picks already made in THIS draft (after carry-overs). */
  picksMade: number;
  /** Number of picks the user must make in this region. */
  picksNeeded: number;
  onPick: (p: Pokemon) => void;
}

const MAX_REROLLS = 3;

export function DraftBoard({
  team,
  maxSize,
  pool,
  regionLabel,
  picksMade,
  picksNeeded,
  onPick,
}: Props) {
  const excludedIds = useMemo(() => team.map((p) => p.id), [team]);
  const [choices, setChoices] = useState<Pokemon[]>(() =>
    getRandomChoicesFromPool(pool, excludedIds, 3),
  );
  const [rerollsLeft, setRerollsLeft] = useState(MAX_REROLLS);
  const turn = picksMade + 1;

  function handlePick(p: Pokemon) {
    onPick(p);
    if (team.length + 1 < maxSize) {
      setChoices(getRandomChoicesFromPool(pool, [...excludedIds, p.id], 3));
    }
  }

  function reroll() {
    if (rerollsLeft <= 0) return;
    setRerollsLeft((n) => n - 1);
    setChoices(getRandomChoicesFromPool(pool, excludedIds, 3));
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-display text-xs text-accent">
            {regionLabel} · Pick {turn} of {picksNeeded}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-foreground">
            Draft from {regionLabel}
          </h2>
        </div>

        <Button
          onClick={reroll}
          disabled={rerollsLeft === 0}
          variant="secondary"
          className="gap-2"
        >
          <Shuffle className="h-4 w-4" />
          Reroll ({rerollsLeft} left)
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={turn + "-" + rerollsLeft}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {choices.map((p, i) => (
            <PokemonCard key={p.id} pokemon={p} onPick={handlePick} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Sparkles className="h-3 w-3 text-accent" />
        Only {regionLabel}-region Pokémon appear here. Higher tiers are rarer.
      </p>
    </div>
  );
}
