"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { verificationFormSchema } from "@/validations/auth";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { Text } from "@/components/ui/text";

const VerifyEmailForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") ?? null;

  const verify = api.auth.verify.useMutation();
  const form = useForm<z.infer<typeof verificationFormSchema>>({
    resolver: zodResolver(verificationFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof verificationFormSchema>) => {
    if (!email) {
      toast.error("Invalid email");
      router.push("/register");
      return null;
    }

    verify
      .mutateAsync({
        ...data,
        email: email,
      })
      .then((res) => {
        router.push("/login");
      });
  };

  if (!email) {
    return <div>Invalid email</div>;
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Text className="mx-auto max-w-xs text-center">
          Enter the 8 digit code you have received on{" "}
          {email?.split("@")[0]?.slice(0, 3) + "...@" + email?.split("@")[1]}
        </Text>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Code</FormLabel>
              <FormControl>
                <InputOTP maxLength={8} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={verify.isPending}>Verify</Button>
      </form>
    </Form>
  );
};

export default VerifyEmailForm;
