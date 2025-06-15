import { redirect } from "next/navigation";

export default async function SetupLayout() {
  redirect("/login");
}
