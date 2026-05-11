import { RotateCcw } from "lucide-react"

export function Reset({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-300 transition"
    >
      <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} />
      Reset
    </button>
  )
}
