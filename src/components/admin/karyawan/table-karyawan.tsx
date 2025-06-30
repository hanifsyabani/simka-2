"use client";

import { Button } from "@/components/ui/button";
import HeaderAdmin from "../header";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GetAllKaryawan } from "@/service/karyawan";
import { ColumnKaryawan, getColumns } from "./columns-karyawan";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";

export default function TableKaryawan() {

  const router = useRouter()

  const {
    data: dataKaryawan,
    isLoading: isLoadingKaryawan,
    refetch,
  } = useQuery({
    queryKey: ["karyawan"],
    queryFn: () => GetAllKaryawan(),
  });

  const formattedKaryawan: ColumnKaryawan[] = dataKaryawan?.data?.karyawan.map(
    (karyawan: any) => ({
      id: karyawan.id,
      fullname: karyawan.fullname,
      email: karyawan.user.email,
      phone: karyawan.phone,
      department: karyawan.department,
      position: karyawan.position,
    })
  );

  if (isLoadingKaryawan) return <div className="loader" />;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <HeaderAdmin title="Karyawan" />
        <Button className="bg-green-700 cursor-pointer" onClick={() => router.push("/admin/karyawan/add")}>
          <Plus /> Tambah Karyawan
        </Button>
      </div>

      <DataTable data={formattedKaryawan} columns={getColumns(refetch)} />
    </>
  );
}
