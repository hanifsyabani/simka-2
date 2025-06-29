"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ColumnCabang = {
  id: string;
  name: number;
  address: string;
};

export const getColumns = (refetch: () => void): ColumnDef<ColumnCabang>[] => [
  {
    accessorKey: "name",
    header: "Nama Cabang",
  },
  {
    accessorKey: "address",
    header: "Alamat Cabang",
  },

  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => <></>,
  },
];
