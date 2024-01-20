import { z } from "zod";

import { dbSchema, desc, eq } from "@streetcrisis/db";
import { ProductSchema } from "@streetcrisis/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const productsRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(dbSchema.products).orderBy(desc(dbSchema.products.id));
    return ctx.db.query.products.findMany({
      orderBy: desc(dbSchema.products.id),
      limit: 10,
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(dbSchema.products)
      //   .where(eq(dbSchema.products.id, input.id));

      return ctx.db.query.products.findFirst({
        where: eq(dbSchema.products.id, input.id),
      });
    }),

  create: protectedProcedure.input(ProductSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(dbSchema.products).values(input);
  }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(dbSchema.products)
      .where(eq(dbSchema.products.id, input));
  }),
});
