import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zuvora - About",
  description: "Help bro",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}