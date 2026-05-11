import { useState } from "react"
import { Check, FolderOpen } from "lucide-react"
import { useRpc } from "@zenbujs/core/react"

export function CopyPathButton() {
  const rpc = useRpc()
  const [copied, setCopied] = useState(false)

  const onClick = async () => {
    const cwd = await rpc.app.repo.getCwd()
    await navigator.clipboard.writeText(cwd)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <button
      onClick={onClick}
      title="Copy project path to clipboard"
      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800 active:scale-[0.99] transition text-left"
    >
      <span
        className={`shrink-0 transition ${
          copied
            ? "text-emerald-500 dark:text-emerald-400"
            : "text-zinc-500 dark:text-zinc-500"
        }`}
      >
        {copied ? (
          <Check className="w-4 h-4" strokeWidth={2.5} />
        ) : (
          <FolderOpen className="w-4 h-4" strokeWidth={2} />
        )}
      </span>
      <span className="flex-1 text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
        {copied ? "Copied path" : "Copy path"}
      </span>
    </button>
  )
}
