import type { HonoAppType } from "../types";
import { createFactory } from "hono/factory";
import { zValidator } from "@hono/zod-validator";

import { getDb } from "@/db";
import { category, scam } from "@/db";
import { createCategoryReqSchema, updateCategoryReqSchema } from "@/schema/category.schema";
import { eq } from "drizzle-orm";
import { apiKey } from "@/middleware/apiKey";

const { createHandlers } = createFactory<HonoAppType>()

const getCategories = createHandlers(apiKey, async (c) => {
  const db = getDb(c.env)

  const categories = await db.query.category.findMany({
    columns: {
      parentCategoryId: false
    },
    with: {
      parentCategory: true
    }
  })

  return c.json({
    data: categories,
  });
});

const getCategory = createHandlers(async (c) => {
  const db = getDb(c.env)
  const cId = c.req.param("category_id")

  const foundCategory = await db.query.category.findFirst({
    where: (category) => eq(category.id, cId),
    columns: {
      parentCategoryId: false
    },
    with: {
      parentCategory: true
    }
  })

  return c.json({
    data: foundCategory,
  });
});

const createCategory = createHandlers(zValidator("json", createCategoryReqSchema), async (c) => {
  const db = getDb(c.env)
  const body = c.req.valid("json")

  const createdCategory = await db.insert(category).values(body).returning()

  return c.json({
    data: createdCategory[0],
    message: "Category created Successfully"
  }, 201)
})

const updateCategory = createHandlers(zValidator("json", updateCategoryReqSchema), async (c) => {
  const cId = Number(c.req.param("category_id"));

  const db = getDb(c.env)
  const body = c.req.valid("json")

  const updatedCategory = await db.update(category).set(body).where(eq(category.id, cId)).returning()
  console.log(updatedCategory)

  if (updatedCategory === null || updatedCategory.length === 0) {
    return c.json({
      data: null,
      message: "Category doesn't exists"
    }, 404)
  }

  return c.json({
    data: updatedCategory[0],
    message: "Category updated Successfully"
  })
})

const deleteCategory = createHandlers(async (c) => {
  const cId = Number(c.req.param("category_id"));

  const db = getDb(c.env)
  //const body = c.req.valid("json")

  const scamsWithCatPromise = db.select().from(scam).where(eq(scam.categoryId, cId)).limit(1)
  const parentCatWithCatPromise = db.select().from(category).where(eq(category.parentCategoryId, cId)).limit(1)
  const toBeDeletedCategoryPromise = db.select().from(category).where(eq(category.id, cId))

  const [scamsWithCat, parentCatWithCat, toBeDeletedCategory] = await Promise.all([scamsWithCatPromise, parentCatWithCatPromise, toBeDeletedCategoryPromise])

  console.log(parentCatWithCat)

  if (parentCatWithCat.length !== 0) {
    return c.json({
      message: "Delete Sub-Categories before deleting Category"
    })
  }

  if (scamsWithCat.length !== 0) {
    return c.json({
      message: "Delete Scam before deleting Category"
    })
  }

  if (toBeDeletedCategory.length === 0) {
    return c.json({
      message: "Category doesn't exists"
    }, 404)
  }

  await db.delete(category).where(eq(category.id, cId))

  return c.json({
    message: "Category Deleted Successfully"
  })
})

export { getCategories, getCategory, createCategory, updateCategory, deleteCategory }
