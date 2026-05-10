import { createSchema, InferRoot, InferSchema, z } from "@zenbujs/core/db"

export const schema = createSchema({
  count: z.number().default(0),
})

export type AppSchema = InferSchema<typeof schema>
export type SchemaRoot = InferRoot<AppSchema>
