import {
  defineConfig,
  definePlugin,
  defineBuildConfig,
} from "@zenbujs/core/config"

export default defineConfig({
  db: "./.zenbu/db",
  uiEntrypoint: "./src/renderer",

  plugins: [
    definePlugin({
      name: "app",
      services: ["./src/main/services/*.ts"],
      schema: "./src/main/schema.ts",
      migrations: "./migrations",
    }),
    "./plugins/cheer/zenbu.plugin.ts",
  ],

  build: defineBuildConfig({
    packageManager: { type: "pnpm", version: "10.33.0" },
    source: ".",
    out: ".zenbu/build/source",
    include: [
      "src/**/*",
      "migrations/**/*",
      "build/**/*",
      "plugins/**/*",
      ".gitignore",
      ".env.example",
      "package.json",
      "pnpm-lock.yaml",
      "pnpm-workspace.yaml",
      "tsconfig.json",
      "zenbu.config.ts",
      "vite.config.ts",
      "electron-builder.json",
    ],
    ignore: [
      "src/**/*.test.ts",
      "src/**/*.test.tsx",
      "src/**/*.spec.ts",
      "src/**/*.spec.tsx",
      "src/dev-only/**",
      "plugins/**/node_modules/**",
      "plugins/**/.zenbu/**",
      "plugins/**/dist/**",
      "plugins/**/*.test.ts",
      "plugins/**/*.test.tsx",
      "plugins/**/*.spec.ts",
      "plugins/**/*.spec.tsx",
    ],
    mirror: {
      target: "zenbu-labs/zenbujs-demo",
      branch: "main",
    },
  }),
})
