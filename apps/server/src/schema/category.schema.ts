import { z } from "zod";

const createCategoryReqSchema = z.strictObject({
  title: z.string(),
  desc: z.string(),
  parentCategoryId: z.number().nullish()
})

const updateCategoryReqSchema = createCategoryReqSchema.partial()

export {
  createCategoryReqSchema,
  updateCategoryReqSchema
}
