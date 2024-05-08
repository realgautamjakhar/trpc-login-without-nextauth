import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VerifyEmailForm from "@/forms/auth/verify-email-form";

const page = () => {
  return (
    <main className="flex items-center justify-center">
      <Card className=" w-full max-w-md">
        <CardHeader className="flex flex-col gap-6 ">
          <CardTitle className="text-center">Verify your email</CardTitle>
        </CardHeader>
        <CardContent>
          <VerifyEmailForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
