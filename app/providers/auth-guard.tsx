"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") return null;

  if (status === "authenticated") return null;

  return <>{children}</>;
}