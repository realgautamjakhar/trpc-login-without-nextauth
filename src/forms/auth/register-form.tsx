"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerFormSchema } from "@/validations/auth";
import { api } from "@/trpc/react";
import { Text } from "@/components/ui/text";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const register = api.auth.register.useMutation();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    register
      .mutateAsync({
        ...data,
      })
      .then((res) => {
        router.push(`/verify?email=${data.email}`);
      });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
              </FormItem>
            );
          }}
        />{" "}
        <FormField
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
                </FormControl>
              </FormItem>
            );
          }}
        />{" "}
        <FormField
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="********" {...field} />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <Button isLoading={register.isPending}>Create Account</Button>
        <Text className="mt-6 text-center">
          Have an Account?{" "}
          <Link className="font-semibold" href={"/login"}>
            Login
          </Link>
        </Text>
      </form>
    </Form>
  );
};

export default RegisterForm;
