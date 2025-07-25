import { Factory } from "hono/factory";

type Paginate = {
  limit: number;
  offset: number,
}

const { createMiddleware } = new Factory<{
  Variables: {
    paginate: Paginate
  }
}>();

const paginator = createMiddleware(async (c, next) => {
  const limit = Number.parseInt(c.req.query("size") ?? "10") || 10;
  const page = Number.parseInt(c.req.query("page") ?? "1") || 1;

  c.set("paginate", {
    limit,
    offset: (page - 1) * limit,
  });

  await next();
});

export { paginator };
