import SidebarAdmin from "@/components/admin/sidebar-admin";
import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SidebarAdmin />
      <div className="w-full bg-gray-50 ">
        <Navbar />
        <div className=" px-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
