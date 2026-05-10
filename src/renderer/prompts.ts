export type Prompt = {
  id: string
  emoji: string
  title: string
  text: string
}

export const PROMPTS: Prompt[] = [
  {
    id: "pomo",
    emoji: "⏱️",
    title: "Make it a pomodoro timer",
    text: "Convert this counter into a pomodoro timer: 25 min work / 5 min break, big countdown number, start / pause / reset buttons. Persist mode + startedAt + paused in src/main/schema.ts so it survives a restart. Run `pnpm run db:generate` after the schema change.",
  },
  {
    id: "multi",
    emoji: "📊",
    title: "Multi-counter app",
    text: "Reshape into a multi-counter app: a left rail lists named counters with an 'add counter' button; the main area shows the +/- UI for the selected one. Replace the schema's `count: number` with `counters: Array<{ id, name, value }>` and `selectedId: string | null`. Generate a db migration.",
  },
  {
    id: "habits",
    emoji: "✅",
    title: "Daily habit tracker",
    text: "Replace the counter with a daily habit tracker. Each day I tap a button to mark today done. Show a 7-day grid of dots and a current streak count. Store the array of done-dates in src/main/schema.ts and generate a migration.",
  },
  {
    id: "history",
    emoji: "📈",
    title: "History chart at the bottom",
    text: "Add a `history` collection to src/main/schema.ts that records every count change with a timestamp. Render a small SVG line chart of the last hour at the bottom of the main view. Generate the migration.",
  },
  {
    id: "step",
    emoji: "➕",
    title: "+5 and +10 buttons",
    text: "In src/renderer/counter.tsx add buttons for +5, +10, -5, -10 alongside the existing +1 / -1, in the same styling.",
  },
  {
    id: "best",
    emoji: "🏆",
    title: "Track personal best",
    text: "Add a `best: number` field to src/main/schema.ts that holds the highest count ever reached. Update it whenever count changes. Render it under the counter as 'best: N'. Run `pnpm run db:generate` after editing the schema.",
  },
  {
    id: "confetti",
    emoji: "🎉",
    title: "Confetti every 10",
    text: "In src/renderer/counter.tsx, every time the count becomes a positive multiple of 10 burst a short confetti animation from the number. Implement it inline (no new dependency) using a handful of absolutely-positioned spans that fly outward and fade.",
  },
  {
    id: "milestones",
    emoji: "🧩",
    title: "Build a milestones plugin",
    text: "Create a new plugin at plugins/milestones/ that watches the host count and shows a celebratory toast in the corner when crossing 10, 25, 50, 100, 250, 500, 1000. Store the milestone list in the plugin's own db slice. Wire into zenbu.config.ts and generate its migration. Use a content script with shadow DOM for the toast.",
  },
]
