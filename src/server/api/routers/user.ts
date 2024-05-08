import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  toggleInterestCategory: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      const { userId } = ctx;

      const user = await ctx.db.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          interestedCategories: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }
      const alreadyExist = user.interestedCategories.find(
        (category) => category.categoryId === id,
      )
        ? true
        : false;

      if (alreadyExist) {
        // Remove the category
        await ctx.db.user.update({
          where: {
            id: userId,
          },
          data: {
            interestedCategories: {
              deleteMany: {
                categoryId: id,
              },
            },
          },
        });
      } else {
        // Add the category
        await ctx.db.user.update({
          where: {
            id: userId,
          },
          data: {
            interestedCategories: {
              create: {
                categoryId: id,
              },
            },
          },
        });
      }

      return {
        message: !alreadyExist
          ? "Added to interest"
          : "Removed form the interest",
      };
    }),
});
