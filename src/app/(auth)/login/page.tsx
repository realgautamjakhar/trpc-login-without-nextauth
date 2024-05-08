import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import LoginForm from "@/forms/auth/login-form";
import React from "react";

const LoginPage = () => {
  return (
    <main className="flex items-center justify-center">
      <Card className=" w-full max-w-md">
        <CardHeader className="flex flex-col gap-6">
          <CardTitle className="text-center">Login</CardTitle>
          <div className="flex flex-col gap-1 text-center">
            <Heading>Welcome back to ECOMMERCE</Heading>
            <Text>The next gen business marketplace</Text>
          </div>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
