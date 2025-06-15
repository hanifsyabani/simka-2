"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import {
  ChevronRight,
  Fullscreen,
  Home,
  Logs,
  MessageCircle,
  Settings,
  ShoppingBasket,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import Image from "next/image";

export default function SidebarAdmin() {
  const pathname = usePathname();

  const items = [
    {
      title: "Dashboard",
      url: `/admin`,
      icon: Home,
    },
    {
      title: "Data",
      icon: ShoppingBasket,
      items: [
        { title: "Karyawan", url: `/admin/karyawan` },
        { title: "Departemen", url: `/admin/departemen` },
        { title: "Jabatan", url: `/admin/jabatan` },
        { title: "Cabang", url: `/admin/cabang` },
        { title: "Cuti", url: `/admin/cuti` },
        { title: "Jam Kerja", url: `/admin/jam-kerja` },
        { title: "Jenis Tunjangan", url: `/admin/jenis-tunjangan` },
        { title: "Gaji Pokok", url: `/admin/gaji-pokok` },
        { title: "Tunjangan", url: `/admin/tunjangan` },
      ],
    },
    {
      title: "Gaji Pokok",
      url: `/admin/gaji`,
      icon: Fullscreen,
    },
    {
      title: "Monitoring Presensi",
      url: `/admin/monitoring`,
      icon: Logs,
    },
    {
      title: "Pengajuan Absen",
      url: `/admin/pengajuan`,
      icon: Users,
    },
    {
      title: "Pengaturan",
      url: `/admin/pengaturan`,
      icon: ShoppingCart,
    },
    {
      title: "Laporan",
      icon: MessageCircle,
      items: [
        { title: "Presensi dan Gaji", url: `/admin/laporan/presensi-gaji` },
      ],
    },
    {
      title: "Utilities",
      url: `/admin/utilities`,
      icon: Settings,
    },
  ];

  return (
    <Sidebar side="left">
      <SidebarContent className="py-5 px-2 h-full bg-blue-950 ">
        <Link href={`/admin`} className="flex items-center gap-2">
          {/* <Image src={'/logo.png'} width={30} height={30} alt={'logo'} className="w-20"/> */}
          <h1 className="text-xl font-bold text-white">SIMKA</h1>
        </Link>

        <SidebarGroup className="text-white">
          <SidebarMenu className="space-y-4">
            {items.map((item) =>
              item.items ? (
                <Collapsible
                  key={item.title}
                  asChild
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent >
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>
                                <span className="text-white hover:text-blue-950">{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
