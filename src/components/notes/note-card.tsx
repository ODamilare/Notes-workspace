
import {
  MoreVertical,
  Pencil,
  Pin,
  Trash2,
} from "lucide-react";

import type { Note } from "@/types/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NoteCardProps = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
}

export function NoteCard({
  note,
  onEdit,
  onDelete,
}: NoteCardProps) {
  return (
    <Card
      className="
        group
        flex
        min-w-0
        h-[235px]
        flex-col
        overflow-hidden
        rounded-[9px]
        border-[#dfe4ec]
        bg-white
        py-0
        shadow-[0_1px_2px_rgba(20,33,61,0.03)]
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-[#cfd6e4]
        hover:shadow-[0_8px_24px_rgba(20,33,61,0.07)]
      "
    >
      <CardHeader className="px-4 pb-0 pt-4">
        <div className="flex items-center justify-between">
          <Pin
            className="
              size-[15px]
              rotate-[-15deg]
              text-[#9aa3b3]
              transition-colors
              group-hover:text-[#5069e8]
            "
            aria-hidden="true"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="
                  size-7
                  rounded-md
                  text-[#8c96a8]
                  hover:bg-[#f4f6fa]
                  hover:text-[#14213d]
                "
                aria-label={`Actions for ${note.title}`}
              >
                <MoreVertical
                  className="size-[15px]"
                  aria-hidden="true"
                />
              </Button>
            </DropdownMenuTrigger>

           <DropdownMenuContent align="end">
  <DropdownMenuItem
    onClick={() => onEdit(note)}
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
    <Pencil className="mr-2 size-4 text-[#4963e7]" />
    Edit
  </DropdownMenuItem>

  <DropdownMenuItem
    onClick={() => onDelete(note)}
    className="
      h-10
      cursor-pointer
      rounded-[5px]
      text-[13px]
      text-destructive
      hover:bg-red-50
      hover:text-destructive
      focus:bg-red-50
      focus:text-destructive
      focus-visible:ring-2
      focus-visible:ring-red-500
      focus-visible:ring-offset-1
    "
  >
    <Trash2 className="mr-2 size-4 text-destructive" />
    Delete
  </DropdownMenuItem>
</DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col px-4 pt-3">
      <CardTitle
  title={note.title}
  className="
    truncate
    text-[14px]
    font-semibold
    leading-[1.35]
    tracking-[-0.01em]
    text-[#14213d]
  "
>
  {note.title}
</CardTitle>

        <p
          className="
            mt-2
            line-clamp-4
            break-words
            text-[12px]
            leading-[1.55]
            text-[#7a8497]
          "
        >
          {note.content}
        </p>

        <div className="mt-auto pt-3">
          <span
            className="
              inline-flex
              items-center
              rounded-full
              bg-[#f0e8ff]
              px-2
              py-1
              text-[10px]
              font-semibold
              leading-none
              text-[#8054c7]
            "
          >
            Notes
          </span>
        </div>
      </CardContent>

      <CardFooter
        className="
          flex
          items-center
          justify-between
          border-t
          border-[#f0f2f5]
          px-4
          py-3
          text-[10px]
          font-medium
          text-[#98a1b1]
        "
      >
        <span>{formatDate(note.updatedAt)}</span>

        <span>{getReadingTime(note.content)}</span>
      </CardFooter>
    </Card>
  );
}

