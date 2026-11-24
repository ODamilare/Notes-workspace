import type { ReactNode } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Toaster } from "@/components/ui/sonner";
export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthLayout>{children}
    <Toaster /></AuthLayout>;
}