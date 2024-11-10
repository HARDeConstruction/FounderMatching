import "./globals.css";
import { Inter } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";

// Optionally import fonts (Inter in this case)
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Founder Matching",
  description: "Product made by HarDeconstuction",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Include any meta tags, links, etc. here */}
      </head>
      <body className={inter.className}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
