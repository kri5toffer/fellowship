import { z } from "zod";
import { faker } from "@faker-js/faker";
import { TRPCError } from "@trpc/server";
import type { Prisma } from "../../../../generated/prisma";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// ============================================================================
// Shared Enums & Helpers
// ============================================================================

const FieldTypeEnum = z.enum(["TEXT", "NUMBER", "CHECKBOX"]);

function generateFakeValue(fieldType: string): string {
  switch (fieldType) {
    case "NUMBER":
      return String(faker.number.int({ min: 0, max: 100_000 }));
    case "CHECKBOX":
      return faker.datatype.boolean() ? "true" : "false";
    case "TEXT":
    default:
      return faker.person.fullName();
  }
}

type FilterInput = { columnId: string; operator: string; value: string };
type ColumnInfo = { id: string; fieldType: string };

// Recursive filter tree types (mirrors client-side types)
type FilterNodeServer =
  | { id: string; type?: "condition"; columnId: string; operator: string; value: string }
  | { id: string; type: "group"; conjunction: "and" | "or"; children: FilterNodeServer[] };

function isServerFilterGroup(
  node: FilterNodeServer,
): node is { id: string; type: "group"; conjunction: "and" | "or"; children: FilterNodeServer[] } {
  return "type" in node && node.type === "group";
}

function buildCellCondition(filter: FilterInput, _fieldType: string) {
  const { operator, value } = filter;

  switch (operator) {
    case "contains":
      return { cellValue: { contains: value, mode: "insensitive" as const } };
    case "not_contains":
      return { cellValue: { not: { contains: value, mode: "insensitive" as const } } };
    case "equals":
      return { cellValue: value };
    case "not_equals":
      return { cellValue: { not: value } };
    case "gt":
      return { cellValue: { gt: value } };
    case "lt":
      return { cellValue: { lt: value } };
    case "gte":
      return { cellValue: { gte: value } };
    case "lte":
      return { cellValue: { lte: value } };
    case "before":
      return { cellValue: { lt: value } };
    case "after":
      return { cellValue: { gt: value } };
    case "empty":
      return { OR: [{ cellValue: null }, { cellValue: "" }] };
    case "not_empty":
      return {
        AND: [
          { cellValue: { not: null } },
          { cellValue: { not: "" } },
        ],
      };
    case "is_checked":
      return { cellValue: "true" };
    case "is_unchecked":
      return {
        OR: [
          { cellValue: null },
          { cellValue: "" },
          { cellValue: "false" },
        ],
      };
    default:
      return {};
  }
}

/** Build a Prisma RowWhereInput from a single FilterNode (recursive). */
function buildFilterNodeCondition(
  node: FilterNodeServer,
  columnMap: Record<string, ColumnInfo>,
): Prisma.RowWhereInput | null {
  if (isServerFilterGroup(node)) {
    const childConditions = node.children
      .map((child) => buildFilterNodeCondition(child, columnMap))
      .filter((c): c is Prisma.RowWhereInput => c !== null);

    if (childConditions.length === 0) return null;

    return node.conjunction === "or"
      ? { OR: childConditions }
      : { AND: childConditions };
  }

  // It's a condition
  const col = columnMap[node.columnId];
  const fieldType = col?.fieldType ?? "TEXT";
  const cellCondition = buildCellCondition(node, fieldType);

  return {
    cells: {
      some: {
        columnId: node.columnId,
        ...cellCondition,
      },
    },
  };
}

/** Build where clause from a FilterGroup tree. */
function buildRowsWhereClause(
  tableId: string,
  filterGroup: FilterNodeServer | null | undefined,
  columnMap: Record<string, ColumnInfo>,
): Prisma.RowWhereInput {
  const base: Prisma.RowWhereInput = { tableId };

  if (!filterGroup) return base;

  const condition = buildFilterNodeCondition(filterGroup, columnMap);
  if (!condition) return base;

  return { ...base, AND: [condition] };
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

const FilterNodeInput: z.ZodType<FilterNodeServer> = z.lazy(() =>
  z.union([
    z.object({
      id: z.string(),
      type: z.literal("condition").optional(),
      columnId: z.string(),
      operator: z.string(),
      value: z.string(),
    }),
    z.object({
      id: z.string(),
      type: z.literal("group"),
      conjunction: z.enum(["and", "or"]),
      children: z.array(FilterNodeInput),
    }),
  ]),
);

const FilterGroupInput = z.object({
  id: z.string(),
  type: z.literal("group"),
  conjunction: z.enum(["and", "or"]),
  children: z.array(FilterNodeInput),
});

const GetRowsInput = z.object({
  tableId: z.string(),
  limit: z.number().min(1).max(500).default(100),
  cursor: z.string().nullish(),
  filterGroup: FilterGroupInput.optional(),
  search: z.string().optional().default(""),
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

const RenameColumnInput = z.object({
  columnId: z.string(),
  columnName: z.string().min(1),
});

const AddBulkRowsInput = z.object({
  tableId: z.string(),
  count: z.number().min(1).max(200_000).default(100_000),
  sequential: z.boolean().optional(),
});

const DeleteTableInput = z.object({
  tableId: z.string(),
});

const RenameTableInput = z.object({
  tableId: z.string(),
  tableName: z.string().min(1),
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
      const { tableId, limit, cursor, filterGroup, search } = input;

      const table = await ctx.db.table.findUnique({
        where: { id: tableId },
        include: { columns: { orderBy: { displayOrder: "asc" } } },
      });
      const columnMap = Object.fromEntries(
        (table?.columns ?? []).map((c) => [c.id, c]),
      );

      const whereClause = buildRowsWhereClause(tableId, filterGroup, columnMap);

      if (search) {
        whereClause.AND = [
          ...(Array.isArray(whereClause.AND) ? whereClause.AND : []),
          { cells: { some: { cellValue: { contains: search, mode: "insensitive" as const } } } },
        ];
      }

      const rows = await ctx.db.row.findMany({
        where: whereClause,
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

      const defaultColumns = [
        { columnName: "Name", fieldType: "TEXT" as const, displayOrder: 0 },
        { columnName: "Age", fieldType: "NUMBER" as const, displayOrder: 1 },
        { columnName: "Date", fieldType: "DATE" as const, displayOrder: 2 },
      ];

      return ctx.db.$transaction(async (tx) => {
        const table = await tx.table.create({
          data: {
            baseId: input.baseId,
            tableName: input.tableName,
            displayOrder: (maxOrder._max.displayOrder ?? -1) + 1,
            columns: { create: defaultColumns },
          },
          include: { columns: { orderBy: { displayOrder: "asc" } } },
        });

        const rowsData = Array.from({ length: 3 }, (_, i) => ({
          tableId: table.id,
          displayOrder: i,
        }));
        await tx.row.createMany({ data: rowsData });

        const createdRows = await tx.row.findMany({
          where: { tableId: table.id },
          orderBy: { displayOrder: "asc" },
          select: { id: true },
        });

        const cellData = createdRows.flatMap((row) =>
          table.columns.map((col) => ({
            rowId: row.id,
            columnId: col.id,
            cellValue: generateFakeValue(col.fieldType),
          })),
        );
        await tx.cell.createMany({ data: cellData });

        return table;
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

  renameColumn: publicProcedure
    .input(RenameColumnInput)
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

      return ctx.db.column.update({
        where: { id: input.columnId },
        data: { columnName: input.columnName },
      });
    }),

  addBulkRows: publicProcedure
    .input(AddBulkRowsInput)
    .mutation(async ({ ctx, input }) => {
      const { tableId, count, sequential } = input;

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

          const cellData = createdRows.flatMap((row, rowIdx) =>
            columns.map((col) => ({
              rowId: row.id,
              columnId: col.id,
              cellValue: sequential
                ? String(i + rowIdx + 1)
                : generateFakeValue(col.fieldType),
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

  deleteTable: publicProcedure
    .input(DeleteTableInput)
    .mutation(async ({ ctx, input }) => {
      const table = await ctx.db.table.findUnique({ where: { id: input.tableId } });
      if (!table) {
        throw new TRPCError({ code: "NOT_FOUND", message: `Table with ID "${input.tableId}" not found` });
      }
      return ctx.db.table.delete({ where: { id: input.tableId } });
    }),

  renameTable: publicProcedure
    .input(RenameTableInput)
    .mutation(async ({ ctx, input }) => {
      const table = await ctx.db.table.findUnique({ where: { id: input.tableId } });
      if (!table) {
        throw new TRPCError({ code: "NOT_FOUND", message: `Table with ID "${input.tableId}" not found` });
      }
      return ctx.db.table.update({ where: { id: input.tableId }, data: { tableName: input.tableName } });
    }),
});
