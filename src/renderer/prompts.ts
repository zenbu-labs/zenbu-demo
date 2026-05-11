import spriteUrl from "./prompts-sprite.png"

export type Prompt = {
  id: string
  title: string
  task: string
  sprite: { x: number; y: number; w: number; h: number }
}

export const SPRITE_SHEET = {
  url: spriteUrl,
  width: 1536,
  height: 1024,
}

export const DOCS_URL = "https://zenbulabs.mintlify.app/llms-full.txt"

export const PROMPTS: Prompt[] = [
  {
    id: "todos",
    title: "Todo list",
    task: "Build a todo list app.",
    sprite: { x: 228, y: 160, w: 260, h: 212 },
  },
  {
    id: "issues",
    title: "Issue tracker",
    task: "Build an issue tracker.",
    sprite: { x: 639, y: 154, w: 248, h: 208 },
  },
  {
    id: "email",
    title: "Email client",
    task: "Build an email client with mock data.",
    sprite: { x: 1056, y: 166, w: 261, h: 191 },
  },
  {
    id: "github",
    title: "GitHub CLI client",
    task: "Build a GitHub client that shells out to the gh cli.",
    sprite: { x: 215, y: 584, w: 274, h: 200 },
  },
  {
    id: "survivors",
    title: "Vampire Survivors",
    task: "Build a Vampire Survivors style game in canvas.",
    sprite: { x: 630, y: 576, w: 268, h: 203 },
  },
  {
    id: "finder",
    title: "Better Finder",
    task: "Build a better Finder.",
    sprite: { x: 1054, y: 584, w: 249, h: 195 },
  },
]

export function buildPromptText(task: string, cwd: string): string {
  return `Fetch these docs without summarizing them (its already raw text) so you understand how the framework works. You do not need any sub agents after reading the docs and can start immediately: ${DOCS_URL}

The app is at: ${cwd}

${task}`
}
