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

import { getMenuItems } from "@/lib/items";
import Image from "next/image";

export default function SidebarAdmin() {
  const pathname = usePathname();

 const items = getMenuItems(pathname);

  return (
    <Sidebar side="left">
      <SidebarContent className="py-5 px-2 h-full bg-blue-950 ">
        <Link href={`/admin`} className="flex items-center gap-2">
          <Image src={'/logo.png'} width={100} height={100} alt={'logo'} className="w-14"/>
          <h1 className="text-xl font-bold text-white">Koperasi Simka</h1>
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
