import { z } from "zod";

const createScamReqSchema = z.strictObject({
  title: z.string(),
  desc: z.string(),
  categoryId: z.number(),
  sourceUrl: z.string().nullish(),
  region: z.string().nullish(),
})

const updateScamReqSchema = createScamReqSchema.partial()

export {
  createScamReqSchema,
  updateScamReqSchema
}
