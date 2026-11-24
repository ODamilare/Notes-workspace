
"use client";

import {
  FileText,
  LogOut,
  Menu,
  Plus,
  Star,
  StickyNote,
  Tag,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/auth-provider";
import { api } from "@/lib/api/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNavigation() {
  const router = useRouter();
  const { user, clearUser } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  async function handleLogout() {
    try {
      await api<void>("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      clearUser();
      router.replace("/login");
    }
  }

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-16
        items-center
        justify-between
        border-b
        border-[#dfe4ec]
        bg-white
        px-4
        md:hidden
      "
    >
      {/* Left side */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="
                size-11
                shrink-0
                rounded-[6px]
                border-[#d6dce6]
                bg-white
                text-[#14213d]
                shadow-none
                transition-all
                hover:border-[#bfc7d5]
                hover:bg-[#f7f8ff]
                hover:text-[#4963e7]
              "
              aria-label="Open navigation menu"
            >
              <Menu className="size-[18px]" aria-hidden="true" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="
              flex
              w-[285px]
              flex-col
              border-r
              border-[#dfe4ec]
              bg-white
              p-0
            "
          >
            {/* Drawer header */}
            <SheetHeader
              className="
                flex
                h-16
                shrink-0
                flex-row
                items-center
                border-b
                border-[#e4e7ed]
                px-5
              "
            >
              <SheetTitle
                className="
                  flex
                  items-center
                  gap-2
                  text-[15px]
                  font-semibold
                  tracking-[-0.01em]
                  text-[#14213d]
                "
              >
                <div
                  className="
                    flex
                    size-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-[6px]
                    bg-gradient-to-br
                    from-[#5069e8]
                    to-[#3d55d5]
                    text-white
                    shadow-[0_3px_8px_rgba(73,99,231,0.18)]
                  "
                >
                  <FileText
                    className="size-4"
                    aria-hidden="true"
                  />
                </div>

                <span>Notes Workspace</span>
              </SheetTitle>
            </SheetHeader>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
              {/* Primary navigation */}
              <div className="space-y-1">
                <Button
                  type="button"
                  variant="ghost"
                  className="
                    h-10
                    w-full
                    justify-start
                    gap-3
                    rounded-lg
                    bg-[#eef0ff]
                    px-3
                    text-[13px]
                    font-semibold
                    text-[#4963e7]
                    hover:bg-[#eef0ff]
                    hover:text-[#4963e7]
                  "
                >
                  <StickyNote
                    className="size-[17px]"
                    aria-hidden="true"
                  />

                  Your notes
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="
                    h-10
                    w-full
                    justify-start
                    gap-3
                    rounded-lg
                    px-3
                    text-[13px]
                    font-medium
                    text-[#536078]
                    hover:bg-[#F5F6F8]
                  "
                >
                  <Star
                    className="size-[17px]"
                    aria-hidden="true"
                  />

                  Favorites
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="
                    h-10
                    w-full
                    justify-start
                    gap-3
                    rounded-lg
                    px-3
                    text-[13px]
                    font-medium
                    text-[#536078]
                    hover:bg-[#F5F6F8]
                  "
                >
                  <Trash2
                    className="size-[17px]"
                    aria-hidden="true"
                  />

                  Trash
                </Button>
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-[#E1E4EA]" />

              {/* Secondary navigation */}
              <div className="space-y-1">
                <Button
                  type="button"
                  variant="ghost"
                  className="
                    h-10
                    w-full
                    justify-between
                    rounded-lg
                    px-3
                    text-[13px]
                    font-medium
                    text-[#536078]
                    hover:bg-[#F5F6F8]
                  "
                >
                  <span className="flex items-center gap-3">
                    <Tag
                      className="size-[17px]"
                      aria-hidden="true"
                    />

                    Tags
                  </span>

                  <Plus
                    className="size-4 text-[#7A8497]"
                    aria-hidden="true"
                  />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="
                    h-10
                    w-full
                    justify-between
                    rounded-lg
                    px-3
                    text-[13px]
                    font-medium
                    text-[#536078]
                    hover:bg-[#F5F6F8]
                  "
                >
                  <span className="flex items-center gap-3">
                    <FileText
                      className="size-[19px]"
                      strokeWidth={2}
                      aria-hidden="true"
                    />

                    Notebooks
                  </span>

                  <Plus
                    className="size-4 text-[#7A8497]"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </nav>

            {/* Account section */}
            <div className="shrink-0 border-t border-[#e4e7ed] p-3">
              <div className="flex items-center gap-3 rounded-[6px] px-2 py-2">
                <Avatar className="size-11 shrink-0">
                  <AvatarFallback
                    className="
                      bg-[#eef1ff]
                      text-[12px]
                      font-semibold
                      text-[#4963e7]
                    "
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#14213d]">
                    {user?.name || "User"}
                  </p>

                  <p className="truncate text-xs text-[#778299]">
                    {user?.email || ""}
                  </p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Mobile brand */}
        <div className="flex min-w-0 items-center gap-2">
          <div
            className="
              flex
              size-8
              shrink-0
              items-center
              justify-center
              rounded-[6px]
              bg-gradient-to-br
              from-[#5069e8]
              to-[#3d55d5]
              text-white
              shadow-[0_3px_8px_rgba(73,99,231,0.18)]
            "
          >
            <FileText
              className="size-4"
              aria-hidden="true"
            />
          </div>

          <span
            className="
              truncate
              text-[15px]
              font-semibold
              tracking-[-0.01em]
              text-[#14213d]
            "
          >
            Notes Workspace
          </span>
        </div>
      </div>

      {/* Account menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="
              size-11
              shrink-0
              rounded-full
              p-0
              hover:bg-[#f1f3f8]
            "
            aria-label="Open account menu"
          >
            <Avatar className="size-11">
              <AvatarFallback
                className="
                  bg-[#eef1ff]
                  text-[12px]
                  font-semibold
                  text-[#4963e7]
                "
              >
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="
            mt-2
            w-60
            rounded-[7px]
            border-[#dfe4ec]
            bg-white
            p-1
            shadow-[0_8px_24px_rgba(20,33,61,0.10)]
          "
        >
          <DropdownMenuLabel className="px-3 py-2.5">
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold text-[#14213d]">
                {user?.name || "User"}
              </span>

              <span className="mt-0.5 truncate text-xs font-normal text-[#778299]">
                {user?.email || ""}
              </span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className="
              h-10
              cursor-pointer
              rounded-[5px]
              text-[13px]
              text-[#14213d]
              focus:bg-[#f7f8ff]
            "
          >
            <LogOut
              className="mr-2 size-4 text-[#4963e7]"
              aria-hidden="true"
            />

            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
