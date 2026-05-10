import { exec } from "node:child_process"
import { promisify } from "node:util"
import { Service } from "@zenbujs/core/runtime"

const run = promisify(exec)

export type Editor = "cursor" | "vscode" | "zed" | "finder"

const COMMANDS: Record<Editor, (p: string) => string> = {
  cursor: (p) => `cursor ${q(p)}`,
  vscode: (p) => `code ${q(p)}`,
  zed: (p) => `zed ${q(p)}`,
  finder: (p) => `open ${q(p)}`,
}

const q = (p: string) => `"${p.replace(/"/g, '\\"')}"`

export class Repo extends Service.create({ key: "repo" }) {
  async getCwd() {
    return process.cwd()
  }

  async openIn(args: { editor: Editor }) {
    await run(COMMANDS[args.editor](process.cwd()))
  }
}
