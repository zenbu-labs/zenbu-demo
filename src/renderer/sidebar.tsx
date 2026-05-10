import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { useRpc } from "@zenbujs/core/react"
import { PROMPTS, type Prompt } from "./prompts"
import { CursorIcon } from "./icons/cursor"
import { VSCodeIcon } from "./icons/vscode"
import { ZedIcon } from "./icons/zed"
import { FinderIcon } from "./icons/finder"

type Editor = "cursor" | "vscode" | "zed" | "finder"

const EDITORS: {
  id: Editor
  label: string
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement
  themed?: boolean
}[] = [
  { id: "cursor", label: "Cursor", Icon: CursorIcon, themed: true },
  { id: "vscode", label: "VS Code", Icon: VSCodeIcon },
  { id: "zed", label: "Zed", Icon: ZedIcon, themed: true },
  { id: "finder", label: "Finder", Icon: FinderIcon },
]

export function Sidebar() {
  return (
    <aside className="w-[340px] border-l border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 flex flex-col shrink-0">
      <OpenIn />
      <div className="px-4 pt-3 pb-2.5 border-b border-zinc-200 dark:border-zinc-900 text-[12px] text-zinc-500">
        Copy a prompt and paste it into your agent
      </div>
      <div className="flex-1 px-4 py-3">
        <ul className="space-y-1">
          {PROMPTS.map((p) => (
            <PromptRow key={p.id} prompt={p} />
          ))}
        </ul>
      </div>
    </aside>
  )
}

function OpenIn() {
  const rpc = useRpc()
  const [busy, setBusy] = useState<Editor | null>(null)

  const open = async (id: Editor) => {
    setBusy(id)
    try {
      await rpc.repo.openIn({ editor: id })
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="px-4 pt-4 pb-3 border-b border-zinc-200 dark:border-zinc-900">
      <div className="grid grid-cols-4 gap-1.5">
        {EDITORS.map(({ id, label, Icon, themed }) => (
          <button
            key={id}
            onClick={() => open(id)}
            disabled={busy !== null}
            title={`Open in ${label}`}
            className="group flex flex-col items-center gap-1.5 px-1 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800 active:scale-[0.97] transition disabled:opacity-50"
          >
            <Icon
              className={`w-6 h-6 transition-transform group-hover:scale-110 ${
                themed ? "text-zinc-900 dark:text-zinc-100" : ""
              } ${busy === id ? "animate-pulse" : ""}`}
            />
            <span className="text-[11px] text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function PromptRow({ prompt }: { prompt: Prompt }) {
  const [justCopied, setJustCopied] = useState(false)

  const onCopy = async () => {
    await navigator.clipboard.writeText(prompt.text)
    setJustCopied(true)
    window.setTimeout(() => setJustCopied(false), 1200)
  }

  return (
    <li>
      <button
        onClick={onCopy}
        title={prompt.text}
        className="group w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800 transition text-left"
      >
        <span className="text-base shrink-0 w-5 text-center">
          {prompt.emoji}
        </span>
        <span className="flex-1 text-[13px] text-zinc-800 dark:text-zinc-200 truncate">
          {prompt.title}
        </span>
        <span
          className={`shrink-0 transition ${
            justCopied
              ? "text-emerald-500 dark:text-emerald-400"
              : "text-zinc-400 dark:text-zinc-700 group-hover:text-zinc-700 dark:group-hover:text-zinc-400"
          }`}
        >
          {justCopied ? (
            <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
          ) : (
            <Copy className="w-3.5 h-3.5" strokeWidth={2.5} />
          )}
        </span>
      </button>
    </li>
  )
}
