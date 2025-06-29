"use client";

import { Button } from "@/components/ui/button";
import HeaderAdmin from "../header";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GetAllKaryawan } from "@/service/karyawan";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import { ColumnCabang, getColumns } from "./columns-cabang";
import { GetAllCabang } from "@/service/cabang";

export default function TableCabang() {

  const router = useRouter()

  const {
    data: dataCabang,
    isLoading: isLoadingCabang,
    refetch,
  } = useQuery({
    queryKey: ["cabang"],
    queryFn: () => GetAllCabang(),
  });

  const formattedKaryawan: ColumnCabang[] = dataCabang?.data?.cabang.map(
    (karyawan: any) => ({
      id: karyawan.id,
      name: karyawan.name,
      address: karyawan.address,
    })
  );

  if (isLoadingCabang) return <div className="loader" />;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <HeaderAdmin title="Cabang" />
        <Button className="bg-green-700" onClick={() => router.push("/admin/cabang/add")}>
          <Plus /> Tambah Cabang
        </Button>
      </div>

      <DataTable data={formattedKaryawan} columns={getColumns(refetch)} />
    </>
  );
}
