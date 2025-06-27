"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionsAccount from "./actions";
import { Badge } from "@/components/ui/badge";
import { Verified } from "lucide-react";

export type ColumnAccounts = {
  id: string;
  fullname: number;
  email: string;
  role: string;
  phone: string;
  department: string;
  position: string;
  isVerified: boolean;
};

export const getColumns = (
  refetch: () => void
): ColumnDef<ColumnAccounts>[] => [
  {
    accessorKey: "fullname",
    header: "Nama Lengkap ",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
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
    id: "id",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.original.isVerified ? (
          <Badge className="text-white bg-green-600">Terverifikasi</Badge>
        ) : (
          <Badge variant="destructive" className="text-white bg-gray-600">
            Tidak Terverifikasi
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => (
      <>
        <ActionsAccount
          isVerified={row.original.isVerified}
          userId={row.original.id}
          refetch={refetch}
        />
      </>
    ),
  },
];
