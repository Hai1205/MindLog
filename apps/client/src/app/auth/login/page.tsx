import Link from "next/link";
import LoginForm from "./_components/LoginForm";
import { Button } from "@/components/ui/button";
import { SERVER_URL } from "@/lib/constants";

const LoginPage = () => {
  return (
    <div className=" bg-white p-8 border rounded-md gap-3 shadow-md w-96 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">Login Page</h1>
      
      <LoginForm />

      <Link href={"/auth/forgot"}>Forgot Your Password?</Link>

      <Button>
        <a href={`${SERVER_URL}/auth/google/login`}>Login With Google</a>
      </Button>
    </div>
  );
};

export default LoginPage;