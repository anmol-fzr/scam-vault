import { Factory } from "hono/factory";
import { auth } from "@/auth";
import { HonoAppType } from "@/types";
import type { Session, User } from "better-auth"

const { createMiddleware } = new Factory<HonoAppType & {
  Variables: {
    session: Session;
    user: User;
  }
}>();

const authenticate = createMiddleware(async (c, next) => {
  const session = await auth(c.env).api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return c.json({
      message: "Unauthorized"
    }, 401)
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
})

export { authenticate }
