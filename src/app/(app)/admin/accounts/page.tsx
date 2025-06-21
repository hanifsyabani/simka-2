import TableAccounts from "@/components/admin/accounts/table-accounts";
import HeaderAdmin from "@/components/admin/header";

export default function page() {
  return (
    <div>
      <HeaderAdmin title="Akun"/>
      <TableAccounts/>
    </div>
  )
}
