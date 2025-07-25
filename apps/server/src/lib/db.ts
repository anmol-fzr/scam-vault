import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "@/db/schema"

function getDb(envs: CloudflareBindings): ReturnType<typeof drizzle> {
  const turso = createClient({
    url: envs.TURSO_DB_URL,
    authToken: envs.TURSO_DB_TOKEN,
  });

  return drizzle(turso, { schema });
}

export { getDb }
