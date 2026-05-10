import { Sparkles, Trophy } from "lucide-react"
import { useDb } from "@zenbujs/core/react"

type Tier = {
  threshold: number
  emoji: string
  label: string
  hint: string
  glow: string
}

const TIERS: Tier[] = [
  {
    threshold: 100,
    emoji: "👑",
    label: "Legend",
    hint: "You broke the counter.",
    glow: "shadow-[0_0_80px_-10px] shadow-amber-400/60",
  },
  {
    threshold: 50,
    emoji: "🚀",
    label: "Liftoff",
    hint: "50 and climbing.",
    glow: "shadow-[0_0_60px_-12px] shadow-fuchsia-500/50",
  },
  {
    threshold: 25,
    emoji: "🔥",
    label: "On fire",
    hint: "Past 25, momentum unlocked.",
    glow: "shadow-[0_0_50px_-12px] shadow-rose-500/45",
  },
  {
    threshold: 10,
    emoji: "✨",
    label: "Warming up",
    hint: "First milestone reached.",
    glow: "shadow-[0_0_40px_-12px] shadow-indigo-500/40",
  },
  {
    threshold: 0,
    emoji: "🌱",
    label: "Just starting",
    hint: "Click + to begin.",
    glow: "shadow-none",
  },
]

function tierFor(count: number): Tier {
  for (const t of TIERS) if (count >= t.threshold) return t
  return TIERS[TIERS.length - 1]!
}

export function WrapCounter(Original: React.ComponentType<unknown>, props: unknown) {
  const count = useDb((root) => root.app.count)
  const tier = tierFor(count)
  const next = TIERS.find((t) => t.threshold > count)
  const remaining = next ? next.threshold - count : 0

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm">
        <span className="text-base leading-none">{tier.emoji}</span>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-700 dark:text-zinc-300">
          {tier.label}
        </span>
        <span className="w-px h-3 bg-zinc-300 dark:bg-zinc-700" />
        <span className="text-[11px] text-zinc-500 dark:text-zinc-500">
          {tier.hint}
        </span>
      </div>

      <div className={`relative rounded-3xl transition-shadow duration-500 ${tier.glow}`}>
        <Original {...(props as Record<string, unknown>)} />
      </div>

      <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-500">
        {next ? (
          <>
            <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
            <span>
              {remaining} more to <span className="text-zinc-700 dark:text-zinc-300 font-medium">{next.label}</span>
            </span>
          </>
        ) : (
          <>
            <Trophy className="w-3.5 h-3.5 text-amber-500" strokeWidth={2} />
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">Top tier reached</span>
          </>
        )}
      </div>

      <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-700">
        wrapped by <span className="text-zinc-500 dark:text-zinc-500">cheer</span> plugin
      </div>
    </div>
  )
}
