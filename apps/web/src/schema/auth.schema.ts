import { z } from "zod"

const loginSchema = z.strictObject({
  email: z.string().email().describe("Email"),
  password: z.string().describe("Password"),
})

const signUpSchema = loginSchema.extend({
  name: z.string().describe("Name")
})

export { loginSchema, signUpSchema }
