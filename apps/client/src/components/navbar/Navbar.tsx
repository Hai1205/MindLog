import { getSession } from "@/lib/session";
import Link from "next/link";
import Profile from "../Profile";
import LoginPanel from "../LoginPanel";

const Navbar = async () => {
  const session = await getSession();

  return (
    <>
      <Link href="/" className="flex items-center gap-2">
        <h1 className="text-2xl font-bold p-2 cursor-pointer">MindLog</h1>
      </Link>

      <div className="md:ml-auto  px-2 flex flex-col md:flex-row gap-2 md:items-center md:justify-center [&>a:hover]:bg-sky-500 [&>a:hover]:text-sky-100 [&>a]:rounded-md [&>a]:transition [&>a]:duration-200 [&>a]:px-4 md:[&>a]:py-2 [&>a]:py-1 ">
        <Link href="/">
          Blog
        </Link>

        <Link href="#about">
          About
        </Link>

        <Link href="#contact">
          Contact
        </Link>

        {session && session.user ? (
          <Profile user={session.user} />
        ) : (
          <LoginPanel />
        )}
      </div>
    </>
  );
};

export default Navbar;