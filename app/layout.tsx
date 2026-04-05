import type { Metadata } from "next";
// import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Zuvora - More Than Just Clothes.",
  description: "We only sell quality clothing here.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const collections = await getCollections();

  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="antialiased">
          {children}
      </body>
    </html>
  );
}