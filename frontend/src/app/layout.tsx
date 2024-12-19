import "./globals.css";
import { Montserrat, Cabin } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";


const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-mont" });
const cabin = Cabin({ subsets: ["latin"], variable: "--font-cabin" });

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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${montserrat.className} ${cabin.variable} antialiased`}
        >
          {children}
          <Toaster richColors/>
        </body>
      </html>
    </ClerkProvider>
  );
}
