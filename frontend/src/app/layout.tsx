import "./globals.css";
import { Inter } from "next/font/google";

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
        {children}
      </body>
    </html>
  );
}
