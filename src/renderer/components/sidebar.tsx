import { useEffect, useState } from "react"
import { useRpc } from "@zenbujs/core/react"
import { PROMPTS } from "../prompts"
import { OpenIn } from "./open-in"
import { PromptRow } from "./prompt-row"

export function Sidebar() {
  const rpc = useRpc()
  const [cwd, setCwd] = useState<string>("")

  useEffect(() => {
    rpc.app.repo.getCwd().then(setCwd)
  }, [rpc])

  return (
    <aside className="w-[340px] border-l border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 flex flex-col shrink-0">
      <OpenIn />

      <div className="px-4 pt-4 pb-3 border-b border-zinc-200 dark:border-zinc-900 text-[14px] font-semibold text-zinc-800 dark:text-zinc-100">
        Copy a prompt and paste it into your agent to change the app
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <ul className="space-y-1">
          {PROMPTS.map((p) => (
            <PromptRow key={p.id} prompt={p} cwd={cwd} />
          ))}
        </ul>
      </div>
    </aside>
  )
}
