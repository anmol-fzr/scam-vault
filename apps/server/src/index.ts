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

app.on(['GET', 'POST'], '/api/*', (c) => auth(c.env).handler(c.req.raw));

export default app
export type ApiRoutes = typeof routes
