/**
 * Better Auth CLI configuration file
 *
 * Docs: https://www.better-auth.com/docs/concepts/cli
 */
import { getDrizzleAdapter } from './src/lib/db';
import { betterAuth } from 'better-auth';
import { betterAuthOptions } from './src/lib/better-auth/options';
import { envs } from '@/lib/utils/envs';

const { BETTER_AUTH, GITHUB, DB, CORS_URL } = envs

const database = getDrizzleAdapter({
  TURSO_DB_URL: DB.URL,
  TURSO_DB_TOKEN: DB.TOKEN
})

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  ...betterAuthOptions,
  database,
  baseURL: BETTER_AUTH.URL,
  secret: BETTER_AUTH.SECRET,
  socialProviders: {
    github: {
      clientId: GITHUB.ID,
      clientSecret: GITHUB.SECRET,
    },
  },
  trustedOrigins: [CORS_URL],
});
