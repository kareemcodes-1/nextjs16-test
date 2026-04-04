import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./providers/provider";
import ToastProvider from "./providers/toast-provider";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer";
import { getCollections } from "./actions/getCollections";
import CTA from "./components/cta";

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
    <html lang="en">
      <body className="antialiased">
{/* 
        <AuthProvider>
          <ToastProvider /> */}
          {/* <Navbar collections={collections} /> */}
          {children}
          <CTA />
          <Footer />
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}