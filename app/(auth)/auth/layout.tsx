import type { Metadata } from "next";
import "../../globals.css";
import AuthProvider from "../../providers/provider";
import ToastProvider from "../../providers/toast-provider";
import Navbar from "../../components/navbar/navbar";
import AuthGuard from "@/app/providers/auth-guard";

type LayoutProps = {
  children: React.ReactNode;
};

export function generateMetadata(): Metadata {
  return {
    title: "Authentication - Zuvora",
    description: "Create/Login in Zuvora",
  };
}

export default function RootLayout({ children }: LayoutProps) {
  return (
       <>
          {children}
       </>
  );
}
