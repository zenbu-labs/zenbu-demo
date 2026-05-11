export function Titlebar() {
  return (
    <div
      className="h-9 shrink-0 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900"
      // @ts-expect-error webkit
      style={{ WebkitAppRegion: "drag" }}
    />
  )
}
