import { RotateCcw } from "lucide-react";

type ResetProps = { onClick: () => void };

export function WrapReset(
  _Original: React.ComponentType<ResetProps>,
  props: ResetProps,
) {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className="group inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-[0.97] transition shadow-sm dark:shadow-lg dark:shadow-black/20 text-[13px] font-medium leading-none"
    >
      <span>Reset</span>
    </button>
  );
}
