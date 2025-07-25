import type { HonoAppType } from "../types";
import { Hono } from "hono/tiny";
import { getCategories, createCategory, updateCategory, deleteCategory, getCategory } from "@/controller/category.controller"

const categoryRouter = new Hono<HonoAppType>()
  .get("/", ...getCategories)
  .get("/:category_id", ...getCategory)
  .post("/", ...createCategory)
  .patch("/:category_id", ...updateCategory)
  .delete("/:category_id", ...deleteCategory)

export { categoryRouter }
