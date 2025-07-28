import { Hono } from 'hono/quick'
import { categoryRouter, scamRouter } from '@/router'
import { cors } from 'hono/cors'
import { HonoAppType } from './types'
import { auth } from './lib/better-auth'

const app = new Hono<HonoAppType>()

app.use(cors({
  origin: (_origin, c) => c.env.CORS_ORIGIN_URL,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.get('/', (c) => c.text('OK!'))

const routes = app
  .route("/category", categoryRouter)
  .route("/scam", scamRouter)


app.on(["POST"], '/test', async (c) => {

  const resp = await fetch("http://localhost:3000/api/auth/organization/set-active", {
    method: "POST",
    headers: c.req.header()
  })
  const data = await resp.json()

  return c.json({ resp: data, headers: c.req.header() })
});

app.on(['GET', 'POST'], '/api/*', (c) => auth(c.env).handler(c.req.raw));


export default app
export type ApiRoutes = typeof routes
