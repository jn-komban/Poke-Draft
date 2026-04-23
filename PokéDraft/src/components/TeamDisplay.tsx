import { AnimatePresence, motion } from "framer-motion";
import type { Pokemon } from "@/data/pokemon";
import { spriteUrl } from "@/data/pokemon";
import { cn } from "@/lib/utils";

interface Props {
  team: Pokemon[];
  maxSize?: number;
}

export function TeamDisplay({ team, maxSize = 6 }: Props) {
  const slots = Array.from({ length: maxSize });

  return (
    <div className="rounded-2xl border-2 border-border/60 bg-card/60 p-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-display text-sm text-accent">Your Team</h2>
        <span className="text-xs text-muted-foreground">
          {team.length} / {maxSize}
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {slots.map((_, i) => {
          const p = team[i];
          return (
            <div
              key={i}
              className={cn(
                "relative aspect-square rounded-xl border-2 border-dashed",
                p ? "border-accent/60 bg-black/30" : "border-border/40 bg-black/10",
                "flex items-center justify-center overflow-hidden",
              )}
            >
              <AnimatePresence>
                {p && (
                  <motion.div
                    key={p.id}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={spriteUrl(p.id)}
                      alt={p.name}
                      className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-lg"
                    />
                    <span className="text-[10px] font-semibold text-foreground/90 mt-1">
                      {p.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              {!p && (
                <span className="text-2xl text-muted-foreground/50">?</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
