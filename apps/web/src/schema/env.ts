import { z } from "zod"

const envSchema = z.object({
  VITE_APP_SERVER_URL: z.string().url()
})

export { envSchema }
