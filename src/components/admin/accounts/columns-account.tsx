"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionsAccount from "./actions";
import { Badge } from "@/components/ui/badge";

export type Accounts = {
  fullname: number;
  email: string;
  role: string;
  phone: string;
  department: string;
  position: string;
  isVerified: boolean;
};

export const columns: ColumnDef<Accounts>[] = [
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
    id: "actions",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.original.isVerified ? (
          <Badge className="text-white">Verified</Badge>
        ) : (
          <Badge variant="destructive" className="text-white">Not Verified</Badge>
        )}
      </div>
    ),
  },
];
