import Image from "next/image";
import Link from "next/link";

import {
  Search,
  CircleUserRound,
  UsersRound,
  Settings,
  ChevronsUpDown,
  LayoutDashboardIcon,
  BellIcon,
  ContactRoundIcon,
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

import { SignOutButton } from "@clerk/nextjs";

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
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Notification",
    url: "/dashboard/notification",
    icon: BellIcon,
  },
  {
    title: "Discover",
    url: "/dashboard/discover",
    icon: Search,
  },
  {
    title: "Connections",
    url: "/dashboard/connections",
    icon: ContactRoundIcon,
  },
  {
    title: "Revisit Profiles",
    url: "/dashboard/revisit-profiles",
    icon: UsersRound,
  },
  {
    title: "Profile",
    url: "/my-profile",
    icon: CircleUserRound,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
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
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
            <div className="w-full">
              <SignOutButton redirectUrl="/sign-in">
                <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground w-full text-left">
                  Log out
                </button>
              </SignOutButton>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
