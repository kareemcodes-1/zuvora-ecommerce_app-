import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./providers/provider";
import ToastProvider from "./providers/toast-provider";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer";
import { getCollections } from "./actions/getCollections";
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
  const collections = await getCollections();

  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body className="antialiased" suppressHydrationWarning>
        {/* TEMPORARY: Remove after debugging */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/eruda/3.4.3/eruda.min.js"></script>
        <script dangerouslySetInnerHTML={{ __html: "eruda.init();" }} />

        <AuthProvider>
          <ToastProvider />
          <Navbar collections={collections} />
          {children}
          <CTA />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}