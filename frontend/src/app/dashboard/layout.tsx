"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import DynamicBreadcrumb from "@/components/layout/Breadcrumb";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="flex-1 flex flex-col pr-4">
        {/* <Separator orientation="vertical" className="h-6 mr-4" /> */}
        <DynamicBreadcrumb />
        {children}
      </div>
    </SidebarProvider>
  );
}
