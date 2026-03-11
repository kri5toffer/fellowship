import { z } from "zod";
import { faker } from "@faker-js/faker";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// ============================================================================
// Shared Enums & Helpers
// ============================================================================

const FieldTypeEnum = z.enum(["TEXT", "NUMBER", "CHECKBOX", "DATE"]);

function generateFakeValue(fieldType: string): string {
  switch (fieldType) {
    case "NUMBER":
      return String(faker.number.int({ min: 0, max: 100_000 }));
    case "CHECKBOX":
      return faker.datatype.boolean() ? "true" : "false";
    case "DATE":
      return faker.date.between({ from: "2020-01-01", to: "2026-12-31" }).toISOString().split("T")[0]!;
    case "TEXT":
    default:
      return faker.person.fullName();
  }
}

// ============================================================================
// Input Schemas
// ============================================================================

const GetAllInput = z.object({
  baseId: z.string(),
});

const GetByIdInput = z.object({
  id: z.string(),
});

const GetRowsInput = z.object({
  tableId: z.string(),
  limit: z.number().min(1).max(500).default(100),
  cursor: z.string().nullish(),
});

const CreateTableInput = z.object({
  baseId: z.string(),
  tableName: z.string().min(1),
});

const CreateColumnInput = z.object({
  tableId: z.string(),
  columnName: z.string().min(1),
  fieldType: FieldTypeEnum,
});

const CreateRowInput = z.object({
  tableId: z.string(),
});

const UpdateCellInput = z.object({
  rowId: z.string(),
  columnId: z.string(),
  cellValue: z.string(),
});

const DeleteRowInput = z.object({
  rowId: z.string(),
});

const DeleteColumnInput = z.object({
  columnId: z.string(),
});

const AddBulkRowsInput = z.object({
  tableId: z.string(),
  count: z.number().min(1).max(200_000).default(100_000),
});

// ============================================================================
// Router
// ============================================================================

export const tableRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(GetAllInput)
    .query(async ({ ctx, input }) => {
      return ctx.db.table.findMany({
        where: { baseId: input.baseId },
        orderBy: { displayOrder: "asc" },
      });
    }),

  getById: publicProcedure
    .input(GetByIdInput)
    .query(async ({ ctx, input }) => {
      const table = await ctx.db.table.findUnique({
        where: { id: input.id },
        include: {
          columns: { orderBy: { displayOrder: "asc" } },
          _count: { select: { rows: true } },
        },
      });

      if (!table) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Table with ID "${input.id}" not found`,
        });
      }

      return table;
    }),

  getRows: publicProcedure
    .input(GetRowsInput)
    .query(async ({ ctx, input }) => {
      const { tableId, limit, cursor } = input;

      const rows = await ctx.db.row.findMany({
        where: { tableId },
        take: limit + 1,
        orderBy: { displayOrder: "asc" },
        include: { cells: true },
        ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      });

      let nextCursor: string | undefined;
      if (rows.length > limit) {
        const nextItem = rows.pop();
        nextCursor = nextItem?.id;
      }

      return { rows, nextCursor };
    }),

  create: publicProcedure
    .input(CreateTableInput)
    .mutation(async ({ ctx, input }) => {
      // Verify base exists
      const base = await ctx.db.base.findUnique({
        where: { id: input.baseId },
      });

      if (!base) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Base with ID "${input.baseId}" not found`,
        });
      }

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
    .input(CreateColumnInput)
    .mutation(async ({ ctx, input }) => {
      // Verify table exists
      const table = await ctx.db.table.findUnique({
        where: { id: input.tableId },
      });

      if (!table) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Table with ID "${input.tableId}" not found`,
        });
      }

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
    .input(CreateRowInput)
    .mutation(async ({ ctx, input }) => {
      // Verify table exists
      const table = await ctx.db.table.findUnique({
        where: { id: input.tableId },
      });

      if (!table) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Table with ID "${input.tableId}" not found`,
        });
      }

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
    .input(UpdateCellInput)
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
    .input(DeleteRowInput)
    .mutation(async ({ ctx, input }) => {
      const row = await ctx.db.row.findUnique({
        where: { id: input.rowId },
      });

      if (!row) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Row with ID "${input.rowId}" not found`,
        });
      }

      return ctx.db.row.delete({
        where: { id: input.rowId },
      });
    }),

  deleteColumn: publicProcedure
    .input(DeleteColumnInput)
    .mutation(async ({ ctx, input }) => {
      const column = await ctx.db.column.findUnique({
        where: { id: input.columnId },
      });

      if (!column) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Column with ID "${input.columnId}" not found`,
        });
      }

      return ctx.db.column.delete({
        where: { id: input.columnId },
      });
    }),

  addBulkRows: publicProcedure
    .input(AddBulkRowsInput)
    .mutation(async ({ ctx, input }) => {
      const { tableId, count } = input;

      // Verify table exists
      const table = await ctx.db.table.findUnique({
        where: { id: tableId },
      });

      if (!table) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Table with ID "${tableId}" not found`,
        });
      }

      const columns = await ctx.db.column.findMany({
        where: { tableId },
        orderBy: { displayOrder: "asc" },
      });

      const maxOrder = await ctx.db.row.aggregate({
        where: { tableId },
        _max: { displayOrder: true },
      });
      let currentOrder = (maxOrder._max.displayOrder ?? -1) + 1;

      const BATCH_SIZE = 1000;

      for (let i = 0; i < count; i += BATCH_SIZE) {
        const batchCount = Math.min(BATCH_SIZE, count - i);

        await ctx.db.$transaction(async (tx) => {
          const rowData = Array.from({ length: batchCount }, (_, j) => ({
            tableId,
            displayOrder: currentOrder + j,
          }));

          await tx.row.createMany({ data: rowData });

          const createdRows = await tx.row.findMany({
            where: { tableId },
            orderBy: { displayOrder: "asc" },
            skip: currentOrder,
            take: batchCount,
            select: { id: true },
          });

          const cellData = createdRows.flatMap((row) =>
            columns.map((col) => ({
              rowId: row.id,
              columnId: col.id,
              cellValue: generateFakeValue(col.fieldType),
            })),
          );

          if (cellData.length > 0) {
            await tx.cell.createMany({ data: cellData });
          }
        });

        currentOrder += batchCount;
      }

      return { inserted: count };
    }),
});
