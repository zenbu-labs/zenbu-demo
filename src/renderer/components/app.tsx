import { Counter } from "./counter"
import { Sidebar } from "./sidebar"
import { Titlebar } from "./titlebar"

export function App() {
  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Titlebar />
      <div className="flex flex-1 min-h-0">
        <main className="flex-1 flex items-center justify-center p-8 min-w-0">
          <Counter />
        </main>
        <Sidebar />
      </div>
    </div>
  )
}
