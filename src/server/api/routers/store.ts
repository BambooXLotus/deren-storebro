import { and, eq } from "drizzle-orm";
import slugify from "slugify";
import { z } from "zod";

import { StoreCreateValidator } from "@/lib/validators/store-validators";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { stores } from "@/server/db/schema";

function slugMe(text: string) {
  return slugify(text, { strict: true, lower: true });
}

export const storeRouter = createTRPCRouter({
  getFirst: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.stores.findFirst({
      where: (stores, { eq }) => eq(stores.clerkId, ctx.auth.userId),
    });
  }),
  getById: protectedProcedure
    .input(
      z.object({
        storeId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      const returnValue = ctx.db.query.stores.findFirst({
        where: (stores, { eq }) => eq(stores.id, input.storeId),
      });

      return returnValue;
    }),
  getBySlug: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      const returnValue = ctx.db.query.stores.findFirst({
        where: (stores, { eq }) => eq(stores.slug, input.slug),
      });

      return returnValue;
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.stores.findMany({
      where: (stores, { eq }) => eq(stores.clerkId, ctx.auth.userId),
    });
  }),
  create: protectedProcedure
    .input(StoreCreateValidator)
    .mutation(async ({ ctx, input }) => {
      const slug = slugMe(input.name);

      const returnValue = await ctx.db
        .insert(stores)
        .values({
          name: input.name,
          slug,
          clerkId: ctx.auth.userId,
        })
        .returning();

      return returnValue;
    }),
  edit: protectedProcedure
    .input(
      z.object({
        storeId: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const slug = slugMe(input.name);

      const returnValue = await ctx.db
        .update(stores)
        .set({
          name: input.name,
          slug,
          clerkId: ctx.auth.userId,
          updatedAt: new Date().toISOString(),
        })
        .where(
          eq(stores.id, input.storeId),
          // TODO: Figure out how to let other users to edit a store
          // eq(stores.clerkId, ctx.auth.userId),
        )
        .returning();

      return returnValue;
    }),
  saveImage: protectedProcedure
    .input(
      z.object({
        storeId: z.string(),
        imageUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const returnValue = await ctx.db
        .update(stores)
        .set({
          imageUrl: input.imageUrl,
          updatedAt: new Date().toISOString(),
        })
        .where(
          and(
            eq(stores.id, input.storeId),
            // eq(stores.clerkId, ctx.auth.userId),
          ),
        )
        .returning();

      return returnValue;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        storeId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const returnValue = await ctx.db
        .delete(stores)
        .where(
          and(
            eq(stores.id, input.storeId),
            eq(stores.clerkId, ctx.auth.userId),
          ),
        )
        .returning();

      return returnValue;
    }),
});
