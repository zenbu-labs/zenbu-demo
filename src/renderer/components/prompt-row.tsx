import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { SPRITE_SHEET, buildPromptText, type Prompt } from "../prompts"

export function PromptRow({ prompt, cwd }: { prompt: Prompt; cwd: string }) {
  const [justCopied, setJustCopied] = useState(false)

  const fullText = buildPromptText(prompt.task, cwd)

  const onCopy = async () => {
    await navigator.clipboard.writeText(fullText)
    setJustCopied(true)
    window.setTimeout(() => setJustCopied(false), 1200)
  }

  const scale = 22 / prompt.sprite.h

  return (
    <li>
      <button
        onClick={onCopy}
        title={fullText}
        className="group w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800 transition text-left"
      >
        <span
          className="shrink-0 rounded overflow-hidden"
          style={{
            width: `${prompt.sprite.w * scale}px`,
            height: `${prompt.sprite.h * scale}px`,
            backgroundImage: `url(${SPRITE_SHEET.url})`,
            backgroundSize: `${SPRITE_SHEET.width * scale}px ${SPRITE_SHEET.height * scale}px`,
            backgroundPosition: `-${prompt.sprite.x * scale}px -${prompt.sprite.y * scale}px`,
            backgroundRepeat: "no-repeat",
          }}
        />
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
