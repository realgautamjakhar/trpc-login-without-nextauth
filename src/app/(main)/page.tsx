"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import UserInterestsForm from "@/forms/user-interests-form";
import useUser from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter();
  const { status } = useUser();

  if (status === "unAuthenticated") {
    return router.push("/login");
  }
  if (status === "pending") {
    return (
      <main className="flex items-center justify-center">
        <Text>loading...</Text>
      </main>
    );
  }
  return (
    <main className="flex items-center justify-center">
      <Card className=" w-full max-w-md">
        <CardHeader className="flex flex-col gap-6 ">
          <CardTitle className="text-center">
            Please mark your interests!
          </CardTitle>
          <Text className="mx-auto max-w-xs text-center">
            We will keep you notified.
          </Text>
        </CardHeader>
        <CardContent>
          <UserInterestsForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
