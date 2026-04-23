import { motion } from "framer-motion";
import type { Pokemon } from "@/data/pokemon";
import { spriteUrl, totalStats } from "@/data/pokemon";
import { cn } from "@/lib/utils";

interface Props {
  pokemon: Pokemon;
  onPick?: (p: Pokemon) => void;
  index?: number;
  disabled?: boolean;
}

const tierStyles: Record<Pokemon["tier"], string> = {
  Common: "from-slate-500/30 to-slate-700/20 border-slate-400/40",
  Rare: "from-blue-500/40 to-indigo-700/30 border-blue-400/60",
  Epic: "from-fuchsia-500/40 to-purple-700/30 border-fuchsia-400/70",
  Legendary: "from-amber-400/50 to-orange-600/40 border-amber-300/80",
};

export function PokemonCard({ pokemon, onPick, index = 0, disabled }: Props) {
  return (
    <motion.button
      type="button"
      onClick={() => !disabled && onPick?.(pokemon)}
      disabled={disabled}
      initial={{ opacity: 0, y: 30, rotateY: -20 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      exit={{ opacity: 0, y: -30, scale: 0.9 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 220, damping: 22 }}
      whileHover={!disabled ? { y: -8, scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className={cn(
        "group relative w-full overflow-hidden rounded-3xl border-2 bg-gradient-to-br p-5 text-left transition-shadow",
        "backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed",
        "hover:shadow-[0_25px_60px_-15px_oklch(0.65_0.22_25/0.6)]",
        tierStyles[pokemon.tier],
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold tracking-widest text-foreground/60">
          #{String(pokemon.id).padStart(3, "0")}
        </span>
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
            pokemon.tier === "Legendary" && "bg-amber-400 text-amber-950",
            pokemon.tier === "Epic" && "bg-fuchsia-400 text-fuchsia-950",
            pokemon.tier === "Rare" && "bg-blue-400 text-blue-950",
            pokemon.tier === "Common" && "bg-slate-300 text-slate-800",
          )}
        >
          {pokemon.tier}
        </span>
      </div>

      <div className="relative h-40 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-white/5 blur-2xl" />
        <motion.img
          src={spriteUrl(pokemon.id)}
          alt={pokemon.name}
          className="relative h-40 w-40 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          loading="lazy"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <h3 className="mt-3 text-xl font-bold text-foreground">{pokemon.name}</h3>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {pokemon.types.map((t) => (
          <span
            key={t}
            className={cn(
              "type-" + t,
              "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow",
            )}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Stat label="HP" v={pokemon.stats.hp} />
        <Stat label="ATK" v={pokemon.stats.attack} />
        <Stat label="DEF" v={pokemon.stats.defense} />
        <Stat label="SpA" v={pokemon.stats.spAtk} />
        <Stat label="SpD" v={pokemon.stats.spDef} />
        <Stat label="SPD" v={pokemon.stats.speed} />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">BST</span>
        <span className="font-bold text-accent">{totalStats(pokemon)}</span>
      </div>
    </motion.button>
  );
}

function Stat({ label, v }: { label: string; v: number }) {
  return (
    <div className="rounded-md bg-black/30 px-1.5 py-1">
      <div className="text-[9px] font-semibold text-muted-foreground">{label}</div>
      <div className="text-sm font-bold text-foreground">{v}</div>
    </div>
  );
}
