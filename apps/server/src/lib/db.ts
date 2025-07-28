import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as schema from "@/db/schema"

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

const getDrizzleAdapter = (env: Parameters<typeof getDb>[0]) => {
  const db = getDb(env)
  return drizzleAdapter(db, { provider: 'sqlite' })
}

export { getDb, getDrizzleAdapter }
