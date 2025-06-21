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
  Home,
  ShoppingBasket,
  Fullscreen,
  Logs,
  Users,
  ShoppingCart,
  MessageCircle,
  Settings,
  User,
  Building2,
  Briefcase,
  MapPin,
  CalendarCheck,
  Clock,
  BadgeDollarSign,
  Wallet,
  FileText,
  ChevronRight,
  Database,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import Image from "next/image";
import clsx from "clsx";

export default function SidebarAdmin() {
  const pathname = usePathname();

  const items = [
    {
      title: "Dashboard",
      url: `/admin`,
      icon: Home,
      isActive: pathname === "/admin",
    },
    {
      title: "Data",
      icon: Database,
      isActive:
        pathname.startsWith("/admin/karyawan") ||
        pathname.startsWith("/admin/departemen") ||
        pathname.startsWith("/admin/jabatan") ||
        pathname.startsWith("/admin/cabang") ||
        pathname.startsWith("/admin/cuti") ||
        pathname.startsWith("/admin/jam-kerja") ||
        pathname.startsWith("/admin/jenis-tunjangan") ||
        pathname.startsWith("/admin/gaji-pokok") ||
        pathname.startsWith("/admin/tunjangan"),
      items: [
        {
          title: "Karyawan",
          url: `/admin/karyawan`,
          icon: User,
          isActive: pathname === "/admin/karyawan",
        },
        {
          title: "Departemen",
          url: `/admin/departemen`,
          icon: Building2,
          isActive: pathname === "/admin/departemen",
        },
        {
          title: "Jabatan",
          url: `/admin/jabatan`,
          icon: Briefcase,
          isActive: pathname === "/admin/jabatan",
        },
        {
          title: "Cabang",
          url: `/admin/cabang`,
          icon: MapPin,
          isActive: pathname === "/admin/cabang",
        },
        {
          title: "Cuti",
          url: `/admin/cuti`,
          icon: CalendarCheck,
          isActive: pathname === "/admin/cuti",
        },
        {
          title: "Jam Kerja",
          url: `/admin/jam-kerja`,
          icon: Clock,
          isActive: pathname === "/admin/jam-kerja",
        },
        {
          title: "Jenis Tunjangan",
          url: `/admin/jenis-tunjangan`,
          icon: BadgeDollarSign,
          isActive: pathname === "/admin/jenis-tunjangan",
        },
        {
          title: "Gaji Pokok",
          url: `/admin/gaji-pokok`,
          icon: Wallet,
          isActive: pathname === "/admin/gaji-pokok",
        },
        {
          title: "Tunjangan",
          url: `/admin/tunjangan`,
          icon: BadgeDollarSign,
          isActive: pathname === "/admin/tunjangan",
        },
      ],
    },
    {
      title: "Gaji Pokok",
      url: `/admin/gaji`,
      icon: Wallet,
      isActive: pathname === "/admin/gaji",
    },
    {
      title: "Akun",
      url: `/admin/accounts`,
      icon: User2Icon,
      isActive: pathname === "/admin/accounts",
    },
    {
      title: "Monitoring Presensi",
      url: `/admin/monitoring`,
      icon: Logs,
      isActive: pathname === "/admin/monitoring",
    },
    {
      title: "Pengajuan Absen",
      url: `/admin/pengajuan`,
      icon: Users,
      isActive: pathname === "/admin/pengajuan",
    },
    {
      title: "Laporan",
      icon: FileText,
      isActive: pathname.startsWith("/admin/laporan"),
      items: [
        {
          title: "Presensi dan Gaji",
          url: `/admin/laporan/presensi-gaji`,
          icon: FileText,
          isActive: pathname === "/admin/laporan/presensi-gaji",
        },
      ],
    },
    {
      title: "Utilities",
      url: `/admin/utilities`,
      icon: Settings,
      isActive: pathname === "/admin/utilities",
    },
  ];

  return (
    <Sidebar side="left">
      <SidebarContent className="py-5 px-2 h-full bg-blue-950 ">
        <Link href={`/admin`} className="flex items-center gap-2">
          {/* <Image src={'/logo.png'} width={30} height={30} alt={'logo'} className="w-20"/> */}
          <h1 className="text-xl font-bold text-white">SIMKA</h1>
        </Link>

        <SidebarGroup>
          <SidebarMenu className="space-y-4 text-white">
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
                    <CollapsibleContent>
                      <SidebarMenuSub className="space-y-2">
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem
                            key={subItem.title}
                            className="group/item"
                          >
                            <SidebarMenuSubButton
                              asChild
                              className={`text-white ${
                                subItem.isActive ? "bg-white text-blue-950" : ""
                              }`}
                            >
                              <Link href={subItem.url}>
                                <subItem.icon />
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title} className={`text-white`}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={`${
                      item.isActive ? "bg-white text-blue-950" : ""
                    }`}
                  >
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
