'use client'
import FormEditAccount from "@/components/admin/accounts/form-edit-account";
import { useParams } from "next/navigation";

export default function page() {
  const params = useParams();
  const { id } = params as { id: string };
  return (
    <>
      <FormEditAccount id={id} />
    </>
  );
}
