import { relations, sql } from "drizzle-orm";
import { index, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

import { createId } from "@paralleldrive/cuid2";

export const createTable = sqliteTableCreator(
  (name) => `deren-storebro_${name}`,
);

export const stores = createTable(
  "store",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name", { length: 256 }).unique().notNull(),
    slug: text("slug", { length: 256 }).unique().notNull(),
    description: text("description", { length: 1000 }),
    imageUrl: text("image_url", { length: 1000 }),
    clerkId: text("clerk_id", { length: 256 }).notNull(),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: text("updated_at"),
  },
  (store) => ({
    nameIndex: index("store_name_idx").on(store.name),
    slugIndex: index("store_slug_idx").on(store.slug),
  }),
);
export type InsertStore = typeof stores.$inferInsert;
export type SelectStore = typeof stores.$inferSelect;

export const storesRelations = relations(stores, ({ many }) => ({
  billboards: many(billboards),
}));

export const billboards = createTable(
  "billboard",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    label: text("label", { length: 256 }).notNull(),
    imageUrl: text("image_url", { length: 1000 }),
    storeId: text("store_id")
      .references(() => stores.id)
      .notNull(),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: text("updatedAt"),
  },
  (billboard) => ({
    idIndex: index("billboard_id_idx").on(billboard.id),
  }),
);
export type InsertBillboard = typeof billboards.$inferInsert;
export type SelectBillboard = typeof billboards.$inferSelect;

export const billboardsRelations = relations(billboards, ({ one }) => ({
  store: one(stores, {
    fields: [billboards.storeId],
    references: [stores.id],
  }),
}));
