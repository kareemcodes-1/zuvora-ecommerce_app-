import type { Metadata } from "next";

type LayoutProps = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: `Payment Page | Zuvora`,
    description: `Discover details about in our Zuvora collection.`,
  };
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
    </>
  );
}
