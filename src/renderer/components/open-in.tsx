import { useState } from "react"
import { useRpc } from "@zenbujs/core/react"
import { CursorIcon } from "../icons/cursor"
import { VSCodeIcon } from "../icons/vscode"
import { ZedIcon } from "../icons/zed"
import { FinderIcon } from "../icons/finder"
import { CopyPathButton } from "./copy-path-button"

type Editor = "cursor" | "vscode" | "zed"
type Target = Editor | "finder"

const TARGETS: {
  id: Target
  label: string
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement
  themed?: boolean
}[] = [
  { id: "cursor", label: "Cursor", Icon: CursorIcon, themed: true },
  { id: "vscode", label: "VS Code", Icon: VSCodeIcon },
  { id: "zed", label: "Zed", Icon: ZedIcon, themed: true },
  { id: "finder", label: "Finder", Icon: FinderIcon },
]

export function OpenIn() {
  const rpc = useRpc()
  const [busy, setBusy] = useState<Target | null>(null)

  const open = async (id: Target) => {
    setBusy(id)
    try {
      if (id === "finder") {
        await rpc.app.repo.openInFinder()
      } else {
        await rpc.app.repo.openIn({ editor: id })
      }
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="px-4 pt-4 pb-3 border-b border-zinc-200 dark:border-zinc-900 space-y-1.5">
      <CopyPathButton />

      {TARGETS.map(({ id, label, Icon, themed }) => (
        <button
          key={id}
          onClick={() => open(id)}
          disabled={busy !== null}
          title={`Open project in ${label}`}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800 active:scale-[0.99] transition text-left disabled:opacity-50"
        >
          <Icon
            className={`w-4 h-4 shrink-0 ${
              themed ? "text-zinc-900 dark:text-zinc-100" : ""
            } ${busy === id ? "animate-pulse" : ""}`}
          />
          <span className="flex-1 text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
            Open in {label}
          </span>
        </button>
      ))}
    </div>
  )
}
