import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const FilterConditionSchema = z.object({
  id: z.string(),
  columnId: z.string(),
  operator: z.string(),
  value: z.string(),
});

const GetByTableInput = z.object({
  tableId: z.string(),
});

const CreateInput = z.object({
  tableId: z.string(),
  viewName: z.string().min(1),
  filters: z.array(FilterConditionSchema).default([]),
  groupByColumnId: z.string().nullish(),
});

const UpdateInput = z.object({
  id: z.string(),
  viewName: z.string().min(1).optional(),
  filters: z.array(FilterConditionSchema).optional(),
  groupByColumnId: z.string().nullish().optional(),
});

const DeleteInput = z.object({
  id: z.string(),
});

export const viewRouter = createTRPCRouter({
  getByTable: publicProcedure
    .input(GetByTableInput)
    .query(async ({ ctx, input }) => {
      return ctx.db.view.findMany({
        where: { tableId: input.tableId },
        orderBy: { displayOrder: "asc" },
      });
    }),

  create: publicProcedure
    .input(CreateInput)
    .mutation(async ({ ctx, input }) => {
      const table = await ctx.db.table.findUnique({
        where: { id: input.tableId },
      });

      if (!table) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Table with ID "${input.tableId}" not found`,
        });
      }

      const maxOrder = await ctx.db.view.aggregate({
        where: { tableId: input.tableId },
        _max: { displayOrder: true },
      });

      return ctx.db.view.create({
        data: {
          tableId: input.tableId,
          viewName: input.viewName,
          filters: input.filters as object,
          groupByColumnId: input.groupByColumnId ?? null,
          displayOrder: (maxOrder._max.displayOrder ?? -1) + 1,
        },
      });
    }),

  update: publicProcedure
    .input(UpdateInput)
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.view.findUnique({
        where: { id: input.id },
      });

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `View with ID "${input.id}" not found`,
        });
      }

      return ctx.db.view.update({
        where: { id: input.id },
        data: {
          ...(input.viewName !== undefined && { viewName: input.viewName }),
          ...(input.filters !== undefined && { filters: input.filters as object }),
          ...(input.groupByColumnId !== undefined && {
            groupByColumnId: input.groupByColumnId,
          }),
        },
      });
    }),

  delete: publicProcedure
    .input(DeleteInput)
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.view.findUnique({
        where: { id: input.id },
      });

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `View with ID "${input.id}" not found`,
        });
      }

      return ctx.db.view.delete({
        where: { id: input.id },
      });
    }),
});
