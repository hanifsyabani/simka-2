import { redirect } from "next/navigation";

export default async function SetupLayout() {
  // Check if the user is authenticated
  
  redirect("/login");
}
