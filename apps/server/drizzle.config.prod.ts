import { defineConfig } from 'drizzle-kit';
import { envs } from './src/lib/utils/envs';

export default defineConfig({
  out: './migrations/prod',
  schema: './src/db/schema/index.ts',
  dialect: 'turso',
  dbCredentials: {
    url: envs.DB.URL,
    authToken: envs.DB.TOKEN
  },
});
