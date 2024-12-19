"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Salad,
  Dumbbell,
  Users,
  Stethoscope,
  Settings,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Questions",
    icon: LayoutDashboard,
    href: "/questions",
  },
  {
    title: "Diet",
    icon: Salad,
    href: "/diet",
  },
  {
    title: "Exercise",
    icon: Dumbbell,
    href: "/exercise",
  },
  {
    title: "Patients",
    icon: Users,
    href: "/patients",
  },
  {
    title: "Doctors",
    icon: Stethoscope,
    href: "/doctors",
  },
  {
    title: "Setting",
    icon: Settings,
    href: "/settings",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4 bg-green">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-2xl font-extrabold  text-white font-sans ">mHealth</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-green">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className={cn(
                  "w-full relative flex items-center rounded-r-none",
                  "before:absolute before:left-0 before:top-0 before:h-full before:w-3 before:bg-white before:opacity-0 before:transition-opacity before:rounded-r-xl",
                  "hover:bg-green hover:before:opacity-100",
                  pathname === item.href && "bg-green before:opacity-100"
                )}
              >
                <Link href={item.href} className="text-white font-sans text-sm font-semibold p-8 w-full">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

