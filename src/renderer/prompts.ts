import spriteUrl from "./prompts-sprite.png"

export type Prompt = {
  id: string
  title: string
  text: string
  sprite: { x: number; y: number; w: number; h: number }
}

export const SPRITE_SHEET = {
  url: spriteUrl,
  width: 1536,
  height: 1024,
}

export const PROMPTS: Prompt[] = [
  {
    id: "todos",
    title: "Todo list",
    text: "Turn this into a todo list.",
    sprite: { x: 228, y: 160, w: 260, h: 212 },
  },
  {
    id: "issues",
    title: "Issue tracker",
    text: "Turn this into an issue tracker.",
    sprite: { x: 639, y: 154, w: 248, h: 208 },
  },
  {
    id: "email",
    title: "Email client",
    text: "Turn this into an email client with mock data.",
    sprite: { x: 1056, y: 166, w: 261, h: 191 },
  },
  {
    id: "github",
    title: "GitHub CLI client",
    text: "Turn this into a GitHub client that shells out to the gh cli.",
    sprite: { x: 215, y: 584, w: 274, h: 200 },
  },
  {
    id: "survivors",
    title: "Vampire Survivors",
    text: "Turn this into a Vampire Survivors style game in canvas.",
    sprite: { x: 630, y: 576, w: 268, h: 203 },
  },
  {
    id: "finder",
    title: "Better Finder",
    text: "Turn this into a better Finder.",
    sprite: { x: 1054, y: 584, w: 249, h: 195 },
  },
]
