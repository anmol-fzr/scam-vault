import { getDb } from "@scam-vault/db"
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

const getAuthDrizzleAdapter = (env: Parameters<typeof getDb>[0]) => {
  const db = getDb(env)
  return drizzleAdapter(db, { provider: 'sqlite' })
}

export * from "./better-auth"
export { getAuthDrizzleAdapter };
