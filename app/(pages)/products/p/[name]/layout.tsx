import type { Metadata } from "next";

type GenerateMetadataParams = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({ params }: GenerateMetadataParams): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeURIComponent(name.replace(/-/g, " "));
  return {
    title: `${decodedName} | Zuvora`,
    description: `Discover details about ${decodedName} in our Zuvora collection.`,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}