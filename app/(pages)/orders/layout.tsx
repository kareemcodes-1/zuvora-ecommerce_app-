import type { Metadata } from "next";


type LayoutProps = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: `Orders - Zuvora`,
    description: `All your orders`,
  };
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <>
        {children}
    </>
  );
}
