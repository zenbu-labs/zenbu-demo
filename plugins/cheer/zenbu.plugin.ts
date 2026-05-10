import { definePlugin } from "@zenbujs/core/config"

export default definePlugin({
  name: "cheer",
  services: ["./src/main/services/*.ts"],
  dependsOn: [
    { name: "app", from: "../../zenbu.config.ts" },
  ],
})
