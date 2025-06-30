"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionsKaryawan from "./actions";

export type ColumnKaryawan = {
  id: string;
  fullname: number;
  email: string;
  phone: string;
  department: string;
  position: string;
};

export const getColumns = (
  refetch: () => void
): ColumnDef<ColumnKaryawan>[] => [
  {
    accessorKey: "fullname",
    header: "Nama Lengkap ",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "phone",
    header: "Nomor Telepon",
  },
  {
    accessorKey: "department",
    header: "Departemen",
  },
  {
    accessorKey: "position",
    header: "Jabatan",
  },

  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => (
      <>
        <ActionsKaryawan Id={row.original.id} refetch={refetch} />
      </>
    ),
  },
];
