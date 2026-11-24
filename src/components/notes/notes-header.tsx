
import { ChevronDown, FilePlus2, NotebookTabs, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NotesHeaderProps = {
  onCreate: () => void;
};

export function NotesHeader({
  onCreate,
}: NotesHeaderProps) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Page title */}
      <div className="min-w-0">
        <h1 className="text-[25px] font-bold leading-[1.2] tracking-[-0.03em] text-[#14213d]">
          Your notes
        </h1>

        <p className="mt-2 text-[14px] font-normal leading-[1.5] text-[#778299]">
          Your personal notes workspace.
        </p>
      </div>

      {/* New note menu */}
      <DropdownMenu>
        <div className="flex w-full sm:w-auto">
          <Button
            type="button"
            onClick={onCreate}
            className="
              h-[38px]
              flex-1
              rounded-l-[6px]
              rounded-r-none
              border-0
              bg-gradient-to-br
              from-[#5069e8]
              to-[#3d55d5]
              px-4
              text-[13px]
              font-semibold
              text-white
              focus-visible:ring-2
              focus-visible:ring-white
              focus-visible:ring-offset-2
              focus-visible:ring-offset-white
              shadow-[0_4px_10px_rgba(73,99,231,0.20)]
              transition-all
              hover:from-[#5870ec]
              hover:to-[#4059dc]
              hover:shadow-[0_5px_14px_rgba(73,99,231,0.25)]
              active:translate-y-px
              sm:flex-none
            "
          >
            <FilePlus2
              className="mr-2 size-[16px]"
              aria-hidden="true"
            />
            New note
          </Button>

          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              className="
                h-[38px]
                w-[38px]
                rounded-l-none
                rounded-r-[6px]
                border-0
                border-l
                border-white/20
                bg-gradient-to-br
                from-[#5069e8]
                to-[#3d55d5]
                p-0
                text-white
                shadow-[0_4px_10px_rgba(73,99,231,0.20)]
                hover:from-[#5870ec]
                hover:to-[#4059dc]
              "
              aria-label="Open new note menu"
            >
              <ChevronDown
                className="size-4"
                aria-hidden="true"
              />
            </Button>
          </DropdownMenuTrigger>
        </div>

        <DropdownMenuContent
  align="end"
  className="
    mt-2
    w-[170px]
    rounded-[7px]
    border-[#dfe4ec]
    bg-white
    p-1
    shadow-[0_8px_24px_rgba(20,33,61,0.10)]
  "
>
  <DropdownMenuItem
    onClick={onCreate}
    className="
      h-10
      cursor-pointer
      rounded-[5px]
      text-[13px]
      text-[#14213d]
      hover:bg-[#f5f6ff]
      hover:text-[#4963e7]
      focus:bg-[#f5f6ff]
      focus:text-[#4963e7]
      focus-visible:ring-2
      focus-visible:ring-[#4963e7]
      focus-visible:ring-offset-1
    "
  >
    <FilePlus2
      className="mr-2 size-4 text-[#4963e7]"
      aria-hidden="true"
    />
    New note
  </DropdownMenuItem>

  <DropdownMenuItem
    className="
      h-10
      cursor-pointer
      rounded-[5px]
      text-[13px]
      text-[#14213d]
      hover:bg-[#f5f6ff]
      hover:text-[#4963e7]
      focus:bg-[#f5f6ff]
      focus:text-[#4963e7]
      focus-visible:ring-2
      focus-visible:ring-[#4963e7]
      focus-visible:ring-offset-1
    "
  >
    <NotebookTabs
      className="mr-2 size-4 text-[#4963e7]"
      aria-hidden="true"
    />
    New notebook
  </DropdownMenuItem>

  <DropdownMenuItem
    className="
      h-10
      cursor-pointer
      rounded-[5px]
      text-[13px]
      text-[#14213d]
      hover:bg-[#f5f6ff]
      hover:text-[#4963e7]
      focus:bg-[#f5f6ff]
      focus:text-[#4963e7]
      focus-visible:ring-2
      focus-visible:ring-[#4963e7]
      focus-visible:ring-offset-1
    "
  >
    <Upload
      className="mr-2 size-4 text-[#4963e7]"
      aria-hidden="true"
    />
    Import notes
  </DropdownMenuItem>
</DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}