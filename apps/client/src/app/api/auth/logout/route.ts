import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function GET() {
  console.log("logout");
  await deleteSession();
  redirect("/");
}