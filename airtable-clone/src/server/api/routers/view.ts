import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Prisma } from "../../../../generated/prisma";

// Filters are stored as JSON — accept any valid filter tree or legacy array
const FilterDataSchema = z.any();

const SortConfigSchema = z
  .object({ columnId: z.string(), direction: z.enum(["asc", "desc"]) })
  .nullable();

const GetByTableInput = z.object({
  tableId: z.string(),
});

const CreateInput = z.object({
  tableId: z.string(),
  viewName: z.string().min(1),
  filters: FilterDataSchema.default([]),
  groupByColumnId: z.string().nullish(),
  sortConfig: SortConfigSchema.optional(),
  hiddenFieldIds: z.array(z.string()).default([]),
  color: z.string().optional(),
});

const UpdateInput = z.object({
  id: z.string(),
  viewName: z.string().min(1).optional(),
  filters: FilterDataSchema.optional(),
  groupByColumnId: z.string().nullish().optional(),
  sortConfig: SortConfigSchema.optional(),
  hiddenFieldIds: z.array(z.string()).optional(),
  color: z.string().nullish().optional(),
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
          filters: input.filters as unknown as Prisma.InputJsonValue,
          groupByColumnId: input.groupByColumnId ?? null,
          sortConfig: (input.sortConfig ?? null) as unknown as Prisma.InputJsonValue ?? Prisma.DbNull,
          hiddenFieldIds: input.hiddenFieldIds as unknown as Prisma.InputJsonValue,
          color: input.color ?? null,
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
          ...(input.filters !== undefined && { filters: input.filters as unknown as Prisma.InputJsonValue }),
          ...(input.groupByColumnId !== undefined && { groupByColumnId: input.groupByColumnId }),
          ...(input.sortConfig !== undefined && { sortConfig: (input.sortConfig ?? null) as unknown as Prisma.InputJsonValue ?? Prisma.DbNull }),
          ...(input.hiddenFieldIds !== undefined && { hiddenFieldIds: input.hiddenFieldIds as unknown as Prisma.InputJsonValue }),
          ...(input.color !== undefined && { color: input.color ?? null }),
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
