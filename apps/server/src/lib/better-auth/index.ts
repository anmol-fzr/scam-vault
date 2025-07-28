import { betterAuth } from 'better-auth';
import { betterAuthOptions } from './options';
import { getDrizzleAdapter } from '../db';
import type { SecondaryStorage } from 'better-auth';


/**
 * Creates secondary storage using Cloudflare KV
 *
 * @param kv - Cloudflare KV namespace
 * @returns SecondaryStorage implementation
 */
export const createKVStorage = (kv: KVNamespace<string>): SecondaryStorage => {
  return {
    get: async (key: string) => {
      return kv.get(key);
    },
    set: async (key: string, value: string, ttl?: number) => {
      return kv.put(key, value, ttl ? { expirationTtl: ttl } : undefined);
    },
    delete: async (key: string) => {
      return kv.delete(key);
    },
  };
};

/**
 * Better Auth Instance
 */
export const auth = (env: CloudflareBindings): ReturnType<typeof betterAuth> => {
  const kv = env.SCAM_VAULT_KV

  const database = getDrizzleAdapter(env)

  return betterAuth({
    ...betterAuthOptions,
    database,
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    socialProviders: {
      github: {
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
        //redirectURI: "http://localhost:3000/api/auth/callback/github/",
        //redirectURI: "https://api.ainsa2279.workers.dev/api/auth/callback/github/"
      },
    },
    trustedOrigins: [env.CORS_ORIGIN_URL],
    secondaryStorage: createKVStorage(kv)
  });
};
