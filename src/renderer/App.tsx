import { ZenbuProvider } from "@zenbujs/core/react"
import { Counter } from "./counter"
import { Sidebar } from "./sidebar"

function Titlebar() {
  return (
    <div
      className="h-9 shrink-0 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900"
      // @ts-expect-error webkit
      style={{ WebkitAppRegion: "drag" }}
    />
  )
}

export function App() {
  return (
    <ZenbuProvider>
      <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <Titlebar />
        <div className="flex flex-1 min-h-0">
          <main className="flex-1 flex items-center justify-center p-8 min-w-0">
            <Counter />
          </main>
          <Sidebar />
        </div>
      </div>
    </ZenbuProvider>
  )
}
