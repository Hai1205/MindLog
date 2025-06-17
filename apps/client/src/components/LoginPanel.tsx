import Link from "next/link";

const LoginPanel = () => {
  return (
    <>
      <Link href={"/auth/login"}>Login</Link>
      
      <Link href={"/auth/register"}>Register</Link>
    </>
  );
};

export default LoginPanel;