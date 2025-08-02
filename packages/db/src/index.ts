import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "@/schema"

type GetDbParams = {
  TURSO_DB_URL: string
  TURSO_DB_TOKEN: string
}

function getDb(envs: GetDbParams): ReturnType<typeof drizzle> {
  const turso = createClient({
    url: envs.TURSO_DB_URL,
    authToken: envs.TURSO_DB_TOKEN,
  });

  return drizzle(turso, { schema });
}

export * from "@/schema"
export { getDb }
