import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tableRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ baseId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.table.findMany({
        where: { baseId: input.baseId },
        orderBy: { displayOrder: "asc" },
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.table.findUnique({
        where: { id: input.id },
        include: {
          columns: { orderBy: { displayOrder: "asc" } },
          rows: {
            orderBy: { displayOrder: "asc" },
            include: {
              cells: true,
            },
          },
        },
      });
    }),

  create: publicProcedure
    .input(z.object({ baseId: z.string(), tableName: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const maxOrder = await ctx.db.table.aggregate({
        where: { baseId: input.baseId },
        _max: { displayOrder: true },
      });
      return ctx.db.table.create({
        data: {
          baseId: input.baseId,
          tableName: input.tableName,
          displayOrder: (maxOrder._max.displayOrder ?? -1) + 1,
        },
      });
    }),

  createColumn: publicProcedure
    .input(
      z.object({
        tableId: z.string(),
        columnName: z.string().min(1),
        fieldType: z.enum(["TEXT", "NUMBER", "CHECKBOX", "DATE"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const maxOrder = await ctx.db.column.aggregate({
        where: { tableId: input.tableId },
        _max: { displayOrder: true },
      });
      return ctx.db.column.create({
        data: {
          tableId: input.tableId,
          columnName: input.columnName,
          fieldType: input.fieldType,
          displayOrder: (maxOrder._max.displayOrder ?? -1) + 1,
        },
      });
    }),

  createRow: publicProcedure
    .input(z.object({ tableId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const maxOrder = await ctx.db.row.aggregate({
        where: { tableId: input.tableId },
        _max: { displayOrder: true },
      });
      const columns = await ctx.db.column.findMany({
        where: { tableId: input.tableId },
      });
      return ctx.db.row.create({
        data: {
          tableId: input.tableId,
          displayOrder: (maxOrder._max.displayOrder ?? -1) + 1,
          cells: {
            create: columns.map((col) => ({
              columnId: col.id,
              cellValue: col.fieldType === "CHECKBOX" ? "false" : "",
            })),
          },
        },
        include: { cells: true },
      });
    }),

  updateCell: publicProcedure
    .input(
      z.object({
        rowId: z.string(),
        columnId: z.string(),
        cellValue: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.cell.upsert({
        where: {
          rowId_columnId: {
            rowId: input.rowId,
            columnId: input.columnId,
          },
        },
        update: { cellValue: input.cellValue },
        create: {
          rowId: input.rowId,
          columnId: input.columnId,
          cellValue: input.cellValue,
        },
      });
    }),

  deleteRow: publicProcedure
    .input(z.object({ rowId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.row.delete({
        where: { id: input.rowId },
      });
    }),

  deleteColumn: publicProcedure
    .input(z.object({ columnId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.column.delete({
        where: { id: input.columnId },
      });
    }),
});
