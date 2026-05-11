import { Service } from "@zenbujs/core/runtime"

export class EnhanceService extends Service.create({
  key: "enhance",
}) {
  evaluate() {
    this.setup("wrap-reset", () =>
      this.advise({
        view: "entrypoint",
        moduleId: "counter.tsx",
        name: "Reset",
        type: "around",
        modulePath: "src/content/wrap-reset.tsx",
        exportName: "WrapReset",
      }),
    )
  }
}
