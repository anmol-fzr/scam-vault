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

const apiKey = createMiddleware(async (c, next) => {
  const key = c.req.header("sv-api-key")
  console.log(key);

  if (!key) {
    return c.json({
      message: "Missing API Key",
    }, 401)
  }

  try {
    const { valid, error } = await auth(c.env).api.verifyApiKey({
      body: {
        key,
      },
    });

    if (error !== null) {
      return c.json({
        error,
        message: error.message
      }, 400)
    }
    if (!valid) {
      return c.json({
        message: "Invalid API Key"
      }, 400)
    }
  } catch (error) {
    return c.json({
      error,
      message: "Unable to Verify API Key"
    }, 500)
  }

  // const session = await auth(c.env).api.getSession({ headers: c.req.raw.headers });
  //
  // if (!session) {
  //   return c.json({
  //     message: "Unauthorized"
  //   }, 401)
  // }
  //
  // c.set("user", session.user);
  // c.set("session", session.session);
  return next();
})

export { apiKey }
