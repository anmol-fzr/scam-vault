import { z } from "zod"

const createApiKeySchema = z.strictObject({
  name: z.string().describe("Name"),
})

export { createApiKeySchema }
