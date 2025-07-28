import { z } from "zod"

const contactSchema = z.strictObject({
  name: z.string().describe("Name"),
  email: z.string().email().describe("Email"),
  message: z.string().describe("Message"),
})

export { contactSchema }
