import { scam, getDb } from "@/db";
import type { HonoAppType } from "../types";
import { createFactory } from "hono/factory";
//import { scam } from "@/db/schema";
import { zValidator } from "@hono/zod-validator";
import { createScamReqSchema, updateScamReqSchema } from "@/schema/scam.schema";
import { paginator } from "@/middleware";
import { count } from "drizzle-orm";

const { createHandlers } = createFactory<HonoAppType>()

const getScams = createHandlers(paginator, async (c) => {
  const db = getDb(c.env)
  const { limit, offset } = c.get("paginate")

  const scamsPromise = db.select().from(scam).limit(limit).offset(offset)

  const countPromise = db
    .select({ count: count() })
    .from(scam)
    .then(rows => rows[0].count);

  const [scams, total] = await Promise.all([scamsPromise, countPromise]);

  const hasMore = offset + limit < total;

  return c.json({
    data: scams,
    paginate: {
      total,
      nextPage: hasMore ? offset + limit : null,
      hasMore,
    },
  });
});

const createScam = createHandlers(zValidator("json", createScamReqSchema), async (c) => {
  const body = c.req.valid("json")
  const db = getDb(c.env)

  await db.insert(scam).values({
    ...body,
    //reportedBy: ,
  })

  return c.json({
    data: body,
  });
});

const updateScam = createHandlers(zValidator("json", updateScamReqSchema), async (c) => {
  const scamId = c.req.param("scam_id")

  return c.json({
    data: [],
  });
});

export { getScams, createScam, updateScam }
