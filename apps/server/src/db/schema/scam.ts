import { relations, sql } from "drizzle-orm";
import { integer, text, sqliteTable, AnySQLiteColumn, } from "drizzle-orm/sqlite-core";
import { user } from "./auth";

export const category = sqliteTable("category", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }).notNull(),

  title: text("title", { length: 256 }).notNull(),
  desc: text("description").notNull(),

  parentCategoryId: integer("parent_category-id", { mode: "number" }).references((): AnySQLiteColumn => category.id),
})

export const scam = sqliteTable("scam", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }).notNull(),
  title: text("title", { length: 256 }).notNull(),
  desc: text("description").notNull(),
  categoryId: integer("category_id", { mode: "number" }).references(() => category.id).notNull(),

  reportedAt: text("reported_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  reportedBy: text("reported_by", { length: 256 }).references(() => user.id), // email or user ID
  sourceUrl: text("source_url", { length: 512 }),
  region: text("region", { length: 100 }),

  // Moderation fields
  isVerified: integer("is_verified", { mode: "boolean" }).default(false),
  reviewedBy: text("reviewed_by", { length: 256 }),
  reviewedAt: text("reported_at"),
  notes: text("notes") // For admin remarks
});

export const scamCategoryRelations = relations(scam, ({ one }) => ({
  categories: one(category),
}));

export const catCatRelations = relations(category, ({ one }) => ({
  parentCategory: one(category, {
    references: [category.id],
    fields: [category.parentCategoryId]
  }),
}));

export const categoryscamRelations = relations(category, ({ many }) => ({
  scams: many(scam),
}));
