import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getPaginationSkip, getPaginationTake } from "@/lib/utils";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          page: z.number(),
          limit: z.number(),
        })
        .partial(),
    )
    .query(async ({ input, ctx }) => {
      const { userId } = ctx;

      const [categories, total] = await Promise.all([
        ctx.db.category.findMany({
          skip: getPaginationSkip(input.page, input.limit),
          include: {
            ...(userId && {
              users: {
                where: {
                  userId: userId,
                },
              },
            }),
          },
          take: getPaginationTake(input.limit),
        }),
        ctx.db.category.count(),
      ]);

      return {
        categories: categories.map((category) => {
          return {
            ...category,
            isChecked: category?.users?.length > 0 ? true : false, // calculating the check mark on server itself else fetch the categories for the user (interested) and check if id is in that array of categories
          };
        }),
        total,
      };
    }),
});
