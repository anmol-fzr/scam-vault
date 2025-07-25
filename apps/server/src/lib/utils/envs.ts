const env = process.env;

const envs = Object.freeze({
  BETTER_AUTH: {
    URL: env.BETTER_AUTH_URL,
    SECRET: env.BETTER_AUTH_SECRET
  },
  DB: {
    URL: env.TURSO_DB_URL,
    TOKEN: env.TURSO_DB_TOKEN
  }
})

export { envs }
