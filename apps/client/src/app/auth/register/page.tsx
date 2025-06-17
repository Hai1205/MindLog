import Link from "next/link";
import RegisterForm from "./_components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="bg-white p-8 rounded-md shadow-md w-96 flex flex-col justify-center items-center">
      <h2 className="text-center text-2xl font-bold mb-4">Register Page</h2>

      <RegisterForm />

      <div>
        <p>Already have an account?</p>

        <Link className="underline" href={"/auth/login"}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;