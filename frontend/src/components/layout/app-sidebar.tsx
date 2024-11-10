import {
  Search,
  CircleUserRound,
  UsersRound,
  Settings,
  ChevronsUpDown,
  LayoutDashboardIcon,
  BellIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import Image from "next/image";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Notification",
    url: "#notification",
    icon: BellIcon,
  },
  {
    title: "Discover",
    url: "#discover",
    icon: Search,
  },
  {
    title: "Revisit Profiles",
    url: "#revisit",
    icon: UsersRound,
  },
  {
    title: "Profile",
    url: "#profile",
    icon: CircleUserRound,
  },
  {
    title: "Settings",
    url: "#setting",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center mb-8 space-x-5">
            <Image
              src="/images/VinUni-Logo-PNG.png"
              alt="Logo"
              width={54}
              height={54}
            />
            <h2 className="ml-4 text-2xl font-bold text-zinc-800">
              Founder Matching
            </h2>
          </div>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-200">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User Avatar"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-sm text-zinc-900">
                  shadcn
                </span>
                <span className="text-xs text-zinc-500">m@example.com</span>
              </div>
              <ChevronsUpDown className="translate-x-7" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem>Upgrade to Pro</DropdownMenuItem>
            <DropdownMenuItem>Account</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
