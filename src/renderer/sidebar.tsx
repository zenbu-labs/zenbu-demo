import { useState } from "react";
import { Check, Copy, FolderOpen } from "lucide-react";
import { useRpc } from "@zenbujs/core/react";
import { PROMPTS, SPRITE_SHEET, type Prompt } from "./prompts";
import { CursorIcon } from "./icons/cursor";
import { VSCodeIcon } from "./icons/vscode";
import { ZedIcon } from "./icons/zed";

type Editor = "cursor" | "vscode" | "zed";

const EDITORS: {
  id: Editor;
  label: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  themed?: boolean;
}[] = [
  { id: "cursor", label: "Cursor", Icon: CursorIcon, themed: true },
  { id: "vscode", label: "VS Code", Icon: VSCodeIcon },
  { id: "zed", label: "Zed", Icon: ZedIcon, themed: true },
];

export function Sidebar() {
  return (
    <aside className="w-[340px] border-l border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 flex flex-col shrink-0">
      <OpenIn />

      <div className="px-4 pt-4 pb-3 border-b border-zinc-200 dark:border-zinc-900 text-[14px] font-semibold text-zinc-800 dark:text-zinc-100">
        Copy a prompt and paste it into your agent to change the app
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <ul className="space-y-1">
          {PROMPTS.map((p) => (
            <PromptRow key={p.id} prompt={p} />
          ))}
        </ul>
      </div>
    </aside>
  );
}

function OpenIn() {
  const rpc = useRpc();
  const [busy, setBusy] = useState<Editor | null>(null);
  const [copied, setCopied] = useState(false);

  const open = async (id: Editor) => {
    setBusy(id);
    try {
      await rpc.app.repo.openIn({ editor: id });
    } finally {
      setBusy(null);
    }
  };

  const copyPath = async () => {
    const cwd = await rpc.app.repo.getCwd();
    await navigator.clipboard.writeText(cwd);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="px-4 pt-4 pb-3 border-b border-zinc-200 dark:border-zinc-900 space-y-1.5">
      <button
        onClick={copyPath}
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

      {EDITORS.map(({ id, label, Icon, themed }) => (
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
  );
}

function PromptRow({ prompt }: { prompt: Prompt }) {
  const [justCopied, setJustCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(prompt.text);
    setJustCopied(true);
    window.setTimeout(() => setJustCopied(false), 1200);
  };

  const scale = 22 / prompt.sprite.h;

  return (
    <li>
      <button
        onClick={onCopy}
        title={prompt.text}
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
  );
}
