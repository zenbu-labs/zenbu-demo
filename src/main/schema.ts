import { createSchema } from "@zenbujs/core/db"
import { z } from "zod"

export default createSchema({
  count: z.number().default(0),
})
