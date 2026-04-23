import { motion } from "framer-motion";
import { useState } from "react";
import type { Pokemon } from "@/data/pokemon";
import { spriteUrl } from "@/data/pokemon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ArrowRight } from "lucide-react";

interface Props {
  /** Pool of Pokémon previously drafted across all earlier regions. */
  previousPokemon: Pokemon[];
  /** Region the player is about to enter. */
  nextRegion: string;
  /** Maximum carry-overs allowed (team size). */
  maxCarry: number;
  onConfirm: (carried: Pokemon[]) => void;
}

export function CarryOverScreen({
  previousPokemon,
  nextRegion,
  maxCarry,
  onConfirm,
}: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  function toggle(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < maxCarry) next.add(id);
      return next;
    });
  }

  function confirm() {
    const carried = previousPokemon.filter((p) => selected.has(p.id));
    onConfirm(carried);
  }

  const remainingPicks = maxCarry - selected.size;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <p className="text-display text-xs text-accent mb-2">
          Crossing into {nextRegion}
        </p>
        <h2 className="text-display text-2xl sm:text-3xl text-foreground leading-tight">
          Carry any Pokémon <span className="text-accent">forward</span>?
        </h2>
        <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
          Pick up to <strong className="text-foreground">{maxCarry}</strong> Pokémon from your
          previous regions to bring into the {nextRegion} league. You'll draft the rest
          ({remainingPicks > 0 ? remainingPicks : 0} more) from {nextRegion} natives.
        </p>
      </div>

      <div className="rounded-2xl border-2 border-border/60 bg-card/60 p-5 backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-display text-xs text-accent">
            Your previous Pokémon ({previousPokemon.length})
          </h3>
          <span className="text-xs text-muted-foreground">
            Selected: <strong className="text-foreground">{selected.size}</strong> / {maxCarry}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {previousPokemon.map((p) => {
            const isSelected = selected.has(p.id);
            const atLimit = !isSelected && selected.size >= maxCarry;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => toggle(p.id)}
                disabled={atLimit}
                className={cn(
                  "relative rounded-xl border-2 p-3 transition-all text-left",
                  isSelected
                    ? "border-accent bg-accent/15 shadow-lg shadow-accent/20"
                    : "border-border/60 bg-black/20 hover:border-accent/50",
                  atLimit && "opacity-40 cursor-not-allowed",
                )}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 rounded-full bg-accent text-accent-foreground p-1">
                    <Check className="h-3 w-3" />
                  </span>
                )}
                <img
                  src={spriteUrl(p.id)}
                  alt={p.name}
                  className="h-20 w-20 mx-auto object-contain"
                />
                <div className="mt-1 text-center">
                  <div className="text-xs font-bold text-foreground">{p.name}</div>
                  <div className="flex flex-wrap justify-center gap-1 mt-1">
                    {p.types.map((t) => (
                      <span
                        key={t}
                        className={
                          "type-" +
                          t +
                          " text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                        }
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          variant="ghost"
          onClick={() => onConfirm([])}
          className="text-muted-foreground"
        >
          Skip — start fresh
        </Button>
        <Button onClick={confirm} size="lg" className="gap-2">
          Continue to {nextRegion}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
