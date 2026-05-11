import { definePlugin } from "@zenbujs/core/config"

export default definePlugin({
  name: "enhance",
  services: ["./src/main/services/*.ts"],
  dependsOn: [
    { name: "app", from: "../../zenbu.config.ts" },
  ],
})
