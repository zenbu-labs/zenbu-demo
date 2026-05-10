import { Service } from "@zenbujs/core/runtime"

export class CheerService extends Service.create({
  key: "cheer",
}) {
  evaluate() {
    this.setup("wrap-counter", () =>
      this.advise({
        view: "entrypoint",
        moduleId: "counter.tsx",
        name: "Counter",
        type: "around",
        modulePath: "src/content/wrap-counter.tsx",
        exportName: "WrapCounter",
      }),
    )
  }
}
