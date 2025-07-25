import type { HonoAppType } from "../types";
import { Hono } from "hono/quick";
import { getScams, createScam, updateScam } from "@/controller/scam.controller"

const scamRouter = new Hono<HonoAppType>()
  .get("/", ...getScams)
  .post("/", ...createScam)
  .patch("/:scam_id", ...updateScam)

export { scamRouter }
