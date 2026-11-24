
"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { DesktopSidebar } from "@/components/layout/desktop-sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const { clearUser } = useAuth();

  function handleLogout() {
    clearUser();
    router.replace("/login");
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#FBFCFE]">
      <DesktopSidebar onLogout={handleLogout} />

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNavigation />

        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

