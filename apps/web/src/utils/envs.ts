const env = import.meta.env

const envs = Object.freeze({
  SERVER_URL: env.VITE_APP_SERVER_URL!,
})

export { envs }
