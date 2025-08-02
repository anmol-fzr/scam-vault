const env = import.meta.env

const envs = Object.freeze({
  SERVER_URL: env.VITE_APP_SERVER_URL!,
  APP_URL: env.VITE_APP_APP_URL!,
  DEV: env.DEV
})

export { envs }
