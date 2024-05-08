import { generateOTP } from "@/lib/utils";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { login, register, verify } from "@/validations/auth";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(login).mutation(async ({ input, ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User doest not exist",
      });
    }

    if (!(await bcrypt.compare(input.password, user.password))) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }

    return {
      token: user.id,
      message: "Login success",
    };
  }),

  register: publicProcedure.input(register).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (user) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email already in use.",
      });
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    // random 8 digit code in string format
    const emailOtp = generateOTP();

    const createdUser = await ctx.db.user.create({
      data: {
        ...input,
        password: hashedPassword,
        emailOtp: emailOtp,
        emailOtpExpiresIn: new Date(Date.now() + 30 * 60 * 1000),
        isEmailVerified: false,
      },
    });

    return {
      user: createdUser,

      message: "Account created Successfully Your otp is: " + emailOtp,
    };
  }),

  verify: publicProcedure.input(verify).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Invalid Credentials",
      });
    }

    if (user.emailOtp !== input.otp) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Invalid otp",
      });
    }
    if (
      user.emailOtpExpiresIn &&
      new Date().getTime() > user.emailOtpExpiresIn?.getTime()
    ) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Otp expired",
      });
    }

    await ctx.db.user.update({
      where: {
        email: input.email,
      },
      data: {
        emailOtp: undefined,
        emailOtpExpiresIn: undefined,
        isEmailVerified: true,
      },
    });

    return {
      message: "Email verified successfully",
    };
  }),
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: parseInt(ctx.token!),
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User not found",
      });
    }

    return user;
  }),
});
