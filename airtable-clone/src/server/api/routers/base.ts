import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const baseRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.base.findMany({
      orderBy: { displayOrder: "asc" },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.base.findUnique({
        where: { id: input.id },
        include: {
          tables: { orderBy: { displayOrder: "asc" } },
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        baseName: z.string().min(1),
        description: z.string().optional(),
        color: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const maxOrder = await ctx.db.base.aggregate({ _max: { displayOrder: true } });
      return ctx.db.base.create({
        data: {
          baseName: input.baseName,
          description: input.description,
          color: input.color ?? "#1d7c6a",
          displayOrder: (maxOrder._max.displayOrder ?? -1) + 1,
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        baseName: z.string().min(1).optional(),
        description: z.string().optional(),
        color: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.base.update({
        where: { id: input.id },
        data: {
          baseName: input.baseName,
          description: input.description,
          color: input.color,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.base.delete({
        where: { id: input.id },
      });
    }),
});
