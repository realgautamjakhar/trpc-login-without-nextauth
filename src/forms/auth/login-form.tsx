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

import { loginFormSchema } from "@/validations/auth";
import { api, setToken } from "@/trpc/react";
import { Text } from "@/components/ui/text";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const login = api.auth.login.useMutation({
    onSettled(data) {
      setToken(data?.token.toString());
      localStorage.setItem("token", data?.token ? data?.token?.toString() : "");
    },
  });
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    login
      .mutateAsync({
        ...data,
      })
      .then((res) => {
        router.push("/");
      });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
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
                  <PasswordInput placeholder="Your password" {...field} />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <Button isLoading={login.isPending}>Login</Button>
        <Text className="mt-6 text-center">
          Don’t have an Account?{" "}
          <Link className="font-semibold" href={"/register"}>
            Sign up
          </Link>
        </Text>
      </form>
    </Form>
  );
};

export default LoginForm;
