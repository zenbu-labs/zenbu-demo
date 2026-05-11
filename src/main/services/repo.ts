import { exec } from "node:child_process";
import { promisify } from "node:util";
import { shell } from "electron";
import { Service } from "@zenbujs/core/runtime";

const run = promisify(exec);

export type Editor = "cursor" | "vscode" | "zed";

const URL_OPENERS: Record<Editor, (p: string) => Promise<void>> = {
  cursor: (p) => shell.openExternal(`cursor://file${encodeURI(p)}`),
  vscode: (p) => shell.openExternal(`vscode://file${encodeURI(p)}`),
  // Zed doesn't expose a stable file:// URL handler; Launch Services
  // (`open -a`) is the OS-level equivalent of a URL scheme and works
  // without the `zed` cli on PATH.
  zed: async (p) => {
    await run(`open -a "Zed" ${q(p)}`);
  },
};

const q = (p: string) => `"${p.replace(/"/g, '\\"')}"`;

export class Repo extends Service.create({ key: "repo" }) {
  async getCwd() {
    return process.cwd();
  }

  async openIn(args: { editor: Editor }) {
    await URL_OPENERS[args.editor](process.cwd());
  }
}
