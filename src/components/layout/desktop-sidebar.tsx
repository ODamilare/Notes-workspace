
"use client";
import { useState } from "react";
import {
  FileText,
  ChevronDown,
  ChevronLeft,
  Plus,
  Star,
  StickyNote,
  Tag,
  Trash2,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/components/auth/auth-provider";
import { api } from "@/lib/api/client";

type DesktopSidebarProps = {
  onLogout: () => void;
};

export function DesktopSidebar({
  onLogout,
}: DesktopSidebarProps) {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  async function handleLogout() {
    try {
      await api<void>("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      onLogout();
    }
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <aside
  className={`hidden shrink-0 border-r border-[#E1E4EA] bg-white transition-all duration-200 md:flex md:flex-col ${
    isCollapsed ? "w-[72px]" : "w-[265px]"
  }`}
>
      {/* Brand */}
     <div className="flex h-[72px] items-center justify-between border-b border-[#E1E4EA] px-4">
  <div
    className={`flex min-w-0 items-center ${
      isCollapsed ? "w-full justify-center" : "gap-3"
    }`}
  >
    <div className="flex size-9 shrink-0 items-center justify-center rounded-[7px] bg-gradient-to-br from-[#5069e8] to-[#3d55d5] text-white shadow-[0_4px_10px_rgba(73,99,231,0.18)]">
      <FileText
        className="size-[19px] text-white"
        strokeWidth={2}
        aria-hidden="true"
      />
    </div>

    {!isCollapsed && (
      <span className="truncate text-[15px] font-semibold tracking-tight text-[#14213d]">
        Notes Workspace
      </span>
    )}
  </div>

  <Button
    type="button"
    variant="ghost"
    size="icon"
    onClick={() => setIsCollapsed((value) => !value)}
    className={`size-8 shrink-0 text-[#7A8497] hover:bg-[#F4F5F8] ${
      isCollapsed ? "hidden" : ""
    }`}
    aria-label="Collapse sidebar"
  >
    <ChevronLeft
      className="size-4"
      aria-hidden="true"
    />
  </Button>

  {isCollapsed && (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => setIsCollapsed(false)}
      className="absolute left-[56px] top-[21px] z-10 size-8 rounded-full border border-[#E1E4EA] bg-white text-[#7A8497] shadow-sm hover:bg-[#F4F5F8]"
      aria-label="Expand sidebar"
      title="Expand sidebar"
    >
      <ChevronLeft
        className="size-4 rotate-180"
        aria-hidden="true"
      />
    </Button>
  )}
</div>

      {/* Navigation */}
     <nav
  className={`flex-1 py-6 ${
    isCollapsed ? "px-3" : "px-4"
  }`}
>
  <div className="space-y-1">
    <Button
      type="button"
      variant="ghost"
      title={isCollapsed ? "Your notes" : undefined}
      className={`h-10 w-full rounded-lg ${
        isCollapsed
          ? "justify-center px-0"
          : "justify-start gap-3 px-3"
      } bg-[#eef0ff] text-[13px] font-semibold text-[#4963e7] hover:bg-[#eef0ff] hover:text-[#4963e7]`}
    >
      <StickyNote
        className="size-[17px] shrink-0"
        aria-hidden="true"
      />

      {!isCollapsed && "Your notes"}
    </Button>

    <Button
      type="button"
      variant="ghost"
      title={isCollapsed ? "Favorites" : undefined}
      className={`h-10 w-full rounded-lg ${
        isCollapsed
          ? "justify-center px-0"
          : "justify-start gap-3 px-3"
      } text-[13px] font-medium text-[#536078] hover:bg-[#F5F6F8]`}
    >
      <Star
        className="size-[17px] shrink-0"
        aria-hidden="true"
      />

      {!isCollapsed && "Favorites"}
    </Button>

    <Button
      type="button"
      variant="ghost"
      title={isCollapsed ? "Trash" : undefined}
      className={`h-10 w-full rounded-lg ${
        isCollapsed
          ? "justify-center px-0"
          : "justify-start gap-3 px-3"
      } text-[13px] font-medium text-[#536078] hover:bg-[#F5F6F8]`}
    >
      <Trash2
        className="size-[17px] shrink-0"
        aria-hidden="true"
      />

      {!isCollapsed && "Trash"}
    </Button>
  </div>

  <div className="my-6 border-t border-[#E1E4EA]" />

  <div className="space-y-1">
    <Button
      type="button"
      variant="ghost"
      title={isCollapsed ? "Tags" : undefined}
      className={`h-10 w-full rounded-lg ${
        isCollapsed
          ? "justify-center px-0"
          : "justify-between px-3"
      } text-[13px] font-medium text-[#536078] hover:bg-[#F5F6F8]`}
    >
      <span
        className={`flex items-center ${
          isCollapsed ? "justify-center" : "gap-3"
        }`}
      >
        <Tag
          className="size-[17px] shrink-0"
          aria-hidden="true"
        />

        {!isCollapsed && "Tags"}
      </span>

      {!isCollapsed && (
        <Plus
          className="size-4 text-[#7A8497]"
          aria-hidden="true"
        />
      )}
    </Button>

    <Button
      type="button"
      variant="ghost"
      title={isCollapsed ? "Notebooks" : undefined}
      className={`h-10 w-full rounded-lg ${
        isCollapsed
          ? "justify-center px-0"
          : "justify-between px-3"
      } text-[13px] font-medium text-[#536078] hover:bg-[#F5F6F8]`}
    >
      <span
        className={`flex items-center ${
          isCollapsed ? "justify-center" : "gap-3"
        }`}
      >
        <FileText
          className="size-[18px] shrink-0"
          strokeWidth={2}
          aria-hidden="true"
        />

        {!isCollapsed && "Notebooks"}
      </span>

      {!isCollapsed && (
        <Plus
          className="size-4 text-[#7A8497]"
          aria-hidden="true"
        />
      )}
    </Button>
  </div>
</nav>

      {/* Account */}
   <div className="border-t border-[#E1E4EA] p-3">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        type="button"
        variant="ghost"
        title={isCollapsed ? user?.name || "Account" : undefined}
        className={`h-auto w-full rounded-lg py-2.5 ${
          isCollapsed
            ? "justify-center px-0"
            : "justify-start gap-3 px-2"
        } hover:bg-[#F5F6F8]`}
      >
        <Avatar className="size-10 shrink-0">
          <AvatarFallback className="bg-primary text-sm font-semibold text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>

        {!isCollapsed && (
          <>
            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-[13px] font-semibold text-[#14213D]">
                {user?.name || "User"}
              </span>

              <span className="mt-0.5 block truncate text-[11px] text-[#7A8497]">
                {user?.email || ""}
              </span>
            </span>

            <ChevronDown
              className="size-4 shrink-0 text-[#7A8497]"
              aria-hidden="true"
            />
          </>
        )}
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      side="top"
      align={isCollapsed ? "center" : "start"}
      className="w-56"
    >
      <DropdownMenuLabel>
        Account
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        onClick={handleLogout}
        className="cursor-pointer"
      >
        Sign out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
    </aside>
  );
}
