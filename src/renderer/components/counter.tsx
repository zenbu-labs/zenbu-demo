import { Minus, Plus } from "lucide-react"
import { useDb, useDbClient } from "@zenbujs/core/react"
import { RoundButton } from "./round-button"
import { Reset } from "./reset"

export function Counter() {
  const count = useDb((root) => root.app.count)
  const client = useDbClient()

  const bump = (delta: number) =>
    client.update((db) => {
      db.app.count += delta
    })

  const reset = () =>
    client.update((db) => {
      db.app.count = 0
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

      <Reset onClick={reset} />
    </div>
  )
}
