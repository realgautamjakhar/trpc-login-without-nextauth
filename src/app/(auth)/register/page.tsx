import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/forms/auth/register-form";

const RegisterPage = () => {
  return (
    <main className="flex items-center justify-center">
      <Card className=" w-full max-w-md">
        <CardHeader className="flex flex-col gap-6">
          <CardTitle className="text-center">Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default RegisterPage;
