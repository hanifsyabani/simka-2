'use client';


import FormeEditKaryawan from "@/components/admin/karyawan/form-edit-karyawan";
import { useParams } from "next/navigation";

export default function page() {

    const params = useParams();
    const { id } = params as { id: string };
    
  return (
    <>
        <FormeEditKaryawan id={id} />
    </>
  )
}
