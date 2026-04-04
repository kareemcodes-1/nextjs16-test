import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer";
import CTA from "./components/cta";
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
{/* 
        <AuthProvider>
          <ToastProvider /> */}
          {/* <Navbar collections={collections} /> */}
          {children}
          {/* <CTA />
          <Footer /> */}
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}