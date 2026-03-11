import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

// ============================================================================
// Input Schemas
// ============================================================================

const GetByIdInput = z.object({
  id: z.string(),
});

const CreateInput = z.object({
  baseName: z.string().min(1),
  description: z.string().optional(),
  color: z.string().optional(),
});

const UpdateInput = z.object({
  id: z.string(),
  baseName: z.string().min(1).optional(),
  description: z.string().optional(),
  color: z.string().optional(),
});

const DeleteInput = z.object({
  id: z.string(),
});

// ============================================================================
// Router
// ============================================================================

export const baseRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.base.findMany({
      orderBy: { displayOrder: "asc" },
    });
  }),

  getById: publicProcedure
    .input(GetByIdInput)
    .query(async ({ ctx, input }) => {
      const base = await ctx.db.base.findUnique({
        where: { id: input.id },
        include: {
          tables: { orderBy: { displayOrder: "asc" } },
        },
      });

      if (!base) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Base with ID "${input.id}" not found`,
        });
      }

      return base;
    }),

  // ---- Protected (write) procedures ----

  create: protectedProcedure
    .input(CreateInput)
    .mutation(async ({ ctx, input }) => {
      const maxOrder = await ctx.db.base.aggregate({ _max: { displayOrder: true } });
      return ctx.db.base.create({
        data: {
          baseName: input.baseName,
          description: input.description,
          color: input.color ?? "#1d7c6a",
          displayOrder: (maxOrder._max.displayOrder ?? -1) + 1,
          createdById: ctx.user?.id,
        },
      });
    }),

  update: protectedProcedure
    .input(UpdateInput)
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.base.findUnique({
        where: { id: input.id },
      });

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Base with ID "${input.id}" not found`,
        });
      }

      return ctx.db.base.update({
        where: { id: input.id },
        data: {
          baseName: input.baseName,
          description: input.description,
          color: input.color,
        },
      });
    }),

  delete: protectedProcedure
    .input(DeleteInput)
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.base.findUnique({
        where: { id: input.id },
      });

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Base with ID "${input.id}" not found`,
        });
      }

      return ctx.db.base.delete({
        where: { id: input.id },
      });
    }),
});
