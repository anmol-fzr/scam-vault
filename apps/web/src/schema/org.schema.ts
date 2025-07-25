import { z } from "zod"

const createOrgSchema = z.strictObject({
  name: z.string().describe("Name"),
  slug: z.string().describe("Slug"),
})

export { createOrgSchema }
