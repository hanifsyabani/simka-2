"use client";

import { GetListAccounts } from "@/service/account";
import { useQuery } from "@tanstack/react-query";
import { ColumnAccounts, getColumns } from "./columns-account";
import { DataTable } from "@/components/ui/data-table";

export default function TableAccounts() {
  const { data: dataAccounts, isLoading: isLoadingAccounts, refetch } = useQuery({
    queryFn: () => GetListAccounts(),
    queryKey: ["dataAccounts"],
  });

  const formattedDataAccounts: ColumnAccounts[] = dataAccounts?.data?.user.map(
    (account: any) => ({
      id: account.id,
      fullname: account.fullname,
      email: account.email,
      phone: account.phone,
      role: account.role,
      department: account.department,
      position: account.position,
      isVerified: account.isVerified,
    })
  );

  // console.log(formattedDataAccounts)

  if (isLoadingAccounts) return <div className="loader-main" />;

  return (
    <div>
      <DataTable columns={getColumns(refetch)} data={formattedDataAccounts}  />
    </div>
  );
}
