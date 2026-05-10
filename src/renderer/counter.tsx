import { Minus, Plus, RotateCcw } from "lucide-react"
import { useDb, useDbClient } from "@zenbujs/core/react"

export function Counter() {
  const count = useDb((root) => root.plugin.app.count)
  const client = useDbClient()

  const bump = (delta: number) =>
    client.update((db) => {
      db.plugin.app.count += delta
    })

  const reset = () =>
    client.update((db) => {
      db.plugin.app.count = 0
    })

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative">
        <div className="absolute inset-0 blur-3xl bg-indigo-500/15 rounded-full" />
        <div className="relative text-[10rem] leading-none font-bold tabular-nums text-zinc-900 dark:text-white tracking-tight">
          {count}
        </div>
      </div>

      <div className="flex gap-3">
        <RoundButton onClick={() => bump(-1)} aria-label="decrement">
          <Minus className="w-5 h-5" strokeWidth={2.5} />
        </RoundButton>
        <RoundButton onClick={() => bump(1)} aria-label="increment">
          <Plus className="w-5 h-5" strokeWidth={2.5} />
        </RoundButton>
      </div>

      <button
        onClick={reset}
        className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-300 transition"
      >
        <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} />
        Reset
      </button>
    </div>
  )
}

function RoundButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-14 h-14 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-white active:scale-95 transition shadow-sm dark:shadow-lg dark:shadow-black/20"
    >
      {children}
    </button>
  )
}
