import { deleteSession } from "@/utils/services/session";
import { redirect } from "next/navigation";

export async function GET() {
  console.log("logout");
  await deleteSession();
  redirect("/");
}